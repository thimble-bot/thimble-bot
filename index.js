const Discord = require('discord.js');
const dinky = require('dinky.js');

const config = require('./config');

const client = new Discord.Client();

client.on('ready', () => {
  console.log('Bot started...');

  if (config.bot.activity) {
    client.setActivity('zzzzZzZZZzzZZzzZZzzZZZ');
  }
});

client.on('message', async message => {
  if (message.content.startsWith('.')) {
    const rand = Math.floor(Math.random() * 1e6);

    if (rand % 2 === 1 && `${rand}`.length === 5 && parseInt(`${rand}`[0], 10) % 2 === 0) {
      const image = await dinky().search([ 'safe' ]).random();
      return message.channel.send('', {
        file: {
          attachment: `https:${image.image}`,
          name: `happy-april-1st.${image.image.split('.').pop()}`
        }
      });
    }

    const messages = [
      'Nooooo, i\'m tired, leave me alone :(',
      'Can\'t you do it yourself though? Learn how here: <https://thimblebot.xyz/custom-commands>',
      'No.',
      'just 5 more minutes, please........',
      'stop that.',
      'do you not have anything better to do?',
      'jesus christ, i cant get a moment\'s peace around here, can i?'
    ];

    return message.channel.send(messages[Math.floor(Math.random() * messages.length)]);
  }
});

client.login(config.bot.token);
