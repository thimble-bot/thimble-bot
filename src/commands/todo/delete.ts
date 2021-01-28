import TodoCommand from '../../lib/todo/TodoCommand';
import { Message } from 'discord.js';
import { IListOpts, Todo } from '../../models/Todo';

class TodoDeleteCommand extends TodoCommand {
  constructor() {
    super('delete', {
      aliases: [ 'delete', 'remove' ],
      description: 'Remove todo.',
      args: [
        {
          id: 'id',
          type: 'number',
          prompt: {
            start: 'Please provide the ID (order) of the todo that you want to delete.'
          }
        }
      ]
    });
  }

  async exec(message: Message, { id }: { id: number }) {
    if (id <= 0 || id > 20) {
      return this.error(message, 'The ID must be between 1 and 20.');
    }

    const query: IListOpts = {
      userId: message.author.id,
      guildId: message.guild ? message.guild.id : 'private'
    };

    try {
      const todos = (await Todo.list(query))
        .sort((a, b) => (a.createTime?.seconds as number) - (b.createTime?.seconds as number));

      if (id > todos.length) {
        return this.error(message, 'There is no todo with this ID.');
      }

      const target = todos[id - 1];
      await target.ref.delete();

      return this.success(message, 'Todo deleted successfully!');
    } catch (err) {
      return this.error(message, 'Failed to change the state of the todo.');
    }
  }
}

export default TodoDeleteCommand;
