import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home';
import NotFoundPage from './views/NotFoundPage';
import InvitePage from './views/InvitePage';
import CommandsPage from './views/CommandsPage';
import MarkdownPage from './views/MarkdownPage';
import HelpPage from './views/HelpPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: function (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return to.hash
      ? { selector: to.hash }
      : { x: 0, y: 0 };
  },
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
      path: '/privacy',
      name: 'privacy',
      component: MarkdownPage,
      props: { documentId: 'privacy-policy' }
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFoundPage
    }
  ]
});
