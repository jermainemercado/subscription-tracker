const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_KEY_SECRET)
const DiscordUser = require('../database/Schemas/discordUser.js');
const bodyParser = require("body-parser");

router.post('/createCheckoutSession', async (req, res) => {
    console.log('creating stripe session')

    //const { priceId } = req.body

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                quantity: 1,
                price: process.env.SUBSCRIPTION_KEY
            },
        ],
        mode: 'subscription',
        success_url: `${process.env.ROOT_DOMAIN}/dashboard`,
        cancel_url: `${process.env.ROOT_DOMAIN}`,
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
    data = req.body.data.object;
    eventType = req.body.type;
    /*if (webhookSecret) {
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
            console.log(err);
            
            return res.json({err: err});
        }
        data = event;
        eventType = event.type;
    } else {
        data = req.body.data;
        eventType = req.body.type;
    }*/

    switch (eventType) {
        case 'invoice.paid':
            //TO-DO:
            //Change so we only assign key to user from here not at DB serialization.
            let paidUser = await DiscordUser.findOne({ stripe_subscription_id: data.subscription })
            console.log(paidUser);
            if (paidUser) {
                const subscription = await stripe.subscriptions.retrieve(
                    paidUser.stripe_subscription_id
                )
                paidUser = await DiscordUser.updateOne({stripe_subscription_id: data.subscription}, { "$set": {"currentPayment" : new Date(subscription.current_period_start * 1000) }, "nextDue": new Date(subscription.current_period_end * 1000) })
            }
            break;
        case 'invoice.payment_failed':
            const user = await DiscordUser.findOne({stripe_subscription_id: data.subscription})
            console.log(user);
            if (user) {
                const subscription = await stripe.subscription.del(
                    data.subscription,
                );
                await fetch(`https://discord.com/api/v8/guilds/${process.env.REACT_APP_GUILD_ID}/members/${user.discordId}`, 
                {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `Bot ${process.env.BOT_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                }).then(res => {
                    console.log(res);
                })
            }
            await DiscordUser.deleteOne({stripe_subscription_id: data.subscription});
            break;
        default:
            break;
    }
    res.send();
})

router.get('/status', async (req, res) => {
    //console.log(req.user.discordId)
    const discordUser = await DiscordUser.findOne({ discordId: req.user.discordId })
    console.log(discordUser);
    if (discordUser) {
        try {
            const checkout = await stripe.checkout.sessions.retrieve(
                discordUser.stripe_id
            )
            console.log(checkout)
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
                success_url: `${process.env.ROOT_DOMAIN}/dashboard`,
                cancel_url: `${process.env.ROOT_DOMAIN}`,
        }).catch((err) => console.log(err.message))
        res.json({ id: sessions.id })
    }
})

module.exports = router;
