import { Command } from '../../command';
import { Message } from 'discord.js';

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
    return this.success(message, 'Done!');
  }
}

export default ActivityCommand;
