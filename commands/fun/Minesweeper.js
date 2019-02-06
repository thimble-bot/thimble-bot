const { Command } = require('discord.js-commando');
const Minesweeper = require('discord.js-minesweeper');

class MinesweeperCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'minesweeper',
      group: 'fun',
      memberName: 'minesweeper',
      description: 'Play Minesweeper using Discord spoiler tags.',
      args: [
        {
          key: 'rows',
          prompt: 'How many rows?',
          type: 'integer',
          min: 4,
          max: 12
        },
        {
          key: 'columns',
          prompt: 'How many columns?',
          type: 'integer',
          min: 4,
          max: 12
        },
        {
          key: 'mines',
          prompt: 'How many mines?',
          type: 'integer',
          min: 1
        },
        {
          key: 'plaintext',
          prompt: 'Do you want a copiable version?',
          type: 'integer',
          default: 0
        }
      ]
    });
  }

  async run(message, { rows, columns, mines, plaintext }) {
    if (rows * columns <= mines * 2) {
      return message.say(':warning: You have provided too many mines for this field.');
    }

    const returnType = plaintext === 0
      ? 'emoji'
      : 'code';

    const minesweeper = new Minesweeper({ rows, columns, mines, returnType });

    try {
      const output = `Rows: \`${rows}\`, columns: \`${columns}\` (cells: \`${rows * columns}\`), mines: \`${mines}\`\n\n${minesweeper.start()}`;
      return message.say(output);
    } catch (err) {
      return message.say(':x: Something bad happened.');
    }
  }
};

module.exports = MinesweeperCommand;
