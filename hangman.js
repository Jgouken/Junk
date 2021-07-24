const randomWords = require(`random-words`)

module.exports = {
    name: "hangman",

    execute(message) {
      var messagething = message.content.slice(PREFIX.length).split(/ +/);
      var args = messagething.slice(1).join(' ')
      var randomness = randomWords({exactly: 1, maxLength: 10})

      function extend() {
        if (randomness.toString().length < 4) {
          randomness = randomWords({exactly: 1, maxLength: 10})
          extend()
        }
      }
      extend()

      if (args) {
          if (args.length > 256) {
              message.channel.send({
                  embed: {
                    color: 0xff0000,
                    title: `Command Failure`,
                    description: `Too long! Too looooooooong!\n\`\`\`diff\n- Must be 256 or fewer in length\`\`\``,
                    footer: {
                      text: `${message.author.tag}`,
                      icon_url: `${message.author.avatarURL()}`,
                    },
                  }
                })
                message.delete().catch(() => {return})
                return;
          }
        if (isNaN(args)) {
          if (args.includes(`§`) || args.includes(`-`)) return message.channel.send({
            embed: {
              color: 0xff0000,
              title: `Command Failure`,
              description: `Sorry! I use the symbol for my code, so using it will break me!\n\`\`\`diff\n- § is Used as a Placeholder Character\`\`\``,
              footer: {
                text: `${message.author.tag}`,
                icon_url: `${message.author.avatarURL()}`,
              },
            }
          })
          randomness = args.toLocaleLowerCase()
          message.delete().catch(() => {
            message.react(`💥`)
            message.channel.send(`I cannot delete this message. Delete it yourself quickly!`)
        })
          extend()
        } else {
          randomness = randomWords({exactly: 1, maxLength: Math.floor(Number(args))})
          function extendCustom() {
            if (randomness.toString() < Math.floor(Number(args))) {
              randomness = randomWords({exactly: 1, maxLength: Math.floor(Number(args))})
              extendCustom()
            }
          }
          extendCustom()
        }
      }

      var say = randomness.toString().replace(/[a-z]/gi, '-')
      var wrong = [];
      var answer = randomness.toString().toLocaleLowerCase()
      var maxErrors = Math.floor(answer.length + answer.length)
      if (maxErrors > 20) {
        maxErrors = 20
      }
      message.channel.send({
        embed: {
          color: 0x03fc84,
          title: `${message.author.username}'s Hangman\n${say}`,
          footer: {
            text: `Reply with a letter (or the word) to guess the word! ${maxErrors} wrong answers results in a loss! Due to Discord's API, editing this message will be slow.`,
          },
        }
      })
      .then(m => {
        const filter = msgf => msgf.content.length == 1 || msgf.content == 'stop' || msgf.content.toLocaleLowerCase() == answer.toLocaleLowerCase()
        const collector = message.channel.createMessageCollector(filter, { time: 360000});

        collector.on('collect', (msg) => {
          const guess = msg.content

          function replace() {
              if (say.toLocaleLowerCase() == answer.toLocaleLowerCase() || msg.content.toLocaleLowerCase() == answer.toLocaleLowerCase()) {
                  collector.stop()
                  message.channel.send(`Congratulations! You guys got the word!`)
                  m.edit({
                    embed: {
                      color: 0x03fc84,
                      title: `${message.author.username}'s Hangman Victory!\n${say}`,
                      description: `**Wrong/Guessed Answers:**\n${wrong.join(', ')}`,
                    }
                  })
                  return;
              }
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
                if (wrong.length > (maxErrors - 2)) {
                  m.edit({
                    embed: {
                      color: 0xff0000,
                      title: `Failure`,
                      description: `The word was **${answer.toLocaleUpperCase()}** and you had too many guesses:\n${wrong.join(', ')}\n\nIf there is a spammer, report them to server moderators!`,
                    }
                  })
                  collector.stop()
                  return;
                }
                if (!wrong.includes(`${guess.toLocaleUpperCase()}`)) {
                  wrong.push(guess.toLocaleUpperCase())
                }
              }
              
              m.edit({
                embed: {
                  color: 0x03fc84,
                  title: `${message.author.username}'s Hangman\n${say}`,
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
          message.reply(`Hangman Game has Ended! The word was **${answer.toLocaleUpperCase()}**`);
        });
      })


  }
}
