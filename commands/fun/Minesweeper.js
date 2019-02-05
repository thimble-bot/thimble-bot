const { Command } = require('discord.js-commando');
const Minesweeper = require('../../lib/Minesweeper');

class MinesweeperCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'minesweeper',
      group: 'fun',
      memberName: 'minesweeper',
      description: 'Play Minesweeper using Discord spoiler tags.',
      args: [
        {
          key: 'height',
          prompt: 'How many rows?',
          type: 'integer',
          min: 4,
          max: 20
        },
        {
          key: 'width',
          prompt: 'How many columns?',
          type: 'integer',
          min: 4,
          max: 20
        },
        {
          key: 'mines',
          prompt: 'How many mines?',
          type: 'integer',
          min: 1
        }
      ]
    });
  }

  async run(message, { height, width, mines }) {
    if (height * width <= mines * 2) {
      return message.say(':warning: You have provided too many mines for this field.');
    }

    const minesweeper = new Minesweeper(width, height, mines);

    try {
      const output = `Rows: \`${height}\`, columns: \`${width}\` (cells: \`${height * width}\`), mines: \`${mines}\`\n\n${minesweeper.start()}`;
      return message.say(output);
    } catch (err) {
      console.error(err);
      return message.say(':x: Something bad happened.');
    }
  }
};

module.exports = MinesweeperCommand;
