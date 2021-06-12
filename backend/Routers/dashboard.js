const router = require('express').Router();
const session = require('express-session');
let loggedIn = false;
const path = require("path")
const root = '../../build'

function isAuth(req, res, next) {
    if (req.user && req.user !== null) {
        //console.log('User logged in')
        next()
    } else {
        //console.log('User not logged in')
        res.redirect('/auth')
    }
}

router.get('/', isAuth, (req, res) => {
    res.status(200).sendFile('index.html', {root})
})

router.get('/getInfo', isAuth, (req, res) => {
    //console.log(req.user)
    let userInfo = req.user
    let accessToken = req.session.token;
    //console.log(req.session.token)
    res.send({userInfo: userInfo, accessToken: accessToken})
})

router.get('/logout', isAuth, (req, res) => {
    if (req.user) {
        req.session.destroy(function (err) {
            if (err) return console.log(err)
            return;
        });
        req.logout();
        res.redirect('/')
    } else {
        res.redirect('/')
    }
})

module.exports = router;
