import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { success } from '../../lib/serviceMessages';

class ActivityCommand extends Command {
  constructor() {
    super('activity', {
      aliases: [ 'activity' ],
      ownerOnly: true,
      description: 'Set the bot\'s activity.',
      args: [
        {
          id: 'activity',
          match: 'content',
          prompt: {
            start: 'What should my new activity be?'
          }
        }
      ]
    });
  }

  async exec(message: Message, { activity }: { activity: string }) {
    await this.client.user?.setActivity(activity);
    return message.channel.send(success('Done!'));
  }
}

export default ActivityCommand;
