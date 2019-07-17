const { Command } = require('discord.js-commando');
const Chance = require('chance');
const chance = new Chance();
const { format } = require('date-fns');

const meta = {
  name: 'when',
  description: 'When will a certain event happen? (RNG)'
};

class WhenCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      memberName: 'when',
      group: 'fun',
      args: [
        {
          key: 'input',
          type: 'string',
          prompt: 'What are you interested in?'
        }
      ]
    });
  }

  run(message) {
    const now = new Date();
    const rng = chance.date({
      min: now,
      max: new Date('3000')
    });

    const output = `That will happen on **${format(rng, 'dddd, MMMM D, YYYY h:mm a')}**.`;
    return message.say(output);
  }
};

module.exports = WhenCommand;
module.exports.meta = meta;
