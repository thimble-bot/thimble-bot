const Discord = require('discord.js');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const currentCommit = require('git-current-commit');

const config = require('../config');

let updateGuild, updateChannel;

const say = (client, str) => {
  return client
    .guilds.get(updateGuild)
    .channels.get(updateChannel)
    .send(str);
};

const update = (guild, channel) => {
  if (!guild || !channel) {
    return;
  }

  updateGuild = guild;
  updateChannel = channel;

  const client = new Discord.Client();

  client.on('ready', () => {
    const postDeployScript = path.resolve(__dirname, 'post-deploy.sh');
    exec(`sh ${postDeployScript}`, (err, stdout, stderr) => {
      if (err) {
        return say(client, ':x: Failed to update.');
      }
    });

    let version;

    if (config.bot.isMasterBranch) {
      version = currentCommit.sync();
    } else {
      const packageFile = fs.readFileSync(path.join(__dirname, '..', 'package.json'), { encoding: 'utf8' });
      const packageContents = JSON.parse(packageFile);
      version = 'v' + packageContents.version;
    }

    say(client, `Updated successfully! The current version is: \`${version}\``);
    client.destroy();
  });

  client.login(config.bot.token);
};

module.exports = update;
