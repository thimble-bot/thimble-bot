import { Command, CommandOptions } from 'discord-akairo';
import { Message, User } from 'discord.js';
import { countMemberInteractions } from '../interaction';
import { error, info } from '../serviceMessages';
import fmt from '../fmt';
import { InteractionType } from '../../models/Interaction';

class InteractionCountCommand extends Command {
  type: InteractionType;

  neverInteracted: string = '%%';
  onceInteracted: string = '%%';
  normalOutput: string = '%% %%';

  constructor(id: InteractionType, opts: CommandOptions) {
    super(`${id}-count`, {
      ...opts,
      channel: 'guild'
    });

    this.type = id;
  }

  generateMessage(user: User, count: number) {
    if (count === 0) {
      return fmt(this.neverInteracted, user.toString());
    }

    if (count === 1) {
      return fmt(this.onceInteracted, user.toString());
    }

    return fmt(this.normalOutput, user.toString(), count);
  }

  async exec(message: Message) {
    try {
      const user = message.author.id;
      const guild = message.guild?.id as string;

      const count = await countMemberInteractions(guild, user, this.type);
      const response = this.generateMessage(message.author, count);

      return message.channel.send(info(response));
    } catch (err) {
      console.error(err);
      return message.channel.send(error(`Failed to fetch ${this.type} count.`));
    }
  }
}

export default InteractionCountCommand;
