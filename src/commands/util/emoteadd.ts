import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { error, success, warn } from '../../lib/serviceMessages';

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
      return message.channel.send(warn('You need to provide an image to upload as an emote.'));
    }

    const existing = await message.guild?.emojis.cache.find(e => e.name === name);
    if (existing) {
      return message.channel.send(warn('An emote with that name already exists!'));
    }

    try {
      const emote = await message.guild?.emojis.create(image.url, name);
      return message.channel.send(success(`${emote} \`${name}\` added successfully!`));
    } catch (err) {
      return message.channel.send(error('Failed to upload the emote to the guild.'));
    }
  }
}

export default EmoteAddCommand;
