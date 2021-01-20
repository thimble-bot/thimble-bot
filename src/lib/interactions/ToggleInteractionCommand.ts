import { Command, CommandOptions } from 'discord-akairo';
import { Message } from 'discord.js';
import { InteractionType } from '../../models/Interaction';
import { toggleInteractable } from '../interaction';
import { error, success } from '../serviceMessages';
import fmt from '../fmt';

class ToggleInteractionCommand extends Command {
  type: InteractionType;

  successMessage: string = '%s';

  constructor(id: InteractionType, opts: CommandOptions) {
    super(`toggle-${id}`, {
      ...opts,
      channel: 'guild'
    });

    this.type = id;
  }

  async exec(message: Message) {
    try {
      const user = message.author.id;
      const guild = message.guild?.id as string;

      const newState = await toggleInteractable(user, guild, this.type);

      return message.channel.send(success(
        fmt(this.successMessage, newState ? 'enabled' : 'disabled')
      ));
    } catch (err) {
      console.error(err);
      return message.channel.send(error(`Failed to toggle ${this.type} state.`));
    }
  }
}

export default ToggleInteractionCommand;
