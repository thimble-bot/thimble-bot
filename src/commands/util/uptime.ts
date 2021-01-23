import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

import formatDistance from 'date-fns/formatDistance';

class UptimeCommand extends Command {
  constructor() {
    super('uptime', {
      aliases: [ 'uptime' ],
      description: 'Get the bot\'s uptime.'
    });
  }

  exec(message: Message) {
    const uptime = process.uptime();

    return message.channel.send(
      `:stopwatch: \`${formatDistance(uptime * 1000, 0, { includeSeconds: true })}\``
    );
  }
}

export default UptimeCommand;
