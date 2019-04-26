const { Command } = require('discord.js-commando');

const axios = require('axios');
const cheerio = require('cheerio');

class AnagramCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'anagram',
      group: 'fun',
      memberName: 'anagram',
      aliases: [ 'anagrams' ],
      description: 'Get the anagrams of a word or expression.',
      examples: [
        '`anagram Curly Brace` - Will display the anagrams of "Curly Brace".'
      ],
      args: [
        {
          key: 'input',
          prompt: 'What do you want the anagrams for?',
          type: 'string'
        }
      ]
    });
  }

  checkInput(input) {
    if (input.length > 20) {
      return {
        ok: false,
        error: 'Input needs to be shorter than 20 characters.'
      };
    }

    if (input.split(' ').length > 4) {
      return {
        ok: false,
        error: 'Please provide less than 4 words.'
      };
    }

    return { ok: true };
  }

  getAnagrams(html) {
    return html.split('<br>').filter(a => a.length && a.length <= 20);
  }

  generateMessage(anagrams) {
    let message = anagrams.join('|');

    if (message.length - anagrams.length > 1800) {
      message = message.substr(0, 1800).split('|').slice(0, -1).join('|');
    }

    message = message.replace(/\n/g, '');
    message = `**${message.split('|').length} anagrams displayed:**\n\`\`\`${message.split('|').join(', ')}\`\`\``;

    return message;
  }

  fetch(url) {
    return new Promise((resolve, reject) => {
      return axios.get(url)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  }

  async run(message, { input }) {
    message.channel.startTyping();

    const check = this.checkInput(input);
    if (!check.ok) {
      return message.say(`:warning: ${check.error}`).then(() => message.channel.stopTyping());
    }

    const encodedInput = encodeURIComponent(input);

    const url = `https://new.wordsmith.org/anagram/anagram.cgi?anagram=${encodedInput}&t=100&a=n`;

    try {
      const data = await this.fetch(url);
      const $ = cheerio.load(data);

      const anagramContainer = $('blockquote > div');

      const anagrams = this.getAnagrams(anagramContainer.html());

      if (anagrams.length === 0 || (anagrams.length === 1 && !anagrams[0])) {
        return message.say(`:x: No anagrams found for the query "${input}".`).then(() => message.channel.stopTyping());
      }

      return message.say(this.generateMessage(anagrams)).then(() => message.channel.stopTyping());
    } catch (err) {
      console.error(err);
      return message.say(':x: Failed to fetch anagrams.').then(() => message.channel.stopTyping());
    }
  }
};

module.exports = AnagramCommand;
