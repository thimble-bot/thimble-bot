const { Command } = require('discord.js-commando');
const axios = require('axios');

const meta = {
  name: 'randombunny',
  description: 'Get a random GIF of a bunny.',
  aliases: [ 'bunny', 'randomrabbit', 'rabbit' ]
};

class RandomBunnyCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'fun',
      memberName: 'randombunny',
      clientPermissions: [ 'ATTACH_FILES' ],
      userPermissions: [ 'ATTACH_FILES' ]
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
module.exports.meta = meta;
