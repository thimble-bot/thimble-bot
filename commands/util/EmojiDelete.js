const { Command } = require('discord.js-commando');

const meta = {
  name: 'emojidelete',
  aliases: [ 'emojidel', 'emotedel', 'emotedelete' ],
  description: 'Delete an emoji.',
  examples: [ '`emojidel :some_emoji:` - Will delete "some_emoji" from the server' ],
  args: [
    {
      key: 'emote',
      prompt: 'Which emote do you want to delete?',
      type: 'string'
    }
  ]
};

class EmojiDelete extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'util',
      memberName: 'emojidelete',
      guildOnly: true,
      userPermissions: [ 'MANAGE_EMOJIS' ],
      clientPermissions: [ 'MANAGE_EMOJIS' ]
    });
  }

  async run(message, { emote }) {
    if (emote.match(/<a?:([a-zA-Z0-9_])+\w:([0-9])+\w>/g)) {
      // matches: <:emotename:12345>, <a:emotename:12345>
      emote = emote.split(':')[1];
    }

    const target = await message.guild.emojis.find(e => e.name === emote);

    if (!target) {
      return message.say(':warning: Emote not found.');
    }

    message.guild.deleteEmoji(target);

    return message.say('Emote deleted successfully!');
  }
};

module.exports = EmojiDelete;
module.exports.meta = meta;
