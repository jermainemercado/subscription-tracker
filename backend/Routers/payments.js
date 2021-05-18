const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_API_KEY)

router.post('/createCheckoutSession', async (req, res) => {
    console.log('creating stripe session')
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Lifetime subscription',
                        },
                        unit_amount: 60,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: "localhost:3000/dashboard",
            cancel_url: "localhost:3000",
        });
        res.json({ id: session.id })
        //console.log(res)
    } catch (err) {
        console.log(err.message)
    }
    
})

module.exports = router;
