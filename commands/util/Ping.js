const { Command } = require('discord.js-commando');

class Ping extends Command {
  constructor(client) {
    super(client, {
      name: 'pingggggg',
      group: 'util',
      memberName: 'pingggggg',
      description: 'Ping stats.',
      examples: [ 'ping' ]
    });
  }

  run(message) {
    const serverPing = Math.floor(this.client.ping);
    const messagePing = Math.abs(Math.floor(new Date().getTime() - message.createdTimestamp));
    return message.say(`:hourglass: \`${messagePing}ms\`\n:heartbeat: \`${serverPing}ms\``);
  }
};

module.exports = Ping;
