import MyInteractionsCommand from '../../../lib/interactions/MyInteractionsCommand';

class MyHighfivesCommand extends MyInteractionsCommand {
  constructor() {
    super('highfive', {
      aliases: [ 'myhighfives', 'myhigh5s' ],
      description: 'Get the top 10 people who highfived you or you highfived.'
    });

    this.embedTitle = '%%\'s Highfive Stats in %%';
    this.topSendersTitle = 'Your Top Highfivers';
    this.topReceiversTitle = 'People You Highfived The Most';
    this.noSenders = 'Nobody highfived you yet :(';
    this.noReceivers = 'You have not highfived  anybody yet.';
  }
}

export default MyHighfivesCommand;
