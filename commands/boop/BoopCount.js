const { Command } = require('discord.js-commando');
const Boop = require('../../db/models/boops/Boop');
const BoopOptout = require('../../db/models/boops/Optout');
const { lex } = require('../../lib/interaction/lex');

const meta = {
  name: 'boopcount',
  description: 'Check your or someone else\'s current boop/hug/highfive count.',
  examples: [
    '`boopcount @someone#1234` - Get someone\'s boop count based on their DiscordTag)',
    '`boopcount someone` - Get someone\'s boop count based on their username/nickname',
    '`boopcount` - Get your own boop count'
  ],
  args: [
    {
      key: 'user',
      type: 'user',
      default: '',
      prompt: ''
    }
  ],
  aliases: [ 'hugcount', 'highfivecount', 'high5count', 'hi5count' ]
};

class InteractionCountCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'boop',
      memberName: 'interactioncount',
      guildOnly: true
    });
  }

  areBoopsDisabled(guild, userId, type) {
    return BoopOptout.count({ where: { guild, userId, type } });
  }

  getBoopCount(user, guild, type) {
    return new Promise((resolve, reject) => {
      return Boop.findAll({
        where: {
          receiver: user.id,
          guild,
          type
        }
      })
        .then(entries => Promise.all(entries.map(e => e.counts)))
        .then(counts => counts.reduce((accumulator, current) => parseInt(accumulator) + parseInt(current)))
        .then(count => resolve(count))
        .catch(err => reject(err));
    });
  }

  formatMessage(user, count, type) {
    return `${user.toString()} ${lex[type].countStart} **${count}** ${lex[type].countEnd}!`;
  }

  getType(content) {
    content = content.split('count')[0].slice(1);

    if (content === 'boop') {
      return 'boop';
    }

    if (content === 'hug') {
      return 'hug';
    }

    if ([ 'highfive', 'high5', 'hi5' ].includes(content)) {
      return 'highfive';
    }
  }

  async run(message, { user }) {
    const type = this.getType(message.content);

    if (!user) {
      user = message.author;
    }

    try {
      const areBoopsDisabled = await this.areBoopsDisabled(message.guild.id, user.id, type);
      if (areBoopsDisabled) {
        return message.say(`:warning: Cannot view the ${type} count of this user because they have opted out of getting ${type}s.`);
      }
    } catch (err) {
      return message.say(`:x: Failed to fetch ${type} state.`);
    }

    if (user && user.id) {
      if (user.id === this.client.user.id) {
        return message.say(lex[type].boopCountBot);
      }

      try {
        const count = await this.getBoopCount(user, message.guild.id, type);
        return message.say(this.formatMessage(user, count, type));
      } catch (err) {
        return message.say(`:x: Failed to retrieve the number of ${type}s.`);
      }
    }

    return message.say(':x: Could not find member.');
  }
};

module.exports = InteractionCountCommand;
module.exports.meta = meta;
