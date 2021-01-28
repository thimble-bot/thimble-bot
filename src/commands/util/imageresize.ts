import { Command } from '../../command';
import { Message, MessageAttachment } from 'discord.js';

import ImageResizer from '../../lib/ImageResizer';

class ImageResizeCommand extends Command {
  constructor() {
    super('imageresize', {
      aliases: [ 'imageresize', 'ir' ],
      description: {
        detail: 'Proportionally resize an image based on a new width (px). Works best with pixel art. For anything else, it will be pixelated, but not too noticeably.',
        examples: [
          '`ir 700` - proportionally resize an image, new width is 700 pixels'
        ]
      },
      args: [
        {
          id: 'width',
          type: 'number',
          prompt: {
            start: 'Please provide the new width of the image.',
            retry: 'Invalid width.'
          }
        }
      ],
      clientPermissions: [ 'ATTACH_FILES' ],
      userPermissions: [ 'ATTACH_FILES' ]
    });
  }

  async exec(message: Message, { width }: { width: number }) {
    if (!message.attachments.size) {
      return this.error(message, 'Please provide an image to rescale.');
    }

    if (width < 2) {
      return this.error(message, 'Minimum new width must be 2px.');
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
      width,
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

export default ImageResizeCommand;
