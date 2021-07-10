// dependencies
require("dotenv").config()
const express = require("express")
const app = express()
const path = require("path")
const root = path.join(__dirname, '../build')
const port = process.env.PORT || 5000;
const session = require('express-session');
const passport = require('passport');
const discordStrategy = require('./strategies/discordstrat.js');
const db = require('./database/database.js');
const stripe = require('stripe')(process.env.STRIPE_KEY_SECRET)
const sslRedirect = require('heroku-ssl-redirect');


db.then(() => console.log('Connected to MongoDB')).catch(err => console.log(err))

// Middleware
app.use(sslRedirect());
app.use(express.static(root))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routers
const authRoute = require('./Routers/auth.js');
const dashboardRoute = require('./Routers/dashboard.js');
const paymentRoute = require('./Routers/payments.js');
const discordRoute = require('./Routers/discordBot.js');

app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 60000 * 60 * 24,
        httpOnly: false,
    },
    saveUninitialized: false,
    name: 'discord.oauth2',
}))

// headers
app.use((req, res, next) => {
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Origin', process.env.ROOT_DOMAIN)
    next()
})



// if (process.env.NODE_ENV === 'production') {
//     app.use((req, res, next) => {
//         if (req.header('x-forwarded-proto') !== 'https') {
//             res.redirect(`https://${req.header('host')}${req.url}`)
//         }
//         else {
//             next()
//         }
//     })
// }

// passport/session
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute)
app.use('/payment', paymentRoute);
app.use('/discordBot', discordRoute);
app.get('*', (req, res) => {
    res.sendFile('index.html', {root})
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
    console.log(root);
})