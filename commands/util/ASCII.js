const { Command } = require('discord.js-commando');
const figlet = require('figlet');

const meta = {
  name: 'ascii',
  description: 'Convert text into ASCII.',
  args: [
    {
      key: 'text',
      type: 'string',
      prompt: 'Please provide the text you want to ASCII-ify.'
    }
  ],
  examples: [
    '`ascii hello` - will print "hello" using figlet\'s Big font'
  ]
};

class ASCIICommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'util',
      memberName: 'ascii'
    });
  }

  run(message, { text }) {
    if (text.length < 2 || text.length > 30) {
      return message.say(':x: The text length must be between 2 and 30.');
    }

    const ascii = figlet.textSync(text, {
      font: 'Big',
      horizontalLayout: 'universal smushing',
      verticalLayout: 'universal smushing'
    });

    return message.say(`\`\`\`${ascii}\`\`\``);
  }
};

module.exports = ASCIICommand;
module.exports.meta = meta;
