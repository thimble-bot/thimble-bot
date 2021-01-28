import { Command } from '../../command';
import { CommandOptions } from 'discord-akairo';
import { Message } from 'discord.js';
import { InteractionType } from '../../models/Interaction';
import { toggleInteractable } from '../interaction';
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

      return this.success(
        message,
        fmt(this.successMessage, newState ? 'enabled' : 'disabled')
      );
    } catch (err) {
      return this.error(message, `Failed to toggle ${this.type} state.`);
    }
  }
}

export default ToggleInteractionCommand;
