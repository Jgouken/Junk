const {
    Client,
    MessageAttachment
} = require('discord.js');
const Discord = require('discord.js');
const bot = new Discord.Client();
const sCommands = require("./sCommands");
const PREFIX = '/'
const ifInVoice = new Set();

global.PREFIX = '/'

bot.on('ready', async () => {
    console.log(`I'm ready for testing!`)

    bot.on('message', async message => {
      if (message.guild === null) return

      message.channel.stopTyping()
      const botOwner = bot.users.cache.get(`491422360273158165`)

        if (message.channel.type == "dm") return;
        if (message.author.bot) return;

    if (!message.content.toLocaleLowerCase().startsWith(PREFIX)) return;
    const input = message.content.slice(global.PREFIX.length).trim()
    if (!input.length) return;
    const [, command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);

      if (command === 'test') {
        message.channel.send({
          embed: {
            color: 0xff0000,
            title: `Message Recieved`,
            description: `Test`,
            footer: {
              text: `${message.author.tag}\nTo reply, ping the user then type the message.`,
              icon_url: `${message.author.avatarURL()}`,
            },
          }
        })
      }

    message.channel.stopTyping()
    })
})
bot.login('ODE1MjcyMDQ2MDYwNjM0MTEy.YDp_Qg.esVtAEu6VFy7uVUUgAvXLpHRh58')

/* NOTES

    var messagething = message.content.slice(PREFIX.length).split(/ +/);
    var args = messagething.slice(1).join(' ')

    message.channel.send({
        embed: {
          color: 0xff0000,
          title: `Command Failure`,
          description: `Ah, Error.\n\`\`\`diff\n- \`\`\``,
          footer: {
            text: `${message.author.tag}`,
            icon_url: `${message.author.avatarURL()}`,
          },
        }
      })

*/