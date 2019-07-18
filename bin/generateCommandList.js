const fs = require('fs-extra');
const path = require('path');

const COMMANDS_PATH = path.join(__dirname, '..', 'commands');

class CommandListGenerator {
  constructor() {
    this.commands = {
      util: {
        meta: {
          name: 'Utilities',
          description: 'Mostly useful commands.'
        },
        commands: []
      },
      fun: {
        meta: {
          name: 'Fun',
          description: 'Fun/meme commands.'
        },
        commands: []
      },
      moderation: {
        meta: {
          name: 'Moderation',
          description: 'Commands for server moderation.'
        },
        commands: []
      },
      boop: {
        meta: {
          name: 'Interaction',
          description: 'The interaction commands and other commands related to them.'
        },
        commands: []
      }
    };
  }

  processCommand(group, commandFileName) {
    console.log(`Processing command "${commandFileName.split('.')[0]}" from group "${group}"...`);
    const commandFile = path.join(COMMANDS_PATH, group, commandFileName);
    const { meta } = require(commandFile);

    const { name, description, aliases, examples } = meta;
    return {
      name,
      description: description || null,
      aliases: aliases || [],
      examples: examples || null
    };
  }

  processGroup(groupName) {
    if (groupName === 'custom' || groupName === 'maintenance') {
      return;
    }

    const files = fs.readdirSync(path.join(COMMANDS_PATH, groupName));

    files.forEach(file => {
      const command = this.processCommand(groupName, path.basename(file));
      this.commands[groupName].commands.push(command);
    });
  }

  start() {
    Object.keys(this.commands).forEach(group => {
      this.processGroup(group);
    });

    const json = JSON.stringify(this.commands, null, 2);

    fs.writeFile(path.join(__dirname, '..', 'assets', 'commands.json'), json, {
      encoding: 'utf8'
    })
      .then(function () {
        console.log('Done!');
        process.exit();
      })
      .catch(err => {
        console.error(err);
        process.exit(127);
      });
  }
};

const generator = new CommandListGenerator();
generator.start();
