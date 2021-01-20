import * as fs from 'fs';
import * as path from 'path';

import { Command, PrefixSupplier } from 'discord-akairo';
import CommandDescription from '../typings/commandDescription';

interface ListCategoryData {
  name: string;
  description: string;
}

interface ListCommandData {
  name: string;
  description?: string | null;
  aliases?: string[];
  examples?: string[];
}

interface ListCategory {
  meta: ListCategoryData;
  commands: ListCommandData[];
}

type CommandListData = { [category: string]: ListCategory };

const COMMANDS_LIST_PATH = path.join(__dirname, '../..', 'assets/commands.json');

const getPrefix = (prefix: string | string[] | PrefixSupplier): string => {
  if (typeof prefix === 'string') {
    // prefix is stored as a string, so we'll just return it
    return prefix;
  }

  if (typeof prefix === 'function') {
    // prefix is a function, hacky workaround to pass null as a Message param
    // to a prefix supplier
    return (prefix as any)(null);
  }

  // prefix is an array of prefixes, so return the first one
  return prefix[0];
};

export const categoryMap: { [id: string]: ListCategoryData } = {
  config: {
    name: 'Configuration',
    description: '(NEW) Bot configuration commands (can only be used by server admins).'
  },

  fun: {
    name: 'Fun',
    description: 'Fun commands.'
  },

  interaction: {
    name: 'Interaction',
    description: 'A set of commands that allows members to boop/hug/highfive each other.'
  },

  moderation: {
    name: 'Moderation',
    description: 'Useful moderation commands like ban/kick and purge.'
  },

  music: {
    name: 'Music',
    description: '(NEW) Music commands.'
  },

  todo: {
    name: 'Todo',
    description: 'Commands that allow you to use Thimble Bot as a todo manager.'
  },

  util: {
    name: 'Utilities',
    description: 'A collection of (mostly) useful commands.'
  }
};

export const getCommandDescription = (description: CommandDescription | string): (string | null) => {
  if (typeof description === 'string') {
    return description;
  }

  return description.detail || null;
};

export const getCommandExamples = (description: CommandDescription | string): string[] => {
  if (typeof description === 'string') {
    return [];
  }

  if (!description.examples?.length) {
    return [];
  }

  return description.examples;
};

export const commandWithPrefix = (command: string, prefix?: string | string[] | PrefixSupplier): string => {
  return prefix ? `${getPrefix(prefix)}${command}` : command;
};

export const getCommandAliases = (command: Command): string[] => {
  return command.aliases
    .slice(1)
    .map(alias => commandWithPrefix(alias, command.prefix));
};

export const generateCommandList = (commandList: Command[]) => {
  const data: CommandListData = {};

  Object.keys(categoryMap)
    .forEach(category => {
      const commands: ListCommandData[] = commandList
        .filter(cmd => cmd.categoryID === category)
        .map(command => {
          return {
            name: commandWithPrefix(command.aliases[0], command.prefix),
            description: getCommandDescription(command.description),
            aliases: getCommandAliases(command),
            examples: getCommandExamples(command.description)
          };
        });

      data[category] = {
        meta: categoryMap[category],
        commands
      };
    });

  const output = JSON.stringify(data, null, 2);
  fs.writeFileSync(COMMANDS_LIST_PATH, output, { encoding: 'utf8' });
};
