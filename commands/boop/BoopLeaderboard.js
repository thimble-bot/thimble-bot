const { Command } = require('discord.js-commando');
const Boop = require('../../db/models/boops/Boop');
const findIndex = require('lodash.findindex');

const meta = {
  name: 'boopleaderboard',
  aliases: [ 'bl', 'boopstats', 'boopstat' ],
  description: 'Get the boop leaderboard for the current server.'
};

class BoopLeaderboardCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'boop',
      memberName: 'boopleaderboard',
      guildOnly: true
    });

    this.boopers = [];
    this.booped = [];
  }

  mapMembers(arr, guild) {
    return Promise.all(arr.map(async (member, idx) => {
      const memberData = await guild.members.find(m => m.id === member.id);

      if (memberData) {
        return `${idx + 1}. ${memberData.user.username} (${member.count})`;
      } else {
        return `${idx + 1}. ???`;
      }
    }))
      .then(membersMap => membersMap.join('\n'))
      .catch(err => {
        console.error(err);
        return err;
      });
  }

  async generateEmbed(guild) {
    return {
      embed: {
        title: `${guild.name}'s Boop Leaderboard`,
        author: {
          name: this.client.user.tag,
          icon_url: this.client.user.avatarURL
        },
        fields: [
          {
            name: 'Top Booped Members',
            value: await this.mapMembers(this.booped, guild),
            inline: true
          },
          {
            name: 'Top Boopers',
            value: await this.mapMembers(this.boopers, guild),
            inline: true
          }
        ],
        timestamp: new Date(),
        footer: {
          text: '<3'
        }
      }
    };
  }

  fill(guild) {
    return Boop.findAll({ where: { guild } })
      .then(records => records.forEach(record => {
        const boopedIdx = findIndex(this.booped, m => m.id === record.receiver);
        const booperIdx = findIndex(this.boopers, m => m.id === record.sender);

        if (boopedIdx === -1) {
          this.booped.push({ id: record.receiver, count: 1 });
        } else {
          this.booped[boopedIdx].count++;
        }

        if (booperIdx === -1) {
          this.boopers.push({ id: record.sender, count: 1 });
        } else {
          this.boopers[booperIdx].count++;
        }
      }));
  }

  sort(arr) {
    return arr.sort((a, b) => b.count - a.count).slice(0, 10);
  }

  cleanup() {
    this.booped = [];
    this.boopers = [];
  }

  async run(message) {
    const guild = message.guild;

    try {
      await this.fill(guild.id);
      this.booped = await this.sort(this.booped);
      this.boopers = await this.sort(this.boopers);
      const contents = await this.generateEmbed(guild);

      this.cleanup();

      return message.say(contents);
    } catch (err) {
      console.error(err);
      return message.say(':x: Failed to fetch the leaderboard. Please try again later.');
    }
  }
};

module.exports = BoopLeaderboardCommand;
module.exports.meta = meta;
