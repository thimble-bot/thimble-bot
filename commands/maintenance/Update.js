const { Command } = require('discord.js-commando');
const config = require('../../config');
const path = require('path');
const { exec } = require('child_process');

class Update extends Command {
  constructor(client) {
    super(client, {
      name: 'update',
      group: 'maintenance',
      memberName: 'update',
      description: 'Update the bot via git.'
    });
  }

  run(message) {
    if (message.author.id !== config.bot.owner) {
      return;
    }

    message.say('Updating Thimble Bot...');

    const postDeployScript = path.resolve(__dirname, '..', '..', 'bin', 'post-deploy.sh');
    const args = `--post-update ${message.guild.id} ${message.channel.id}`;
    exec(`sh ${postDeployScript} ${args}`, (err, stdout, stderr) => {
      if (err) {
        return message.say(':x: Failed to update.');
      }
    });
  }
};

module.exports = Update;
