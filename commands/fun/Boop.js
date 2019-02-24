/**
 * This command will be improved in the future to
 * use a database which holds records about each
 * boop. The data would contain the user who has
 * initiated the boop, the target (booped) member,
 * as well as the guild where the boop took place.
 */

const { Command } = require('discord.js-commando');

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
          type: 'user|string',
          default: '',
          prompt: 'Who do you want to boop?'
        }
      ]
    });
  }

  async run(message, { user }) {
    if (!user) {
      return message.say(`\\*boops ${message.author.toString()}* hehe`);
    }

    if (user && user.id) {
      if (user.id === this.client.user.id) {
        return message.say('Don\'t boop me, silly! :flushed:');
      }

      return message.say(`**${message.author.toString()} booped ${user.toString()}!**`);
    }

    try {
      const targetUser = await message.guild.fetchMembers()
        .then(members => members.filter(m => (m.user.username === user || m.nickname === user)))
        .then(members => members.first());

      if (targetUser.id === this.client.user.id) {
        return message.say('Don\'t boop me, silly! :flushed:');
      }

      return message.say(`**${message.author.toString()} booped ${targetUser.toString()}!**`);
    } catch (err) {
      return message.say(':x: Could not find member to boop.');
    }
  }
};

module.exports = BoopCommand;
