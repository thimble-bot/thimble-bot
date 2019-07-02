const { Command } = require('discord.js-commando');
const flame = require('flame-game');

const meta = {
  name: 'flame',
  description: 'Flame game. Game rules: https://www.wikihow.com/Play-%22Flame%22#Playing_FLAME_sub',
  args: [
    {
      key: 'names',
      prompt: 'Please provide two names, separated by comma.',
      type: 'string'
    }
  ],
  aliases: [ 'flamegame' ],
  examples: [
    '`flame Joe, Missy`'
  ]
};

class FlameCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      memberName: 'flame',
      group: 'fun'
    });
  }

  run(message, { names }) {
    names = names.split(',').map(n => n.trim());

    if (names.length !== 2) {
      return message.say(':warning: You must provide two names.');
    }

    const result = flame(names[0], names[1]);

    return message.say(`The relationship between ${result.firstName} and ${result.secondName} is **${result.relationship}**!`);
  }
};

module.exports = FlameCommand;
module.exports.meta = meta;
