const { Command } = require('discord.js-commando');
const fs = require('fs');
const path = require('path');

const meta = {
  name: 'screenshot',
  description: 'Create a screenshot of a website (height is limited to 6000px).',
  examples: [
    '`screenshot https://bot.thimble.cx`'
  ]
};

function stringIncludesAny(str, options) {
  for (let i in options) {
    if (str.includes(options[i])) {
      return true;
    }
  }

  return false;
}

class ScreenshotCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      memberName: 'screenshot',
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

    this.loadingMessage = null;
  }

  getName(id) {
    return `screenshot_${Date.now()}_${id}.png`;
  }

  parseUrl(url) {
    if (url.startsWith('<') && url.endsWith('>')) {
      url = url.slice(1, -1);
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `http://${url}`;
    }

    if (stringIncludesAny(url, [
      '://localhost',
      '://127.0.0.1',
      '://0.0.0.0',
      '://192.'
    ])) {
      return false;
    }

    if (url.match(/data:([a-zA-Z0-9]+)\/([a-zA-Z0-9]+)/g)) {
      return false;
    }

    return url;
  }

  async run(message, { url }) {
    url = this.parseUrl(url);

    if (!url) {
      return message.say(':x: You have provided an invalid url.');
    }

    try {
      this.loadingMessage = await message.say(':hourglass: Creating screenshot... Please wait!');

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
          return this.loadingMessage.delete();
        }.bind(this));
    } catch (err) {
      return message.say(':x: Failed to create screenshot.')
        .then(function () {
          if (this.loadingMessage) {
            this.loadingMessage.delete();
          }
        }.bind(this));
    }
  }
};

module.exports = ScreenshotCommand;
module.exports.meta = meta;
