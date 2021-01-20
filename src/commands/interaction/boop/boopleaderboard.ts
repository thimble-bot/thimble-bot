import InteractionLeaderboardCommand from '../../../lib/interactions/InteractionLeaderboardCommand';

class BoopLeaderboardCommand extends InteractionLeaderboardCommand {
  constructor() {
    super('boop', {
      aliases: [ 'boopleaderboard', 'boopleaderboards', 'bl' ],
      description: 'Get the boop leaderboard of the current server.'
    });

    this.embedTitle = '%%\'s Boop Leaderboard';
    this.topReceiversTitle = 'Top Booped Members';
    this.topSendersTitle = 'Top Boopers';
    this.emptyListString = 'Nobody booped anyone in this server.';
  }
}

export default BoopLeaderboardCommand;
