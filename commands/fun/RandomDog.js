const { Command } = require('discord.js-commando');
const axios = require('axios');

const meta = {
  name: 'dog',
  aliases: [ 'randomdog' ],
  description: 'Get a random picture, GIF, or video of a dog.'
};

class RandomDog extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'fun',
      memberName: 'randomdog',
      clientPermissions: [ 'ATTACH_FILES' ],
      userPermissions: [ 'ATTACH_FILES' ]
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
module.exports.meta = meta;
