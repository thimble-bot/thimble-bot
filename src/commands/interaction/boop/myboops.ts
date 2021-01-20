import MyInteractionsCommand from '../../../lib/interactions/MyInteractionsCommand';

class MyBoopsCommand extends MyInteractionsCommand {
  constructor() {
    super('boop', {
      aliases: [ 'myboops' ],
      description: 'Get the top 10 people who booped you or you booped.'
    });

    this.embedTitle = '%%\'s Boop Stats in %%';
    this.topSendersTitle = 'Your Top Boopers';
    this.topReceiversTitle = 'People You Booped The Most';
    this.noSenders = 'Nobody booped you yet :(';
    this.noReceivers = 'You have not booped anybody yet.';
  }
}

export default MyBoopsCommand;
