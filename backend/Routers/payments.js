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

    //console.log(session)

    res.json({ id: session.id })
})

router.post('/webhook', async (req, res) => {
    let data;
    let eventType;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (webhookSecret) {
        let event;
        let signature = req.headers["stripe-signature"];
        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                webhookSecret,
            );
        } catch (err) {
            console.log('Webhook signature verification failed')
            return res.sendStatus(400);
        }
        data = event;
        eventType = event.type;
    } else {
        data = req.body.data;
        eventType = req.body.type;
    }

    switch (eventType) {
        case 'invoice.paid':
            const paidUser = await DiscordUser.findOne({ stripe_subscription_id: data.data.lines.subscription })
            if (user) {
                const subscription = await stripe.subscriptions.retrieve(
                    paidUser.stripe_subscription_id
                )
                paidUser.currentPayment = new Date(subscription.current_period_start * 1000);
                paidUser.nextDue = new Date(subscription.current_period_end * 1000);
            }
            break;
        case 'invoice.payment_failed':
            const user = await DiscordUser.findOne({stripe_subscription_id: data.data.lines.subscription})
            if (user) {
                const subscription = await stripe.subscription.del(
                    data.data.lines.subscription,
                );
                const deletedUser = await user.remove();
            }
            //TODO: remove user from discord, setup bot, etc.
            break;
        default:
            break;
    }
    res.json({recieved: true});
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
            console.log(deletedSubscription)
        } catch (err) {
            console.log(err.message)
        }
        //const deletedUser = await discordUser.remove();
        res.send({ message: "Payment cancelled successfully"})
    } else {
        res.send({message: "User does not exist"})
    }
})

router.get('/fetchPaymentInfo', async (req, res) => {
    const session = stripe.checkout.sessions.retrieve(
        req.user.stripe_id
    )
    console.log(session)
})

router.post('/updateCardInfo', async (req, res) => {
    const user = await DiscordUser.findOne({ discordId: req.user.discordId })
    if (user) {
        const session = await stripe.checkout.sessions.retrieve(
            user.stripe_id
        )
        console.log(session)
        const sessions = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'setup',
                customer: session.customer,
                setup_intent_data: {
                    metadata: {
                        customer_id: session.customer,
                        subscription_id: user.stripe_subscription_id,
                    },
                },
                success_url: "http://localhost:3000/dashboard",
                cancel_url: "http://localhost:3000",
        }).catch((err) => console.log(err.message))
        res.json({ id: sessions.id })
    }
})

module.exports = router;
