const { Command } = require('discord.js-commando');
const Chance = require('chance');
const { format } = require('date-fns');

const meta = {
  name: 'when',
  description: 'When will a certain event happen? (pRNG)'
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

  run(message, { input }) {
    const chance = new Chance(input); // seed
    const now = new Date();
    const rng = chance.date({
      min: now,
      max: new Date('2100')
    });

    const output = `That will happen on **${format(rng, 'dddd, MMMM D, YYYY h:mm a')}**.`;
    return message.say(output);
  }
};

module.exports = WhenCommand;
module.exports.meta = meta;
