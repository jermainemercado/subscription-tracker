const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_API_KEY_SECRET)
const DiscordUser = require('../database/Schemas/discordUser.js');
const bodyParser = require("body-parser");
const webhookSecret = process.env.STRIPE_WEBHOOK;

router.post('/createCheckoutSession', async (req, res) => {
    console.log('creating stripe session')

    //const { priceId } = req.body

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                quantity: 1,
                price: process.env.TEST_SUBSCRIPTION_KEY
            },
        ],
        mode: 'subscription',
        success_url: "http://localhost:3000/dashboard",
        cancel_url: "http://localhost:3000",
    })
    //console.log(session.id)
    let start = new Date().toISOString().substring(0,10)
    req.session.startDate = start;
    req.session.stripe_id = session.id
    res.json({ id: session.id })
})

router.post('/webhook', async (req, res) => {

})

router.get('/status', async (req, res) => {
    //console.log(req.user.discordId)
    const discordUser = await DiscordUser.findOne({ discordId: req.user.discordId })
    
    if (discordUser) {
        try {
            const checkout = await stripe.checkout.sessions.retrieve(
                discordUser.stripe_id
            )
            //console.log(checkout)
            res.send({message: "Found user", paymentStatus: checkout.payment_status})
        } catch (err) {
            console.log(err.message)
        }
        
    } else {
        res.send({message : 'Discord user not found'})
    }
})

router.post('/cancelSub', async (req, res) => {
    const discordUser = await DiscordUser.findOne({ discordId: req.body.discordId })
    if (discordUser) {
        try {
            const session = await stripe.checkout.sessions.retrieve(
                discordUser.stripe_id,
            )
            const deletedSubscription = await stripe.subscriptions.del(
                session.subscription
            )
        } catch (err) {
            console.log(err.message)
        }
        const deletedUser = await discordUser.remove();
        res.send({ message: "Payment cancelled successfully"})
    } else {
        res.send({message: "User does not exist"})
    }
})

module.exports = router;
