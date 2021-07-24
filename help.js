const Discord = require('discord.js');
const bot = new Discord.Client();

module.exports = {
    name: 'help',

    execute(message) {
        function help() {
            message.react('👍')
            var usermember = message.guild.member(message.author.id)
      
            var chance = Math.floor(Math.random() * 5)
      
            if (chance == 3 && usermember.guild.id != '766865610943496253') {
              message.author.send(`Are you confused about a command? Join this server for some quick help! https://discord.gg/7jyVxc8`).catch(() => {
              message.channel.send({
                embed: {
                  color: 0xff0000,
                  title: `Command Failure`,
                  description: `I can't put it in here! It's far too huge.\n\`\`\`diff\n- Unable to send author a message.\`\`\``,
                  footer: {
                    text: `${message.author.tag}`,
                    icon_url: `${message.author.avatarURL()}`,
                  },
                }
              })
              message.react(`❌`)
              message.reactions.removeAll().catch(() => { return })
              return;
            })
            }
            var page = 1
      
            let page1 = ({
              embed: {
                color: 0x255940,
                title: `**__Basic Commands__**`,
                description: `() *Not Required*\n[] *Required*\n\nReact and unreact to turn the page either left or right.`,
                fields: [
                  {
                    name: `${PREFIX}botinfo (ping/invite/description)`,
                    value: `View the bot's information. \`j-botinfo\` just gives you the bots plain information.`,
                  },
                  {
                    name: `${PREFIX}holiday`,
                    value: `Gives you a countdown until December 25th, followed by an paroday of the 12 days 'til Christmas (25 days 'til Holidays).`,
                  },
                  {
                    name: `${PREFIX}info (@user/User ID/server)`,
                    value: `Get in-depth (availble) info on the mentioned user or the server you're currently in.`
                  },
                ],
                footer: {
                  text: `Page 1/3`
                }
              }
            })
      
            let page2 = ({
              embed: {
                color: 0x422422,
                title: `**__Economy Commands__**`,
                description: `Economy Commands are not working, proving to be a pain the the rear quaters.`,
                footer: {
                  text: `Page 2/3`
                }
              }
            })
      
            let page3 = ({
              embed: {
                color: 0x222242,
                title: `**Extras**`,
                description: `() *Not Required*\n\nReact and unreact to turn the page either left or right.`,
                fields: [
                  {
                    name: `${PREFIX}rps @user`,
                    value: `Asks another user to play Rock Paper Scissors with you.`,
                  },
                  {
                    name: `${PREFIX}hangman (#/words)`,
                    value: `Challenge the readers in the channel to a game of hangman. # (a number) means the max length of the words (most usefull with 1-4 characters). (words) just allow to you make your own phrase, sentence, or word to play.`,
                  },
                  {
                    name: `${PREFIX}urban word`,
                    value: `(Mostly NSFW) Search the Urban Dictionary for specifc words or phrases.`,
                  },
                ],
                footer: {
                  text: `Page 3/3`
                }
              }
            })
      
            message.author.send(page1).catch(() => {
              message.channel.send({
                embed: {
                  color: 0xff0000,
                  title: `Command Failure`,
                  description: `Oh no, a road blockage!\n\`\`\`diff\n- Unable to send author a message.\`\`\``,
                  footer: {
                    text: `${message.author.tag}`,
                    icon_url: `${message.author.avatarURL()}`,
                  },
                }
              })
              message.react(`❌`)
              message.reactions.removeAll().catch(() => { return })
              return;
            })
              .then(m => {
                function pageTurn() {
      
                  if (page == 1) {
                    m.edit(page1).catch(() => {
                      message.channel.send(`An error has occurred.`)
                      message.react(`❌`)
                      message.reactions.removeAll().catch(() => { return })
                      return;
                    })
                      .then(msg => {
                        msg.react('⬅').then(() => { msg.react(`➡`) })
                        const filter = (reaction, user) => {
                          return ['⬅', '➡'].includes(reaction.emoji.name) && user.id === message.author.id;
                        };
      
                        msg.awaitReactions(filter, { max: 1 })
                          .then(collected => {
                            const reaction = collected.first()
                            if (reaction.emoji.name === '⬅') {
                              page = 3
                              pageTurn()
                            } else {
                              page = 2
                              pageTurn()
                            }
                          })
                      })
                  }
      
                  if (page == 2) {
                    m.edit(page2).catch(() => {
                      message.channel.send(`An error has occurred.`)
                      message.react(`❌`)
                      message.reactions.removeAll().catch(() => { return })
                      return;
                    })
                      .then(msg => {
                        msg.react('⬅').then(() => { msg.react(`➡`) })
                        const filter = (reaction, user) => {
                          return ['⬅', '➡'].includes(reaction.emoji.name) && user.id === message.author.id;
                        };
      
                        msg.awaitReactions(filter, { max: 1 })
                          .then(collected => {
                            const reaction = collected.first()
                            if (reaction.emoji.name === '⬅') {
                              page = 1
                              pageTurn()
                            } else {
                              page = 3
                              pageTurn()
                            }
                          })
                      })
      
                  }
      
                  if (page == 3) {
                    m.edit(page3).catch(() => {
                      message.channel.send(`An error has occurred.`)
                      message.react(`❌`)
                      message.reactions.removeAll().catch(() => { return })
                      return;
                    })
                      .then(msg => {
                        msg.react('⬅').then(() => { msg.react(`➡`) })
                        const filter = (reaction, user) => {
                          return ['⬅', '➡'].includes(reaction.emoji.name) && user.id === message.author.id;
                        };
      
                        msg.awaitReactions(filter, { max: 1 })
                          .then(collected => {
                            const reaction = collected.first()
                            if (reaction.emoji.name === '⬅') {
                              page = 2
                              pageTurn()
                            } else {
                              page = 1
                              pageTurn()
                            }
                          })
                      })
      
                  }
      
                }
                m.react('⬅').then(() => { m.react(`➡`) })
                const filter = (reaction, user) => {
                  return ['⬅', '➡'].includes(reaction.emoji.name) && user.id === message.author.id;
                };
      
                m.awaitReactions(filter, { max: 1 })
                  .then(collected => {
                    const reaction = collected.first()
                    if (reaction.emoji.name === '⬅') {
                      page = 3
                      pageTurn()
                    } else {
                      page = 2
                      pageTurn()
                    }
                  })
              })
        }

        help()
    }
}