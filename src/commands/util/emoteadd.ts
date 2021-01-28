import { Command } from '../../command';
import { Message } from 'discord.js';

class EmoteAddCommand extends Command {
  constructor() {
    super('emoteadd', {
      aliases: [ 'emoteadd', 'addemote', 'emojiadd', 'addemoji' ],
      description: {
        detail: 'Add an emote to the guild.',
        examples: [
          '`addemote thonk` (+ attached image) - Will upload the attached image as an emot called "thonk"'
        ]
      },
      args: [
        {
          id: 'name',
          prompt: {
            start: 'What do you want to call this emote?'
          }
        }
      ],
      channel: 'guild',
      userPermissions: [ 'MANAGE_EMOJIS' ],
      clientPermissions: [ 'MANAGE_EMOJIS' ]
    });
  }

  async exec(message: Message, { name }: { name: string }) {
    const image = await message.attachments.first();

    if (!image) {
      return this.warn(message, 'You need to provide an image to upload as an emote.');
    }

    const existing = await message.guild?.emojis.cache.find(e => e.name === name);
    if (existing) {
      return this.warn(message, 'An emote with that name already exists!');
    }

    try {
      const emote = await message.guild?.emojis.create(image.url, name);
      return this.success(message, `${emote} \`${name}\` added successfully!`);
    } catch (err) {
      return this.error(message, 'Failed to upload the emote to the guild.');
    }
  }
}

export default EmoteAddCommand;
