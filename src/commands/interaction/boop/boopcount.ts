import InteractionCountCommand from '../../../lib/interactions/InteractionCountCommand';

class BoopCountCommand extends InteractionCountCommand {
  constructor() {
    super('boop', {
      aliases: ['boopcount', 'bc'],
      description: 'See how many boops you have gotten in the server.'
    });

    this.neverInteracted = '%% has not been booped before.';
    this.onceInteracted = '%% has been booped **once**!';
    this.normalOutput = '%% has been booped **%%** times before!';
  }
}

export default BoopCountCommand;
