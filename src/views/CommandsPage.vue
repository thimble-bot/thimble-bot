<template lang="pug">
  app-template
    .content
      h1 Commands
      div(v-if='!isErrored')
        .groups-list(v-if='areCommandsLoaded')
          group(
            v-for='group, idx in Object.keys(groups)'
            :group='groups[group]',
            :key='idx'
            :id='group'
          )
        Loading(v-else=true)
      .error-message(v-else=true)
        | Failed to fetch command list. Please try again later, and if
        | the issue persists, please report the issue on GitHub.
</template>

<script>
import fetchCommands from '@/lib/fetchCommands';

import AppTemplate from '@/Template';
import GroupLayout from '@/components/commands/Group';
import Loading from '@/components/Loading';

export default {
  name: 'commands-page',
  data: function () {
    return {
      areCommandsLoaded: false,
      isErrored: false,
      groups: null
    };
  },
  mounted: function () {
    fetchCommands()
      .then(data => {
        this.groups = data;
        this.areCommandsLoaded = true;
      })
      .catch(function () {
        this.isErrored = true;
      });
  },
  components: {
    'app-template': AppTemplate,
    group: GroupLayout,
    Loading
  }
}
</script>

<style lang="scss">
  @import 'src/styles/colors';

  .groups-list {
    .command-group {
      border: 1px solid $thimble-dark-blue;
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
