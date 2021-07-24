const Discord = require('discord.js');
const bot = new Discord.Client();
const pm = require('pretty-ms');
const fs = require('fs');
const cooldown = new Set();
const sCommands = require("./sCommands");
const PREFIX = '/'
global.PREFIX = '/'

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

bot.on('ready', async () => {
    console.log(`Test Ready.`)
    bot.user.setActivity(`with your beans`, {
      type: 'PLAYING',
    });

    bot.on('message', async message => {
      message.channel.stopTyping()
    if (message.author.bot) return;
    var origin = message.content.slice(PREFIX.length).split(/ +/);
    var use = origin.slice(1, 2).join(' ')
    var didping = message.content.slice(PREFIX.length).split(/ +/);
    var pingbot = didping.slice(PREFIX.length).join(' ')

    if (message.mentions.users.first() == '700143008900841493') {
      if (pingbot == 'prefix' || !pingbot) {
        message.channel.send({
          embed: {
            color: 0xffff03,
            title: `The prefix for ${message.guild.name} is:`,
            description: `${PREFIX}`,
          }
        })
      }
    }

    if (!message.content.toLocaleLowerCase().startsWith(PREFIX)) return;
    const input = message.content.slice(PREFIX.length).trim()
    if (!input.length) return;
    const [, command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);
    if (!(message.guild.me).hasPermission("SEND_MESSAGES")) return;

    if (cooldown.has(message.author.id)) return;

    cooldown.add(message.author.id)
    setTimeout(() => {
      cooldown.delete(message.author.id)
    }, 1000)

    if (command === 'ping') {
      client.commands.get('ping').execute(message)
    } else

    if (command === 'eval') {
      client.commands.get('eval').execute(message)
    } else

    message.channel.stopTyping()
    }) 
})

bot.login(process.env.TOKEN)

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
