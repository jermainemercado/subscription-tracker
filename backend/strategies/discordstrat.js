/* eslint-disable prettier/prettier */
const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const DiscordUser = require('../database/Schemas/discordUser.js');
const stripe = require('stripe')(process.env.STRIPE_KEY_SECRET)

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
    console.log("Serializing user");
    done(null, user.id);
})

passport.deserializeUser( async (id, done) => {
    const user = await DiscordUser.findById(id);
    if (user) {
        done(null, user);
    }
})

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${process.env.ROOT_DOMAIN}${process.env.CLIENT_REDIRECT}`,
    scope: ['identify', 'guilds', 'email', 'guilds.join'],
    passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        const user = await DiscordUser.findOne({ discordId: profile.id });
        let avatar = 'https://cdn.discordapp.com/avatars/' + profile.id + '/' + profile.avatar + '.png';
        //console.log(accessToken)
        req.session.token = accessToken;
        let perEnd;
        let perStart;

        let subscription;
        let stripe_id;
        let stripe_sub_id;
        let checkout;

        console.log(req.session.stripe_id);
        if (req.session.stripe_id) {
            checkout = await stripe.checkout.sessions.retrieve(
                req.session.stripe_id,
            );
            subscription = await stripe.subscriptions.retrieve(
                checkout.subscription,
            );
            perEnd = new Date(subscription.current_period_end * 1000);
            perStart = new Date(subscription.current_period_start * 1000);
            stripe_sub_id = (subscription.id !== null && subscription.id !== undefined) ? subscription.id : null;
            stripe_id = (req.session.stripe_id !== null && req.session.stripe_id !== undefined) ? req.session.stripe_id : null;
        }
        if (user) {
            console.log(user);
            user.firstPayment = (perStart !== null && perStart !== undefined) ? perStart : user.firstPayment;
            user.nextDue = (perEnd !== null && perEnd !== undefined) ? perEnd : user.nextDue;
            user.stripe_subscription_id = (stripe_sub_id !== null && stripe_sub_id !== undefined) ? stripe_sub_id : user.stripe_subscription_id;
            user.stripe_id = (stripe_id !== null && stripe_id !== undefined) ? stripe_id : user.stripe_id;
            const updatedUser = await user.save();
            done(null, updatedUser);
        } else {
            if (req.session.stripe_id) {
                checkout = await stripe.checkout.sessions.retrieve(
                    req.session.stripe_id,
                );
                subscription = await stripe.subscriptions.retrieve(
                    checkout.subscription,
                );
                perEnd = new Date(subscription.current_period_end * 1000);
                perStart = new Date(subscription.current_period_start * 1000);
            }

            const newUser = await DiscordUser.create({
                discordId: profile.id,
                username: profile.username,
                email: profile.email,
                avatarLink: avatar,
                discordHash: profile.discriminator,
                
                firstPayment: (perStart !== null && perStart !== undefined) ? perStart : null,
                currentPayment: (perStart !== null && perStart !== undefined) ? perStart : null,
                nextDue: (perEnd !== null && perEnd !== undefined) ? perEnd : null,

                stripe_subscription_id: (stripe_sub_id !== null && stripe_sub_id !== undefined) ? stripe_sub_id : null,
                stripe_id: (stripe_id !== null && stripe_id !== undefined) ? stripe_id : null,
                licenseKey: generateLicenseKey(),
                lifetimePayment: false,
            })
            const savedUser = await newUser.save();
            done(null, savedUser);
        }
    } catch (err) {
        done(err, null);
    }
}))
