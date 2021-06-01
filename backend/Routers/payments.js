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
    res.json({ id: session.id })
})

router.post('/cancelSub', async (req, res) => {
    const discordId = req.query.discordId
    console.log(discordId)
    const discordUser = await DiscordUser.findOne({discordId: req.body.discordId})
    /*
    if (discordUser) {
        try {
            const deletedSub = await stripe.subscriptions.del(
                discordUser.stripe_id
            )
        } catch (err) {
            console.log(err)
        }
        res.send({message: "Payment cancelled successfully"})
    } else {
        res.send({message: "User does not exist"})
    }
    */
})

module.exports = router;
