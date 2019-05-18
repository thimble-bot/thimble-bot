const { Command } = require('discord.js-commando');
const ImageResize = require('../../lib/ImageResize');

class ImageResizeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'imageresize',
      group: 'util',
      memberName: 'imageresize',
      aliases: [ 'ir' ],
      description: 'Proportionally resize an image based on a new width (px). Works best with pixel art. For anything else, it will be pixelated, but not too noticeably.',
      examples: [ '`upscale 700` - proportionally resize an image, new width is 700 pixels' ],
      args: [
        {
          key: 'width',
          prompt: 'New width of the image:',
          type: 'integer',
          min: 2
        }
      ],
      clientPermissions: [ 'ATTACH_FILES' ],
      userPermissions: [ 'ATTACH_FILES' ]
    });
  }

  async run(message, { width }) {
    if (!message.attachments.size) {
      return message.say(':warning: Please provide an image.');
    }

    const image = await message.attachments.first();
    const resizer = new ImageResize({
      id: image.id,
      url: image.url,
      originalWidth: image.width,
      originalHeight: image.height,
      width,
      resamplingMethod: 'nearest',
      message,
      extension: image.filename.split('.').pop()
    });

    return resizer.init();
  }
};

module.exports = ImageResizeCommand;
