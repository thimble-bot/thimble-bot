import urban, { WordDefinition } from 'urban-dictionary';
import { User, MessageEmbed } from 'discord.js';

export interface UrbanOpts {
  word: string;
  user: User | null;
}

export class UrbanLookupError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UrbanLookupError';
  }
}

class Urban {
  private word: string;
  private user: User | null;

  constructor(opts: UrbanOpts) {
    this.word = opts.word;
    this.user = opts.user;
  }

  private parseText(str: string): string {
    const delimiter = '...';

    str = str.replace(/[[\]']+/g, '');

    if (str.length > 1024) {
      return str.substr(0, 1024 - delimiter.length) + delimiter;
    }

    return str;
  }

  private generateEmbed(data: WordDefinition): MessageEmbed {
    const embed = new MessageEmbed();

    embed.setTitle(this.word);
    embed.setDescription(`The definition of \`${this.word}\` from Urban Dictionary.`);

    embed.addField('Definition', this.parseText(data.definition));

    if (data.example) {
      embed.addField('Example', data.example);
    }

    embed.addField('Author', data.author);

    embed.setURL(data.permalink);

    if (this.user) {
      embed.setAuthor(this.user.username, this.user.avatarURL() || this.user.defaultAvatarURL);
    }

    return embed;
  }

  async get(): Promise<MessageEmbed> {
    const { entries } = await urban.term(this.word);
    if (!entries.length) {
      throw new UrbanLookupError(`The definition of \`${this.word}\` could not be found in the Urban Dictionary.`);
    }

    return this.generateEmbed(entries[0]);
  }
}

export default Urban;
