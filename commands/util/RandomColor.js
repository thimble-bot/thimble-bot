const { Command } = require('discord.js-commando');

class RandomColorCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'randomcolor',
      group: 'util',
      memberName: 'randomcolor',
      description: 'Generate a random color.',
      aliases: [ 'color', 'colour', 'colors', 'colours', 'randomcolor', 'randomcolour' ]
    });
  }

  getHex(...components) {
    return '#' + components.map(component => {
      const hex = component.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  getCMYK(r, g, b) {
    if (!r && !g && !b) {
      return '0, 0, 0, 1';
    }

    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);

    let minimum = Math.min(c, m, y);

    c = ((c - minimum) / (1 - minimum) * 100).toFixed(2) + '%';
    m = ((m - minimum) / (1 - minimum) * 100).toFixed(2) + '%';
    y = ((y - minimum) / (1 - minimum) * 100).toFixed(2) + '%';

    const k = (minimum * 100).toFixed(2) + '%';

    return [ c, m, y, k ].join(', ');
  }

  getHSL(r, g, b) {
    r = r / 255;
    g = r / 255;
    b = r / 255;

    const maximum = Math.max(r, g, b);
    const minimum = Math.min(r, g, b);

    let [ h, s, l ] = Array(3).fill((maximum + minimum) / 2);

    if (maximum === minimum) {
      h = s = 0;
    } else {
      const div = maximum - minimum;
      s = l > 0.5
        ? div / (2 - maximum - minimum)
        : div / (maximum + minimum);

      switch (maximum) {
        case r:
          h = (g - b) / div + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / div + 2;
          break;
        case b:
          h = (r - g) / div + 4;
          break;
      }

      h = h / 6;
    }

    h = (h * 360).toFixed(2) + '°';
    s = (s * 100).toFixed(2) + '%';
    l = (l * 100).toFixed(2) + '%';

    return [ h, s, l ].join(', ');
  }

  generateEmbed(hex, cmyk, hsl, rgb) {
    return {
      embed: {
        title: 'Random Color',
        author: {
          name: this.client.user.tag,
          icon_url: this.client.user.avatarURL
        },
        thumbnail: {
          url: `https://sallai.me/api/color/${hex.slice(1)}.png`
        },
        fields: [
          {
            name: 'HEX (hexadecimal):',
            value: hex
          },
          {
            name: 'RGB (red, green, blue):',
            value: rgb
          },
          {
            name: 'HSL (hue, saturation, lightness):',
            value: hsl
          },
          {
            name: 'CMYK (cyan, magenta, yellow, key):',
            value: cmyk
          }
        ],
        color: parseInt(hex.slice(1), 16).toString(10),
        timestamp: new Date(),
        footer: {
          text: '<3'
        }
      }
    };
  }

  run(message) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    const hex = this.getHex(r, g, b);
    const cmyk = this.getCMYK(r, g, b);
    const hsl = this.getHSL(r, g, b);
    const rgb = [ r, g, b ].join(', ');

    return message.say(this.generateEmbed(hex, cmyk, hsl, rgb));
  }
};

module.exports = RandomColorCommand;
