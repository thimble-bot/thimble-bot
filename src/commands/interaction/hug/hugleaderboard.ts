import InteractionLeaderboardCommand from '../../../lib/interactions/InteractionLeaderboardCommand';

class HugLeaderboardCommand extends InteractionLeaderboardCommand {
  constructor() {
    super('hug', {
      aliases: [ 'hugleaderboard', 'hugleaderboards', 'hl' ],
      description: 'Get the hug leaderboard of the current server.'
    });

    this.embedTitle = '%%\'s Hug Leaderboard';
    this.topReceiversTitle = 'Top Hugged Members';
    this.topSendersTitle = 'Top Huggers';
    this.emptyListString = 'Nobody hugged anyone in this server.';
  }
}

export default HugLeaderboardCommand;
