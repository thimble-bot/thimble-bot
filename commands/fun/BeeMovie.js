const { Command } = require('discord.js-commando');
const fs = require('fs');
const path = require('path');

const meta = {
  name: 'beemovie',
  description: 'Get a random quote from the Bee Movie script.',
  aliases: [ 'b' ]
};

class BeeMovieCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'fun',
      memberName: 'beemovie',
      args: [
        {
          key: 'text',
          type: 'string',
          prompt: 'what search',
          default: ''
        }
      ]
    });
  }

  run(message, args) {
    const contents = fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'beemovie.txt'), {
      encoding: 'utf8'
    });

    let paragraphs = contents.split('\n\n');

    if (args.text && args.text.length) {
      paragraphs = paragraphs.filter(p => p.toLowerCase().includes(args.text.trim().toLowerCase()));
    }

    if (!paragraphs.length) {
      return message.say(':warning: No results found for your query');
    }

    const allParagraphsCount = paragraphs.length;
    const currentParagraphIdx = Math.floor(Math.random() * paragraphs.length);

    const randomParagraph = paragraphs[currentParagraphIdx].replace(/\n/g, ' ');

    if (args.text && args.text.length) {
      return message.say(`**Result \`${currentParagraphIdx + 1}\` of \`${allParagraphsCount}\`:**\n> ${randomParagraph}`);
    }

    return message.say(`> ${randomParagraph}`);
  }
};

module.exports = BeeMovieCommand;
module.exports.meta = meta;
