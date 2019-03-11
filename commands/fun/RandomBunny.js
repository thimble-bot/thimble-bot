const { Command } = require('discord.js-commando');
const axios = require('axios');

class RandomBunnyCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'randombunny',
      group: 'fun',
      memberName: 'randombunny',
      description: 'Get a random GIF of a bunny.',
      aliases: [ 'bunny', 'randomrabbit', 'rabbit' ]
    });
  }

  run(message) {
    return axios.get('https://api.bunnies.io/v2/loop/random/?media=gif', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(({ data }) => message.say(data.media.gif))
      .catch(() => message.say(':x: Failed to fetch bunny. :frowning:'));
  }
};

module.exports = RandomBunnyCommand;
