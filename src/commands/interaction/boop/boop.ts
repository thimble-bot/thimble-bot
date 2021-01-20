import InteractCommand from '../../../lib/interactions/InteractCommand';

class BoopCommand extends InteractCommand {
  constructor() {
    super('boop', {
      aliases: [ 'boop', 'boops' ],
      description: 'Boop a certain member of the server.'
    });

    this.botReceiver = 'Don\'t boop me, silly! :flushed:';
    this.self = 'You can\'t just boop yourself...';
    this.optedOut = 'This member has opted out from getting booped.';
    this.botInteracted = '\\*boops %%*';
    this.botInteractedTwo = 'I booped you %%';
    this.interactionDone = '%% booped %%';
  }
}

export default BoopCommand;
