const { Command } = require('discord.js-commando');
const config = require('../../config');

class Activity extends Command {
  constructor(client) {
    super(client, {
      name: 'activity',
      group: 'utils',
      memberName: 'activity',
      description: 'Change bot activity.',
      examples: [ `${config.bot.prefix}activity with an owl beanie` ],
      args: [
        {
          key: 'input',
          prompt: 'What should I play?',
          type: 'string'
        }
      ]
    });
  }

  async run(message, { input }) {
    if (message.author.id !== config.bot.owner) {
      return message.say(':warning: Only the bot owner can perform this action.');
    }

    if (input === 'reset') {
      input = config.bot.activity;
    }

    this.client.user.setActivity(input);

    const success = await message.say('Done!');
    setTimeout(() => {
      success.delete();
      message.delete();
    }, 3000);

    return null;
  }
};

module.exports = Activity;
