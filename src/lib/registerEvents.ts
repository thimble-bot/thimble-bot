import onMessage from '../handlers/onMessage';
import onReady from '../handlers/onReady';
import { IThimbleBot } from '../typings/thimblebot';

import * as path from 'path';
import * as fs from 'fs';

type MethodHandler = (client: IThimbleBot, ...params: any[]) => any;

const CUSTOM_HANDLERS_PATH = path.join(__dirname, '../..', 'custom/handlers');

const registerEvents = (client: IThimbleBot) => {
  client.on('message', (message) => {
    const customHandlers = path.join(CUSTOM_HANDLERS_PATH, '_message');
    (Object.values(require('require-all')(customHandlers)) as MethodHandler[])
      .forEach(handler => handler(client, message));

    return onMessage(message);
  });

  client.on('ready', () => {
    const customHandlers = path.join(CUSTOM_HANDLERS_PATH, '_ready');
    (Object.values(require('require-all')(customHandlers)) as MethodHandler[])
      .forEach(handler => handler(client));

    return onReady(client)();
  });

  const CUSTOM_HANDLERS_SETUP_PATH = path.join(CUSTOM_HANDLERS_PATH, 'setup.js');
  if (fs.existsSync(CUSTOM_HANDLERS_SETUP_PATH)) {
    require(CUSTOM_HANDLERS_SETUP_PATH)(client);
  }
};

export default registerEvents;
