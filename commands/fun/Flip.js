const { Command } = require('discord.js-commando');

const meta = {
  name: 'flip',
  description: 'Flip a coin or just make a choice.',
  aliases: [ 'choice', 'coin' ],
  args: [
    {
      key: 'choices',
      type: 'string',
      prompt: 'provide choices',
      default: ''
    }
  ],
  examples: [
    '`flip` - flip a coin',
    '`choice play games | go outside | watch movie` - pick between 3 things'
  ]
};

class FlipCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'fun',
      memberName: 'flip'
    });
  }

  run(message, args) {
    let { choices } = args;
    let answers = [ 'head', 'tails' ];

    if (choices) {
      choices = choices
        .split('|').map(choice => choice.trim())
        .filter(choice => choice && choice.length);
    }

    if (choices.length >= 2) {
      answers = choices;
    }

    const choice = answers[Math.floor(Math.random() * answers.length)];

    return message.say(`**I flipped a coin and this is the result:**\n\`\`\`${choice}\`\`\``)
  }
}

module.exports = FlipCommand;
module.exports.meta = meta;
