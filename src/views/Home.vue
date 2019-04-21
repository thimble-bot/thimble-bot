<template lang="pug">
  app-template
    .content.home-page
      .avatar
        img(src='../assets/thimble.png', alt='Thimble Bot', title='Thimble Bot')
      h1
        span.blue Thimble&nbsp;
        span.green Bot
      .description
        | Thimble Bot is a small, fast, and open-source general-purpose Discord bot.
        | It comes packed with lots of fun, moderation, and other useful commands and features!
      .invite-button
        router-link(to='/invite')
          i.fa.fa-arrow-right
          | Invite to Your Server
</template>

<script>
import AppTemplate from '@/Template';

export default {
  name: 'home',
  components: {
    'app-template': AppTemplate
  }
};
</script>

<style lang="scss">
  @import 'src/styles/colors';

  .home-page {
    text-align: center;

    .avatar {
      img {
        max-height: 300px;
      }
    }

    .blue {
      color: $thimble-blue;
    }

    .green {
      color: $thimble-green;
    }

    .invite-button {
      padding: 30px 0;

      a {
        display: inline-block;
        padding: 15px 25px;
        background: $thimble-green;
        border-radius: 4px;
        font-size: 18px;
        font-weight: 700;
        color: #fff;
        transition: background .1s linear;

        &:hover {
          background: $thimble-light-green;
        }

        i {
          margin-right: 5px;
        }
      }
    }
  }
</style>
