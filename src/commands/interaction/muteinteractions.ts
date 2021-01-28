import { Command } from '../../command';
import { Message } from 'discord.js';
import { toggleInteractable } from '../../lib/interaction';

class MuteInteractionsCommand extends Command {
  constructor() {
    super('muteinteractions', {
      aliases: [ 'muteinteractions', 'mute-interactions', 'mi' ],
      channel: 'guild',
      description: 'Mute interactions without disabling them.'
    });
  }

  async exec(message: Message) {
    try {
      const user = message.author.id;
      const guild = message.guild?.id as string;

      const newState = await toggleInteractable(user, guild, 'mute');

      return this.success(
        message,
        `Interactions have been ${newState ? 'unmuted' : 'muted'} successfully!`
      );
    } catch (err) {
      return this.error(message, 'Failed to toggle mute state.');
    }
  }
}

export default MuteInteractionsCommand;
