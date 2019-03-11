const { Command } = require('discord.js-commando');
const Boop = require('../../db/models/boops/Boop');

class BoopCountCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'boopcount',
      group: 'fun',
      memberName: 'boopcount',
      guildOnly: true,
      description: 'Check your or someone else\'s current boop count.',
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
      ]
    });
  }

  getBoopCount(user, guild) {
    return new Promise((resolve, reject) => {
      return Boop.count({
        where: {
          receiver: parseInt(user.id, 10),
          guild: parseInt(guild, 10)
        }
      })
        .then(ct => resolve(ct))
        .catch(err => reject(err));
    });
  }

  formatMessage(user, count) {
    return `${user.toString()} has been booped a total of **${count}** times!`;
  }

  async run(message, { user }) {
    if (!user) {
      user = message.author;
    }

    if (user && user.id) {
      if (user.id === this.client.user.id) {
        return message.say('I cannot be booped, remember? :stuck_out_tongue:');
      }

      try {
        const count = await this.getBoopCount(user, message.guild.id);
        return message.say(this.formatMessage(user, count));
      } catch (err) {
        return message.say(':x: Failed to retrieve the number of boops.');
      }
    }

    return message.say(':x: Could not find member.');
  }
};

module.exports = BoopCountCommand;
