import { Command } from 'discord-akairo';
import { Message, Util, MessageAttachment } from 'discord.js';

import { parse as parseTwemoji } from 'twemoji-parser';
import { getName as getEmojiName } from 'emoji-dictionary';

import sharp from 'sharp';

import axios from 'axios';
import { error, warn } from '../../lib/serviceMessages';

class EmojiCommand extends Command {
  constructor() {
    super('emoji', {
      aliases: [ 'emoji', 'e', 'emote', 'getemoji', 'getemote' ],
      description: {
        detail: 'Get the full-size version of an emoji/emote.',
        exam: [
          '`e :stuck_out_tongue:`'
        ]
      },
      args: [
        {
          id: 'emoji',
          prompt: {
            start: 'What emote/emoji are you interested in?'
          }
        }
      ],
      channel: 'guild',
      clientPermissions: [ 'ATTACH_FILES' ],
      userPermissions: [ 'ATTACH_FILES' ]
    });
  }

  async exec(message: Message, { emoji }: { emoji: string }) {
    const target = Util.parseEmoji(emoji);

    if (!target) {
      return message.channel.send(warn('Please provide a valid emoji/emote.'));
    }

    if (target.id) {
      const extension = target.animated ? 'gif' : 'png';
      const attachment = new MessageAttachment(`https://cdn.discordapp.com/emojis/${target.id}.${extension}`, `${target.name}.${extension}`);
      return message.channel.send(attachment);
    }

    const twemoji = parseTwemoji(emoji)[0];
    const emojiName = getEmojiName(emoji);

    if (!emojiName) {
      return message.channel.send(warn('Please provide a valid emoji/emote.'));
    }

    try {
      const { data } = await axios.get(twemoji.url, { responseType: 'arraybuffer' });

      const buffer = await sharp(data, { density: 1024 })
        .resize(512, 512, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toBuffer();

      const attachment = new MessageAttachment(buffer, `${emojiName}.png`);
      return message.channel.send(attachment);
    } catch (err) {
      return message.channel.send(error('Something bad happened while fetching the emote/emoji.'));
    }
  }
}

export default EmojiCommand;
