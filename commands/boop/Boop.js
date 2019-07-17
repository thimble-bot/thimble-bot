const { Command } = require('discord.js-commando');
const Boop = require('../../db/models/boops/Boop');
const BoopOptout = require('../../db/models/boops/Optout');

const InteractionLex = require('../../lib/interaction/lex');

const meta = {
  name: 'interact',
  description: 'Interact with someone (by boops, hugs or highfives).',
  examples: [
    '`boop @someone#1234` - Boop someone based on their DiscordTag',
    '`boop someone` - Boop someone based on their username/nickname',
    '`boop` - Ask the bot to boop you'
  ],
  args: [
    {
      key: 'user',
      type: 'user',
      default: '',
      prompt: 'n/a'
    }
  ]
};

class BoopCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'boop',
      memberName: 'interact',
      guildOnly: true,
      throttling: {
        usages: 10,
        duration: 60
      },
      aliases: [ 'boop', 'hug', 'highfive', 'high5', 'hi5', 'hifive' ]
    });
  }

  isInteractionDisabled(guild, userId, type) {
    return BoopOptout.count({ where: {
      guild,
      userId,
      type
    } });
  }

  getInteractionCount(sender, receiver, guild, type) {
    return new Promise((resolve, reject) => {
      return Boop.findOne({
        where: {
          sender,
          receiver,
          guild,
          type
        }
      })
        .then(data => resolve((data && data.counts) || 0))
        .catch(err => reject(err));
    });
  }

  ordinal(n) {
    if (n % 100 > 10 && n % 100 < 14) {
      return `${n}th`;
    }

    if (n % 10 === 1) {
      return `${n}st`;
    }

    if (n % 10 === 2) {
      return `${n}nd`;
    }

    if (n % 10 === 3) {
      return `${n}rd`;
    }

    return `${n}th`;
  }

  formatMessage(sender, receiver, count, type) {
    const lex = InteractionLex.lex[type];
    if (sender.id === this.client.user.id) {
      return `\\*${lex.thirdPerson} ${receiver.toString()}* ≧◡≦ (I ${lex.pastBot} ${count} time${count === 1 ? '' : 's'})`;
    }

    const action = InteractionLex.parse(lex.past, { receiver: receiver.toString() });

    return count === 1
      ? `**${sender.toString()} ${action} for the first time!**`
      : `**${sender.toString()} ${action}!** That's the ${this.ordinal(count)} time already!`;
  }

  update(sender, receiver, guild, type) {
    return new Promise((resolve, reject) => {
      let count;

      return Boop.findOne({
        where: {
          sender,
          receiver,
          guild,
          type
        }
      })
        .then(record => {
          record.counts++;
          count = record.counts;
          return record;
        })
        .then(record => record.save())
        .then(function () {
          return resolve(count);
        })
        .catch(err => {
          console.error(err);
          return reject(err);
        });
    });
  }

  create(sender, receiver, guild, type) {
    console.log(sender, receiver, guild, type);
    return new Promise((resolve, reject) => {
      return Boop.create({
        sender,
        receiver,
        guild,
        type
      })
        .then(record => record.counts)
        .then(ct => resolve(ct))
        .catch(err => {
          console.error(err);
          return reject(err);
        });
    });
  }

  async interact(sender, receiver, guild, type) {
    try {
      const recordCheck = await this.getInteractionCount(sender, receiver, guild, type);
      console.log(recordCheck);
      const result = recordCheck && recordCheck > 0
        ? await this.update(sender, receiver, guild, type)
        : await this.create(sender, receiver, guild, type);

      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  getCommand(content) {
    return content.split(' ')[0].slice(1);
  }

  async run(message, { user }) {
    let type = this.getCommand(message.content);

    if (type === 'interact') {
      return message.say(':x: You need to specify the interaction exactly.');
    }

    if ([ 'high5', 'hi5', 'hifive' ].includes(type)) {
      type = 'highfive';
    }

    const lex = InteractionLex.lex[type];

    let sender;
    let receiver;
    const guild = message.guild.id;

    if (!user) {
      sender = this.client.user;
      receiver = message.author;
    }

    if (user && user.id) {
      sender = message.author;
      receiver = user;
    }

    if (receiver.id === this.client.user.id) {
      return message.say(lex.boopBot);
    }

    if (receiver.id === message.author.id && sender.id !== this.client.user.id) {
      return message.say(lex.boopSelf);
    }

    try {
      const isInteractionDisabled = await this.isInteractionDisabled(guild, message.author.id, type);

      if (isInteractionDisabled) {
        return message.say(`:warning: This user has opted out from getting ${lex.thirdPerson}.`);
      }

      const interaction = await this.interact(sender.id, receiver.id, guild, type);

      return interaction
        ? message.say(this.formatMessage(sender, receiver, interaction, type))
        : message.say(':x: Something went wrong...');
    } catch (err) {
      console.error(err);
      return message.say(`:x: Failed to ${lex.name} the member.`);
    }
  }
};

module.exports = BoopCommand;
module.exports.meta = meta;
