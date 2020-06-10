const urban = require('urban.js');

class Urban {
  constructor(opts) {
    this.word = opts.word;
    this.user = opts.user;
  }

  parseText(str) {
    const delimiter = '...';

    str = str.replace(/[[\]']+/g, '');

    if (str.length > 1024) {
      return str.substr(0, 1024 - delimiter.length) + delimiter;
    }

    return str;
  }

  generateEmbed(data) {
    const fields = [
      {
        name: 'Definition',
        value: this.parseText(data.definition),
      },
      {
        name: 'Example',
        value: data.example ? this.parseText(data.example) : 'N/A',
      },
      {
        name: 'Author',
        value: data.author,
      },
    ];

    if (data.tags && data.tags.length) {
      fields.push({
        name: 'Tags',
        value: data.tags.join(', '),
      });
    }

    return {
      embed: {
        author: {
          name: this.user.username,
          icon_url: this.user.avatarURL,
        },
        title: this.word,
        url: data.URL,
        description:
          `The definition of "${this.word}" from Urban Dictionary.`,
        fields,
      },
    };
  }

  init() {
    return new Promise((resolve, reject) => {
      return urban(this.word)
        .then((data) => resolve(this.generateEmbed(data)))
        .catch(() => reject(new Error('An unexpected error occurred. Perhaps there is no definition for your query yet.')));
    });
  }
}

module.exports = Urban;
