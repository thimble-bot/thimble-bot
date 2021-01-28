import { Command } from '../../../command';
import { Message } from 'discord.js';
import { toggleInteractable } from '../../../lib/interaction';
import { error, success } from '../../../lib/serviceMessages';

class ToggleBoopCommand extends Command {
  constructor() {
    super('toggleboop', {
      aliases: [ 'toggleboop', 'toggleboops', 'tb' ],
      channel: 'guild',
      description: 'Toggle boopable state.'
    });
  }

  async exec(message: Message) {
    try {
      const user = message.author.id;
      const guild = message.guild?.id as string;

      const newState = await toggleInteractable(user, guild, 'boop');

      return message.channel.send(success(
        `Boops have been ${newState ? 'enabled' : 'disabled'} successfully!`
      ));
    } catch (err) {
      return message.channel.send(error('Failed to toggle boop state.'));
    }
  }
}

export default ToggleBoopCommand;
