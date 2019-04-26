// pretty dumb at the moment, but I do consider
// improving this in the future

const { Command } = require('discord.js-commando');

class ShipCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ship',
      group: 'fun',
      memberName: 'ship',
      description: 'Get the love compatibility of two people. The values must be separated by " x ".',
      examples: [
        '`ship Joe x Pizza`'
      ],
      args: [
        {
          key: 'input',
          prompt: 'Please provide someone to ship.',
          type: 'string'
        }
      ]
    });
  }

  isValidQuery(input) {
    const split = input.split(' x ');

    if (split.length !== 2) {
      return false;
    }

    if (!split[0].trim() || !split[1].trim()) {
      return false;
    }

    return true;
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
    if (!this.isValidQuery(input)) {
      return message.say(':warning: The arguments you have provided are invalid. The correct form is `person1 x person2`.');
    }

    const subjects = input.split(' x ').map(s => s.trim());

    const compatibility = this.calculate(subjects);

    return message.say(`The ship compatibility between ${subjects[0]} and ${subjects[1]} is ${compatibility}%.`);
  }
};

module.exports = ShipCommand;
