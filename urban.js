const urban = require("relevant-urban")

module.exports = {
    name: `urban`,

    execute(message, args, result, failed, cooldown) {
    
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
            if (args.length > 1024 || result.word.length > 1024 || result.word.length == 0) return message.channel.send({
              embed: {
                color: 0xff0000,
                title: `Command Failure`,
                description: `Um...the word found is too long...\n\`\`\`diff\n- Defined word exceeds limit (1024)\`\`\``,
                footer: {
                  text: `${message.author.tag}`,
                  icon_url: `${message.author.avatarURL()}`,
                },
              }
            })
    
    
            message.channel.send({
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
                  return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
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
    
            cooldown.add(message.author.id)
            setTimeout(() => {
              cooldown.delete(message.author.id)
            }, 10000)
          }

    }
}