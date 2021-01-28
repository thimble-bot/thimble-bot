import TodoCommand from '../../lib/todo/TodoCommand';
import { Message, MessageEmbed } from 'discord.js';
import { error } from '../../lib/serviceMessages';
import { IListOpts, ITodo, Todo } from '../../models/Todo';
import { decrypt } from '../../lib/todo/aes';

type TodoData = Omit<ITodo, 'todo'> & {
  todo: string | null;
  id: string;
};

class TodoListCommand extends TodoCommand {
  constructor() {
    super('list', {
      aliases: [ 'list' ],
      description: 'List all your todos.'
    });
  }

  private generateEmbed(todos: TodoData[]): string[] | MessageEmbed[] {
    if (!todos.length) {
      return [ ':ballot_box_with_check: You have no todos! Good job!' ];
    }

    const list = todos.map((entry, idx) => {
      const emote = entry.completed
        ? ':white_check_mark:'
        : ':negative_squared_cross_mark:';

      return `${emote} ${idx + 1}. ${entry.todo}`;
    });

    const embeds = [];

    const embed = new MessageEmbed();
    embed.setTitle('Your Todo List');
    embed.setDescription(list.slice(0, 10).join('\n'));
    embeds.push(embed);

    if (todos.length > 10) {
      const secondList = new MessageEmbed();
      secondList.setDescription(list.slice(10, 20).join('\n'));
      embeds.push(secondList);
    }

    return embeds;
  }

  async exec(message: Message) {
    const query: IListOpts = {
      userId: message.author.id,
      guildId: message.guild ? message.guild.id : 'private'
    };

    try {
      const todos: TodoData[] = (await Todo.list(query))
        .sort((a, b) => (a.createTime?.seconds as number) - (b.createTime?.seconds as number))
        .map(snapshot => {
          const data = snapshot.data();

          return {
            id: snapshot.id,
            ...data,
            todo: decrypt(data.todo, message.author.id, message.author.createdTimestamp)
          };
        })
        .filter(entry => entry.todo !== null);

      const embeds = this.generateEmbed(todos);

      for await (const embed of embeds) {
        await message.channel.send(embed);
      }
    } catch (err) {
      return message.channel.send(error('Something bad happened while displaying your todo list.'));
    }
  }
}

export default TodoListCommand;
