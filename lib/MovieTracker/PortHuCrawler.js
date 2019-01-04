const dateFormat = require('date-fns').format;
const axios = require('axios');
const cheerio = require('cheerio');

class PortHuCrawler {
  /**
   * @typedef PortHuCrawlerOpts
   * @property {array} channels
   * @property {array} genres
   */
  /**
   * @constructor
   * @param {PortHuCrawlerOpts} opts
   */
  constructor(opts) {
    this.results = [];
    this.channels = opts.channels;
    this.genres = opts.genres;
  }

  /**
   * Turns a date into a port.hu date format.
   * @param {Date} date
   * @returns {string}
   */
  transformDate(date) {
    return dateFormat(date, 'YYYY-MM-DD');
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
   * Turns the raw HTML into Cheerio DOM format
   * @returns {CheerioStatic}
   */
  parseHTML() {
    return cheerio.load(this.html);
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
   * Converts time from Hungarian to Romanian time zone.
   * @param {string} time
   * @returns {string}
   */
  convertTime(time) {
    time = time.split(':');
    const originalHr = parseInt(time[0]);
    const hr = originalHr === 23
      ? 0
      : originalHr + 1;
    return `${hr}:${time[1]}`;
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
    const title = this.clearString($('.title').text());
    const channel = this.clearString($('.events-container > li:first-child > .place-name').text());
    let time = this.clearString($('.events-container > li:first-child > .event-dates > li:first-child > time').text());
    time = this.convertTime(time);
    const language = 'hu';

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
    const today = new Date();
    const tomorrow = new Date().setDate(today.getDate() + 1);

    const channels = this.channels.map(c => `tvchannel-${c}`).join('&channel[]=');

    const genres = this.genres.join('&genreTv[]=');

    const params = [
      [ 'q', '' ],
      [ 'interval', 'today' ],
      [ 'events_from', this.transformDate(today) ],
      [ 'events_until', this.transformDate(tomorrow) ],
      [ 'dft', 'i' ],
      [ 'city', 'countryWide' ],
      [ 'area', 'tvevent' ],
      [ 'tv_filter', 'all' ],
      [ 'channel[]', channels ],
      [ 'genreTv[]', genres ]
    ].map(param => param.join('=')).join('&');

    return encodeURI(`https://port.hu/programkereso/tv?${params}`);
  }

  /**
   * Returns the results if there are any.
   * @returns {MovieItem[]}
   */
  async init() {
    this.url = this.getFetchUrl();

    this.html = await this.fetch();

    const $ = this.parseHTML();

    if (!$('#search-hits').html()) {
      return null;
    }

    const results = $('#results > li');
    results.each((idx, elem) => {
      this.results.push(this.parseItem($(elem).html()));
    });

    return this.results;
  }
};

module.exports = PortHuCrawler;
