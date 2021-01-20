import InteractionLeaderboardCommand from '../../../lib/interactions/InteractionLeaderboardCommand';

class HighfiveLeaderboardCommand extends InteractionLeaderboardCommand {
  constructor() {
    super('highfive', {
      aliases: [ 'highfiveleaderboard', 'high5leaderboard', 'h5l' ],
      description: 'Get the highfive leaderboard of the current server.'
    });

    this.embedTitle = '%%\'s Highfive Leaderboard';
    this.topReceiversTitle = 'Top Highfived Members';
    this.topSendersTitle = 'Top Highfivers';
    this.emptyListString = 'Nobody highfived anyone in this server.';
  }
}

export default HighfiveLeaderboardCommand;
