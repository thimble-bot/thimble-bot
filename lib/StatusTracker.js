const config = require('../config').StatusTracker;
const axios = require('axios');

class StatusTracker {
  /**
   * @typedef StatusTrackerOpts
   * @property {boolean} userInitialized
   */
  /**
   * @constructor
   * @param {StatusTrackerOpts} opts
   */
  constructor(opts) {
    this.domains = config.domains;
    this.timeout = config.timeout;
    this.down = [];
    this.badStatus = [];
    this.userInitialized = (opts && opts.userInitialized) || false;
  }

  /**
   * Creates an asynchronous loop through an array.
   * @param {array} arr
   * @param {function} callback
   */
  async asyncLoop(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
      await callback(arr[i], i, arr);
    }
  }

  /**
   * Checks whether a given URL is accessible.
   * @param {string} url
   * @returns {Promise}
   */
  getStatus(url) {
    return new Promise((resolve, reject) => {
      return axios.get(url, { timeout: this.timeout * 1000 })
        .then(() => resolve('OK'))
        .catch(err => err.response ? reject('BAD_STATUS') : reject('UNREACHABLE'));
    });
  }

  /**
   * Loops through an array of domains and performs a check.
   */
  async checkDomains() {
    return this.asyncLoop(this.domains, async (domain) => {
      try {
        await this.getStatus(domain);
      } catch (err) {
        switch (err) {
          case 'BAD_STATUS':
            return this.badStatus.push(domain);
          case 'UNREACHABLE':
            return this.down.push(domain);
          default:
            throw new Error(err);
        }
      }
    });
  }

  /**
   * Turns an array of strings into a list.
   * @param {array} arr
   * @returns {string}
   */
  makeList(arr) {
    return ` • ${arr.join('\n • ')}`;
  }

  /**
   * Turns a HEX color value into decimal.
   * @param {string} hex
   * @returns {string}
   */
  getColorDecimal(hex) {
    if (hex[0] === '#') {
      hex = hex.slice(1);
    }

    return parseInt(hex, 16).toString(10);
  }

  /**
   * Creates a Discord embed based on the given options.
   * @param {object} opts
   * @returns {object}
   */
  generateEmbed(opts) {
    const {
      fields,
      description,
      icon,
      color
    } = opts;

    return {
      embed: {
        title: 'Server Status Tracker',
        description,
        fields,
        thumbnail: {
          url: icon
        },
        color,
        timestamp: new Date(),
        footer: {
          text: '<3'
        }
      }
    };
  }

  /**
   * Initiates the process of checking.
   * @returns {Promise}
   */
  track() {
    return new Promise((resolve, reject) => {
      return this
        .checkDomains()
        .then(() => {
          const fields = [];

          if (this.badStatus && this.badStatus.length) {
            fields.push({
              name: 'The following websites return a bad status code:',
              value: this.makeList(this.badStatus)
            });
          }

          if (this.down && this.down.length) {
            fields.push({
              name: 'The following websites are inaccessible:',
              value: this.makeList(this.down)
            });
          }

          const description = fields && fields.length
            ? 'There are some issues with one or more websites.'
            : 'Woo-hoo, all websites are perfectly functional!';

          const icon = fields && fields.length
            ? 'https://i.sallai.me/thimblebot/icons/server_error.png'
            : 'https://i.sallai.me/thimblebot/icons/server_ok.png';

          const color = fields && fields.length
            ? this.getColorDecimal('#d72828')
            : this.getColorDecimal('#41ad49');

          const embed = this.generateEmbed({
            fields,
            description,
            icon,
            color
          });

          return !fields.length && config.quiet && !this.userInitialized
            ? resolve(null)
            : resolve(embed);
        })
        .catch(err => reject(err));
    });
  }
};

module.exports = StatusTracker;
