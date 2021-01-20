import InteractCommand from '../../../lib/interactions/InteractCommand';

class HighfiveCommand extends InteractCommand {
  constructor() {
    super('highfive', {
      aliases: [ 'highfive', 'high5', 'hi5' ],
      description: 'Give a certain member of the server a highfive.'
    });

    this.botReceiver = '\\*highfive*';
    this.self = 'You can\'t give yourself a highfive... how does that even work...';
    this.optedOut = 'This member has opted out from getting highfives.';
    this.botInteracted = '\\*gives %% a highfive*';
    this.botInteractedTwo = 'I highfived you %%';
    this.interactionDone = '%% highfived %%';
  }
}

export default HighfiveCommand;
