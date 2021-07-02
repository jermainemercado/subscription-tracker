const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const DiscordUser = require('../database/Schemas/discordUser.js');
const stripe = require('stripe')(process.env.STRIPE_API_KEY_SECRET)

// generates a random key from a-z A-Z 0-9
function generateLicenseKey() {
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let key = [];
    //console.log(key)
    for (let i = 0; i < 21; i++) {
        switch (i) {
            case 0:
                key.push('T');
                break;
            case 1:
                key.push('K');
                break;
            case 2 || 8 || 14:
                key.push('-');
                break;
            case 8 :
                key.push('-');
                break;
            case 14:
                key.push('-');
                break;
            default:
                key.push(chars.charAt(Math.floor(Math.random() * chars.length)))
                break;
        }
    }
    var concat = key.join('')
    //console.log(concat)
    return concat;
}

passport.serializeUser((user, done) => {
    console.log("Serializing user")
    done(null, user.id);
})

passport.deserializeUser( async (id, done) => {
    const user = await DiscordUser.findById(id);
    if (user) {
        done(null, user)
    }
})

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `http://ticketkings.io/auth/redirect`,
    scope: ['identify', 'guilds', 'email', 'guilds.join'],
    passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        const user = await DiscordUser.findOne({ discordId: profile.id });
        let avatar = 'https://cdn.discordapp.com/avatars/' + profile.id + '/' + profile.avatar + '.png';
        //console.log(accessToken)
        req.session.token = accessToken;
        
        if (user) {
            done(null, user);
        } else {
            if (req.session.stripe_id) {
                const checkout = await stripe.checkout.sessions.retrieve(
                    req.session.stripe_id,
                )
                const subscription = await stripe.subscriptions.retrieve(
                    checkout.subscription,
                )
                let perEnd = new Date(subscription.current_period_end * 1000);
                let perStart = new Date(subscription.current_period_start * 1000)
            
                const newUser = await DiscordUser.create({
                    discordId: profile.id,
                    username: profile.username,
                    email: profile.email,
                    avatarLink: avatar,
                    discordHash: profile.discriminator,
                    
                    firstPayment: perStart,
                    nextDue: perEnd,

                    stripe_subscription_id: subscription.id,
                    stripe_id: req.session.stripe_id,

                    licenseKey: generateLicenseKey(),
                    lifetimePayment: false,
                })
                const savedUser = await newUser.save();
                done(null, savedUser);
            }
        }
    } catch (err) {
        console.log(err)
        done(err, null);
    }
}))
