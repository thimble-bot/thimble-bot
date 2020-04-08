<template lang="pug">
  app-template
    .content
      loading
</template>

<script>
import AppTemplate from '@/Template';
import Loading from '@/components/Loading';

export default {
  name: 'invite-page',
  components: {
    'app-template': AppTemplate,
    Loading
  },
  mounted: function () {
    window.location = 'https://discordapp.com/oauth2/authorize?client_id=530503314291556372&scope=bot&permissions=8';
  }
};
</script>
