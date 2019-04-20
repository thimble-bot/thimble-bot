const { Command } = require('discord.js-commando');

class StalinSortCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'stalinsort',
      group: 'fun',
      memberName: 'stalinsort',
      description: 'Sort numbers using the O(n) Stalin Sort algorithm. Numbers must be separated by space.',
      examples: [ '`stalinsort 7 6 2 1 9 2 4`' ],
      args: [
        {
          key: 'numbers',
          prompt: 'What numbers do you want to sort (separated by space)?',
          type: 'string'
        }
      ]
    });
  }

  areAllNumbers(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (isNaN(arr[i])) {
        return false;
      }

      const num = parseInt(arr[i], 10);

      if (num >= Number.MAX_SAFE_INTEGER || num <= Number.MIN_SAFE_INTEGER) {
        return false;
      }
    }

    return true;
  }

  stalinSort(arr) {
    let max = Number.MIN_SAFE_INTEGER;
    const result = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] >= max) {
        max = arr[i];
        result.push(arr[i]);
      }
    }

    return result;
  }

  run(message, { numbers }) {
    const split = numbers.match(/\b(\w+)\b/g);

    if (!split || !this.areAllNumbers(split)) {
      return message.say(':warning: Please provide valid numbers.');
    }

    const input = split.map(n => parseInt(n, 10));

    const result = this.stalinSort(input);

    return message.say('`' + result.join(' ') + '`');
  }
};

module.exports = StalinSortCommand;
