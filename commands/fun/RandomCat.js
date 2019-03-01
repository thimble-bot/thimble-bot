const { Command } = require('discord.js-commando');
const axios = require('axios');
const config = require('../../config');

class RandomCat extends Command {
  constructor(client) {
    super(client, {
      name: 'cat',
      group: 'fun',
      aliases: [ 'randomcat' ],
      memberName: 'randomcat',
      description: 'Get a random cat.',
      examples: [ `${config.bot.prefix}cat` ]
    });
  }

  run(message) {
    return axios.get('https://shibe.online/api/cats', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(({ data }) => message.say(data[0]))
      .catch(() => message.say('Failed to fetch kitty. :frowning:'));
  }
};

module.exports = RandomCat;
