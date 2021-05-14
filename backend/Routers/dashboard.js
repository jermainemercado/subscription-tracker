const router = require('express').Router();

function isAuth(req, res, next) {
    console.log(req.user)
    if (req.user) {
        console.log('User logged in')
        next()
    } else { //TODO: bugfix the req.user not showing up here...
        res.redirect('/')
    }
}

router.get('/', isAuth, (req, res) => {
    res.send(200);
})

router.get('/joinserver', isAuth, (req, res) => {
    //TODO: guild.join
})

router.get('/cancelSub', isAuth, (req, res) => {
    //TODO: cancel stripe billing
})

router.get('/logout', isAuth, (req, res) => {
    //TODO: Log user out, delete session variables
})

router.get('/updatePayment', isAuth, (req, res) => {
    //TODO: Change Stripe payment method
})

module.exports = router;