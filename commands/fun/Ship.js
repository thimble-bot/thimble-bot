const { Command } = require('discord.js-commando');

const meta = {
  name: 'ship',
  description: 'Get the love compatibility of two people. The values must be separated by " x " or " and ".',
  examples: [
    '`ship Joe x Pizza`',
    '`ship Joe and Pizza`'
  ],
  args: [
    {
      key: 'input',
      prompt: 'Please provide someone to ship.',
      type: 'string'
    }
  ]
};

class ShipCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'fun',
      memberName: 'ship'
    });
  }

  parseQuery(input) {
    return input.match(/ x | and /);
  }

  calculate(subjects) {
    let shipNumber = 0;

    subjects.forEach(subject => {
      subject = subject.toLowerCase();

      for (let i = 0; i < subject.length; i++) {
        shipNumber += subject.charCodeAt(i);
      }
    });

    return shipNumber % 100;
  }

  run(message, { input }) {
    const query = this.parseQuery(input);

    if (!query) {
      return message.say(':warning: The arguments you have provided are invalid. The correct form is `person1 x person2` or `person1 and person2`.');
    }

    const separator = query[0];

    if (!separator) {
      return message.say(':warning: Failed to parse your input.');
    }

    const subjects = input.split(separator).map(s => s.trim());

    if (subjects.length !== 2) {
      return message.say(':warning: Too many arguments provided. Please enter only two.');
    }

    const compatibility = this.calculate(subjects);

    return message.say(`The ship compatibility of ${subjects[0]} ${separator.trim()} ${subjects[1]} is ${compatibility}%.`);
  }
};

module.exports = ShipCommand;
module.exports.meta = meta;
