<template lang="pug">
  app-template
    .content
      h1 Help &amp; Support
      p
        | Do you have any questions or bug reports regarding Thimble Bot? There
        | are several ways you can get an answer to your inquiry!
      ul
        li
          | Create an issue on the
          |
          a(:href='issueTrackerLink', target='_blank') GitHub issue tracker
        li
          | Send me an
          |
          a(href='mailto:jozsef@sallai.me') email
        li
          | Add me on Discord:
          |
          strong joexyz#0001
        li
          | ...or Telegram:
          |
          a(href='https://t.me/joe_xyz', target='_blank') t.me/joe_xyz
      p Do you have a feature suggestion? Feel free to tell me about it!
      p
        | Are you a developer and want to contribute to the bot's development?
        | Thimble Bot is free and open-source and any kind of contribution is
        | highly appreciated!
</template>

<script>
import AppTemplate from '@/Template';

export default {
  name: 'help-page',
  components: {
    'app-template': AppTemplate
  },
  computed: {
    issueTrackerLink: function () {
      return 'https://github.com/jozsefsallai/thimble-bot/issues'
    }
  }
};
</script>
