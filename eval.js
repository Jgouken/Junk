module.exports = {
    name: `eval`,

    execute(message) {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({
            embed: {
              color: 0xff0000,
              title: `Command Failure`,
              description: `Error:\n\`PermissionError: You are not an Administrator.\``,
            }
          });
    
          var messagething = message.content.slice(PREFIX.length).split(/ +/);
          var args = messagething.slice(1).join(' ')
          try {
            let evaled = eval(args);
       
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
            message.channel.send({
              embed: {
                color: 0xff0000,
                title: `Result`,
                description: `\`${evaled}\``
              }
            })
          } catch (err) {
            message.channel.send({
              embed: {
                color: 0xff0000,
                title: `Command Failure`,
                description: `Error:\n\`${err}\``,
              }
            })
          }
    }
}