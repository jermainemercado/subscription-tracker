const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_API_KEY_SECRET)

router.post('/createCheckoutSession', async (req, res) => {
    console.log('creating stripe session')
    //TODO: store payment info in MongoDB
    try {
        const session = await stripe.checkout.sessions.create({
            payment_intent_data: {
                setup_future_usage: 'off_session',
            },
            customer: 'cus123',
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Lifetime subscription',
                        },
                        unit_amount: 6000,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: "http://localhost:3000/dashboard",
            cancel_url: "http://localhost:3000",
        });
        res.json({ id: session.id })
        //console.log(res)
        console.log('success')
    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router;
