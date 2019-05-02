const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const commandsRoot = path.join(__dirname, '..', 'commands');

const COMMAND_TEMPLATE = `const { Command } = require('{{requirePath}}');

class {{className}} extends Command {
  constructor(client) {
    super(client, {
      name: '{{name}}',
      memberName: '{{name}}',
      description: '{{description}}'{{extraOpts}}
    });
  }

  {{runFunctionName}}(message) {
    // do something
  }
};

module.exports = {{className}};
`;

const replaceInTemplate = (template, target, replaceWith) => {
  return template.split(target).join(replaceWith);
};

const capitalize = str => str[0].toUpperCase() + str.slice(1);

const parseExtraOpts = (template, isCustom, group) => {
  return new Promise((resolve, reject) => {
    if (!isCustom) {
      return resolve(replaceInTemplate(template, '{{extraOpts}}', `,\n      group: '${group}'`));
    }

    return inquirer.prompt([
      {
        type: 'string',
        name: 'guilds',
        message: 'Guild IDs where the custom command is enabled, separated by comma (or leave empty for global commands).\n'
      }
    ])
      .then(answers => {
        if (!answers.guilds) {
          return resolve(replaceInTemplate(template, '{{extraOpts}}', ',\n      isGlobalCommand: true'));
        }

        const guilds = answers.guilds
          .split(',')
          .map(g => g.trim())
          .join("',\n        '");

        const extraOpts = `,
      guilds: [
        '${guilds}'
      ]`;

        return resolve(replaceInTemplate(template, '{{extraOpts}}', extraOpts));
      })
      .catch(err => reject(err));
  });
};

inquirer.prompt([
  {
    type: 'string',
    name: 'name',
    message: 'Command name:'
  },
  {
    type: 'string',
    name: 'group',
    message: 'Command group:'
  },
  {
    type: 'string',
    name: 'description',
    message: 'Command description:'
  }
])
  .then(async (answers) => {
    const { name, group, description } = answers;

    if (!name || !group || !description) {
      throw new Error('Please answer all questions.');
    }

    const groupPath = path.join(commandsRoot, group);
    const commandPath = path.join(groupPath, `${capitalize(name)}.js`);

    if (fs.existsSync(commandPath)) {
      throw new Error(`Command "${name}" already exists.`);
    }

    if (!fs.existsSync(groupPath)) {
      fs.mkdirSync(groupPath);
    }

    const isCustom = group === 'custom';
    const requirePath = isCustom
      ? '../../lib/CustomCommand'
      : 'discord.js-commando';

    const className = capitalize(name) + 'Command';

    let template = COMMAND_TEMPLATE;
    template = replaceInTemplate(template, '{{requirePath}}', requirePath);
    template = replaceInTemplate(template, '{{name}}', name.toLowerCase());
    template = replaceInTemplate(template, '{{className}}', className);
    template = replaceInTemplate(template, '{{description}}', description);

    const runFunctionName = isCustom ? 'runCommand' : 'run';

    template = replaceInTemplate(template, '{{runFunctionName}}', runFunctionName);

    try {
      template = await parseExtraOpts(template, isCustom, group);
    } catch (err) {
      throw new Error(err);
    }

    return fs.writeFileSync(commandPath, template, { encoding: 'utf8' });
  })
  .then(function () {
    console.log('Done!');
    process.exit(0);
  })
  .catch(err => console.error(err));
