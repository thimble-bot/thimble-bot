<template lang="pug">
  app-template
    .content
      h1 Invite
      p
        | Currently, Thimble Bot is not available for public invitation. This will be
        | changed in the future though.
        | If you want to use the bot in your server, you should contact me on any
        | of the mediums described in the
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
