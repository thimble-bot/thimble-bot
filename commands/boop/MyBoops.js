const { Command } = require('discord.js-commando');
const Boop = require('../../db/models/boops/Boop');

const meta = {
  name: 'myinteractions',
  aliases: [ 'myboops', 'myhugs', 'myhighfives' ],
  description: 'Get the top 10 people you have interacted with in the server.'
};

class MyBoopsCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'boop',
      memberName: 'myinteractions',
      guildOnly: true
    });

    this.boopers = [];
    this.booped = [];
  }

  mapMembers(arr, guild) {
    return Promise.all(arr.map(async (member, idx) => {
      const memberData = await guild.members.find(m => m.id === member.id);

      console.log(memberData);

      if (memberData) {
        return `${idx + 1}. ${memberData.user.username} (${member.count})`;
      } else {
        return `${idx + 1}. ??? (${member.count})`
      }
    }))
      .then(membersMap => membersMap.join('  \n'))
      .catch(err => {
        console.error(err);
        return err;
      });
  }

  lex(interaction) {
    switch (interaction) {
      case 'boop':
        return { past: 'booped', booper: 'Boopers', booped: 'Booped' };
      case 'hug':
        return { past: 'hugged', booper: 'Huggers', booped: 'Hugged' };
      case 'highfive':
        return { past: 'highfived', booper: 'Highfivers', booped: 'Highfived' };
    }
  }

  async generateEmbed(interaction, guild, user) {
    const boopers = await this.mapMembers(this.boopers, guild);
    const booped = await this.mapMembers(this.booped, guild);

    const lex = this.lex(interaction);

    return {
      embed: {
        title: `${user}'s ${interaction} stats in ${guild.name}`,
        author: {
          name: this.client.user.tag,
          icon_url: this.client.user.avatarURL
        },
        fields: [
          {
            name: `Your Top ${lex.booper}  `,
            value: boopers.length ? boopers : `No one ${lex.past} you yet :(  `,
            inline: true
          },
          {
            name: `People You've ${lex.booped} The Most`,
            value: booped.length ? booped : `You haven't ${lex.past} anyone yet :(`,
            inline: true
          }
        ],
        timestamp: new Date(),
        footer: {
          text: ':3'
        }
      }
    };
  }

  async fillBoopers(guild, user, type) {
    return Boop.findAll({ where: { guild: guild.id, receiver: user, type } })
      .then((records => records.forEach(record => {
        this.boopers.push({
          id: record.sender,
          count: record.counts
        });
      })));
  }

  async fillBooped(guild, user, type) {
    return Boop.findAll({ where: { guild: guild.id, sender: user, type } })
      .then((records => records.forEach(record => {
        this.booped.push({
          id: record.receiver,
          count: record.counts
        });
      })));
  }

  sort(arr) {
    return arr.sort((a, b) => b.count - a.count).slice(0, 10);
  }

  cleanup() {
    this.booped = [];
    this.boopers = [];
  }

  getInteraction(command) {
    return command.split(' ')[0].slice(3, -1).trim();
  }

  async run(message) {
    const guild = message.guild;
    const interaction = this.getInteraction(message.content);

    if (interaction === 'interaction') {
      return message.say(':warning: Please be a little more specific...');
    }

    if (![ 'boop', 'hug', 'highfive' ].includes(interaction)) {
      return message.say(':x: No idea how you did this but please stop.');
    }

    try {
      await this.fillBoopers(guild, message.author.id, interaction);
      await this.fillBooped(guild, message.author.id, interaction);

      this.booped = await this.sort(this.booped);
      this.boopers = await this.sort(this.boopers);

      const contents = await this.generateEmbed(interaction, guild, message.author.username);

      this.cleanup();

      return message.say(contents);
    } catch (err) {
      console.error(err);
      return message.say(':x: Failed to do the thing. Please try again later.');
    }
  }
};

module.exports = MyBoopsCommand;
module.exports.meta = meta;
