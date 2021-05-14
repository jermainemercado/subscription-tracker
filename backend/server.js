// dependencies
require("dotenv").config()
const express = require("express")
const app = express()
const path = require("path")
const root = path.join(__dirname, '../frontend/build')
const port = process.env.PORT || 5000;
const session = require('express-session');
const passport = require('passport');
const discordStrategy = require('./strategies/discordstrat.js');
const db = require('./database/database.js');

db.then(() => console.log('Connected to MongoDB')).catch(err => console.log(err))

app.use(passport.initialize());
app.use(passport.session());
// Routers
const authRoute = require('./Routers/auth.js');

// Middleware
app.use(express.static(root))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/auth', authRoute);
app.use(session({
    secret: 'secretgoeshere',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false
}))

app.get('*', (req, res) => {
    res.sendFile('index.html', {root})
})

app.get('/dashboard', (req, res) => {
    
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
