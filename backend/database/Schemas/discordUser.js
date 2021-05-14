const mongoose = require('mongoose')

const DiscordUserSchema = new mongoose.Schema({
    discordId: { type: String, required: true },
    username: {type: String, required: true},
});

const DiscordUser = module.exports = mongoose.model('User', DiscordUserSchema)
