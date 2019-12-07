const { Command } = require('discord.js-commando');

const meta = {
  name: 'dice',
  description: 'Roll a dice.',
  aliases: [ 'd' ],
  args: [
    {
      key: 'sides',
      type: 'string',
      prompt: 'give sides',
      default: ''
    }
  ],
  examples: [
    '`dice` - roll a dice with 6 sides',
    '`dice 10` - roll a dice with 10 sides'
  ]
};

class DiceCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'fun',
      memberName: 'dice'
    });
  }

  run(message, args) {
    const { sides } = args;
    const limit = parseInt(sides) || 6;
    return message.say(`I rolled \`${Math.floor(Math.random() * Math.abs(limit) + 1)}\`.`);
  }
}

module.exports = DiceCommand;
module.exports.meta = meta;
