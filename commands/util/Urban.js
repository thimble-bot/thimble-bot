const { Command } = require('discord.js-commando');
const Urban = require('../../lib/Urban');

const Raven = require('raven');

const meta = {
  name: 'urban',
  description: 'Find the definition of something in Urban Dictionary.',
  args: [
    {
      key: 'word',
      type: 'string',
      default: '',
      prompt: 'n/a',
    },
  ],
  examples: [ '`urban owo` - will return the definition of "owo"' ]
}

class UrbanCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'urban',
      memberName: 'urban',
      group: 'util',
      ...meta
    });
  }

  async run(message, { word }) {
    if (!word) {
      return message.say(
        ':warning: Please provide something to search for.',
      );
    }

    try {
      const urban = await new Urban({
        word,
        user: this.client.user,
      }).init();

      return message.say(urban);
    } catch (err) {
      message.say(':x: Failed to find the definition.');
      Raven.captureException(err);
    }
  }
}

module.exports = UrbanCommand;
module.exports.meta = meta;
