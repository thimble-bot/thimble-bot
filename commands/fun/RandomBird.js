const { Command } = require('discord.js-commando');
const axios = require('axios');

class RandomBird extends Command {
  constructor(client) {
    super(client, {
      name: 'bird',
      group: 'fun',
      aliases: [ 'randombird', 'birb', 'randombirb' ],
      memberName: 'randombird',
      description: 'Get a random picture, GIF, or video of a bird.'
    });
  }

  run(message) {
    return axios.get('https://shibe.online/api/birds', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(({ data }) => message.say(data[0]))
      .catch(() => message.say('Failed to catch the bird. :frowning:'));
  }
};

module.exports = RandomBird;
