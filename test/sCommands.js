const Discord = require('discord.js');
const bot = new Discord.Client();
const urban = require("relevant-urban")
const randomWords = require(`random-words`)
const pm = require('pretty-ms');
const sentver = new Set();

bot.ws.on('INTERACTION_CREATE', async interaction => {
    const command = interaction.data.name.toLocaleLowerCase();

    

})

bot.login('ODE1MjcyMDQ2MDYwNjM0MTEy.YDp_Qg.esVtAEu6VFy7uVUUgAvXLpHRh58')


/* NOTES

DELETE:
bot.api.applications('815272046060634112').guilds('815099824491724801').commands(`COMMANDID`).delete().then(console.log)

POST:
bot.api.applications('815272046060634112').guilds('815099824491724801').commands.post({})

GET:
bot.api.applications('815272046060634112').guilds('815099824491724801').commands.get().then(console.log)

ARGUMENTS:
const notargs = interaction.data.options;
const args = notargs.find(arg => arg.name.toLocaleLowerCase() == "category").value
      
CHANNEL AND AUTHOR:
const channel = bot.channels.cache.get(interaction.channel_id)
const author = bot.users.cache.get(interaction.member.user.id)

MENTIONED USER (first option):
Object.values(interaction.data.options[0])[0]

SEND MESSAGE WITH ACK:
await bot.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: `Searching the Urban Dictionary for "${args}"`
              }
            }
          })

ACK WITHOUT SENDING:
await bot.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 5,
            }
          })

channel.send({
        embed: {
          color: 0xff0000,
          title: `Command Failure`,
          description: `Ah, Error.\n\`\`\`diff\n- \`\`\``,
          footer: {
            text: `${author.tag}`,
            icon_url: `${author.avatarURL()}`,
          },
        }
      })


*/