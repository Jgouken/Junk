const Discord = require('discord.js');
const bot = new Discord.Client();
const pm = require('pretty-ms');
const fs = require('fs');
const cooldown = new Set();
const urban = require("relevant-urban");
global.PREFIX = 'j-'
const PREFIX = 'j-'
 

//When the bot is activated
bot.on('ready', async () => {
  setTimeout(() => {
    bot.user.setPresence({
      status: 'online',
      activity: {
        name: `${bot.guilds.cache.size} servers! | j-help`,
        type: 'WATCHING',
      }
    })
  }, 60000 * 10)

  console.log('Update Successful. Bot is currently running.');

  bot.on('message', async message => {
    message.channel.stopTyping()
    if (message.author.bot) return;
    var origin = message.content.slice(PREFIX.length).split(/ +/);
    var use = origin.slice(1, 2).join(' ')
    var didping = message.content.slice(PREFIX.length).split(/ +/);
    var pingbot = didping.slice(PREFIX.length).join(' ')

    if (message.mentions.users.first() == '700143008900841493') {
      if (pingbot == 'help' || pingbot.content == '<@700143008900841493>') {
        client.commands.get('help').execute(message)
        return;
      }

      if (pingbot == 'prefix') {
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

    if (cooldown.has(message.author.id)) return message.channel.send(`Embedded Spam-Defenses Initiated.`).then(msg => { msg.delete({ timeout: 2000 }) })

    cooldown.add(message.author.id)
    setTimeout(() => {
      cooldown.delete(message.author.id)
    }, 1000)

    if (command === 'help') {
      client.commands.get('help').execute(message)
    } else

    if (command === 'botinfo') {

      if (use == 'ping') {
        client.commands.get('ping').execute(message)
        return;
      }

      if (use == 'invite') {
        message.channel.send({
          embed: {
            color: 0xff0000,
            title: `Bot/Server Invite`,
            description: `**WARNING:** This bot is in beta. Constant updates, shut downs, and borken commands are inevitable.`,
            fields: [
              {
                name: `Error Form`,
                value: `[Form Link](https://forms.gle/VoecbxRauPMcaH6d9)`
              },
              {
                name: `Add/View The Bot`,
                value: `[top.gg Link](https://top.gg/bot/700143008900841493)`
              },
              {
                name: `Bot Help Server`,
                value: `[Join Link](https://discord.gg/7jyVxc8)`
              },
            ],
          }
        })

        return;
      }

      if (!use || use == null) {
        if (!(message.guild.me).hasPermission("READ_MESSAGE_HISTORY")) message.channel.send(`Unable to read message history.`);

      var targetmember = message.guild.me
      var target = bot.client.cache.get(targetmember.id)
      var args = `<@${target.id}>`
      
      let now = Date.now();
      let createdAt = target.createdTimestamp;
      let age = now - createdAt;
      var avatarurl = (`${target.avatarURL()}` + `?size=1024`)
      let joinedAt = targetmember.joinedTimestamp;
      let joinage = now - joinedAt;
  
      var messagething = message.content.slice(global.PREFIX.length).split(/ +/);
      var args = messagething.slice(1).join(' ')
      if (targetmember.nickname == null) {
          var alias = `${target.username}`
      } else {
          var alias = `${targetmember.nickname}`
      }
  
      if (targetmember.lastMessageID == null) {
          var messagelink = "**Recent Message:** (None Recorded)"
      } else {
          var lmess = targetmember.lastMessage.content;
          var smess = (lmess+'').slice(0, 20);
          var messagelink = `**Recent Message:** "[${smess} . . .](https://discord.com/channels/${message.guild.id}/${targetmember.lastMessageChannelID}/${targetmember.lastMessageID})"`
      }
  
      if (args.includes(`-s`)) {
        message.channel.send(`${target.username}'s Info (${alias})\n\n**Username:** ${target.tag}\n**ID:** ${target.id}\n**Acc. Creation:** ${pm(age, {verbose: true})} ago.\n${pm(joinage, {verbose: true})} ago.`)
        return;
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
              doingactivity = `${statusE}` + `\n🎮 Playing "${target.presence.activities.find(activity => activity.type === 'PLAYING').name.join(`" and "`)}"`
            }
          } else {
            doingactivity = statusE
          }
    
        message.channel.send({embed: {
          color: 0xFF2E00,
          title: `🤖 ${target.username}'s Info 🤖`,
          description: `**Bot Profile:** ${target}\n${messagelink}`,
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
              inline: true
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

      if (use == `description`) {
        message.channel.send({
          embed: {
            color: 0xff0000,
            title: `Bot Description`,
            description: `This bot has been made by Jgouken#4861, a singular person fully working on this bot.\n\nThe purpose of making this bot was for something to do. I take interest in raw coding (coding with plain text) instead of using Google Play Apps or things that "help" me make a bot. My DMs are constantly open to anyone and I hope you all are enjoying my bot!`,
          }
        })
      }

    } else

    if (command == 'invite') {
      message.channel.send({
        embed: {
          color: 0xff0000,
          title: `Bot/Server Invite`,
          description: `**WARNING:** This bot is in beta. Constant updates, shut downs, and borken commands are inevitable.`,
          fields: [
            {
              name: `Error Form`,
              value: `[Form Link](https://forms.gle/VoecbxRauPMcaH6d9)`
            },
            {
              name: `Add/View The Bot`,
              value: `[top.gg Link](https://top.gg/bot/700143008900841493)`
            },
            {
              name: `Bot Help Server`,
              value: `[Join Link](https://discord.gg/7jyVxc8)`
            },
          ],
        }
      })

      return;
    } else

    if (command === 'urban' || command === 'define' || command === 'word') {
      if (!message.channel.nsfw) return message.channel.send({
        embed: {
          color: 0xff0000,
          title: `Command Failure`,
          description: `Ah, you may wanna have this in an NSFW channel.\n\`\`\`diff\n- Not in an NSFW channel\`\`\``,
          footer: {
            text: `${message.author.tag}`,
            icon_url: `${message.author.avatarURL()}`,
          },
        }
      })
      var messagething = message.content.slice(PREFIX.length).split(/ +/);
      var args = messagething.slice(1).join(' ').trim()
      var failed = 0
      if (!args) return message.channel.send({
        embed: {
          color: 0xff0000,
          title: `Command Failure`,
          description: `Uh..."" isn't something I can look for.\n\`\`\`diff\n- Insufficient Arguments (word required)\`\`\``,
          footer: {
            text: `${message.author.tag}`,
            icon_url: `${message.author.avatarURL()}`,
          },
        }
      })

      const result = await urban(args.toLocaleLowerCase()).catch(e => {
        failed = 1
        message.channel.send({
          embed: {
            color: 3447003,
            title: `¯\\_(ツ)_/¯\nSorry, we couldn't find: ${args}`,
            description: `Try \`${PREFIX}urban butter\`\n\nThere are no definitions for [this word](https://www.urbandictionary.com/define.php?term=${args.replace(/ /g, '+')}).\n[Be the first to define it!](https://www.urbandictionary.com/add.php?word=${args.replace(/ /g, '+')})`
          }
        })

        return;
      })

      client.commands.get('urban').execute(message, args, result, failed, cooldown)
    } else

    if (command === 'info' || command === 'whois' || command === 'who' || command === 'i') {
      if (!(message.guild.me).hasPermission("READ_MESSAGE_HISTORY")) message.channel.send(`Unable to read message history.`);
      if (message.mentions.users.first()) {
        var targetmember = message.guild.member(message.mentions.users.first().id)
        var target = message.mentions.users.first()
    } else {
        var messagething = message.content.slice(global.PREFIX.length).split(/ +/);
        var args = messagething.slice(1, 2).join(' ')
        if (args) {
          if (args == `server`) {

            let guild = message.guild
      let now = Date.now();
      let createdAt = guild.createdTimestamp;
      let age = now - createdAt;
      var afkchan = `none`

      let invites = guild.fetchInvites()
      var inamount = (await invites).size

      if (guild.afkChannel != null) {
        afkchan = guild.afkChannel
      }

      message.channel.send({
        embed: {
          color: 0x3268a8,
          thumbnail: {
            url: guild.iconURL()
          },
          title: `Server Info`,
          description: `__Basic Details__\n**Name:** ${guild.name}\n**Owner:** ${(guild.owner.user).tag} (${(guild.owner.user).id})\n**ID:** ${guild.id}\n**Banner:** ${guild.bannerURL()}\n\n__Community & Partner Details__\n**Description:** ${guild.description}\n**Partnered:** ${guild.partnered.toString()}\n**Rules Channel:** <#${guild.rulesChannelID}>\n**AFK VChannel:** ${afkchan}\n\n__Guild Counts__\n**Member Count:** ${guild.memberCount}\n**Channel Count:** ${guild.channels.cache.size}\n **Emoji Count:** ${guild.emojis.cache.size}\n**Roles Count:** ${guild.channels.cache.size}\n**Boost Count:** ${guild.premiumSubscriptionCount} (Tier ${guild.premiumTier})\n\n__Other Details__\n**Verified:** ${guild.verified.toString()}\n**Invite Links:** ${inamount}\n**Creation Date:** ${pm(age, {verbose: true})} ago`,
        }
      })
      return;
          }

          targetmember = message.guild.member(args)
          target = bot.users.cache.get(args)
        }

        if (target == undefined || targetmember == undefined) {
            if (!args) {
              targetmember = message.guild.member(message.author.id);
              target = message.author;
            } else {
              message.channel.send({
                embed: {
                  color: 0xff0000,
                  title: `Command Failure`,
                  description: `Erm...I can't find that user.\n\`\`\`diff\n- User not found\`\`\``,
                  footer: {
                    text: `${message.author.tag}`,
                    icon_url: `${message.author.avatarURL()}`,
                  },
                }
              })
              return;
            }
          }
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

    var messagething = message.content.slice(global.PREFIX.length).split(/ +/);
    var args = messagething.slice(1).join(' ')
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
        var smess = (lmess+'').slice(0, 20);
        if (smess.length > 20) {
          var messagelink = `**Recent Message:** "[${smess}. . .](https://discord.com/channels/${message.guild.id}/${targetmember.lastMessageChannelID}/${targetmember.lastMessageID})"`
        } else{
          var messagelink = `**Recent Message:** "[${smess}](https://discord.com/channels/${message.guild.id}/${targetmember.lastMessageChannelID}/${targetmember.lastMessageID})"`
        }
    }

    if (args.includes(`-s`)) {
      message.channel.send(`${target.username}'s Info (${alias})\n\n**Username:** ${target.tag}\n**ID:** ${target.id}\n**Acc. Creation:** ${pm(age, {verbose: true})} ago.\n${pm(joinage, {verbose: true})} ago.`)
      return;
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
  
    if (target.id == '700143008900841493') {
      message.channel.send({embed: {
        color: 0xFF2E00,
        title: `🤖 ${target.username}'s Info 🤖`,
        description: `**Bot Profile:** ${target}\n${messagelink}\n**Profile Image:** [Link](${avatarurl})`,
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
            name: "__Description__",
            value: `This bot has been made by Jgouken#4861, a singular person fully working on this bot.\n\nThe purpose of making this bot was for something to do. I take interest in raw coding (coding with plain text) instead of using Google Play Apps or things that "help" me make a bot. My DMs are constantly open to anyone and I hope you all are enjoying my bot!`
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
        message.channel.send({embed: {
            color: 0x00CDFF,
            title: `🤖 ${target.username}'s Info 🤖`,
            description: `**Bot Profile:** ${target}\n${messagelink}\n**Profile Image:** [Link](${avatarurl})`,
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
                name: `__Bot Status__`,
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

    message.channel.send({embed: {
        color: 0xFFAA00,
        title: `${target.username}'s Info`,
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


    } else

    if (command === 'rps') {
      client.commands.get('rps').execute(message)
    } else

    if (command === 'hangman') {
      client.commands.get('hangman').execute(message)
    } else
    /* NOTES

    var messagething = message.content.slice(PREFIX.length).split(/ +/);
    var args = messagething.slice(1).join(' ')

    */
   message.channel.stopTyping()
  })

})


bot.login(process.env.TOKEN);