const { Command } = require('discord.js-commando');
const path = require('path');
const fs = require('fs');

class ScreenshotCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'screenshot',
      memberName: 'screenshot',
      description: 'Create a screenshot of a website (height is limited to 6000px).',
      group: 'util',
      args: [
        {
          key: 'url',
          type: 'string',
          prompt: 'Please provide a URL.'
        }
      ],
      throttling: {
        usages: 1,
        duration: 120
      },
      clientPermissions: [ 'ATTACH_FILES' ],
      userPermissions: [ 'ATTACH_FILES' ]
    });
  }

  getName(id) {
    return `screenshot_${Date.now()}_${id}.png`;
  }

  async run(message, { url }) {
    try {
      const waitMessage = await message.say(':hourglass: Creating screenshot... Please wait!');

      const page = await global.browser.newPage();
      await page.goto(url);

      const html = await page.$('html');
      const boundingBox = await html.boundingBox();

      const height = boundingBox.height > 6000
        ? 6000
        : parseInt(boundingBox.height, 10);

      await page.setViewport({
        width: 1920,
        height
      });

      const screenshotName = this.getName(message.id);
      const screenshotPath = path.join(__dirname, '..', '..', 'temp', screenshotName);

      await page.screenshot({
        path: screenshotPath
      });

      return message.say('', {
        file: {
          attachment: screenshotPath,
          name: screenshotName
        }
      })
        .then(function () {
          return fs.unlinkSync(screenshotPath);
        })
        .then(function () {
          return waitMessage.delete();
        });
    } catch (err) {
      console.error(err);
      return message.say(':x: Failed to create screenshot.');
    }
  }
};

module.exports = ScreenshotCommand;
