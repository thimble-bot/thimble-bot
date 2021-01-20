import MyInteractionsCommand from '../../../lib/interactions/MyInteractionsCommand';

class MyHugsCommand extends MyInteractionsCommand {
  constructor() {
    super('hug', {
      aliases: ['myhugs'],
      description: 'Get the top 10 people who hugged you or you hugged.'
    });

    this.embedTitle = '%%\'s Hug Stats in %%';
    this.topSendersTitle = 'Your Top Huggers';
    this.topReceiversTitle = 'People You Hugged The Most';
    this.noSenders = 'Nobody hugged you yet :(';
    this.noReceivers = 'You have not hugged anybody yet.';
  }
}

export default MyHugsCommand;
