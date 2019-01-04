const { Command } = require('discord.js-commando');
const tracker = require('../../lib/MovieTracker');
const config = require('../../config');

class MovieTracker extends Command {
  constructor(client) {
    super(client, {
      name: 'movies',
      group: 'utils',
      memberName: 'movies',
      description: 'Get a list of the movies that are airing today on the Romanian/Hungarian TV.',
      examples: [ `${config.bot.prefix}movies` ]
    });
  }

  async run(message) {
    if (message.channel.id !== config.MovieTracker.channel) {
      const channel = this.client.guilds.get(config.bot.guild).channels.get(config.MovieTracker.channel).toString();
      const notice = await message.say(`:warning: You can not use this command outside ${channel}`);

      setTimeout(() => {
        notice.delete();
        message.delete();
      }, 5000);

      return null;
    }

    const results = await tracker();

    if (results && results.length) {
      results.forEach(result => message.say(result));
      return null;
    } else {
      return message.say('There are no movies for today based on your criteria!');
    }
  }
};

module.exports = MovieTracker;
