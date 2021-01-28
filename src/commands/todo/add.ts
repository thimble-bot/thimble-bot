import TodoCommand from '../../lib/todo/TodoCommand';
import { Message } from 'discord.js';
import { IListOpts, Todo } from '../../models/Todo';
import { encrypt } from '../../lib/todo/aes';

interface TodoAddCommandArgs {
  input: string;
}

class TodoAddCommand extends TodoCommand {
  constructor() {
    super('add', {
      aliases: [ 'add', 'new', 'create' ],
      description: 'Add something to your todo list.',
      args: [
        {
          id: 'input',
          match: 'content',
          prompt: {
            start: 'What do you want to add to your todo list?'
          }
        }
      ]
    });
  }

  async exec(message: Message, { input }: TodoAddCommandArgs) {
    if (input.length > 100) {
      return this.warn(message, 'Todo needs to be less than 100 characters.');
    }

    const query: IListOpts = {
      userId: message.author.id,
      guildId: message.guild ? message.guild.id : 'private'
    };

    if (await Todo.count(query) === 20) {
      return this.error(message, 'You may not have more than 20 todos.');
    }

    const encryptedTodo = encrypt(input, message.author.id, message.author.createdTimestamp);

    const todo = new Todo({
      ...query,
      todo: encryptedTodo,
      completed: false
    });

    try {
      await todo.create();
      return this.success(message, 'Todo created successfully! Use `todo list` to view the list of your todos.');
    } catch (err) {
      return this.error(message, 'Something bad happened while trying to create the todo.');
    }
  }
}

export default TodoAddCommand;
