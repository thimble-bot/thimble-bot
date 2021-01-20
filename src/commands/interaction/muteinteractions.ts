import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { toggleInteractable } from '../../lib/interaction';
import { error, success } from '../../lib/serviceMessages';

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

      return message.channel.send(success(
        `Interactions have been ${newState ? 'unmuted' : 'muted'} successfully!`
      ));
    } catch (err) {
      console.error(err);
      return message.channel.send(error('Failed to toggle mute state.'));
    }
  }
}

export default MuteInteractionsCommand;
