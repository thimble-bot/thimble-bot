const { Command } = require('discord.js-commando');
const config = require('../../config').bot;

class Kick extends Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      group: 'moderation',
      memberName: 'kick',
      description: 'Kick a member.',
      examples: [
        `${config.prefix}kick @user#discrim`,
        `${config.prefix}kick @user#discrim reason`
      ],
      userPermissions: [ 'KICK_MEMBERS' ],
      clientPermissions: [ 'KICK_MEMBERS' ],
      args: [
        {
          key: 'user',
          prompt: 'Who do you want to kick?',
          type: 'user'
        },
        {
          key: 'reason',
          prompt: 'Why do you want to kick this member?',
          default: '',
          type: 'string'
        }
      ]
    })
  };

  run(message, { user, reason }) {
    if (user === this.client.user) {
      return message.say("Nice try, you can't kick me though!");
    }

    if (user.id === message.author.id) {
      return message.say("You don't just kick yourself out from the server...");
    }

    const member = message.guild.member(user);

    if (!member) {
      return message.say('I dunno who that is!');
    }

    return member.kick(reason)
      .then(() => message.say(`Successfully kicked ${user}!`))
      .catch(() => message.say(`:warning: Failed to kick user ${user}.`));
  }
};

module.exports = Kick;
