<template lang="pug">
  footer.wrapper
    .copy
      | Made with 💖 by
      |
      a(href='https://sallai.me', target='_blank') @jozsefsallai
      | . Bot and website licensed under MIT. Thimble (character and design) is the property
      | of József Sallai. You may NOT use the character or its name without the owner's
      | written approval. Discord is the property of Discord, Inc.
</template>

<script>
export default {
  name: 'the-footer'
};
</script>


<style lang="scss">
  footer {
    padding: 20px;
    text-align: center;

    .copy {
      color: #656565;
      font-size: 13px;
    }
  }
</style>
