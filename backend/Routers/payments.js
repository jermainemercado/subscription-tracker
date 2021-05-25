const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_API_KEY_SECRET)

router.post('/createCheckoutSession', async (req, res) => {
    console.log('creating stripe session')
    //TODO: store payment info in MongoDB
    const session = await stripe.checkout.sessions.create({
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
    })
    //console.log(session.id)
    req.session.stripe_id = session.id;
    req.session.lifetimePayment = true;
    res.json({ id: session.id })
    //console.log(res)
    //console.log('success')
})

router.post('/createSubscriptionSession', async (req, res) => {
    
})

router.get('/checkoutSessionInfo', async (req, res) => {
    console.log(req.session)

})

module.exports = router;
