const { Command } = require('discord.js-commando');

const meta = {
  name: 'ban',
  description: 'Ban a member.',
  examples: [
    '`ban @someone#1234` - Ban a user',
    '`ban @someone#1234 reason` - Ban a user with a reason'
  ],
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
};

class Kick extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      group: 'moderation',
      memberName: 'ban',
      guildOnly: true,
      userPermissions: [ 'BAN_MEMBERS' ],
      clientPermissions: [ 'BAN_MEMBERS' ]
    });
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
module.exports.meta = meta;
