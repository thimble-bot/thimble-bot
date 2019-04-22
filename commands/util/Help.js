const { Command } = require('discord.js-commando');
const config = require('../../config').bot;
const fs = require('fs');
const path = require('path');

class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'help',
      memberName: 'help',
      group: 'util',
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
    });
  }

  getAllCommands(obj) {
    const commands = [];

    Object.keys(obj).forEach(key => {
      commands.push(...obj[key].commands);
    });

    return commands;
  }

  generateEmbed(data) {
    const fields = [];

    fields.push({
      name: 'Direct link to command help',
      value: `<https://thimblebot.xyz/commands#${data.name}>`
    });

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

    return {
      embed: {
        title: `Command "${data.name}"`,
        description: data.description,
        fields,
        timestamp: new Date(),
        footer: {
          text: 'All commands: https://thimblebot.xyz/commands'
        }
      }
    };
  }

  async run(message, { command }) {
    if (!command) {
      return message.say(`:ballot_box_with_check: **A list of all commands is available here: <https://thimblebot.xyz/commands>**
To send a command in this server, use \`${config.prefix}command\` or \`@${this.client.user.tag} command\`.
To send a command in a DM, simply use \`command\` without a prefix.`);
    }

    const commandsFile = fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'commands.json'), {
      encoding: 'utf8'
    });

    const commands = JSON.parse(commandsFile);
    const allCommands = this.getAllCommands(commands);

    const targetCommand = allCommands.find(c => c.name === command || (c.aliases && c.aliases.includes(command)));

    if (!targetCommand) {
      return message.say(':warning: Unknown command.');
    }

    return message.say(this.generateEmbed(targetCommand));
  }
};

module.exports = HelpCommand;
