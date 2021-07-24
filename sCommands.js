const Discord = require('discord.js');
const bot = new Discord.Client();
const urban = require("relevant-urban")
const randomWords = require(`random-words`)
const pm = require('pretty-ms');
const sentver = new Set();

//URBAN
bot.api.applications('815272046060634112').guilds('815099824491724801').commands.post({
    data: {
      name: "urban",
      description: `Search the Urban Dictionary for a word or phrase.`,
      options: [
          {
              name: "words",
              description: `Your search query.`,
              type: 3,
              required: true
          }
      ]
    }
})

// RPS
bot.api.applications('815272046060634112').guilds('815099824491724801').commands.post({
  data: {
    name: "rps",
    description: `Play Rock Paper Scissors with another user.`,
    options: [
        {
            name: "opponent",
            description: `A user to play RPS with.`,
            type: 6,
            required: true
        }
    ]
  }
})

// HELP
bot.api.applications('815272046060634112').guilds('815099824491724801').commands.post({
  data: {
    name: "help",
    description: `Grants a complete list of commands on this bot.`,
  }
})

// HANGMAN
bot.api.applications('815272046060634112').guilds('815099824491724801').commands.post({
  data: {
    name: "hangman",
    description: `Play a game of hangman with anyone in chat.`,
    options: [
        {
            name: "phrase",
            description: `A custom word or phrase for users in chat to guess.`,
            type: 3,
            required: false
        },
        {
          name: "amount",
          description: `Amount of RANDOM words in the hangman game. Default 1.`,
          type: 4,
          required: false
        },
        {
          name: "tries",
          description: `Amount of tries to guess. Cannot exceed 26. 0 for infinite.`,
          type: 4,
          required: false
        },
    ]
  }
})

// INFO
bot.api.applications('815272046060634112').guilds('815099824491724801').commands.post({
  data: {
    name: "info",
    description: `Get information of a user, server, or bot.`,
    options: [
        {
            name: "user",
            description: `Ping User or insert ID to find the user's info.`,
            type: 6,
            required: false
        },
    ]
  }
})

//VERIFY
bot.api.applications('815272046060634112').guilds('815099824491724801').commands.post({
  data: {
    name: "verify",
    description: `Get verified into the server.`,
  }
})

bot.ws.on('INTERACTION_CREATE', async interaction => {
    const command = interaction.data.name.toLocaleLowerCase();
    
    if (command == 'help') {
      var page = 1
      const author = bot.users.cache.get(interaction.member.user.id)
      const channel = bot.channels.cache.get(interaction.channel_id)

      await bot.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 5,
        }
      })

      let page1 = ({
        embed: {
          color: 0x255940,
          title: `**__Basic Commands__**`,
          description: `() *Not Required*\n[] *Required*\n\nReact and unreact to turn the page either left or right.`,
          fields: [
            {
              name: `/eval`,
              value: `Runs JavaScript code from Discord (Required Administrator)`,
            },
            {
              name: `/info (@user/User ID)`,
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
          title: `**Admin Commands**`,
          description: `Coming Soon.`,
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
              name: `/rps @user`,
              value: `Asks another user to play Rock Paper Scissors with you.`,
            },
            {
              name: `/hangman (#/words)`,
              value: `Challenge the readers in the channel to a game of hangman. # (a number) means the max length of the words (most usefull with 1-4 characters). (words) just allow to you make your own phrase, sentence, or word to play.`,
            },
            {
              name: `/urban word`,
              value: `(Mostly NSFW) Search the Urban Dictionary for specifc words or phrases.`,
            },
          ],
          footer: {
            text: `Page 3/3`
          }
        }
      })

      author.send(page1).catch(async() => {
        channel.send({
          embed: {
            color: 0xff0000,
            title: `Command Failure`,
            description: `Oh no, a road blockage!\n\`\`\`diff\n- Unable to send author a message.\`\`\``,
            footer: {
              text: `${author.tag}`,
              icon_url: `${author.avatarURL()}`,
            },
          }
        })
        return;
      })
        .then(m => {
          function pageTurn() {

            if (page == 1) {
              m.edit(page1).catch(async() => {
                  await bot.api.interactions(interaction.id, interaction.token).callback.post({
                      data: {
                        type: 5,
                      }
                    })
                channel.send(`An error has occurred.`)
                return;
              })
                .then(msg => {
                  msg.react('⬅').then(() => { msg.react(`➡`) })
                  const filter = (reaction, user) => {
                    return ['⬅', '➡'].includes(reaction.emoji.name) && user.id === author.id;
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
              m.edit(page2).catch(async() => {
                  await bot.api.interactions(interaction.id, interaction.token).callback.post({
                      data: {
                        type: 5,
                      }
                    })
                channel.send(`An error has occurred.`)
                return;
              })
                .then(msg => {
                  msg.react('⬅').then(() => { msg.react(`➡`) })
                  const filter = (reaction, user) => {
                    return ['⬅', '➡'].includes(reaction.emoji.name) && user.id === author.id;
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
              m.edit(page3).catch(async() => {
                  await bot.api.interactions(interaction.id, interaction.token).callback.post({
                      data: {
                        type: 5,
                      }
                    })
                channel.send(`An error has occurred.`)
                return;
              })
                .then(msg => {
                  msg.react('⬅').then(() => { msg.react(`➡`) })
                  const filter = (reaction, user) => {
                    return ['⬅', '➡'].includes(reaction.emoji.name) && user.id === author.id;
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

          if (m != undefined) {
              m.react('⬅')
          .then(() => { m.react(`➡`) })
          const filter = (reaction, user) => {
            return ['⬅', '➡'].includes(reaction.emoji.name) && user.id === author.id;
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
          }

        })
    }

    if (command == 'urban') {
      const notargs = interaction.data.options;
      const stillnotargs = notargs.find(arg => arg.name.toLocaleLowerCase() == "words")
      const channel = bot.channels.cache.get(interaction.channel_id)
      const author = bot.users.cache.get(interaction.member.user.id)

      if (stillnotargs) {
        var args = stillnotargs.value
      } else {
        return channel.send({
          embed: {
            color: 0xff0000,
            title: `Command Failure`,
            description: `The optional info requires...info.\n\`\`\`diff\n- Insufficient optional funds.\`\`\``,
            footer: {
                text: `${author.tag}`,
                icon_url: `${author.avatarURL()}`,
              },
          }
        })
      }

      if (args.length > 2000) args = 'Too long'

      bot.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 5,
        }
      })

        var failed = 0
  
        const result = await urban(args.toLocaleLowerCase()).catch(e => {
          failed = 1
          channel.send({
            embed: {
              color: 3447003,
              title: `¯\\_(ツ)_/¯\nSorry, we couldn't find: ${args}`,
              description: `Try \`${PREFIX}urban butter\`\n\nThere are no definitions for [this word](https://www.urbandictionary.com/define.php?term=${args.replace(/ /g, '+')}).\n[Be the first to define it!](https://www.urbandictionary.com/add.php?word=${args.replace(/ /g, '+')})`
            }
          })
  
          return;
        })
  
            if (failed == 0) {
              var editedDef = result.definition.replace(/\[/g, "");
              var def = editedDef.replace(/\]/g, "");
      
              var editedEx = result.example.replace(/\[/g, "");
              var ex = editedEx.replace(/\]/g, "");
      
              var urlResult = (result.urbanURL).replace(/ /g, '+');
      
              var authorLink = (`https://www.urbandictionary.com/author.php?author=${result.author}`).replace(/ /g, "_")
      
              if (def.length > 1024) def = `([Too long](${urlResult}))`
              if (def.length == 0) def = `(None)`
              if (ex.length > 1024) ex = `([Too long](${urlResult}))`
              if (ex.length == 0) ex = `(None)`

              if (args.length > 1024 || result.word.length > 1024 || result.word.length == 0) return channel.send({
                embed: {
                  color: 0xff0000,
                  title: `Command Failure`,
                  description: `Um...the word found is too long...\n\`\`\`diff\n- Defined word exceeds limit (1024)\`\`\``,
                  footer: {
                    text: `${author.username}`,
                  },
                }
              })
      
      
              channel.send({
                embed: {
                  color: 3447003,
                  title: `Urban Dictionary Search: ${args}`,
                  description: `Word: [${result.word}](${urlResult})\nAuthor: [${result.author}](${authorLink})`,
                  fields: [
                    {
                      name: `__Definition:__`,
                      value: `${def}`,
                    },
                    {
                      name: `__Example:__`,
                      value: `${ex}`,
                    },
                    {
                      name: `__Rating:__`,
                      value: `${result.thumbsUp} 👍 | ${result.thumbsDown} 👎`,
                    },
                  ],
                  footer:
                  {
                    text: `UID: ${result.id}`,
                  }
                }
              })
                .then(m => {
                  m.react(`👍`).then(() => { m.react(`👎`) })
                  const filter = (reaction, user) => {
                    return ['👍', '👎'].includes(reaction.emoji.name) && user.id === author.id;
                  };
      
      
                  m.awaitReactions(filter, { max: 1 })
                    .then(collected => {
                      const reaction = collected.first();
      
                      if (reaction.emoji.name === '👍') {
                        m.edit({
                          embed: {
                            color: 3447003,
                            title: `Urban Dictionary Search: ${args}`,
                            description: `Word: [${result.word}](${urlResult})\nAuthor: [${result.author}](${authorLink})`,
                            fields: [
                              {
                                name: `__Definition:__`,
                                value: `${def}`,
                              },
                              {
                                name: `__Example:__`,
                                value: `${ex}`,
                              },
                              {
                                name: `__Rating:__`,
                                value: `${result.thumbsUp + 1} 👍 | ${result.thumbsDown} 👎`,
                              },
                            ],
                            footer:
                            {
                              text: `UID: ${result.id}`,
                            }
                          }
                        })
                      } else {
                        m.edit({
                          embed: {
                            color: 3447003,
                            title: `Urban Dictionary Search: ${args}`,
                            description: `Word: [${result.word}](${urlResult})\nAuthor: [${result.author}](${authorLink})`,
                            fields: [
                              {
                                name: `Definition:`,
                                value: `${def}`,
                              },
                              {
                                name: `Example:`,
                                value: `${ex}`,
                              },
                              {
                                name: `Rating:`,
                                value: `${result.thumbsUp} 👍 | ${result.thumbsDown + 1} 👎`,
                              },
                            ],
                            footer:
                            {
                              text: `UID: ${result.id}`,
                            }
                          }
                        })
      
                      }
      
                    }).catch(() => {return})
      
                })
            }
    }

    if (command == 'rps') {
      const opponent = bot.users.cache.get((Object.values(interaction.data.options[0])[0]).toString())
      const author = bot.users.cache.get(interaction.member.user.id)
      const channel = bot.channels.cache.get(interaction.channel_id)

      var answersq = 0
      var count = 0

      if (opponent.bot) return channel.send({
        embed: {
          color: 0xff0000,
          title: `Command Failure`,
          description: `Sorry, but my friend ${opponent.username} doesn't wanna play right now. Plus, they go unbeaten.\n\`\`\`diff\n- Cannot play with bots.\`\`\``,
          footer: {
            text: `${author.username}`,
          },
        }
      })

      function waitlongertimer() {
          setTimeout(() => {
              if (answersq != 30 && count < 60) {
                  waitlongertimer()
                  count += 1
                  return;
              }
  
              if (oppoption && authoption) {
                  if (authoption == oppoption && authoption == 'None') return channel.send(`Wow, ${author} nor ${opponent} even picked. What a sad game.`)
                  if (authoption == oppoption) { 
                      var result = 'Uh oh, it was a tie! Nobody'
                      var loser = undefined
                      var color = 0x494949
                  }
                  if (authoption == 'None') {
                    var result = `${author.username} didn't even pick! **${opponent.username}**`
                    var winner = `**${opponent}**`
                    var loser = author
                    var color = 0xe3ff00
                  }
                  if (oppoption == 'None') { 
                    var result = `${opponent.username} didn't even pick! **${author.username}**`
                    var winner = `**${author}**`
                    var loser = opponent
                    var color = 0x38ff00
                  }
  
                  if (authoption == 'Rock' && oppoption == 'Scissors') { 
                      var result = `**${author.username}**`
                      var winner = `**${author}**`
                      var loser = opponent
                      var color = 0x000000
                  }
                  if (authoption == 'Paper' && oppoption == 'Rock') {
                      var result = `**${author.username}**`
                      var winner = `**${author}**`
                      var loser = opponent
                      var color = 0xffffff
                  }
                  if (authoption == 'Scissors' && oppoption == 'Paper') {
                      var result = `**${author.username}**`
                      var winner = `**${author}**`
                      var loser = opponent
                      var color = 0x00ceff
                  }
  
                  if (oppoption == 'Paper' && authoption == 'Rock') {
                      var result = `**${opponent.username}**`
                      var winner = `**${opponent}**`
                      var loser = author
                      var color = 0xffffff
                  }
                  if (oppoption == 'Rock' && authoption == 'Scissors') {
                      var result = `**${opponent.username}**`
                      var winner = `**${opponent}**`
                      var loser = author
                      var color = 0x000000
                  }
                  if (oppoption == 'Scissors' && authoption == 'Paper') {
                      var result = `**${opponent.username}**`
                      var winner = `**${opponent}**`
                      var loser = author
                      var color = 0x00ceff
                  }
                  if (color == undefined) {
                      color = 0xff3b00
                  }
                  setTimeout(() => { const msg = channel.send({embed: {
                      color: color,
                      title: `The Score: **${authoption}** to **${oppoption}**!`,
                      description: `${author.username} picked: **${authoption}**\n${opponent.username} picked: **${oppoption}**\n\n${result} won!`,
                    }
                  })
               }, 1500)
                  setTimeout(() => { if (loser != undefined) channel.send(`Well done, ${winner}!\nTough luck, ${loser}.`) }, 1600)
                  setTimeout(() => { if (loser == undefined) channel.send(`Well done ${author} and ${opponent}! You both managed to lose!`) }, 1600)
              } else {
                  if (authoption == undefined) {
                      channel.send(`There was a small error from ${author}'s response. Try the match again.`)
                  }
                  if (oppoption == undefined) {
                      channel.send(`There was a small error from ${opponent}'s response. Try the match again.`)
                  }
                  return;
              }
              
          }, 500)
      }

      if (!opponent) return channel.send({embed: {
          color: 0xff0000,
          title: `Command Failure`,
          description: `You need an opponent! Can't challenge nobody!\n\`\`\`diff\n- Insufficient Arguments (no mentions)\`\`\``,
          footer: {
              text: `${author.tag}`,
              icon_url: `${author.avatarURL()}`,
          },
        }})
      if (opponent == author) return channel.send({embed: {
          color: 0xff0000,
          title: `Command Failure`,
          description: `Can't go against yourself, buddy.  You ain't that lonely...\n\`\`\`diff\n- User mentioned in command\`\`\``,
          footer: {
              text: `${author.tag}`,
              icon_url: `${author.avatarURL()}`,
          },
        }})
      if (opponent.id == "815272046060634112") {
          bot.api.interactions(interaction.id, interaction.token).callback.post({
              data: {
                type: 4,
                data: {
                  content: `Sorry, I go unbeaten. I'd just hurt your wimpy human feelings.`
                }
              }
            })
          return;
      }
      var oppoption = undefined
      var authoption = undefined

      await bot.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: {
              content: `<@${opponent.id}>`
            }
          }
        })
        
      channel.send({embed: {
          color: 0xff3b00,
          title: `**${opponent.username}**, you are being challenged to a Rock Paper Scissors battle by **${author.username}**!`,
          description: `To accept or decline, type Accept or Reject. To cancel, type Cancel.`,
        }
      })
      .then(msg => {
          msg.delete({ timeout: 60000 })
      channel.awaitMessages(response => response.content.toLocaleLowerCase() == 'accept' && response.author == opponent || response.content.toLocaleLowerCase() == 'reject' && response.author == opponent || response.content.toLocaleLowerCase() == 'cancel' && response.author == author || response.content.toLocaleLowerCase() == 'decline' && response.author == opponent, {
          max: 1,
          time: 60000,
          errors: ['time'],
      })
      .then((collected) => {
          if (collected.first().content.toLocaleLowerCase() == 'accept') {
              const msg = channel.send({embed: {
                  color: 0xff3b00,
                  title: `${opponent.username} has accepted!`,
                  description: `In your DMs, I have sent you both a  You can answer either R, P, or S. Rock, Paper, or Scissors. You both have 30 seconds. Good luck!`,
                }
              })
              .then(msg => {
                  msg.delete({ timeout: 30000 })
              })
    
              var inspirationopp = (Math.ceil(Math.random() * 5))
              var inspirationauth = (Math.ceil(Math.random() * 5))
              
              if (inspirationopp == 1) inspirationopp = `Hehe, don't tell the other, but I'm rootin' for you!`
              if (inspirationopp == 2) inspirationopp = `Alright, play fair, and no hitting below the belt!`
              if (inspirationopp == 3) inspirationopp = `Pfft, you got this, no sweat.`
              if (inspirationopp == 4) inspirationopp = `Maybe you can trick their mind, hehe.`
              if (inspirationopp == 5) inspirationopp = `Get ready for sweet sweet victory!`
              if (inspirationauth == 0) inspirationauth = `Get ready!`
    
              if (inspirationauth == 1) inspirationauth = `Wow, why'd you even choose that person? Luck is already on your side..`
              if (inspirationauth == 2) inspirationauth = `Does this even count as a challenger to you? You can beat them ez.`
              if (inspirationauth == 3) inspirationauth = `I'm sure you'll be enjoying your victory in the next 10 seconds.`
              if (inspirationauth == 4) inspirationauth = `Don't sweat it, you can win.`
              if (inspirationauth == 5) inspirationauth = `Use confusion! It's your best move!`
              if (inspirationauth == 0) inspirationauth = `Get ready!`
    
              const msgo = opponent.send({embed: {
                  color: 0xff3b00,
                  description: `${inspirationopp}\nRight here in DMs, type **R**, **P**, or **S**. Rock, Paper, or Scissors? **You have 30 seconds.**`,
                  footer: {
                      text: `Playing RPS against: ${author.username}`
                  }
              }
          }).catch(() => {
                  channel.send({embed: {
                      color: 0xff0000,
                      title: `Command Failure`,
                      description: `In a typical game of rps, you often have your answer in your head. However, I'm not in your head.\n\`\`\`diff\n- Unable to send message to author\`\`\``,
                      footer: {
                          text: `${author.tag}`,
                          icon_url: `${author.avatarURL()}`,
                      },
                    }})
                
                return;
              })
              .then(msgo => { 
                  msgo.channel.awaitMessages(response => response.content.toLocaleLowerCase() == 'r' || response.content.toLocaleLowerCase() == 'p' || response.content.toLocaleLowerCase() == 's' || response.content.toLocaleLowerCase() == 'rock' || response.content.toLocaleLowerCase() == 'paper' || response.content.toLocaleLowerCase() == 'scissors', {
                      max: 1,
                      time: 20000,
                      errors: ['time'],
                  })
                  .then((collected) => { 
                      if (collected.first().content.toLocaleLowerCase() == 'r' || collected.first().content.toLocaleLowerCase() == 'rock') {
                          oppoption = 'Rock'
                      }
                      else if (collected.first().content.toLocaleLowerCase() == 'p' || collected.first().content.toLocaleLowerCase() == 'paper') {
                          oppoption = 'Paper'
                      }
                      else if (collected.first().content.toLocaleLowerCase() == 's' || collected.first().content.toLocaleLowerCase() == 'scissors') {
                          oppoption = 'Scissors'
                      }
                      opponent.send({embed: {
                          color: 0xff3b00,
                          description: `Alright, **${oppoption.toUpperCase()}** it is! Go back to ${channel} and wait until the timer ends!`,
                        }
                      })
                      answersq += 15
                  }).catch(() => {
                     opponent.send(`**10 Seconds.**`)
                     .then(msgo => { 
                      msgo.channel.awaitMessages(response => response.content.toLocaleLowerCase() == 'r' || response.content.toLocaleLowerCase() == 'p' || response.content.toLocaleLowerCase() == 's' || response.content.toLocaleLowerCase() == 'rock' || response.content.toLocaleLowerCase() == 'paper' || response.content.toLocaleLowerCase() == 'scissors', {
                          max: 1,
                          time: 10000,
                          errors: ['time'],
                      })
                      .then((collected) => { 
                          if (collected.first().content.toLocaleLowerCase() == 'r' || collected.first().content.toLocaleLowerCase() == 'rock') {
                              oppoption = 'Rock'
                          }
                          else if (collected.first().content.toLocaleLowerCase() == 'p' || collected.first().content.toLocaleLowerCase() == 'paper') {
                              oppoption = 'Paper'
                          }
                          else if (collected.first().content.toLocaleLowerCase() == 's' || collected.first().content.toLocaleLowerCase() == 'scissors') {
                              oppoption = 'Scissors'
                          }
                          opponent.send({embed: {
                              color: 0xff3b00,
                              description: `Alright, **${oppoption.toUpperCase()}** it is! Go back to ${channel} and wait until the timer ends!`,
                            }
                          })
                      }).catch(() => {
                         opponent.send({embed : {
                          color: 0xff3b00,
                          description: `Wow, you're so slow. I even gave you a warning. Fine, I guess you choose **None.**`,
                         }
                      })
                         oppoption = 'None'
                      })
                  })
                  })
              })
    
              const msga = author.send({embed: {
                  color: 0xff3b00,
                  description: `${inspirationauth}\nRight here in DMs, type **R**, **P**, or **S**. Rock, Paper, or Scissors? **You have 30 seconds.**`,
                  footer: {
                      text: `Playing RPS against: ${opponent.username}`
                  }
              }
          }).catch(() => {return channel.send({embed: {
              color: 0xff0000,
              title: `Command Failure`,
              description: `Well, it seems you are rather...closed.\n\`\`\`diff\n- Unable to send message to author\`\`\``,
              footer: {
                  text: `${author.tag}`,
                  icon_url: `${author.avatarURL()}`,
              },
            }})
          })
              .then(msga => { 
                  msga.channel.awaitMessages(response => response.content.toLocaleLowerCase() == 'r' || response.content.toLocaleLowerCase() == 'p' || response.content.toLocaleLowerCase() == 's' || response.content.toLocaleLowerCase() == 'rock' || response.content.toLocaleLowerCase() == 'paper' || response.content.toLocaleLowerCase() == 'scissors', {
                      max: 1,
                      time: 20000,
                      errors: ['time'],
                  })
                  .then((collected) => { 
                      if (collected.first().content.toLocaleLowerCase() == 'r' || collected.first().content.toLocaleLowerCase() == 'rock') {
                          authoption = 'Rock'
                      }
                      else if (collected.first().content.toLocaleLowerCase() == 'p' || collected.first().content.toLocaleLowerCase() == 'paper') {
                          authoption = 'Paper'
                      }
                      else if (collected.first().content.toLocaleLowerCase() == 's' || collected.first().content.toLocaleLowerCase() == 'scissors') {
                          authoption = 'Scissors'
                      }
                      author.send({embed: {
                          color: 0xff3b00,
                          description: `Alright, **${authoption.toUpperCase()}** it is! Go back to ${channel} and wait until the timer ends!`,
                        }
                      })
                      answersq += 15
                  }).catch(() => {
                      author.send(`**10 Seconds.**`)
                      .then(msga => { 
                          msga.channel.awaitMessages(response => response.content.toLocaleLowerCase() == 'r' || response.content.toLocaleLowerCase() == 'p' || response.content.toLocaleLowerCase() == 's' || response.content.toLocaleLowerCase() == 'rock' || response.content.toLocaleLowerCase() == 'paper' || response.content.toLocaleLowerCase() == 'scissors', {
                              max: 1,
                              time: 10000,
                              errors: ['time'],
                          })
                          .then((collected) => { 
                              if (collected.first().content.toLocaleLowerCase() == 'r' || collected.first().content.toLocaleLowerCase() == 'rock') {
                                  authoption = 'Rock'
                              }
                              else if (collected.first().content.toLocaleLowerCase() == 'p' || collected.first().content.toLocaleLowerCase() == 'paper') {
                                  authoption = 'Paper'
                              }
                              else if (collected.first().content.toLocaleLowerCase() == 's' || collected.first().content.toLocaleLowerCase() == 'scissors') {
                                  authoption = 'Scissors'
                              }
                              author.send({embed: {
                                  color: 0xff3b00,
                                  description: `Alright, **${authoption.toUpperCase()}** it is! Go back to ${channel} and wait until the timer ends!`,
                                }
                              })
                          }).catch(() => {
                              author.send({ embed : {
                                  color: 0xff3b00,
                                  description: `How do you challenge someone to a battle and then just not go? Wow. Just wow. **None** it is.`
                              }
                          })
                              authoption = 'None'
                          })
                      })
                  })
              })
    
              
    
              setTimeout(() => {
                  if (answersq != 30 && count < 60) { 
                      waitlongertimer() 
                      count += 1
                      return;
                  }
  
                  if (oppoption && authoption) {
                      if (authoption == oppoption && authoption == 'None') return channel.send(`Wow, ${author} nor ${opponent} even picked. What a sad game.`)
                      if (authoption == oppoption) { 
                          var result = 'Uh oh, it was a tie! Nobody'
                          var loser = undefined
                          var color = 0x494949
                      }
                      if (authoption == 'None') {
                        var result = `${author.username} didn't even pick! **${opponent.username}**`
                        var winner = `**${opponent}**`
                        var loser = author
                        var color = 0xe3ff00
                      }
                      if (oppoption == 'None') { 
                        var result = `${opponent.username} didn't even pick! **${author.username}**`
                        var winner = `**${author}**`
                        var loser = opponent
                        var color = 0x38ff00
                      }
    
                      if (authoption == 'Rock' && oppoption == 'Scissors') { 
                          var result = `**${author.username}**`
                          var winner = `**${author}**`
                          var loser = opponent
                          var color = 0x000000
                      }
                      if (authoption == 'Paper' && oppoption == 'Rock') {
                          var result = `**${author.username}**`
                          var winner = `**${author}**`
                          var loser = opponent
                          var color = 0xffffff
                      }
                      if (authoption == 'Scissors' && oppoption == 'Paper') {
                          var result = `**${author.username}**`
                          var winner = `**${author}**`
                          var loser = opponent
                          var color = 0x00ceff
                      }
    
                      if (oppoption == 'Paper' && authoption == 'Rock') {
                          var result = `**${opponent.username}**`
                          var winner = `**${opponent}**`
                          var loser = author
                          var color = 0xffffff
                      }
                      if (oppoption == 'Rock' && authoption == 'Scissors') {
                          var result = `**${opponent.username}**`
                          var winner = `**${opponent}**`
                          var loser = author
                          var color = 0x000000
                      }
                      if (oppoption == 'Scissors' && authoption == 'Paper') {
                          var result = `**${opponent.username}**`
                          var winner = `**${opponent}**`
                          var loser = author
                          var color = 0x00ceff
                      }
                      if (color == undefined) {
                          color = 0xff3b00
                      }
                      setTimeout(() => { const msg = channel.send({embed: {
                          color: color,
                          title: `The Score: **${authoption}** to **${oppoption}**!`,
                          description: `${author.username} picked: **${authoption}**\n${opponent.username} picked: **${oppoption}**\n\n${result} won!`,
                        }
                      })
                   }, 1500)
                      setTimeout(() => { if (loser != undefined) channel.send(`Well done, ${winner}!\nTough luck, ${loser}.`) }, 1600)
                      setTimeout(() => { if (loser == undefined) channel.send(`Well done ${author} and ${opponent}! You both managed to lose!`) }, 1600)
                  } else {
                      if (authoption == undefined) {
                          channel.send({embed: {
                              color: 0xff0000,
                              title: `Command Failure`,
                              description: `Uh oh...something may have broke...\n\`\`\`diff\n- Error response from author\`\`\``,
                              footer: {
                                  text: `${author.tag}`,
                                  icon_url: `${author.avatarURL()}`,
                              },
                            }})
                      }
                      if (oppoption == undefined) {
                          channel.send({embed: {
                              color: 0xff0000,
                              title: `Command Failure`,
                              description: `Uh oh...something may have broke...\n\`\`\`diff\n- Error response from opponent\`\`\``,
                              footer: {
                                  text: `${author.tag}`,
                                  icon_url: `${author.avatarURL()}`,
                              },
                            }})
                      }
                      return;
                  }
                  
              }, 500)
    
          } else if (collected.first().content.toLocaleLowerCase() == 'reject' || collected.first().content.toLocaleLowerCase().toLocaleLowerCase() == 'cancel' || collected.first().content.toLocaleLowerCase().toLocaleLowerCase() == 'decline') {
              channel.send({embed: {
                  color: 0xb90002,
                  title: `The RPS Challenge by ${author.username} has been terminated.`,
                }
              })
              }
          }).catch(() => {
            channel.send({embed: {
              color: 0xff0000,
              title: `Command Failure`,
              description: `Welp, guess not.\n\`\`\`diff\n- Opponent did not respond\`\`\``,
              footer: {
                  text: `${author.tag}`,
                  icon_url: `${author.avatarURL()}`,
              },
            }})
          })
      })
    
    }

    if (command == 'links') {
      const channel = bot.channels.cache.get(interaction.channel_id)

      await bot.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 5,
          }
        })

      channel.send({
          embed: {
            color: 0xff0000,
            title: `Invite Links`,
            fields: [
              {
                name: `Discord Invite`,
                value: `[https://discord.gg/9bxbtG2Qns](https://discord.gg/9bxbtG2Qns)`
              },
              {
                name: `SkyGensHD`,
                value: `SkyGensHD.minehut.gg`
              },
            ],
          }
        })
    }

    if (command == 'hangman') {
      const channel = bot.channels.cache.get(interaction.channel_id)
      const author = bot.users.cache.get(interaction.member.user.id)

      var minimum = Math.round(Math.random() * 5)
      var amount = 1

      if (interaction.data.options) {
        var notargs = interaction.data.options.find(arg => arg.name.toLocaleLowerCase() == "phrase");
        if (notargs) var args = notargs.value
  
        var notamount = interaction.data.options.find(arg => arg.name.toLocaleLowerCase() == "amount")
        if (notamount) amount = Math.round(notamount.value)
      }

    if (args) {
        if (args.length > 256) return channel.send({
          embed: {
            color: 0xff0000,
            title: `Command Failure`,
            description: `Too long! Too looooooooong!\n\`\`\`diff\n- Must be 256 or fewer in length\`\`\``,
            footer: {
              text: `${author.tag}`,
              icon_url: `${author.avatarURL()}`,
            },
          }
        })

        if (args.includes(`§`) || args.includes(`-`)) return channel.send({
          embed: {
            color: 0xff0000,
            title: `Command Failure`,
            description: `Sorry! I use the symbols § and - for my code, so using it will break me!\n\`\`\`diff\n- § and - are used as Placeholder Characters\`\`\``,
            footer: {
              text: `${author.tag}`,
              icon_url: `${author.avatarURL()}`,
            },
          }
        })
        var randomness = args.toLocaleLowerCase()
    } else {
      await bot.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 5,
        }
      })

        var randomness = randomWords({exactly: Number(amount), maxLength: 10})
        function extendCustom() {
          if (randomness.toString() < minimum) {
            randomness = randomWords({exactly: Number(amount), maxLength: 10})
            extendCustom()
          }
        }
        extendCustom()
        randomness = randomness.join(', ')
    }

    var say = randomness.toString().replace(/[a-z]/gi, '-')
    var wrong = [];
    var answer = randomness.toString().toLocaleLowerCase()
    var maxErrors = Math.floor(answer.length + answer.length)
    if (maxErrors > 20) {
      maxErrors = 20
    }

    if (interaction.data.options) {
      var nottries = interaction.data.options.find(arg => arg.name.toLocaleLowerCase() == "tries")
    if (nottries) {
      maxErrors = Math.round(nottries.value)
      if (maxErrors == '0') {
        maxErrors = 999
      } else
      if (maxErrors > 26 || maxErrors < 0) return channel.send({
        embed: {
          color: 0xff0000,
          title: `Command Failure`,
          description: `Hey! There's only 26 letters of the alphabet! If you want infinite, put 0.\n\`\`\`diff\n- Invalid Tries Value\`\`\``,
          footer: {
            text: `${author.tag}`,
            icon_url: `${author.avatarURL()}`,
          },
        }
      })
    }
    }

    channel.send({
      embed: {
        color: 0x03fc84,
        title: `${author.username}'s Hangman\n${say}`,
        footer: {
          text: `Reply with a letter or the word(s) to guess the word! ${maxErrors} wrong answers results in a loss! Due to Discord's API, editing this message will be slow.`,
        },
      }
    })
    .then(m => {
      const filter = msgf => msgf.content.length == 1 || msgf.content == 'stop' || msgf.content.toLocaleLowerCase() == answer.toLocaleLowerCase()
      const collector = channel.createMessageCollector(filter, { time: 360000});

      collector.on('collect', (msg) => {
        const guess = msg.content

        async function replace() {
            if (say.toLocaleLowerCase() == answer.toLocaleLowerCase() || msg.content.toLocaleLowerCase() == answer.toLocaleLowerCase()) {
                collector.stop()
                channel.send(`Congratulations! You guys got the word!`)
                setTimeout(() => {
                  m.edit({
                    embed: {
                      color: 0x03fc84,
                      title: `${author.username}'s Hangman Victory!\n${say}`,
                      description: `**Wrong/Guessed Answers:**\n${wrong.join(', ')}`,
                    }
                  })
                }, 1000)
                return;
            }
            msg.delete().catch(() => {})
            if (randomness.toString().includes(guess.toLocaleLowerCase())) {
              randomness = randomness.toString().replace(guess.toLocaleLowerCase(), '§')
              beforeSay = randomness.replace(/[a-z]/g, '-')
              say = beforeSay.replace(/§/g, guess.toLocaleUpperCase())
              randomness = randomness.replace(/§/g, guess.toLocaleUpperCase())
              replace()

            } else if (msg.content == 'stop') {
              collector.stop()
              msg.react('🛑')
              return;

            } else {
              if (!wrong.includes(`${guess.toLocaleUpperCase()}`)) {
                  await wrong.push(guess.toLocaleUpperCase())
                }
              if (wrong.length > (maxErrors - 2)) {
                setTimeout(() => {
                  m.edit({
                    embed: {
                      color: 0xff0000,
                      title: `Failure`,
                      description: `The word was **${answer.toLocaleUpperCase()}** and you had too many guesses:\n${wrong.join(', ')}\n\nIf there is a spammer, report them to server moderators!`,
                    }
                  })
                }, 1000)

                collector.stop()
                return;
              }
            }
            
            m.edit({
              embed: {
                color: 0x03fc84,
                title: `${author.username}'s Hangman\n${say}`,
                description: `**Wrong/Guessed Answers:**\n${wrong.join(', ')}`,
                footer: {
                  text: `Reply with a letter to guess the word! ${maxErrors} wrong answers results in a loss! Due to Discord's API, editing this message will be slow.`,
                },
              }
            })
        }

        replace()
      });
      
      collector.on('end', collected => {
        channel.send(`<@${author.id}>, The Hangman Game has ended! The word was **${answer.toLocaleUpperCase()}**`);
      });
    })

    }

    if (command == 'info') {
      await bot.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 5,
          }
        })

        const channel = bot.channels.cache.get(interaction.channel_id)
        const guild = channel.guild

    if (interaction.data.options) {
        var targetmember = guild.member(Object.values(interaction.data.options[0])[0])
        var target = bot.users.cache.get(Object.values(interaction.data.options[0])[0])
    } else {
        targetmember = guild.member(interaction.member.user.id)
        target = bot.users.cache.get(interaction.member.user.id)
    }

  
  let now = Date.now();
  let createdAt = target.createdTimestamp;
  let age = now - createdAt;
  var avatarurl = (`${target.avatarURL()}` + `?size=1024`)
  if (targetmember.user.avatar.includes(`a_`)) {
    avatarurl = (`${target.avatarURL()}` + `?size=1024`).replace(".webp", ".gif")
  }
  let joinedAt = targetmember.joinedTimestamp;
  let joinage = now - joinedAt;

  if (targetmember.nickname == null) {
      var alias = `${target.username}`
  } else {
      var alias = `${targetmember.nickname}`
  }

  if (targetmember.lastMessageID == null) {
      var messagelink = "**Recent Message:** (None Recorded)"
  } else {
      var lmess = targetmember.lastMessage
      if (lmess == null) {
        lmess = `lmess.content`
      } else {
        lmess = lmess.content
      }
      var smess = (lmess+'').slice(0, 30);
      if (smess.length > 29) {
        var messagelink = `**Recent Message:** [${smess} . . .](https://discord.com/channels/${guild.id}/${targetmember.lastMessageChannelID}/${targetmember.lastMessageID})`
      } else{
        var messagelink = `**Recent Message:** [${smess}](https://discord.com/channels/${guild.id}/${targetmember.lastMessageChannelID}/${targetmember.lastMessageID})`
      }
  }

  var watchingstatus = target.presence.activities.find(activity => activity.type === 'WATCHING') ? true : false
      var listeningstatus = target.presence.activities.find(activity => activity.type === 'LISTENING') ? true : false
      var streamingstatus = target.presence.activities.find(activity => activity.type === 'STREAMING') ? true : false
      var playingstatus = target.presence.activities.find(activity => activity.type === 'PLAYING') ? true : false
      var doingactivity;

      if (target.presence.status === 'offline') {
          var statusE = `⚫`
      } else
      if (target.presence.status === 'online') {
          var statusE = `🟢`
          if (target.presence.activities.find(activity => activity.type === 'CUSTOM_STATUS')) {
            statusE = (`🟢` + ` \`${target.presence.activities.find(activity => activity.type === 'CUSTOM_STATUS').state}\``)
          }
      } else
      if (target.presence.status === 'dnd') {
          var statusE = `⛔`
          if (target.presence.activities.find(activity => activity.type === 'CUSTOM_STATUS')) {
            statusE = (`⛔` + ` \`${target.presence.activities.find(activity => activity.type === 'CUSTOM_STATUS').state}\``)
          }
      } else
      if (target.presence.status === 'idle') {
          var statusE = `🌙`
          if (target.presence.activities.find(activity => activity.type === 'CUSTOM_STATUS')) {
            statusE = (`🌙` + ` \`${target.presence.activities.find(activity => activity.type === 'CUSTOM_STATUS').state}\``)
          }
      }

      if (streamingstatus == true) {
        statusE = `🟣`
        if (target.presence.activities.find(activity => activity.type === 'CUSTOM_STATUS')) {
          statusE = (`🟣` + ` \`${target.presence.activities.find(activity => activity.type === 'CUSTOM_STATUS').state}\``)
        }
    }

      if (watchingstatus == true) {
              doingactivity = `${statusE} ▶ Watching "${target.presence.activities}"`
              if (doingactivity.includes(`Custom Status`)) {
                  doingactivity = `${statusE + ` "${target.presence.activities.find(activity => activity.type === 'CUSTOM_STATUS').state}"`} |` + ` ▶ Watching "${target.presence.activities.find(activity => activity.type === 'WATCHING').name}"`
              }
      } else

      if (listeningstatus == true) {
        doingactivity = `${statusE} 🎧 Listening to "${target.presence.activities}"`
        if (doingactivity.includes(`Custom Status`)) {
            doingactivity = `${statusE}` + `\n🎧 Listening to "${target.presence.activities.find(activity => activity.type === 'LISTENING').name}"`
        }
      } else

      if (streamingstatus == true) {
        doingactivity = `${statusE} 🎥 Streaming "${target.presence.activities}"`
        if (doingactivity.includes(`Custom Status`)) {
            doingactivity = `${statusE}` + `\n🎥 Streaming "${target.presence.activities.find(activity => activity.type === 'STREAMING').name}"`
        }
      } else
      
      if (playingstatus == true) {
        doingactivity = `${statusE} 🎮 Playing "${target.presence.activities}"`
        if (doingactivity.includes(`Custom Status`)) {
          doingactivity = `${statusE}` + `\n🎮 Playing "${target.presence.activities.find(activity => activity.type === 'PLAYING').name}"`
        }
      } else {
        doingactivity = statusE
      }

  if (target.id == '815272046060634112') {
    channel.send({embed: {
      color: 0x9ba397,
      title: `🤖 ${alias}'s Info 🤖`,
      description: `**My Profile:** ${target}\n${messagelink}\n**Profile Image:** [Link](${avatarurl})`,
      thumbnail: {
          url: avatarurl
      },
      fields: [{
          name: "__My Name__",
          value: `${target.tag}`,
          inline: true
        },
        {
          name: "__ID__",
          value: `${target.id}`,
          inline: true
        },
        {
          name: `__My Status__`,
          value: `${doingactivity}`,
          inline: false
        },
        {
          name: "__PFP__",
          value: `[Link](${avatarurl})`,
          inline: true
        },
        {
          name: "__Joined Server__",
          value: `${pm(joinage, {verbose: true})} ago.`,
        },
        {
          name: "__Created__",
          value: `${pm(age, {verbose: true})} ago.`,
        },
        {
          name: "__Creator__",
          value: `Jgouken#4861`
        }
      ],
      timestamp: new Date(),
      footer: {
          text: `🤖 ${target.tag} 🤖`,
          icon_url: avatarurl,
      },
    }
  })

      return;
  }

  if (target.bot) {
      channel.send({embed: {
          color: 0x0c8eeb,
          title: `🤖 ${alias}'s Info 🤖`,
          description: `**Bot Profile:** ${target}\n**Profile Image:** [Link](${avatarurl})`,
          thumbnail: {
              url: avatarurl
          },
          fields: [{
              name: "__Bot Name__",
              value: `${target.tag}`,
              inline: true
            },
            {
              name: "__ID__",
              value: `${target.id}`,
              inline: true
            },
            {
              name: "__Joined Server__",
              value: `${pm(joinage, {verbose: true})} ago.`,
            },
            {
              name: "__Bot Created__",
              value: `${pm(age, {verbose: true})} ago.`,
            },
          ],
          timestamp: new Date(),
          footer: {
              text: `🤖 ${target.tag} 🤖`,
              icon_url: avatarurl,
          },
        }
      })
      return;
  }

  channel.send({embed: {
      color: 0x975429,
      title: `${alias}'s Info`,
      description: `**User Profile:** ${target}\n${messagelink}\n**Profile Image:** [Link](${avatarurl})`,
      thumbnail: {
          url: avatarurl
      },
      fields: [{
          name: "__Username__",
          value: `${target.tag}`,
          inline: true
        },
        {
          name: "__ID__",
          value: `${target.id}`,
          inline: true
        },
        {
          name: `__User Status__`,
          value: `${doingactivity}`,
          inline: false
        },
        {
          name: "__Joined Server__",
          value: `${pm(joinage, {verbose: true})} ago.`,
        },
        {
          name: "__Acc. Creation__",
          value: `${pm(age, {verbose: true})} ago.`,
        },
      ],
      timestamp: new Date(),
      footer: {
          text: `${target.tag}`,
          icon_url: avatarurl,
      },
    }
  })  



    }

    if (command == 'verify') {
      const channel = bot.channels.cache.get(interaction.channel_id)
      const guild = channel.guild
      const member = guild.member(interaction.member.user.id)
      const author = bot.users.cache.get(interaction.member.user.id)

      if (sentver.has(author.id)) return await channel.send(`${author.username} has already sent a verification.`).then(m => {m.delete({timeout: 5000})})

      if (!(member.roles.cache.find(r => r.id === "815100372934066206")) && !(member.roles.cache.find(r => r.id === "815100370061230080"))) return await channel.send(`${author.username} has already verified.`).then(m => {m.delete({timeout: 5000})})

      await bot.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 2,
        }
      })

      author.send({
        embed: {
          color: 0xff0000,
          title: `Verification Process`,
          description: `This is the automated verification process. To proceed with the verification, reply Confirm. This conversation will be recorded and sent to moderators. Proceed within the next 30 seconds.`,
          footer: {
            text: `${author.tag}`,
            icon_url: `${author.avatarURL()}`,
          },
        }
      }).catch(() => {
        channel.send({embed: {
            color: 0xff0000,
            title: `Command Failure`,
            description: `In a typical verification process, you often say your answers in chat. However, I'm going to do it in your DMs.\n\`\`\`diff\n- Unable to send message to author.\`\`\``,
            footer: {
                text: `${author.tag}`,
                icon_url: `${author.avatarURL()}`,
            },
          }
        })
      
      return;
    })
      .then(m => {
        m.channel.awaitMessages(response => response.content.toLocaleLowerCase() == 'confirm', {
          max: 1,
          time: 30000,
          errors: ['time'],
      })
      .then(async() => {

        await author.send(`Great! First thing first, how old are you? Integer response only. Nobody but the staff team will know your exact age.`)
        sentver.add(author.id)
        m.channel.awaitMessages(response => !isNaN(response.content), {
          max: 1,
        })
        .then(async(collected) => {
          var age = Math.round(collected.first().content)

          if (age < 13) {
            author.send({embed: {
              color: 0xff0000,
              title: `You are too young.`,
              description: `I'm sorry, but as to follow [Discord's Terms of Service under section 1](https://discord.com/terms), the age for Digital Consent in America and our minimum age limit is 13. See if the server is here in ${13 - age} year(s)!`,
              footer: {
                  text: `${author.tag}`,
                  icon_url: `${author.avatarURL()}`,
              },
            }
          })

          bot.channels.cache.get(`815100433247895552`).send(`User ${author.username} put their age in as ${age}, too young for the ToS.`)
          sentver.delete(author.id)
          return;
        }

          await author.send(`Alrighty! Next, where did you find this server? If you found it from a friend, please leave their username or User ID.`)
          m.channel.awaitMessages(response => response.content, {
            max: 1,
          })

          .then(async(collected) => {
            var founded = collected.first().content

            await author.send(`How fun. Next, are you a furry? You do not require a fursuit to be one. If so, do you have a fursona? Tell me about it, if you have one. This will be used in your introduction.`)
            m.channel.awaitMessages(response => response.content, {
              max: 1,
            })

            .then(async(collected) => {
              var furry = collected.first().content

              await author.send(`Ah, I see. Why did you join this server?`)
              m.channel.awaitMessages(response => response.content, {
                max: 1,
              })

              .then(async(collected) => {
                var why = collected.first().content

                await author.send(`Can you describe a bit more about yourself to me? This will be used as your introduction to fully know you as a person!`)
                m.channel.awaitMessages(response => response.content, {
                  max: 1,
                })

                .then(async (collected) => {
                  var intro = collected.first().content

                  await author.send(`Alrighty! Thank you so much for chattin' with me! All of the following information has been sent to the moderators for quick review. The verification process is fully automated, so as soon as they cast their vote is as soon as you'll get your roles.`)
                  bot.channels.cache.get(`815100433247895552`).send({
                    embed: {
                      color: 3447003,
                      title: `${author.username}`,
                      description: `User: ${author}\nID: ${author.id}\nAge: ${age}\n\n__Description:__\n${intro}`,
                      thumbnail: {
                        url: `${author.avatarURL()}` + `?size=1024`,
                      },
                      fields: [
                        {
                          name: `__Where did you find the server?__`,
                          value: `${founded}`,
                        },
                        {
                          name: `__Are you a furry?__`,
                          value: `${furry}`,
                        },
                        {
                          name: `__Why did you join?__`,
                          value: `${why}`,
                        },
                      ],
                      footer: {
                        text: `${author.tag}\nDecision: None\n✔ to verify | ✖ to reject | ➖ to sketchify`,
                        icon_url: `${author.avatarURL()}`,
                      },
                    }
                  })
                  .then(v => {
                    v.react('✔').then(() => v.react('✖')).then(() => v.react('➖'));;

                    const filter = (reaction, user) => {
                      return ['✔', '✖', '➖'].includes(reaction.emoji.name) && user.id != '815272046060634112';
                    };
                    
                    v.awaitReactions(filter, { max: 1 })
                      .then(async (collected) => {
                        const reaction = collected.first();
                    
                        if (reaction.emoji.name === '✔') {
                          if (age < 18) {
                            var not18 = guild.roles.cache.find(role => role.id === "815100371457540116");
                            member.roles.add(not18);
                            await v.edit({
                              embed: {
                                color: 3447003,
                                title: `${author.username}`,
                                description: `User: ${author}\nID: ${author.id}\nAge: ${age}\n\n__Description:__\n${intro}`,
                                thumbnail: {
                                  url: `${author.avatarURL()}` + `?size=1024`,
                                },
                                fields: [
                                  {
                                    name: `__Where did you find the server?__`,
                                    value: `${founded}`,
                                  },
                                  {
                                    name: `__Are you a furry?__`,
                                    value: `${furry}`,
                                  },
                                  {
                                    name: `__Why did you join?__`,
                                    value: `${why}`,
                                  },
                                ],
                                footer: {
                                  text: `${author.tag}\nDecision: ✅`,
                                  icon_url: `${author.avatarURL()}`,
                                },
                              }
                            })
                            age = '-18'
                          } else {
                            var verified = guild.roles.cache.find(role => role.id === "815100367745843201");
                            member.roles.add(verified);
                            await v.edit({
                              embed: {
                                color: 3447003,
                                title: `${author.username}`,
                                description: `User: ${author}\nID: ${author.id}\nAge: ${age}\n\n**__Description:__**\n${intro}`,
                                thumbnail: {
                                  url: `${author.avatarURL()}` + `?size=1024`,
                                },
                                fields: [
                                  {
                                    name: `__Where did you find the server?__`,
                                    value: `${founded}`,
                                  },
                                  {
                                    name: `__Are you a furry?__`,
                                    value: `${furry}`,
                                  },
                                  {
                                    name: `__Why did you join?__`,
                                    value: `${why}`,
                                  },
                                ],
                                footer: {
                                  text: `${author.tag}\nDecision: Verified`,
                                  icon_url: `${author.avatarURL()}`,
                                },
                              }
                            })
                            age = '18+'
                          }
                          var unver = guild.roles.cache.find(role => role.id === "815100372934066206")
                          var sketch = guild.roles.cache.find(role => role.id === "815100370061230080")
                          if (member.roles.cache.find(r => r.id === "815100372934066206")) member.roles.remove(unver);
                          if (member.roles.cache.find(r => r.id === "815100370061230080")) member.roles.remove(sketch);

                          author.send(`The moderators have decided to accept your verification. Enjoy the full access of the server!`)

                          bot.channels.cache.get('815299834655014913').send({embed: {
                            color: 0x975429,
                            title: `${author.username}`,
                            description: `**Profile:** ${author}\n**Age:** ${age}\n**Profile Image:** [Link](${`${author.avatarURL()}` + `?size=1024`})`,
                            thumbnail: {
                                url: avatarurl
                            },
                            fields: [
                              {
                                name: "__Fursona Info__",
                                value: furry,
                              },
                              {
                                name: "__Description__",
                                value: intro,
                              }
                            ],
                            timestamp: new Date(),
                            footer: {
                                text: `${author.tag}`,
                                icon_url: avatarurl,
                            },
                          }
                        })

                        } else

                        if (reaction.emoji.name === '✖') {
                          await author.send(`The moderators have decided to decline your verification. You have been automatically kicked from the server, that way you'll see the screening again if you join back. Make sure you completely agree with our rules.`)
                          await v.edit({
                            embed: {
                              color: 3447003,
                              title: `${author.username}`,
                              description: `User: ${author}\nID: ${author.id}\nAge: ${age}\n\n__Description:__\n${intro}`,
                              thumbnail: {
                                url: `${author.avatarURL()}` + `?size=1024`,
                              },
                              fields: [
                                {
                                  name: `__Where did you find the server?__`,
                                  value: `${founded}`,
                                },
                                {
                                  name: `__Are you a furry?__`,
                                  value: `${furry}`,
                                },
                                {
                                  name: `__Why did you join?__`,
                                  value: `${why}`,
                                },
                              ],
                              footer: {
                                text: `${author.tag}\nDecision: Denied`,
                                icon_url: `${author.avatarURL()}`,
                              },
                            }
                          })

                          member.kick(`Denied Verification`)
                        } else 

                        if (reaction.emoji.name === '➖') {
                          author.send(`The moderators have decided to accept your verification, but you have been marked sketchy. You'll need to verify again with more/better information to get you off of the sketchy list using the same command somewhere in the server.`)
                          var sketchy = guild.roles.cache.find(role => role.id === "815100370061230080");
                          member.roles.add(sketchy);

                          v.edit({
                            embed: {
                              color: 3447003,
                              title: `${author.username}`,
                              description: `User: ${author}\nID: ${author.id}\nAge: ${age}\n\n__Description:__\n${intro}`,
                              thumbnail: {
                                url: `${author.avatarURL()}` + `?size=1024`,
                              },
                              fields: [
                                {
                                  name: `__Where did you find the server?__`,
                                  value: `${founded}`,
                                },
                                {
                                  name: `__Are you a furry?__`,
                                  value: `${furry}`,
                                },
                                {
                                  name: `__Why did you join?__`,
                                  value: `${why}`,
                                },
                              ],
                              footer: {
                                text: `${author.tag}\nDecision: Sketchy`,
                                icon_url: `${author.avatarURL()}`,
                              },
                            }
                          })

                          var unver = guild.roles.cache.find(role => role.id === "815100372934066206")
                          if (member.roles.cache.find(r => r.id === "815100372934066206")) member.roles.remove(unver);

                          bot.channels.cache.get(`816125687907352606`).send({
                            embed: {
                              color: 0xff0000,
                              description: `${author.username} has been added to the watchlist due to [this verification](${v.url}).`,
                              footer: {
                                text: `${reaction.user.tag}`,
                                icon_url: `${reaction.user.avatarURL()}`,
                              },
                            }
                          })
                          sentver.delete(author.id)
                        }

                        sentver.delete(author.id)
                        v.reactions.removeAll()
                      })
                  })

                })
              })
            })
          })
        })

      }).catch(() => { 
        sentver.delete(author.id)
        author.send({
          embed: {
            color: 0xff0000,
            title: `Verification Process Cancelled.`,
            footer: {
              text: `${author.tag}`,
              icon_url: `${author.avatarURL()}`,
            },
          }
        })
      })

    
    })


    }
    
})

bot.login(process.env.TOKEN)