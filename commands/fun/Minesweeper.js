const { Command } = require('discord.js-commando');
const Minesweeper = require('discord.js-minesweeper');

const meta = {
  name: 'minesweeper',
  description: 'Play Minesweeper using Discord spoiler tags.',
  examples: [
    '`minesweeper 8 8 20` - Generate an 8x8 Minesweeper field with 20 mines',
    '`minesweeper 8 8 20 1` - Generate the code for an 8x8 Minesweeper field with 20 mines'
  ],
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
};

class MinesweeperCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'fun',
      memberName: 'minesweeper'
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
module.exports.meta = meta;
