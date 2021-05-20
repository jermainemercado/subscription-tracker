const mongoose = require('mongoose')

/**
 *  Database schema for users
 *  discordId
 *  Username
 *  Link to Avatar
 *  Payment method: Default is stripe/card
 *  Paymentresult: payment id, payment status, update_time, email address,
 *  firstpayment: Date of first payment (stripe api for this)
 * 
 * LicenseKey
 */

const DiscordUserSchema = new mongoose.Schema({
    discordId: { type: String, required: true },
    username: { type: String, required: true },
    avatarLink: { type: String, required: true },
    email: { type: String, required: true },
    discordHash: { type: String, required: true },
    
    paymentEmail: { type: String },
    paymentMethod: { type: String, required: false },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },
    firstPayment: { type: String, default: false },
    nextPayment: { type: String, default: false },
    licenseKey: {type: String, default: 'TK-12345-67890-ABCDE'}
});

const DiscordUser = module.exports = mongoose.model('User', DiscordUserSchema)
