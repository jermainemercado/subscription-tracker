const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_API_KEY_SECRET)
const DiscordUser = require('../database/Schemas/discordUser.js');

router.post('/createCheckoutSession', async (req, res) => {
    console.log('creating stripe session')

    const { priceId } = req.body

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Monthly Subscription',
                    },
                    unit_amount: 7500,
                },
                quantity: 1,
            },
        ],
        mode: 'subscription',
        success_url: "http://localhost:3000/dashboard",
        cancel_url: "http://localhost:3000",
    })
    //console.log(session.id)
    let start = new Date().toISOString().substring(0,10)
    req.session.stripe_id = session.id;
    req.session.lifetimePayment = false;
    req.session.startDate = start;
    res.json({ id: session.id })
})

router.post('/webhook', async (req, res) => {
    let data;
    let eventType;

    //const webhookSecret = {{'STRIPE_WEBHOOK_SECRET'}};
    
    if (webhookSecret) {
        let event;
        let signature = req.headers["stripe-signature"]
        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                webhookSecret
            )
        } catch (err) {
            console.log('Webhook signature verification failed')
            return res.sendStatus(400)
        }
        data = event.data;
        eventType = event.type;
    } else {
        data = req.body.data
        eventType = req.body.type
    }

    switch (eventType) {
        case 'checkout.session.completed':
            // store user data in db
            // already happens in next step....
            break;
        case 'invoice.paid':
            // update payment status
            //TODO: update in DB, ping payment method update in db
            break;
        case 'invoice.payment_failed':
            // update payment info
            //TODO: update in DB, ping payment method update in db
            break;
        default:
            // no handling
    }
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
