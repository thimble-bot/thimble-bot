import { Command } from '../../command';
import { CommandOptions } from 'discord-akairo';
import prefix from '../prefix';

class TodoCommand extends Command {
  constructor(name: string, opts: CommandOptions) {
    super(`todo-${name}`, {
      ...opts,
      prefix: (message): string => prefix(message, 'todo ')
    });
  }
}

export default TodoCommand;
