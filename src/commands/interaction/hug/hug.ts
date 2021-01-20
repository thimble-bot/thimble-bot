import InteractCommand from '../../../lib/interactions/InteractCommand';

class HugCommand extends InteractCommand {
  constructor() {
    super('hug', {
      aliases: [ 'hug', 'hugs' ],
      description: 'Hug a certain member of the server.'
    });

    this.botReceiver = '\\*hugs back*';
    this.self = 'You can\'t just hug yourself...';
    this.optedOut = 'This member has opted out from getting hugs.';
    this.botInteracted = '\\*hugs %%*';
    this.botInteractedTwo = 'I hugged you %%';
    this.interactionDone = '%% hugged %%';
  }
}

export default HugCommand;
