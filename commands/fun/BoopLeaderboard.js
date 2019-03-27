const { Command } = require('discord.js-commando');
const Boop = require('../../db/models/boops/Boop');
const findIndex = require('lodash.findindex');

class BoopLeaderboardCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'boopleaderboard',
      group: 'fun',
      memberName: 'boopleaderboard',
      aliases: [ 'bl', 'boopstats', 'boopstat' ],
      guildOnly: true,
      description: 'Get the boop leaderboard for the current server.'
    });

    this.members = [];
  }

  async generateEmbed(guild) {
    const client = this.client;

    return Promise.all(this.members.map(async (member, idx) => {
      const memberData = await guild.members.find(m => parseInt(m.id, 10) === parseInt(member.id, 10));

      if (memberData) {
        return `${idx + 1}. ${memberData.user.username} (${member.count})`;
      } else {
        return `${idx + 1}. ???`;
      }
    }))
      .then(membersMap => membersMap.join('\n'))
      .then(body => {
        return {
          embed: {
            title: `${guild.name} Boop Leaderboard`,
            author: {
              name: client.user.tag,
              icon_url: client.user.avatarURL
            },
            fields: [
              {
                name: 'TOP Booped Members',
                value: body || 'Error'
              }
            ],
            timestamp: new Date(),
            footer: {
              text: '<3'
            }
          }
        };
      });
  }

  fill(guild) {
    guild = parseInt(guild, 10);

    return Boop.findAll({ where: { guild } })
      .then(records => records.forEach(record => {
        const idx = findIndex(this.members, m => m.id === record.receiver);

        if (idx === -1) {
          return this.members.push({ id: record.receiver, count: 1 });
        }

        return this.members[idx].count++;
      }));
  }

  sort() {
    return this.members.sort((a, b) => b.count - a.count);
  }

  async run(message) {
    const guild = message.guild;

    try {
      await this.fill(guild.id);
      this.members = await this.sort();
      this.members = this.members.slice(0, 10);
      const contents = await this.generateEmbed(guild);
      return message.say(contents);
    } catch (err) {
      console.error(err);
      return message.say(':x: Failed to fetch the leaderboard. Please try again later.');
    }
  }
};

module.exports = BoopLeaderboardCommand;
