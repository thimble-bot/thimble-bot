import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';

import color from 'color';
import { error } from '../../lib/serviceMessages';

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

type ColorLike = string | RGB | CMYK | HSL;

interface ColorParserResult {
  kind: 'rgb' | 'cmyk' | 'hsl' | 'hex' | 'unknown';
  value?: ColorLike;
}

export default class ColorCommand extends Command {
  private isRandom: boolean = true;

  constructor() {
    super('color', {
      aliases: [ 'color', 'colour', 'colors', 'colours' ],
      description: {
        detail: 'Generate a random color.',
        examples: [
          '`color` - generates a random color and displays its RGB, hex, HSL, and CMYK values',
          '`color #3e3e3e` or `color #2e2` - generates color data based on hex string',
          '`color rgb(201, 29, 11)` or `color 201, 29, 11` - generates color data based on RGB values',
          '`color hsl(5.68°, 89.62%, 41.57%)` or `color 5.68°, 89.62%, 41.57%` - generates color data based on HSL',
          '`color cmyk(0.00%, 85.57%, 94.53%, 21.18%)` or `color 0.00%, 85.57%, 94.53%, 21.18%` - generates color data based on CMYK'
        ]
      },
      args: [
        {
          id: 'query',
          match: 'content',
          default: ''
        }
      ]
    });
  }

  private randomRGB(): RGB {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    return { r, g, b };
  }

  private cleanInput(input: string): string {
    return input
      .toLowerCase()
      .replace('rgb', '')
      .replace('hsl', '')
      .replace('cmyk', '')
      .replace('(', '')
      .replace(')', '');
  }

  private parseRGB(input: string): RGB | null {
    const components = input
      .split(',')
      .map(c => c.endsWith('%') || c.endsWith('°') ? -1 : parseInt(c, 10))
      .filter(c => c >= 0 && c <= 255);

    if (components.length !== 3) {
      return null;
    }

    const [ r, g, b ] = components;
    return { r, g, b };
  }

  private parseHSL(input: string): HSL | null {
    const rawComponents = input.split(',');

    if (rawComponents.length !== 3) {
      return null;
    }

    const components: number[] = [];

    for (let i = 0; i < rawComponents.length; i++) {
      const component = rawComponents[i];

      if (i !== 0 && !component.trim().endsWith('%')) {
        return null;
      }

      const value = parseFloat(component);

      if (Number.isNaN(value)) {
        return null;
      }

      if (i === 0 && (value < 0 || value > 360)) {
        return null;
      }

      if (i !== 0 && (value < 0 || value > 100)) {
        return null;
      }

      components.push(value);
    }

    const [ h, s, l ] = components;
    return { h, s, l };
  }

  private parseCMYK(input: string): CMYK | null {
    const rawComponents = input.split(',');

    if (rawComponents.length !== 4) {
      return null;
    }

    const components: number[] = [];

    for (const component of rawComponents) {
      if (!component.trim().endsWith('%')) {
        return null;
      }

      const value = parseFloat(component);

      if (Number.isNaN(value)) {
        return null;
      }

      if (value < 0 || value > 100) {
        return null;
      }

      components.push(value);
    }

    const [ c, m, y, k ] = components;
    return { c, m, y, k };
  }

  private parseHEX(input: string): string | null {
    input = input.replace('#', '').trim();

    if (input.length !== 3 && input.length !== 6) {
      return null;
    }

    const value = parseInt(input, 16);

    if (Number.isNaN(value)) {
      return null;
    }

    if (input.length === 3 && (value < 0 || value > 0xFFF)) {
      return null;
    }

    if (input.length === 6 && (value < 0 || value > 0xFFFFFF)) {
      return null;
    }

    if (input.length === 3) {
      const result = input.split('').map(c => c + c).join('');
      return `#${result}`;
    }

    return `#${input}`;
  }

  private parseInput(input: string): ColorParserResult {
    input = this.cleanInput(input);

    let result: ColorLike | null = this.parseRGB(input);
    if (result) {
      // it's likely RGB
      return {
        kind: 'rgb',
        value: result
      };
    }

    result = this.parseHSL(input);
    if (result) {
      // it's likely HSL
      return {
        kind: 'hsl',
        value: result
      };
    }

    result = this.parseCMYK(input);
    if (result) {
      // it's likely CMYK
      return {
        kind: 'cmyk',
        value: result
      };
    }

    result = this.parseHEX(input);
    if (result) {
      // it's likely hex
      return {
        kind: 'hex',
        value: result
      };
    }

    // we don't know what this is, maybe `color` knows
    return {
      kind: 'unknown',
      value: input
    };
  }

  private generateEmbed(data: color): MessageEmbed {
    const embed = new MessageEmbed();

    const hexWithoutHash = data.hex().slice(1);

    const rgb = data.rgb().object();
    const hsl = data.hsl().object();
    const cmyk = data.cmyk().object();

    embed.setTitle(this.isRandom ? 'Random Color' : 'Color Info');
    embed.setAuthor(this.client.user?.tag, this.client.user?.avatarURL() || this.client.user?.defaultAvatarURL);
    embed.setThumbnail(`https://dummyimage.com/100/${hexWithoutHash}/${hexWithoutHash}`);

    embed.addField('HEX (hexadecimal)', data.hex());
    embed.addField('RGB (red, green, blue)', `${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}`);
    embed.addField('HSL (hue, saturation, lightness)', `${hsl.h.toFixed(2)}°, ${hsl.s.toFixed(2)}%, ${hsl.l.toFixed(2)}%`);
    embed.addField('CMYK (cyan, magenta, yellow, key)', `${cmyk.c.toFixed(2)}%, ${cmyk.m.toFixed(2)}%, ${cmyk.y.toFixed(2)}%, ${cmyk.k.toFixed(2)}%`);

    embed.setColor(data.rgbNumber());
    embed.setTimestamp(new Date());
    embed.setFooter('<3');

    return embed;
  }

  exec(message: Message, { query }: { query: string }) {
    this.isRandom = !query.length;

    const input = query.length
      ? query
      : this.randomRGB();

    if (this.isRandom) {
      const result = color(input);
      return message.channel.send(this.generateEmbed(result));
    }

    const data = this.parseInput(query);

    try {
      const result = color(data.value);
      return message.channel.send(this.generateEmbed(result));
    } catch (err) {
      return message.channel.send(error('You have provided an invalid color value.'));
    }
  }
};
