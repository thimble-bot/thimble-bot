import { IInteraction, Interaction } from '../models/Interaction';
import { InteractionOptout, IInteractionOptout } from '../models/InteractionOptout';
import { ITodo, Todo } from '../models/Todo';

const interactionData = require('../../old/interactions.json');
const interactionOptoutData = require('../../old/interaction_optouts.json');
const todoData = require('../../old/todos.json');

const migrateInteraction = async (entry: IInteraction) => {
  const interaction = new Interaction({
    sender: entry.sender,
    receiver: entry.receiver,
    guild: entry.guild,
    type: entry.type,
    counts: typeof entry.counts === 'string'
      ? parseInt(entry.counts)
      : entry.counts
  });

  await interaction.create();
};

const migrateInteractionOptout = async (entry: IInteractionOptout) => {
  const output = new InteractionOptout({
    user: entry.user,
    guild: entry.guild,
    type: entry.type
  });

  await output.create();
};

const migrateTodo = async (entry: ITodo) => {
  const todo = new Todo({
    userId: entry.userId,
    guildId: entry.guildId || '',
    todo: entry.todo,
    completed: !!entry.completed
  });

  await todo.create();
};

const MIGRATIONS = [
  {
    name: 'Interaction',
    data: interactionData,
    callback: migrateInteraction
  },
  {
    name: 'Interaction Optout',
    data: interactionOptoutData,
    callback: migrateInteractionOptout,
  },
  {
    name: 'Todo',
    data: todoData,
    callback: migrateTodo
  }
];

(async () => {
  for (const migration of MIGRATIONS) {
    console.log(`Migrating "${migration.name}" Entries\n`);

    for (const entry of migration.data) {
      process.stdout.write(`    Migrating ${migration.name.toLowerCase()} with ID ${entry.id}... `);

      try {
        await migration.callback(entry);
      } catch (err) {
        console.error(err);
        process.exit(-1);
      }

      process.stdout.write('done.\n\n');
    }

    console.log(`Finished migrating "${migration.name}".\n`);
  }
})().then(() => console.log('Done!')).catch(console.error);
