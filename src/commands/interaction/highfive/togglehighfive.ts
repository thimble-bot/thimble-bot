import ToggleInteractionCommand from '../../../lib/interactions/ToggleInteractionCommand';

class ToggleHighfiveCommand extends ToggleInteractionCommand {
  constructor() {
    super('highfive', {
      aliases: [
        'togglehighfive',
        'togglehighfives',
        'togglehigh5',
        'togglehi5',
        'th5'
      ],
      description: 'Toggle highfive state.'
    });

    this.successMessage = 'Highfives have been %% successfully!';
  }
}

export default ToggleHighfiveCommand;
