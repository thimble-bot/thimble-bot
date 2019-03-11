const { Command } = require('discord.js-commando');
const { exec } = require('child_process');

const splitOutput = (str, len) => {
  return str
    .match(new RegExp('(.|[\r\n]){1,' + len + '}', 'g'))
    .map(o => `\`\`\`${o}\`\`\``);
};

class SSHCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ssh',
      group: 'maintenance',
      memberName: 'ssh',
      description: 'Send single SSH commands to the server.',
      guarded: true,
      ownerOnly: true,
      args: [
        {
          key: 'command',
          prompt: 'What command do you want to send to the server?',
          type: 'string'
        }
      ]
    });
  }

  run(message, { command }) {
    exec(command, (err, stdout, stderr) => {
      const returnedOutput = [];

      if (err) {
        returnedOutput.push(':x: Failed to execute command.');
      }

      let output;

      if (stderr) {
        output = splitOutput(stderr, 1988);
      }

      if (stdout) {
        output = splitOutput(stdout, 1988);
      }

      if (!stderr && !stdout) {
        returnedOutput.push('Done!');
      } else {
        returnedOutput.push(...output);
      }

      return returnedOutput.forEach(chunk => message.say(chunk));
    });

    return null;
  }
};

module.exports = SSHCommand;
