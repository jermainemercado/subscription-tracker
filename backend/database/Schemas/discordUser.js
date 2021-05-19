const mongoose = require('mongoose')

/**
 *  Database schema for users
 *  discordId
 *  Username
 *  Payment method: Default is stripe/card
 *  Paymentresult: payment id, payment status, update_time, email address,
 *  firstpayment: Date of first payment
 *  nextPayment: optional (requires additional updating within the database)
 */

const DiscordUserSchema = new mongoose.Schema({
    discordId: { type: String, required: true },
    username: { type: String, required: true },
    paymentMethod: { type: String, required: false },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },
    firstPayment: { type: String, default: false },
    nextPayment: { type: String, default: false },
});

const DiscordUser = module.exports = mongoose.model('User', DiscordUserSchema)
