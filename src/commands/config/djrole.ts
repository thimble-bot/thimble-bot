import { Command } from '../../command';
import { Message, Role, Guild } from 'discord.js';
import { GuildData } from '../../models/GuildData';
import { updateGuildConfig } from '../../lib/guildConfig';

interface DJRoleCommandArgs {
  role: Role;
}

class DJRoleCommand extends Command {
  constructor() {
    super('djrole', {
      aliases: [ 'djrole' ],
      channel: 'guild',
      userPermissions: [ 'ADMINISTRATOR' ],
      description: 'Change the DJ role for this server.',
      args: [
        {
          id: 'role',
          type: 'role',
          prompt: {
            start: 'What role do you want to set as DJ role?'
          }
        }
      ]
    });
  }

  async exec(message: Message, { role }: DJRoleCommandArgs) {
    const guild = message.guild as Guild;

    updateGuildConfig(guild.id, 'djRole', role.name);

    try {
      const data = new GuildData(guild.id);
      await data.updateConfig();

      return this.success(message, `DJ role changed successfully to \`${role.name}\`.`);
    } catch (err) {
      return this.error(message, 'Failed to fully update the DJ role of this guild.' + err);
    }
  }
}

export default DJRoleCommand;
