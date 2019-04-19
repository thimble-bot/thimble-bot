const { Command } = require('discord.js-commando');

class LMGTFYCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'lmgtfy',
      group: 'util',
      memberName: 'lmgtfy',
      description: 'Generate a "Let Me Google That For You" link.',
      args: [
        {
          key: 'query',
          type: 'string',
          prompt: 'What are you searching for?'
        }
      ]
    });
  }

  run(message, { query }) {
    query = encodeURIComponent(query);
    return message.say(`https://lmgtfy.com/?q=${query}`);
  }
};

module.exports = LMGTFYCommand;
