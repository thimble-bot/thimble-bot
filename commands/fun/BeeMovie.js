const { Command } = require('discord.js-commando');
const fs = require('fs');
const path = require('path');

const meta = {
  name: 'beemovie',
  description: 'Get a random quote from the Bee Movie script.'
};

class BeeMovieCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'fun',
      memberName: 'beemovie'
    });
  }

  run(message) {
    const contents = fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'beemovie.txt'), {
      encoding: 'utf8'
    });

    const paragraphs = contents.split('\n\n');
    const randomParagraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];

    return message.say(randomParagraph);
  }
};

module.exports = BeeMovieCommand;
module.exports.meta = meta;
