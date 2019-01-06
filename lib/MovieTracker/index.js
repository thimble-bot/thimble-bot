const config = require('../../config');
const chalk = require('chalk');

const PortHuCrawler = require('./PortHuCrawler');
const CinemagiaCrawler = require('./CinemagiaCrawler');

/**
 * Logs a string if debug mode is enabled.
 * @param {string} str
 */
const log = str => {
  if (config.MovieTracker.debug) {
    console.log(str);
  }
};

/**
 * Turns the result into a Discord Embed.
 * @param {object} result
 * @returns {object}
 */
const generateEmbed = result => {
  const fields = [
    {
      name: 'Title',
      value: result.title
    },
    {
      name: 'Channel',
      value: result.channel
    },
    {
      name: 'Time',
      value: result.time
    }
  ];

  return {
    embed: {
      title: `:flag_${result.language}: Found movie!`,
      fields
    }
  };
};

/**
 * Creates a big array of results and returns it.
 * @returns {(array|null)}
 */
const MovieTracker = async () => {
  const port = new PortHuCrawler({
    channels: config.MovieTracker.portdothu.channels,
    genres: config.MovieTracker.portdothu.genres
  });
  
  const cinemagia = new CinemagiaCrawler({
    channels: config.MovieTracker.cinemagia.channels,
    genre: config.MovieTracker.cinemagia.genre
  });

  let results = [];

  log(chalk.bold(`${chalk.bgCyan('PORT.HU')} - Fetching information...`));
  log(`${chalk.bold('Fetch URL:')} ${port.getFetchUrl()}`);

  try {
    const portData = await port.init();

    if (portData) {
      log(chalk.bold(`${chalk.bgGreen('SUCCESS')} Returned data:`));
      log(portData);

      results = [...portData];
    } else {
      log(`${chalk.bold(chalk.bgBlue('INFO'))} The result set is empty.`);
    }
  } catch (err) {
    log(chalk.bold(`${chalk.bgRed('ERROR')} ${chalk.red('Something bad happened...')}`));
    log(err);
  }

  log('\n');

  log(chalk.bold(`${chalk.bgCyan('CINEMAGIA.RO')} - Fetching information...`));
  log(`${chalk.bold('Fetch URL:')} ${cinemagia.getFetchUrl()}`);

  try {
    const cinemagiaData = await cinemagia.init();

    if (cinemagiaData) {
      log(chalk.bold(`${chalk.bgGreen('SUCCESS')} Returned data:`));
      log(cinemagiaData);

      results = [...results, ...cinemagiaData];
    } else {
      log(`${chalk.bold(chalk.bgBlue('INFO'))} The result set is empty.`);
    }
  } catch (err) {
    log(chalk.bold(`${chalk.bgRed('ERROR')} ${chalk.red('Something bad happened...')}`));
    log(err);
  }

  log('\n');

  if (results.length) {
    log(chalk.bold(chalk.bgGreen('FINAL RESULT SET')));
    log(results);

    return results.map(r => generateEmbed(r));
  } else {
    log(chalk.bold(chalk.bgBlue('Final result set is empty')));
    return null;
  }
};

module.exports = MovieTracker;
