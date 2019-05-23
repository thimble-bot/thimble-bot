const { Command } = require('discord.js-commando');
const axios = require('axios');

class SiteUpCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'siteup',
      group: 'util',
      memberName: 'siteup',
      description: 'Checks whether a site is available and working.',
      aliases: [ 'checksite', 'checkwebsite', 'websitecheck', 'sitecheck', 'issiteup', 'isitup', 'isitdown' ],
      args: [
        {
          key: 'url',
          type: 'string',
          prompt: 'Please provide a valid URL.'
        }
      ]
    });
  }

  async check(url) {
    try {
      await axios.get(url, { timeout: 5000 });
      return 'OK';
    } catch (err) {
      if (err.response) {
        return 'BAD_RESPONSE';
      }
      return 'UNREACHABLE';
    }
  }

  async run(message, { url }) {
    try {
      const parsedURL = new URL(url);
      const status = await this.check(parsedURL.href);

      switch (status) {
        case 'OK':
          return message.say(':white_check_mark: Yep, this website works!');
        case 'BAD_RESPONSE':
          return message.say(':warning: The website is available, but it is returning a bad status code.');
        case 'UNREACHABLE':
          return message.say(':x: The provided website is not available.');
      }
    } catch (err) {
      return message.say(':x: Failed to perform the check. Maybe you have provided an invalid URL?');
    }
  }
};

module.exports = SiteUpCommand;
