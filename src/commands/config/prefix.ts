import { Command } from '../../command';
import { Message, Guild } from 'discord.js';
import { updateGuildConfig } from '../../lib/guildConfig';
import { GuildData } from '../../models/GuildData';

interface PrefixCommandArgs {
  prefix: string;
}

class PrefixCommand extends Command {
  constructor() {
    super('prefix', {
      aliases: [ 'prefix' ],
      channel: 'guild',
      userPermissions: [ 'ADMINISTRATOR' ],
      description: 'Change the bot\'s prefix for this server.',
      args: [
        {
          id: 'prefix',
          prompt: {
            start: 'What prefix would you like to use?'
          }
        }
      ]
    });
  }

  async exec(message: Message, { prefix }: PrefixCommandArgs) {
    const guild = message.guild as Guild;

    updateGuildConfig(guild.id, 'prefix', prefix);

    try {
      const data = new GuildData(guild.id);
      await data.updateConfig();

      return this.success(message, `Prefix successfully changed to \`${prefix}\`.`);
    } catch (err) {
      return this.error(message, 'Failed to fully update the prefix of this guild.');
    }
  }
}

export default PrefixCommand;
