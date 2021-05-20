const router = require('express').Router();

let loggedIn = false;

function isAuth(req, res, next) {
    if (req.user) {
        console.log('User logged in')
        next()
    } else { //TODO: bugfix the req.user not showing up here...
        console.log('User not logged in')
        res.redirect('/auth')
        next()
    }
}

router.get('/getInfo', isAuth, (req, res) => {
    res.send(req.user)
})

router.get('/joinserver', isAuth, (req, res) => {
    //TODO: guild.join
})

router.get('/cancelSub', isAuth, (req, res) => {
    //TODO: cancel stripe billing
})

router.get('/logout', isAuth, (req, res) => {
    req.session.destroy();
    res.redirect('/')
})

router.get('/updatePayment', isAuth, (req, res) => {
    //TODO: Change Stripe payment method
})

module.exports = router;
