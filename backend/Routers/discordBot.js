const fetch = require('node-fetch');
const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_API_KEY_SECRET);
const DiscordUser = require('../database/Schemas/discordUser.js');

router.get('/joinDiscord', async (req, res) => {
    try {
        if (req.query.paymentInfo === 'paid') {
            let curUser = await DiscordUser.findOne({discordId: req.query.user});
            if (curUser !== null) {
                console.log(curUser);

                await fetch(`https://discord.com/api/v8/guilds/${process.env.REACT_APP_GUILD_ID}/members/${curUser.discordId}`, 
                {
                    method: 'PUT',
                    headers: {
                        "Authorization": `Bot ${process.env.BOT_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "access_token": req.query.accessToken,
                        "roles": [process.env.REACT_APP_ROLE_ID, ]
                    })
                }).then(res => {
                    console.log(res);
                    return res.json();
                })
                .then(json => {
                    res.send(json);
                }).catch(err => { 
                    console.log(err.headers.headers);
                    res.send(err);
                });

                // await fetch(`https://discord.com/api/v8/guilds/${process.env.REACT_APP_GUILD_ID}/members/${curUser.discordId}/roles/${process.env.REACT_APP_ROLE_ID}`,
                // {
                //     method: 'PUT',
                //     headers: {
                //         "Authorization": `Bot ${process.env.BOT_TOKEN}`,
                            // "Content-Type": "application/json",
                //     }
                // })
            }
        }
    }
//     .then(res => {
//         console.log(res);
//         return res.json()
//     })
//     .then((json) => {
//         const Member = json.find(findMember);
//         roleID = Member.id;
//     })
//     .catch(err => console.log(err));

//     await fetch(`https://discord.com/api/v8/guilds/${process.env.GUILD_ID}/members/${user.id}`, {
//         method: 'PUT',
//         headers: {
//             "Authorization": `Bot ${process.env.BOT_TOKEN}`,
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             "access_token": token,
//             "roles": [roleID, ]
//         }),
//     })
// .then((json) => {
//         console.log("added to Discord", json);
//     })
//     .catch(err => console.log(err));

//     await fetch(`https://discord.com/api/v8/guilds/${process.env.GUILD_ID}/members/${user.id}/roles/${roleID}`, {
//         method: 'PUT',
//         headers: {
//             "Authorization": `Bot ${process.env.BOT_TOKEN}`,
//             "Content-Type": "application/json",
//         },
//     }).catch(err => console.log(err));
    catch (error) {
        console.log(error);
        res.send(error);
    }
    res.end();
}) 
module.exports = router;