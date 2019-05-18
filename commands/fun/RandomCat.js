const { Command } = require('discord.js-commando');
const axios = require('axios');

class RandomCat extends Command {
  constructor(client) {
    super(client, {
      name: 'cat',
      group: 'fun',
      aliases: [ 'randomcat' ],
      memberName: 'randomcat',
      description: 'Get a random picture, GIF, or video of a cat.',
      clientPermissions: [ 'ATTACH_FILES' ],
      userPermissions: [ 'ATTACH_FILES' ]
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
