import { Command } from '../../command';
import { Message, MessageAttachment } from 'discord.js';

import ImageResizer from '../../lib/ImageResizer';

class UpscaleCommand extends Command {
  constructor() {
    super('upscale', {
      aliases: [ 'upscale' ],
      description: {
        detail: 'Upscale an image by a certain amount. Works best with pixel art. For anything else, it will be pixelated, but not too noticeably.',
        examples: [
          '`upscale 3` - upscale an image 3 times its original size'
        ]
      },
      args: [
        {
          id: 'scale',
          type: 'number',
          prompt: {
            start: 'Please provide the scale factor.',
            retry: 'Invalid scale factor.'
          }
        }
      ],
      clientPermissions: [ 'ATTACH_FILES' ],
      userPermissions: [ 'ATTACH_FILES' ]
    });
  }

  async exec(message: Message, { scale }: { scale: number }) {
    if (!message.attachments.size) {
      return this.error(message, 'Please provide an image to rescale.');
    }

    if (scale < 2) {
      return this.error(message, 'Minimum scale factor must be 2.');
    }

    const image = await message.attachments.first();

    if (!image) {
      return;
    }

    const resizer = new ImageResizer({
      id: image.id,
      url: image.url,
      originalWidth: image.width,
      originalHeight: image.height,
      width: image.width ? image.width * scale : undefined,
      resamplingMethod: 'nearest',
      extension: image.name?.split('.').pop() || 'png'
    });

    try {
      const resized = await resizer.resize();
      const filename = resizer.getFilename();

      const attachment = new MessageAttachment(resized, filename);
      return this.say(message, attachment);
    } catch (err) {
      return this.error(message, `Command failed with the following error:\n \`\`\`${err}\`\`\``);
    }
  }
}

export default UpscaleCommand;
