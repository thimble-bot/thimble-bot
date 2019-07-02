const { Command } = require('discord.js-commando');
const axios = require('axios');

const meta = {
  name: 'bird',
  aliases: [ 'randombird', 'birb', 'randombirb' ],
  description: 'Get a random picture, GIF, or video of a bird.'
};

class RandomBird extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      memberName: 'bird',
      group: 'fun',
      clientPermissions: [ 'ATTACH_FILES' ],
      userPermissions: [ 'ATTACH_FILES' ]
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
module.exports.meta = meta;
