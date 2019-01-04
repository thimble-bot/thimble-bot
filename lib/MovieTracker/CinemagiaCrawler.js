const axios = require('axios');
const cheerio = require('cheerio');
const slugify = require('slugify');

class CinemagiaCrawler {
  /**
   * @typedef CinemagiaOpts
   * @property {array} channels
   * @property {string} genre
   */
  /**
   * @constructor
   * @param {CinemagiaOpts} opts
   */
  constructor(opts) {
    this.results = [];
    this.channels = opts.channels;
    this.genre = opts.genre;
  }

  /**
   * Fetches the database.
   * @returns {Promise}
   */
  fetch() {
    return new Promise((resolve, reject) => {
      return axios.get(this.url)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  }

  /**
   * Wrapper for String.prototype.trim
   * @param {string} str
   * @returns {string}
   */
  clearString(str) {
    return str.trim();
  }

  /**
   * Turns the raw HTML into Cheerio DOM format
   * @returns {CheerioStatic}
   */
  parseHTML() {
    return cheerio.load(this.html);
  }

  /**
   * @typedef MovieItem
   * @property {string} title
   * @property {string} channel
   * @property {string} time
   * @property {string} language
   */
  /**
   * Returns information about the item.
   * @param {string} item
   * @returns {MovieItem}
   */
  parseItem(item) {
    const $ = cheerio.load(item);
    const title = this.clearString($('.show_title').text());
    const channel = this.clearString($('.movie-release-info > .r1').text());
    const time = this.clearString($('.movie-release-info > .r2').text());
    const language = 'ro';

    return {
      title,
      channel,
      time,
      language
    };
  }

  /**
   * Builds the URL for fetching.
   * @returns {string}
   */
  getFetchUrl() {
    const channels = this.channels.map(c => slugify(c.toLowerCase())).join(',');

    return `https://www.cinemagia.ro/program-tv/filme-la-tv/filme-${channels}/filme-${this.genre}/azi`;
  }

  /**
   * Returns the results if there are any.
   * @returns {MovieItem[]}
   */
  async init() {
    this.url = this.getFetchUrl();

    this.html = await this.fetch();

    const $ = this.parseHTML();

    if ($('.container_filme_tv').text() === 'Nu există filme pentru selecţia făcută.') {
      return null;
    }

    const results = $('.container_filme_tv > .hour_container .movie');
    results.each((idx, elem) => {
      this.results.push(this.parseItem($(elem).html()));
    });

    return this.results;
  }
};

module.exports = CinemagiaCrawler;
