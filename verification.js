const pm = require('pretty-ms');
const Discord = require('discord.js');
    
    message.author.send({embed: {  
        color: 0xBF0000, // Darkish Red
        title: `**Fluffy Abyss New Member Verification**`,
        description: ":heart: Thank you so much for being interested in joining our server! Please answer the following questions IN THE DMS below so we can grant you the full server access.",
        thumbnail: {
            url: 'https://images-ext-1.discordapp.net/external/rEELPeasBE83nE-e6IefH6G9xWwD7qj5gPzTXucX8aE/https/i.imgur.com/ipz62zD.png?width=450&height=473', // Original Image sent to new users
        },
        }}).catch(() => { // If unable to send message to user
            message.channel.send(`I am unable to send a message to you! You either must open your DMs to servers you're in, or unblock this bot.`)
            return;
        })
    
    .then(msg => {
        message.channel.send(`Check your DMs!`)
        .then(del => {
            del.delete({ timeout: 10000 })
            message.delete()
            // Delete the reply and the command message after 10 seconds
        })
        msg.channel.send({embed: {
            color: 0xBF0000,
            title: `:orange_heart: **Question 1**`,
            description: "Where did you find this server?",
            }})
        .then(() => {
            msg.channel.awaitMessages(response => response.content, {
                max: 1,
            })
            .then((collected) => {
                if (collected.first().content) {
                    var answer1 = `${collected.first().content}` // Logs the replies
                    message.author.send({embed: {
                        color: 0xBF0000,
                        title: `:yellow_heart: Question 2`,
                        description: "How old are you? (Will only accept whole numbers)",
                        }})
                    .then(() => {
                        msg.channel.awaitMessages(response => !isNaN(response.content) , { // Only works if user sends a number
                            max: 1,
                        })
                        .then((collected) => {
                            if (collected.first().content) {
                                var answer2 = `${collected.first().content}`
                                const msg3 = message.author.send({embed: {
                                    color: 0xBF0000,
                                    title: `:green_heart: Question 3`,
                                    description: "Are you a furry? If you are, what is your sona? (Do not worry, non-furries are welcome too!)",
                                    }})
                                .then(msg3 => {
                                    msg.channel.awaitMessages(response => response.content, {
                                        max: 1,
                                    })
                                    .then((collected) => {
                                        if (collected.first().content) {
                                            var answer3 = `${collected.first().content}`
                                            const msg4 = message.author.send({embed: {
                                                color: 0xBF0000,
                                                title: `:blue_heart: Question 4`,
                                                description: "Have you read all of the rules?",
                                                }})
                                            .then(msg4 => {
                                                msg.channel.awaitMessages(response => response.content, {
                                                    max: 1,
                                                })
                                                .then((collected) => {
                                                    if (collected.first().content) {
                                                        var answer4 = `${collected.first().content}`
                                                    msg.channel.send({embed: {
                                                        color: 0xBF0000,
                                                        title: `${message.author.tag}'s New Member Verification`,
                                                        thumbnail: {
                                                            url: `${message.author.avatarURL()}`,
                                                        },
                                                        fields: [
                                                            {
                                                                name: ":orange_heart: Where did you find this server?",
                                                                value: `${answer1}`,
                                                            },
                                                            {
                                                                name: ":yellow_heart: How old are you?",
                                                                value: `${answer2}`,
                                                            },
                                                            {
                                                                name: ":green_heart: Are you a furry?",
                                                                value: `${answer3}`,
                                                            },
                                                            {
                                                                name: ":blue_heart: Have you read all of the rules?",
                                                                value: `${answer4}`,
                                                            },
                                                                ]
                                                        }})
                                                        let now = Date.now();
                                                        let createdAt = message.author.createdTimestamp;
                                                        let age = now - createdAt;
                                                        // Finds and says how long ago their account was created
                                                        
                                                        message.client.channels.cache.get('MOD LOG/CHAT ID').send({embed: {
                                                            color: 0xBF0000,
                                                            title: `${message.author.tag}'s New Member Verification`,
                                                            description: `**User Profile:** ${message.author}\n**Acc. Creation:** ${pm(age, {verbose: false})} ago.`,
                                                            thumbnail: {
                                                                url: `${message.author.avatarURL()}`,
                                                            },
                                                            fields: [
                                                                {
                                                                    name: ":orange_heart: Where did you find this server?",
                                                                    value: `${answer1}`,
                                                                },
                                                                {
                                                                    name: ":yellow_heart: How old are you?",
                                                                    value: `${answer2}`,
                                                                },
                                                                {
                                                                    name: ":green_heart: Are you a furry?",
                                                                    value: `${answer3}`,
                                                                },
                                                                {
                                                                    name: ":blue_heart: Have you read all of the rules?",
                                                                    value: `${answer4}`,
                                                                },
                                                                    ],
                                                                footer: {
                                                                    text: `User ID: ${message.author.id}`
                                                                }
                                                            }})

                                                        msg.channel.send({embed: {
                                                            color: 0xBF0000,
                                                            description: `All of this information has been send to the moderators. If no one answers in less than 30 minutes, ping a moderator in <#741433237695627308>.`,
                                                        }})
                                                    }
                                                })
                                            })
                                        }
                                    })
                                })
                                
                            }
                        })
                    })
                    
                }
            })
        })
    })