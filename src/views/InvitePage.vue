<template lang="pug">
  app-template
    .content
      h1 Invite
      p
        | Currently, Thimble Bot is not available for public invitation. This might
        | change in the future though.
        | If you want to use the bot in your server, you should contact me through one
        | of the ways described in the
        |
        router-link(to='/help') Help &amp; Support
        |
        | page.
</template>

<script>
import AppTemplate from '@/Template';

export default {
  name: 'invite-page',
  components: {
    'app-template': AppTemplate
  }
};
</script>
