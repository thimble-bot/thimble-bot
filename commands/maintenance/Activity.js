const { Command } = require('discord.js-commando');
const config = require('../../config');

const meta = {
  name: 'activity',
  description: 'Change bot activity.',
  args: [
    {
      key: 'input',
      prompt: 'What should I play?',
      type: 'string'
    }
  ]
};

class Activity extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'maintenance',
      memberName: 'activity',
      guarded: true,
      ownerOnly: true
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
module.exports.meta = meta;
