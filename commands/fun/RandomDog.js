const { Command } = require('discord.js-commando');
const axios = require('axios');

class RandomDog extends Command {
  constructor(client) {
    super(client, {
      name: 'dog',
      group: 'fun',
      aliases: [ 'randomdog' ],
      memberName: 'randomdog',
      description: 'Get a random picture, GIF, or video of a dog.'
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
