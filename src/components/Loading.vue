<template lang="pug">
  .loading-container
    img(src='../assets/quote.gif', alt='loading')
    .loading-text Loading...
</template>

<script>
export default {
  name: 'loading'
};
</script>

<style lang="scss">
  @import 'src/styles/colors';

  .loading-container {
    padding: 20px;
    text-align: center;

    .loading-text {
      margin-top: 10px;
      font-size: 22px;
      color: $thimble-blue;
      font-weight: 700;
    }
  }
</style>
