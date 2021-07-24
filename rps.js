module.exports = {
    name: 'rps',
    execute(message) {
        var answersq = 0
    var count = 0
    function waitlongertimer() {
        setTimeout(() => {
            if (answersq != 30 && count < 60) {
                waitlongertimer()
                count += 1
                return;
            }

            if (oppoption && authoption) {
                if (authoption == oppoption && authoption == 'None') return message.channel.send(`Wow, ${message.author} nor ${opponent} even picked. What a sad game.`)
                if (authoption == oppoption) { 
                    var result = 'Uh oh, it was a tie! Nobody'
                    var loser = undefined
                    var color = 0x494949
                }
                if (authoption == 'None') {
                  var result = `${message.author.username} didn't even pick! **${opponent.username}**`
                  var winner = `**${opponent}**`
                  var loser = message.author
                  var color = 0xe3ff00
                }
                if (oppoption == 'None') { 
                  var result = `${opponent.username} didn't even pick! **${message.author.username}**`
                  var winner = `**${message.author}**`
                  var loser = opponent
                  var color = 0x38ff00
                }

                if (authoption == 'Rock' && oppoption == 'Scissors') { 
                    var result = `**${message.author.username}**`
                    var winner = `**${message.author}**`
                    var loser = opponent
                    var color = 0x000000
                }
                if (authoption == 'Paper' && oppoption == 'Rock') {
                    var result = `**${message.author.username}**`
                    var winner = `**${message.author}**`
                    var loser = opponent
                    var color = 0xffffff
                }
                if (authoption == 'Scissors' && oppoption == 'Paper') {
                    var result = `**${message.author.username}**`
                    var winner = `**${message.author}**`
                    var loser = opponent
                    var color = 0x00ceff
                }

                if (oppoption == 'Paper' && authoption == 'Rock') {
                    var result = `**${opponent.username}**`
                    var winner = `**${opponent}**`
                    var loser = message.author
                    var color = 0xffffff
                }
                if (oppoption == 'Rock' && authoption == 'Scissors') {
                    var result = `**${opponent.username}**`
                    var winner = `**${opponent}**`
                    var loser = message.author
                    var color = 0x000000
                }
                if (oppoption == 'Scissors' && authoption == 'Paper') {
                    var result = `**${opponent.username}**`
                    var winner = `**${opponent}**`
                    var loser = message.author
                    var color = 0x00ceff
                }
                if (color == undefined) {
                    color = 0xff3b00
                }
                setTimeout(() => { const msg = message.channel.send({embed: {
                    color: color,
                    title: `The Score: **${authoption}** to **${oppoption}**!`,
                    description: `${message.author.username} picked: **${authoption}**\n${opponent.username} picked: **${oppoption}**\n\n${result} won!`,
                  }
                })
             }, 1500)
                setTimeout(() => { if (loser != undefined) message.channel.send(`Well done, ${winner}!\nTough luck, ${loser}.`) }, 1600)
                setTimeout(() => { if (loser == undefined) message.channel.send(`Well done ${message.author} and ${opponent}! You both managed to lose!`) }, 1600)
            } else {
                if (authoption == undefined) {
                    message.channel.send(`There was a small error from ${message.author}'s response. Try the match again.`)
                }
                if (oppoption == undefined) {
                    message.channel.send(`There was a small error from ${opponent}'s response. Try the match again.`)
                }
                return;
            }
            
        }, 500)
    }
    const opponent = message.mentions.users.first()
    if (!opponent) return message.channel.send({embed: {
        color: 0xff0000,
        title: `Command Failure`,
        description: `You need an opponent! Can't challenge nobody!\n\`\`\`diff\n- Insufficient Arguments (no mentions)\`\`\``,
        footer: {
            text: `${message.author.tag}`,
            icon_url: `${message.author.avatarURL()}`,
        },
      }})
    if (opponent == message.author) return message.channel.send({embed: {
        color: 0xff0000,
        title: `Command Failure`,
        description: `Can't go against yourself, buddy.  You ain't that lonely...\n\`\`\`diff\n- User mentioned in command\`\`\``,
        footer: {
            text: `${message.author.tag}`,
            icon_url: `${message.author.avatarURL()}`,
        },
      }})
    if (opponent.id == "700143008900841493") {
        message.channel.send(`Sorry, I go unbeaten. I'd just hurt your wimpy human feelings.`)
        return;
    }
    var oppoption = undefined
    var authoption = undefined
  
    const msg = message.channel.send({embed: {
        color: 0xff3b00,
        title: `**${opponent.username}**, you are being challenged to a Rock Paper Scissors battle by **${message.author.username}**!`,
        description: `To accept or decline, type Accept or Reject. To cancel, type Cancel.`,
      }
    })
    .then(msg => {
        msg.delete({ timeout: 60000 })
    message.channel.awaitMessages(response => response.content.toLocaleLowerCase() == 'accept' && response.author == opponent || response.content.toLocaleLowerCase() == 'reject' && response.author == opponent || response.content.toLocaleLowerCase() == 'cancel' && response.author == message.author || response.content.toLocaleLowerCase() == 'decline' && response.author == opponent, {
        max: 1,
        time: 60000,
        errors: ['time'],
    })
    .then((collected) => {
        if (collected.first().content.toLocaleLowerCase() == 'accept') {
            const msg = message.channel.send({embed: {
                color: 0xff3b00,
                title: `${opponent.username} has accepted!`,
                description: `In your DMs, I have sent you both a message. You can answer either R, P, or S. Rock, Paper, or Scissors. You both have 30 seconds. Good luck!`,
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
  
            if (inspirationauth == 1) inspirationauth = `You aren't gonna lose, I can feel it.`
            if (inspirationauth == 2) inspirationauth = `Does this even count as a challenger to you? You can beat them ez.`
            if (inspirationauth == 3) inspirationauth = `I'm sure you'll be enjoying your victory in the next 10 seconds.`
            if (inspirationauth == 4) inspirationauth = `Don't sweat it, you can win.`
            if (inspirationauth == 5) inspirationauth = `Use confusion! It's your best move!`
            if (inspirationauth == 0) inspirationauth = `Get ready!`
  
            const msgo = opponent.send({embed: {
                color: 0xff3b00,
                description: `${inspirationopp}\nRight here in DMs, type **R**, **P**, or **S**. Rock, Paper, or Scissors? **You have 30 seconds.**`,
                footer: {
                    text: `Playing RPS against: ${message.author.username}`
                }
            }
        }).catch(() => {
                message.channel.send({embed: {
                    color: 0xff0000,
                    title: `Command Failure`,
                    description: `In a typical game of rps, you often have your answer in your head. However, I'm not in your head.\n\`\`\`diff\n- Unable to send message to author\`\`\``,
                    footer: {
                        text: `${message.author.tag}`,
                        icon_url: `${message.author.avatarURL()}`,
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
                        description: `Alright, **${oppoption.toUpperCase()}** it is! Go back to ${message.channel} and wait until the timer ends!`,
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
                            description: `Alright, **${oppoption.toUpperCase()}** it is! Go back to ${message.channel} and wait until the timer ends!`,
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
  
            const msga = message.author.send({embed: {
                color: 0xff3b00,
                description: `${inspirationauth}\nRight here in DMs, type **R**, **P**, or **S**. Rock, Paper, or Scissors? **You have 30 seconds.**`,
                footer: {
                    text: `Playing RPS against: ${opponent.username}`
                }
            }
        }).catch(() => {return message.channel.send({embed: {
            color: 0xff0000,
            title: `Command Failure`,
            description: `Well, it seems you are rather...closed.\n\`\`\`diff\n- Unable to send message to author\`\`\``,
            footer: {
                text: `${message.author.tag}`,
                icon_url: `${message.author.avatarURL()}`,
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
                    message.author.send({embed: {
                        color: 0xff3b00,
                        description: `Alright, **${authoption.toUpperCase()}** it is! Go back to ${message.channel} and wait until the timer ends!`,
                      }
                    })
                    answersq += 15
                }).catch(() => {
                    message.author.send(`**10 Seconds.**`)
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
                            message.author.send({embed: {
                                color: 0xff3b00,
                                description: `Alright, **${authoption.toUpperCase()}** it is! Go back to ${message.channel} and wait until the timer ends!`,
                              }
                            })
                        }).catch(() => {
                            message.author.send({ embed : {
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
                    if (authoption == oppoption && authoption == 'None') return message.channel.send(`Wow, ${message.author} nor ${opponent} even picked. What a sad game.`)
                    if (authoption == oppoption) { 
                        var result = 'Uh oh, it was a tie! Nobody'
                        var loser = undefined
                        var color = 0x494949
                    }
                    if (authoption == 'None') {
                      var result = `${message.author.username} didn't even pick! **${opponent.username}**`
                      var winner = `**${opponent}**`
                      var loser = message.author
                      var color = 0xe3ff00
                    }
                    if (oppoption == 'None') { 
                      var result = `${opponent.username} didn't even pick! **${message.author.username}**`
                      var winner = `**${message.author}**`
                      var loser = opponent
                      var color = 0x38ff00
                    }
  
                    if (authoption == 'Rock' && oppoption == 'Scissors') { 
                        var result = `**${message.author.username}**`
                        var winner = `**${message.author}**`
                        var loser = opponent
                        var color = 0x000000
                    }
                    if (authoption == 'Paper' && oppoption == 'Rock') {
                        var result = `**${message.author.username}**`
                        var winner = `**${message.author}**`
                        var loser = opponent
                        var color = 0xffffff
                    }
                    if (authoption == 'Scissors' && oppoption == 'Paper') {
                        var result = `**${message.author.username}**`
                        var winner = `**${message.author}**`
                        var loser = opponent
                        var color = 0x00ceff
                    }
  
                    if (oppoption == 'Paper' && authoption == 'Rock') {
                        var result = `**${opponent.username}**`
                        var winner = `**${opponent}**`
                        var loser = message.author
                        var color = 0xffffff
                    }
                    if (oppoption == 'Rock' && authoption == 'Scissors') {
                        var result = `**${opponent.username}**`
                        var winner = `**${opponent}**`
                        var loser = message.author
                        var color = 0x000000
                    }
                    if (oppoption == 'Scissors' && authoption == 'Paper') {
                        var result = `**${opponent.username}**`
                        var winner = `**${opponent}**`
                        var loser = message.author
                        var color = 0x00ceff
                    }
                    if (color == undefined) {
                        color = 0xff3b00
                    }
                    setTimeout(() => { const msg = message.channel.send({embed: {
                        color: color,
                        title: `The Score: **${authoption}** to **${oppoption}**!`,
                        description: `${message.author.username} picked: **${authoption}**\n${opponent.username} picked: **${oppoption}**\n\n${result} won!`,
                      }
                    })
                 }, 1500)
                    setTimeout(() => { if (loser != undefined) message.channel.send(`Well done, ${winner}!\nTough luck, ${loser}.`) }, 1600)
                    setTimeout(() => { if (loser == undefined) message.channel.send(`Well done ${message.author} and ${opponent}! You both managed to lose!`) }, 1600)
                } else {
                    if (authoption == undefined) {
                        message.channel.send({embed: {
                            color: 0xff0000,
                            title: `Command Failure`,
                            description: `Uh oh...something may have broke...\n\`\`\`diff\n- Error response from author\`\`\``,
                            footer: {
                                text: `${message.author.tag}`,
                                icon_url: `${message.author.avatarURL()}`,
                            },
                          }})
                    }
                    if (oppoption == undefined) {
                        message.channel.send({embed: {
                            color: 0xff0000,
                            title: `Command Failure`,
                            description: `Uh oh...something may have broke...\n\`\`\`diff\n- Error response from opponent\`\`\``,
                            footer: {
                                text: `${message.author.tag}`,
                                icon_url: `${message.author.avatarURL()}`,
                            },
                          }})
                    }
                    return;
                }
                
            }, 500)
  
        } else if (collected.first().content.toLocaleLowerCase() == 'reject' || collected.first().content.toLocaleLowerCase().toLocaleLowerCase() == 'cancel' || collected.first().content.toLocaleLowerCase().toLocaleLowerCase() == 'decline') {
            message.channel.send({embed: {
                color: 0xb90002,
                title: `The RPS Challenge by ${message.author.username} has been terminated.`,
              }
            })
            }
        }).catch(() => {
          message.channel.send({embed: {
            color: 0xff0000,
            title: `Command Failure`,
            description: `Welp, guess not.\n\`\`\`diff\n- Opponent did not respond\`\`\``,
            footer: {
                text: `${message.author.tag}`,
                icon_url: `${message.author.avatarURL()}`,
            },
          }})
        })
    })
  
    }
}