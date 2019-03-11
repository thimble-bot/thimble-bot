const { Command } = require('discord.js-commando');
const config = require('../../config');

class Activity extends Command {
  constructor(client) {
    super(client, {
      name: 'activity',
      group: 'util',
      memberName: 'activity',
      description: 'Change bot activity.',
      guarded: true,
      ownerOnly: true,
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
