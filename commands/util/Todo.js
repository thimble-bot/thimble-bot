const { Command } = require('discord.js-commando');
const AES = require('aes-js');

const Todo = require('../../db/models/todos/Todo');

const meta = {
  name: 'todo',
  description: 'Create and manage your to-dos within the bot. You can have to-dos per server or private to-dos by sending a DM to the bot.',
  args: [
    {
      key: 'args',
      type: 'string',
      prompt: 'Please provide a command and other optional parameters, if applicable.'
    }
  ],
  examples: [
    '`todo add|new|create Text of the to-do` - Create a new to-do (up to 20).',
    '`todo list` - Get a list of your to-dos.',
    '`todo done id` - Mark a to-do as done (you can get the id from `todo list`)',
    '`todo undo id` - Mark a to-do as pending/not done.',
    '`todo delete id` - Delete a to-do from your list.'
  ]
};

class TodoCommand extends Command {
  constructor(client) {
    super(client, {
      ...meta,
      memberName: 'todo',
      group: 'util'
    });
  }

  encrypt(str, id, ts) {
    ts = ts.toString().padEnd(16, '0');
    const key = ts.split('').slice(0, 16).map(c => c.charCodeAt(0));

    str = JSON.stringify({ str, id });

    const byteArray = AES.utils.utf8.toBytes(str);

    // eslint-disable-next-line new-cap
    const counter = new AES.ModeOfOperation.ctr(key, new AES.Counter(4));
    const encrypted = counter.encrypt(byteArray);

    return AES.utils.hex.fromBytes(encrypted);
  }

  decrypt(str, id, ts) {
    ts = ts.toString().padEnd(16, '0');
    const key = ts.split('').slice(0, 16).map(c => c.charCodeAt(0));

    const byteArray = AES.utils.hex.toBytes(str);

    // eslint-disable-next-line new-cap
    const counter = new AES.ModeOfOperation.ctr(key, new AES.Counter(4));
    const decrypted = counter.decrypt(byteArray);

    const output = AES.utils.utf8.fromBytes(decrypted);

    try {
      const json = JSON.parse(output);

      if (json.id !== id) {
        return null;
      }

      return json.str;
    } catch (err) {
      return null;
    }
  }

  generateMessage(message, todos) {
    if (!todos.length) {
      return message.say(':ballot_box_with_check: You have no to-dos!');
    }

    todos = todos.map(todo => {
      const emote = todo.completed
        ? ':white_check_mark:'
        : ':negative_squared_cross_mark:';
      
      return `${emote} ${todo.displayId}. ${todo.text}`;
    });
    
    return message.say({
      embed: {
        title: `${message.author.username}'s To-Dos`,
        description: todos.slice(0, 10).join('\n')
      }
    })
      .then(function () {
        if (todos.length > 10) {
          return message.say({
            embed: {
              description: todos.slice(10, 20).join('\n')
            }
          });
        }

        return null;
      })
      .catch(err => {
        console.error(err);
        return message.say(':x: Failed to list your to-dos.');
      });
  }

  async count(message) {
    const where = {
      userId: message.author.id,
      guildId: message.guild ? message.guild.id : null
    };

    return await Todo.count({ where });
  }

  async add(message, args) {
    if (!args) {
      return message.say(':warning: Please provide the text of the to-do.');
    }

    if (args.length > 100) {
      return message.say(':warning: A to-do cannot have more than 100 characters.');
    }

    if (await this.count(message) > 20) {
      return message.say(':warning: You cannot have more than 20 to-dos.');
    }

    const encryptedTodo = this.encrypt(args, message.author.id, message.author.createdTimestamp);

    const createOpts = {
      userId: message.author.id,
      todo: encryptedTodo
    };

    if (message.guild) {
      Object.assign(createOpts, { guildId: message.guild.id });
    }

    try {
      await Todo.create(createOpts);
      return message.say(':ballot_box_with_check: **To-do added successfully!** Type `todo list` to view the list of your to-dos.');
    } catch (err) {
      console.error(err);
    }
  }

  async list(message) {
    const where = {
      userId: message.author.id,
      guildId: message.guild ? message.guild.id : null
    };

    const todos = await Todo.findAll({ where })
      .then(results => Promise.all(results.map((r, idx) => {
        return {
          id: r.id,
          displayId: idx + 1,
          text: this.decrypt(r.todo, message.author.id, message.author.createdTimestamp),
          completed: r.status ? true : false
        };
      })));

    return todos;
  }

  async changeStatus(message, args, newStatus) {
    if (!args || (args && !parseInt(args))) {
      return message.say(':warning: Please provide the ID of the to-do that you want to mark as done.');
    }

    try {
      const list = await this.list(message);
      const filteredList = list.filter(item => item.displayId === parseInt(args, 10));
  
      if (!filteredList.length) {
        return message.say(':warning: Could not find the to-do.');
      }
  
      await Todo.findOne({
        where: {
          id: filteredList[0].id
        }
      })
        .then(record => {
          record.status = newStatus;
          return record;
        })
        .then(record => record.save());
      
      const response = newStatus === Todo.STATUS.pending
        ? ':ballot_box_with_check: To-do marked as pending.'
        : `:ballot_box_with_check: To-do marked as done. If you want to delete it, run \`todo delete ${args}\`.`;
      
      return message.say(response);
    } catch (err) {
      return message.say(':x: Failed to change the status of the to-do.');
    }
  }

  async delete(message, args) {
    if (!args || (args && !parseInt(args))) {
      return message.say(':warning: Please provide the ID of the to-do that you want to mark as done.');
    }

    try {
      const list = await this.list(message);
      const filteredList = list.filter(item => item.displayId === parseInt(args, 10));

      if (!filteredList.length) {
        return message.say(':warning: Could not find the to-do.');
      }

      await Todo.destroy({
        where: {
          id: filteredList[0].id
        }
      });

      return message.say(':ballot_box_with_check: To-do deleted successfully.');
    } catch (err) {
      return message.say(':x: Failed to delete the to-do.');
    }
  }

  async run(message, { args }) {
    const option = args.split(' ', 1).join('');
    const argument = args.slice(option.length).trim();

    switch (option) {
      case 'add':
      case 'new':
      case 'create':
        return await this.add(message, argument);
      case 'done':
        return await this.changeStatus(message, argument, Todo.STATUS.done);
      case 'undo':
        return await this.changeStatus(message, argument, Todo.STATUS.pending);
      case 'delete':
        return await this.delete(message, argument);
      case 'list':
        const list = await this.list(message);
        return this.generateMessage(message, list);
      default:
        return message.say(':x: Unknown option.');
    }
  }
};

module.exports = TodoCommand;
module.exports.meta = meta;
