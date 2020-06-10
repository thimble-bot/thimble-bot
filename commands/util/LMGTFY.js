const { Command } = require('discord.js-commando');

const meta = {
  name: 'lmgtfy',
  description: 'Generate a "Let Me Google That For You" link.',
  args: [
    {
      key: 'query',
      type: 'string',
      prompt: 'What are you searching for?'
    }
  ],
  examples: [
    '`lmgtfy dentists` will return https://lmgtfy.com/?q=dentists'
  ]
};

class LMGTFYCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'util',
      memberName: 'lmgtfy'
    });
  }

  run(message, { query }) {
    query = encodeURIComponent(query);
    return message.say(`https://lmgtfy.com/?q=${query}`);
  }
};

module.exports = LMGTFYCommand;
module.exports.meta = meta;
