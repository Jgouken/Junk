module.exports = {
    name: 'ping',
    execute(message) {
        message.channel.send("Pinging...").then(m =>{
            var ping = m.createdTimestamp - message.createdTimestamp;

            m.edit(`Entering my awesomely correct answers...`);

            if (ping <= 100) {
                m.edit({embed: {
                  color: 15105570,
                  title: `Ding! Oh wait, was I supposed to say Pong?`,
                  description: `There's a ${ping}ms delay! You can't even keep up.`,
                }
              })
            }
            if (ping > 100 && ping <= 200) {
                m.edit({embed: {
                  color: 15105570,
                  title: `Pop!`,
                  description: `There's a ${ping}ms delay! There goes the weasel...`,
                }
              })
            }
            if (ping > 200) {
                m.edit({embed: {
                  color: 15105570,
                  title: `Tick Tock on the clock.`,
                  description: `There's a ${ping}ms delay. Beep Beep, I'm not turning these speakers up some more..`,
                }
              })
            }
        });
    }
}