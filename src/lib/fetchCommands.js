import axios from 'axios';

const commandsURL = 'https://raw.githubusercontent.com/jozsefsallai/thimble-bot/master/assets/commands.json';

const fetchCommands = () => {
  return new Promise((resolve, reject) => {
    return axios.get(commandsURL, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(({ data }) => {
        return resolve(data);
      })
      .catch(err => {
        console.error(err);
        return reject(err);
      });
  });
};

export default fetchCommands;
