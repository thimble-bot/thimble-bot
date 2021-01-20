import ToggleInteractionCommand from '../../../lib/interactions/ToggleInteractionCommand';

class ToggleHugCommand extends ToggleInteractionCommand {
  constructor() {
    super('hug', {
      aliases: [
        'togglehug',
        'togglehugs',
        'th'
      ],
      description: 'Toggle huggable state.'
    });

    this.successMessage = 'Hugs have been %% successfully!';
  }
}

export default ToggleHugCommand;
