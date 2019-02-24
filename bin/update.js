const Discord = require('discord.js');
const { version } = require('../package');
const path = require('path');
const { exec } = require('child_process');

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

    say(client, `Updated successfully! The current version is: \`v${version}\``);
    client.destroy();
  });

  client.login(config.bot.token);
};

module.exports = update;
