import { Command } from 'discord-akairo';
import { Message, GuildEmoji } from 'discord.js';
import { success, warn } from '../../lib/serviceMessages';

class EmoteDeleteCommand extends Command {
  constructor() {
    super('emotedelete', {
      aliases: [ 'emotedelete', 'emotedel', 'emojidelete', 'emojidel' ],
      description: {
        detail: 'Delete an emote.',
        examples: [
          '`emojidel :some_emoji:` - Will delete "some_emoji" from the server'
        ]
      },
      args: [
        {
          id: 'emote',
          type: 'emoji',
          prompt: {
            start: 'Which emote are you wanting to delete?',
            retry: 'Invalid emote. Please try again.'
          }
        }
      ],
      channel: 'guild',
      userPermissions: [ 'MANAGE_EMOJIS' ],
      clientPermissions: [ 'MANAGE_EMOJIS' ]
    });
  }

  async exec(message: Message, { emote }: { emote: GuildEmoji }) {
    const target = message.guild?.emojis.resolve(emote);

    try {
      if (!target) {
        throw new Error();
      }

      await target.delete();
      return message.channel.send(success('Emote deleted successfully.'));
    } catch (err) {
      return message.channel.send(warn('Failed to delete the emote.'));
    }
  }
}

export default EmoteDeleteCommand;
