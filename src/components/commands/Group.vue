<template lang="pug">
  .command-group
    .meta
      .name(:id='getGroupId') {{ group.meta.name }}
      .description {{ group.meta.description }}
    .commands
      command(
        v-for='command, idx in group.commands'
        :command='command'
        :key='idx'
      )
</template>

<script>
import CommandLayout from '@/components/commands/Command';

export default {
  name: 'command-group',
  props: {
    group: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  components: {
    command: CommandLayout
  },
  computed: {
    getGroupId: function () {
      return `group-${this.id}`;
    }
  }
};
</script>

<style lang="scss">
  @import 'src/styles/colors';

  .command-group {
    .meta {
      padding: 15px 25px;
      color: #fff;
      background: $thimble-dark-blue;

      .name {
        font-size: 20px;
        font-weight: 700;
      }
    }

    .commands {
      padding: 15px 25px;

      .command {
        padding-bottom: 15px;
        margin-bottom: 15px;
        border-bottom: 1px solid #dedede;

        &:last-child {
          padding-bottom: 0;
          margin-bottom: 0;
          border-bottom: 0;
        }
      }
    }
  }
</style>
