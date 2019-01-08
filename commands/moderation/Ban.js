const { Command } = require('discord.js-commando');
const config = require('../../config').bot;

class Kick extends Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      group: 'moderation',
      memberName: 'ban',
      description: 'Ban a member.',
      examples: [
        `${config.prefix}ban @user#discrim`,
        `${config.prefix}ban @user#discrim reason`
      ],
      userPermissions: [ 'BAN_MEMBERS' ],
      clientPermissions: [ 'BAN_MEMBERS' ],
      args: [
        {
          key: 'user',
          prompt: 'Who do you want to ban?',
          type: 'user'
        },
        {
          key: 'reason',
          prompt: 'Why do you want to ban this member?',
          default: '',
          type: 'string'
        }
      ]
    })
  };

  run(message, { user, reason }) {
    if (user === this.client.user) {
      return message.say("Nice try, you can't ban me though!");
    }

    if (user.id === message.author.id) {
      return message.say("You don't just ban yourself from the server...");
    }

    const member = message.guild.member(user);

    if (!member) {
      return message.say('I dunno who that is!');
    }

    return member.ban({
      reason
    })
      .then(() => message.say(`Successfully banned ${user}!`))
      .catch(() => message.say(`:warning: Failed to ban user ${user}.`));
  }
};

module.exports = Kick;
