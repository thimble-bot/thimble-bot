const { Command } = require('discord.js-commando');
const Boop = require('../../db/models/boops/Boop');

class BoopCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'boop',
      group: 'fun',
      memberName: 'boop',
      description: 'Boop someone or yourself.',
      args: [
        {
          key: 'user',
          type: 'user',
          default: '',
          prompt: 'Who do you want to boop?'
        }
      ]
    });
  }

  getBoopCount(sender, receiver, guild) {
    return new Promise((resolve, reject) => {
      return Boop.count({
        where: {
          sender,
          receiver,
          guild
        }
      })
        .then(ct => resolve(ct))
        .catch(err => reject(err));
    });
  }

  ordinal(n) {
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

  formatMessage(sender, receiver, count) {
    if (sender.id === this.client.user.id) {
      return `\\*boops ${receiver.toString()}* ≧◡≦ (I booped you ${count} time${count === 1 ? '' : 's'})`;
    }

    return count === 1
      ? `**${sender.toString()} booped ${receiver.toString()} for the first time!**`
      : `**${sender.toString()} booped ${receiver.toString()}!** That's the ${this.ordinal(count)} time already!`;
  }

  boop(sender, receiver, guild) {
    sender = parseInt(sender, 10);
    receiver = parseInt(receiver, 10);
    guild = parseInt(guild, 10);

    return new Promise((resolve, reject) => {
      return Boop.create({
        sender,
        receiver,
        guild
      })
        .then(async function () {
          const count = await this.getBoopCount(sender, receiver, guild);
          return resolve(count);
        }.bind(this))
        .catch(err => {
          console.error(err);
          return reject(err);
        });
    });
  }

  async run(message, { user }) {
    if (!user) {
      return this.boop(this.client.user.id, message.author.id, message.guild.id)
        .then(ct => message.say(this.formatMessage(this.client.user, message.author, ct)))
        .catch(function () {
          return message.say(':x: Sorry, I couldn\'t boop you :frowning:');
        });
    }

    if (user && user.id) {
      if (user.id === this.client.user.id) {
        return message.say('Don\'t boop me, silly! :flushed:');
      }

      if (user.id === message.author.id) {
        return message.say('Naww, don\'t boop yourself!');
      }

      return this.boop(message.author.id, user.id, message.guild.id)
        .then(ct => message.say(this.formatMessage(message.author, user, ct)))
        .catch(function () {
          return message.say(':x: Failed to boop the member.');
        });
    }

    return message.say(':x: Could not find member to boop.');
  }
};

module.exports = BoopCommand;
