const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const commandsRoot = path.join(__dirname, '..', 'commands');

const COMMAND_TEMPLATE = `const { Command } = require('discord.js-commando');

class {{className}} extends Command {
  constructor(client) {
    super(client, {
      name: '{{name}}',
      group: '{{group}}',
      memberName: '{{name}}',
      description: '{{description}}'
    });
  }

  run(message) {
    // do something
  }
};

module.exports = {{className}};
`;

const replaceInTemplate = (template, target, replaceWith) => {
  return template.split(target).join(replaceWith);
};

const capitalize = str => str[0].toUpperCase() + str.slice(1);

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
  .then((answers) => {
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

    const className = capitalize(name) + 'Command';

    let template = COMMAND_TEMPLATE;
    template = replaceInTemplate(template, '{{name}}', name.toLowerCase());
    template = replaceInTemplate(template, '{{className}}', className);
    template = replaceInTemplate(template, '{{group}}', group);
    template = replaceInTemplate(template, '{{description}}', description);

    return fs.writeFileSync(commandPath, template, { encoding: 'utf8' });
  })
  .then(function () {
    console.log('Done!');
    process.exit(0);
  })
  .catch(err => console.error(err));
