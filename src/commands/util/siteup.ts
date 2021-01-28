import axios from 'axios';
import { Command } from '../../command';
import { Message } from 'discord.js';

import { warn, error } from '../../lib/serviceMessages';

enum Response {
  OK,
  BAD_RESPONSE,
  UNAVAILABLE
};

export default class SiteupCommand extends Command {
  constructor() {
    super('siteup', {
      aliases: [ 'siteup', 'checksite', 'isitup', 'isitdown' ],
      description: {
        detail: 'Checks whether a site is available and working.',
        examples: [
          '`siteup https://suu-no-nikki.com`'
        ]
      },
      args: [
        {
          id: 'url',
          type: 'url',
          prompt: {
            start: warn('Please provide a URL.'),
            retry: error('Invalid URL.')
          }
        }
      ]
    });
  }

  async check(url: string): Promise<Response> {
    try {
      await axios.get(url, { timeout: 5000 });
      return Response.OK;
    } catch (err) {
      if (err.response) {
        return Response.BAD_RESPONSE;
      }

      return Response.UNAVAILABLE;
    }
  }

  async exec(message: Message, { url }: { url: URL }) {
    const status = await this.check(url.href);

    switch (status) {
      case Response.OK:
        return this.success(message, 'The requested website is available.');
      case Response.BAD_RESPONSE:
        return this.warn(message, 'The website is available, but it is returning a bad status code.');
      case Response.UNAVAILABLE:
        return this.error(message, 'The provided website is not available.');
    }
  }
}
