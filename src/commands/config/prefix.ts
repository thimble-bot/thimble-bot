import { Command } from 'discord-akairo';
import { Message, Guild } from 'discord.js';
import { updateGuildConfig } from '../../lib/guildConfig';
import { error, success } from '../../lib/serviceMessages';
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

      return message.channel.send(success(`Prefix successfully changed to \`${prefix}\`.`));
    } catch (err) {
      return message.channel.send(error('Failed to fully update the prefix of this guild.'));
    }
  }
}

export default PrefixCommand;
