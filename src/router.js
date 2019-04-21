import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home';
import NotFoundPage from './views/NotFoundPage';
import InvitePage from './views/InvitePage';
import CommandsPage from './views/CommandsPage';
import HelpPage from './views/HelpPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/invite',
      name: 'invite',
      component: InvitePage
    },
    {
      path: '/commands',
      name: 'commands',
      component: CommandsPage
    },
    {
      path: '/help',
      name: 'help',
      component: HelpPage
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFoundPage
    }
  ]
});
