const Discord = require('discord.js');
const program = require('commander');
const { version } = require('../package');

const config = require('../config');

program
  .option('-g, --update-guild [guild]', 'The guild where the update request came from.')
  .option('-c, --update-channel [channel]', 'The channel where the update request came from.')
  .parse(process.argv);

if (!program.updateGuild || !program.updateChannel) {
  process.exit(20);
}

const client = new Discord.Client();

client.on('ready', () => {
  client
    .guilds.get(program.updateGuild)
    .channels.get(program.updateChannel)
    .send(`Updated successfully! The current version is: \`v${version}\``);
  client.destroy();
});

client.login(config.bot.token);
