import { Command } from '../../command';
import { Message, GuildEmoji } from 'discord.js';

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
      return this.success(message, 'Emote deleted successfully.');
    } catch (err) {
      return this.warn(message, 'Failed to delete the emote.');
    }
  }
}

export default EmoteDeleteCommand;
