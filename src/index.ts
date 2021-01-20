import ThimbleBot from './thimblebot';

import config from './config';
import { initGuildConfigs } from './lib/guildConfig';

(async () => {
  await initGuildConfigs();

  const client = new ThimbleBot();
  client.login(config.bot.token);
})();
