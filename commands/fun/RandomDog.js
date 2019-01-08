const { Command } = require('discord.js-commando');
const axios = require('axios');
const config = require('../../config');

class RandomDog extends Command {
  constructor(client) {
    super(client, {
      name: 'dog',
      group: 'fun',
      aliases: [ 'randomdog' ],
      memberName: 'randomdog',
      description: 'Get a random dog.',
      examples: [ `${config.bot.prefix}dog` ]
    });
  }

  run(message) {
    return axios.get('https://random.dog/woof.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(({ data }) => message.say(data.url))
      .catch(() => message.say('Failed to fetch doggo. :frowning:'));
  }
};

module.exports = RandomDog;
