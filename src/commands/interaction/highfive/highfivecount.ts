import InteractionCountCommand from '../../../lib/interactions/InteractionCountCommand';

class HighfiveCountCommand extends InteractionCountCommand {
  constructor() {
    super('highfive', {
      aliases: ['highfivecount', 'high5count', 'h5c'],
      description: 'See how many highfives you have gotten in the server.'
    });

    this.neverInteracted = '%% has not been highfived before.';
    this.onceInteracted = '%% has been highfived **once**!';
    this.normalOutput = '%% has been highfived **%%** times before!';
  }
}

export default HighfiveCountCommand;
