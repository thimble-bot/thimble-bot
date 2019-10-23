const { Command } = require('discord.js-commando');
const config = require('../../config').bot;
const fs = require('fs');
const path = require('path');

const meta = {
  name: 'help',
  description: 'Get more information about the available commands or a specific command.',
  examples: [
    '`help` - Get help about all the commands.',
    '`help [command]` - Get help about a certain command.'
  ],
  args: [
    {
      key: 'command',
      prompt: '<none>',
      type: 'string',
      default: ''
    }
  ]
};

class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      memberName: 'help',
      group: 'util'
    });
  }

  getAllCommands(obj) {
    const commands = [];

    Object.keys(obj).forEach(key => {
      commands.push(...obj[key].commands);
    });

    return commands;
  }

  generateEmbed(data, isCustom) {
    const fields = [];

    if (!isCustom) {
      fields.push({
        name: 'Direct link to command help',
        value: `<https://bot.thimble.cx/commands#${data.name}>`
      });
    }

    if (data.aliases && data.aliases.length) {
      fields.push({
        name: 'Aliases',
        value: data.aliases.join(', ')
      });
    }

    if (data.examples && data.examples.length) {
      fields.push({
        name: 'Examples',
        value: data.examples.join('\n')
      });
    }

    const prefix = isCustom ? 'Custom ' : '';

    return {
      embed: {
        title: `${prefix}Command "${data.name}"`,
        description: data.description,
        fields,
        timestamp: new Date(),
        footer: {
          text: 'All commands: https://bot.thimble.cx/commands'
        }
      }
    };
  }

  async run(message, { command }) {
    if (!command) {
      return message.say(`:ballot_box_with_check: **A list of all commands is available here: <https://bot.thimble.cx/commands>**
To send a command in this server, use \`${config.prefix}command\` or \`@${this.client.user.tag} command\`.
To send a command in a DM, simply use \`command\` without a prefix.`);
    }

    const commandsFile = fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'commands.json'), {
      encoding: 'utf8'
    });

    const commands = JSON.parse(commandsFile);
    const allCommands = this.getAllCommands(commands);

    const targetCommand = allCommands.find(c => c.name === command || (c.aliases && c.aliases.includes(command)));

    if (targetCommand) {
      return message.say(this.generateEmbed(targetCommand, false));
    }

    const allDefinedCommands = this.client.registry.findCommands(command, false, message);
    const customCommand = allDefinedCommands[0];

    if (customCommand && (customCommand.guilds.includes(message.guild.id) || customCommand.isGlobalCommand)) {
      return message.say(this.generateEmbed(customCommand, true));
    }

    return message.say(':warning: Unknown command.');
  }
};

module.exports = HelpCommand;
module.exports.meta = meta;
