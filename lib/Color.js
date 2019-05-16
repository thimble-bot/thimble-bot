class Color {
  constructor() {
    this.SOURCE_TYPES = {
      RGB: 1,
      HEX: 2,
      HSL: 3,
      CMYK: 4
    };

    this.__ERRORS = {
      INVALID_INPUT_ARRAY_PROPS: 'Invalid propreties supplied to the input array.',
      INVALID_INPUT_OBJ_PROPS: 'Invalid properties supplied to the input object.',
      INVALID_RGB: 'Invalid RGB value.',
      INVALID_HEX: 'Invalid HEX value.',
      INVALID_HSL: 'Invalid HSL value.',
      INVALID_CMYK: 'Invalid CMYK value.',
      INPUT_STRING_OR_OBJECT: 'Color input must be string, array, or object.'
    };
  }

  __isValidObject(input, ...args) {
    for (let i = 0; i < args.length; i++) {
      if (!input.hasOwnProperty(args[i])) {
        return false;
      }
    }

    return true;
  }

  __getArrayValues(input, ...args) {
    if (input.constructor === Array) {
      if (input.length !== args.length) {
        return new Error(this.__ERRORS.INVALID_INPUT_ARRAY_PROPS);
      }

      const obj = {
        [`${args[0]}`]: input[0],
        [`${args[1]}`]: input[1],
        [`${args[2]}`]: input[2]
      };

      if (args[3]) {
        Object.assign(obj, {
          [`${args[3]}`]: input[3]
        });
      }

      return obj;
    }

    if (!this.__isValidObject(input, ...args)) {
      return new Error(this.__ERRORS.INVALID_INPUT_OBJ_PROPS);
    }

    return input;
  }

  __isValidColorInput(input, rangeStart, rangeEnd) {
    input = Object.values(input);

    for (let i = 0; i < input.length; i++) {
      if (input[i] < rangeStart || input[i] > rangeEnd) {
        return false;
      }
    }

    return true;
  }

  __hexToRgb() {
    const parsed = parseInt(this._hex, 16);
    const r = (parsed >> 16) & 255;
    const g = (parsed >> 8) & 255;
    const b = parsed & 255;

    this._rgb = { r, g, b };
  }

  __hslToRgb() {
    const { h, s, l } = this._hsl;

    let r, g, b;

    if (s === 0) {
      this._rgb = { r: 255, g: 255, b: 255 };
      return;
    }

    const hueToRgb = (a, b, c) => {
      if (c < 1 / 6) {
        return a + (b - a) * 6 * c;
      }

      if (c < 1 / 2) {
        return b;
      }

      if (c < 2 / 3) {
        return a + (b - a) * 6 * (2 / 3 - c);
      }

      return a;
    };

    const q = l < 0.5
      ? l + l * s
      : l + s - l * s;

    const p = 2 * l - q;

    r = Math.floor(hueToRgb(p, q, h + 1 / 3) * 255);
    g = Math.floor(hueToRgb(p, q, h) * 255);
    b = Math.floor(hueToRgb(p, q, h - 1 / 3) * 255);

    this._rgb = { r, g, b };
  }

  __cmykToRgb() {
    let { c, m, y, k } = this._cmyk;

    let r, g, b;

    const f = 1 - k;

    r = Math.ceil(255 * (1 - c) * f);
    g = Math.ceil(255 * (1 - m) * f);
    b = Math.ceil(255 * (1 - y) * f);

    this._rgb = { r, g, b };
  }

  fromRGB(rgb) {
    switch (typeof rgb) {
      case 'string':
        if (rgb.startsWith('rgb')) {
          rgb = rgb.split('(').pop().split(')')[0].trim();
        }

        rgb = rgb.split(',').map(v => parseInt(v.trim(), 10));

        if (rgb.length !== 3) {
          return new Error(this.__ERRORS.INVALID_RGB);
        }
        this._rgb = {
          r: rgb[0],
          g: rgb[1],
          b: rgb[2]
        };

        break;

      case 'object':
        this._rgb = this.__getArrayValues(rgb, 'r', 'g', 'b');
        break;

      default:
        return new TypeError(this.__ERRORS.INPUT_STRING_OR_OBJECT);
    }

    this.__sourceType = this.SOURCE_TYPES.RGB;

    if (!this.__isValidColorInput(this._rgb, 0, 255)) {
      return new Error(this.__ERRORS.INVALID_RGB);
    }

    return this;
  }

  fromHex(hex) {
    if (hex.startsWith('#')) {
      hex = hex.slice(1);
    }

    if (!hex.match(/(^[0-9A-Fa-f]{6}$)|(^[0-9A-Fa-f]{3}$)/i)) {
      return new Error(this.__ERRORS.INVALID_HEX);
    }

    if (hex.length === 3) {
      hex = hex.split('').map(c => `${c}${c}`).join('');
    }

    this._hex = hex;
    this.__sourceType = this.SOURCE_TYPES.HEX;
    this.__hexToRgb();

    return this;
  }

  fromHSL(hsl) {
    switch (typeof hsl) {
      case 'string':
        if (hsl.startsWith('hsl')) {
          hsl = hsl.split('(').pop().split(')')[0].trim();
        }

        hsl = hsl.split(',').map(c => parseFloat(c.match(/\d+/)[0]));

        if (hsl.length !== 3) {
          return new Error(this.__ERRORS.INVALID_HSL);
        }

        this._hsl = {
          h: hsl[0],
          s: hsl[1],
          l: hsl[2]
        };

        break;

      case 'object':
        this._hsl = this.__getArrayValues(hsl, 'h', 's', 'l');
        break;

      default:
        return new TypeError(this.__ERRORS.INPUT_STRING_OR_OBJECT);
    }

    this.__sourceType = this.SOURCE_TYPES.HSL;

    if (!this.__isValidColorInput(this._hsl, 0, 1)) {
      return new Error(this.__ERRORS.INVALID_HSL);
    }

    this.__hslToRgb();

    return this;
  }

  fromCMYK(cmyk) {
    switch (typeof cmyk) {
      case 'string':
        if (cmyk.startsWith('cmyk')) {
          cmyk = cmyk.split('(').pop().split(')')[0].trim();
        }

        cmyk = cmyk.split(',').map(c => c.match(/\d+/)[0]);

        if (cmyk.length !== 4) {
          return new Error(this.__ERRORS.INVALID_CMYK);
        }

        this._cmyk = {
          c: cmyk[0],
          m: cmyk[1],
          y: cmyk[2],
          k: cmyk[3]
        };

        break;

      case 'object':
        this._cmyk = this.__getArrayValues(cmyk, 'c', 'm', 'y', 'k');
        break;

      default:
        return new TypeError(this.__ERRORS.INPUT_STRING_OR_OBJECT);
    }

    this.__sourceType = this.SOURCE_TYPES.CMYK;

    if (!this.__isValidColorInput(this._cmyk, 0, 1)) {
      return new Error(this.__ERRORS.INVALID_CMYK);
    }

    this.__cmykToRgb();

    return this;
  }

  rgb(text = false) {
    return text
      ? `${this._rgb.r}, ${this._rgb.g}, ${this._rgb.b}`
      : this._rgb;
  }

  hex() {
    if (this._hex) {
      return `#${this._hex}`;
    }

    const { r, g, b } = this._rgb;

    return '#' + [ r, g, b ].map(component => {
      const hex = component.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  hsl(text = false) {
    if (this._hsl) {
      return text
        ? `${this._hsl.h * 360}°, ${this._hsl.s * 100}%, ${this._hsl.l * 100}%`
        : this._hsl;
    }

    let { r, g, b } = this._rgb;

    r = r / 255;
    g = g / 255;
    b = b / 255;

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

      h /= 6;
    }

    h = (h * 360).toFixed(2);
    s = (s * 100).toFixed(2);
    l = (l * 100).toFixed(2);

    if (text) {
      h = `${h}°`;
      s = `${s}%`;
      l = `${l}%`;
    }

    return text
      ? [ h, s, l ].join(', ')
      : { h, s, l };
  }

  cmyk(text = false) {
    if (this._cmyk) {
      return text
        ? `${this._cmyk.c * 100}%, ${this._cmyk.m * 100}%, ${this._cmyk.y * 100}%, ${this._cmyk.k * 100}%`
        : this._cmyk;
    }

    const { r, g, b } = this._rgb;

    if (!r && !g && !b) {
      return text
        ? '0%, 0%, 0%, 1%'
        : { c: 0, m: 0, y: 0, k: 1 };
    }

    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);

    let minimum = Math.min(c, m, y);

    c = ((c - minimum) / (1 - minimum) * 100).toFixed(2);
    m = ((m - minimum) / (1 - minimum) * 100).toFixed(2);
    y = ((y - minimum) / (1 - minimum) * 100).toFixed(2);

    let k = (minimum * 100).toFixed(2);

    if (text) {
      c = `${c}%`;
      m = `${m}%`;
      y = `${y}%`;
      k = `${k}%`;
    }

    return text
      ? [ c, m, y, k ].join(', ')
      : { c, m, y, k };
  }
};

module.exports = () => new Color();
module.exports.default = module.exports;
module.exports.Color = module.exports;
