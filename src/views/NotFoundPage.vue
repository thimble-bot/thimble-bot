<template lang="pug">
  app-template
    .content
      h1 404 Page Not Found!
      p You should try looking better...
</template>

<script>
import AppTemplate from '@/Template';

export default {
  name: 'not-found',
  components: {
    'app-template': AppTemplate
  }
};
</script>
