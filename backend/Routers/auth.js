/* eslint-disable prettier/prettier */
require('dotenv').config()
const router = require('express').Router();
const passport = require('passport');

router.get('/', passport.authenticate('discord'));

// eslint-disable-next-line prettier/prettier
router.get('/redirect', passport.authenticate('discord', {
    failiureRedirect: '/forbidden',
    successRedirect: '/dashboard',
}), (req, res) => {
    res.send(req.user);
})

module.exports = router;
