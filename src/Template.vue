<template lang="pug">
  div
    header
      .wrapper
        .logo-container
          router-link.logo(to='/')
            .icon
            span Thimble Bot
        nav.main-navigation(:class='{ "hamburger-open": hamburgerOpen }')
          router-link(to='/') Home
          router-link(to='/commands') Commands
          router-link(to='/customization') Customization
          router-link(to='/help') Help
          a(href='https://github.com/jozsefsallai/thimble-bot', target='_blank') GitHub
          router-link(to='/invite').invite-button Invite
        a(href='javascript:;', @click='toggleHamburgerState').hamburger-icon
          i.fa.fa-bars(v-if='!hamburgerOpen')
          i.fa.fa-times(v-else=true)
    main.page.wrapper
      slot
    the-footer
</template>

<script>
import TheFooter from '@/components/TheFooter';

export default {
  name: 'app-template',
  data: function () {
    return {
      hamburgerOpen: false
    }
  },
  components: {
    'the-footer': TheFooter
  },
  methods: {
    toggleHamburgerState: function () {
      this.hamburgerOpen = !this.hamburgerOpen;
    }
  }
};
</script>
