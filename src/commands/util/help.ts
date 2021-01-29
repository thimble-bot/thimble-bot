import { Command } from '../../command';
import { Command as AkairoCommand, PrefixSupplier } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { getCommandDescription, getCommandExamples } from '../../lib/commandList';
import prefix from '../../lib/prefix';

export default class HelpCommand extends Command {
  constructor() {
    super('help', {
      aliases: [ 'help' ],
      description: {
        detail: 'Learn how to use Thimble Bot.',
        examples: [
          '`help` - will list the available categories/commands',
          '`help color` - will show helpful information about a given command'
        ]
      },
      args: [
        {
          id: 'command',
          type: 'commandAlias',
          default: null,
          prompt: {
            optional: true,
            retry: 'Unknown command.'
          }
        }
      ]
    });
  }

  private async getPrefix(prefix: string | string[] | PrefixSupplier | undefined, message: Message): Promise<string> {
    if (!prefix) {
      return '';
    }

    if (typeof prefix === 'string') {
      return prefix;
    }

    if (typeof prefix === 'function') {
      prefix = await prefix(message);
      return typeof prefix === 'string'
        ? prefix
        : prefix[0];
    }

    return prefix[0];
  }

  async exec(message: Message, { command }: { command: AkairoCommand | null }) {
    if (!command) {
      return this.warn(message, 'Not implemented yet!');
    }

    const commandPrefix = await this.getPrefix(command.prefix, message);
    const fullPrefix = prefix(message, commandPrefix);

    const name = fullPrefix + command.aliases[0];
    const description = getCommandDescription(command.description);
    const examples = getCommandExamples(command.description)
      .map(example => ` • ${example}`).join('\n');
    const aliases = command.aliases.slice(1).join(', ');

    const embed = new MessageEmbed();
    embed.setTitle(`\`${name}\` command`);

    if (description?.length) {
      embed.setDescription(description);
    }

    if (aliases.length) {
      embed.addField('Aliases', aliases);
    }

    if (examples.length) {
      embed.addField('Examples', examples);
    }

    embed.setFooter(`Command ID: ${command.id}.`);

    return this.say(message, embed);
  }
};
