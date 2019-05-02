const { Command } = require('discord.js-commando');

class CustomCommand extends Command {
  constructor(client, opts) {
    // Temporary workaround for argument input queries. Commando checks
    // whether all arguments are provided BEFORE the #run hook, so it is
    // pretty challenging to limit this to guilds. You have to check the
    // input manually inside #run since right now, empty default values
    // are set to prevent the prompts from appearing in servers where the
    // command should not be available. This will hopefully be improved
    // upon in the future.
    if (!opts.isGlobalCommand) {
      opts.args = opts.args.map(arg => {
        if (arg.default === '' || arg.default) {
          return arg;
        } else {
          return {
            ...arg,
            default: ''
          };
        }
      });
    }

    super(client, {
      group: 'custom',
      ...opts
    });

    this.guilds = opts.guilds;
    this.isGlobalCommand = opts.isGlobalCommand;

    if (!this.isGlobalCommand && !this.guilds.length) {
      throw new Error(`custom:${this.memberName} - no guilds specified (for custom commands, you must specify the guilds you want to use them in).`);
    }

    if (typeof this.runCommand !== 'function') {
      throw new Error('Invalid runCommand hook in custom command.');
    }
  }

  run(message, args = []) {
    if (!this.isGlobalCommand && !this.guilds.map(g => g.toString()).includes(message.guild.id)) {
      return;
    }

    return this.runCommand(message, args);
  }
};

module.exports = CustomCommand;
module.exports.CustomCommand = CustomCommand;
module.exports.Command = CustomCommand;
