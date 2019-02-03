const { Command } = require('discord.js-commando');

class EmojiDelete extends Command {
  constructor(client) {
    super(client, {
      name: 'emojidelete',
      aliases: [ 'emojidel', 'emotedel', 'emotedelete' ],
      group: 'utils',
      memberName: 'emojidelete',
      description: 'Delete an emoji.',
      userPermissions: [ 'MANAGE_EMOJIS' ],
      clientPermissions: [ 'MANAGE_EMOJIS' ],
      args: [
        {
          key: 'emote',
          prompt: 'Which emote do you want to delete?',
          type: 'string'
        }
      ]
    });
  }

  async run(message, { emote }) {
    if (emote.match(/<a?:([a-zA-Z])+\w:([0-9])+\w>/g)) {
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
