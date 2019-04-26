const { Command } = require('discord.js-commando');
const fs = require('fs');
const path = require('path');

class BeeMovieCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'beemovie',
      group: 'fun',
      memberName: 'beemovie',
      description: 'Get a random sentence from the Bee Movie script.'
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
