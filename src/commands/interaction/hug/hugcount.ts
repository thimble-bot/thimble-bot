import InteractionCountCommand from '../../../lib/interactions/InteractionCountCommand';

class HugCountCommand extends InteractionCountCommand {
  constructor() {
    super('hug', {
      aliases: ['hugcount', 'hc'],
      description: 'See how many hugs you have gotten in the server.'
    });

    this.neverInteracted = '%% has not been hugged before.';
    this.onceInteracted = '%% has been hugged **once**!';
    this.normalOutput = '%% has been hugged **%%** times before!';
  }
}

export default HugCountCommand;
