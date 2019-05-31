<template lang="pug">
  app-template
    .content
      h1 Commands
      div(v-if='!isErrored')
        .groups-list(v-if='areCommandsLoaded')
          .categories
            a(
              href='javascript:;'
              @click='resetFilters',
              :class='{ active: groupFilter.length === 0 }'
            ) All
            a(
              v-for='group in Object.keys(groups)'
              href='javascript:;'
              @click='applyFilter(group)'
              :class='{ active: groupFilter.includes(group) }'
            ) {{ groups[group].meta.name }}
          .search-box
            i.fa.fa-search
            input(
              type='search'
              name='search'
              @keyup='deepSearch'
              placeholder='Search for commands...'
            )
          group(
            v-for='group, idx in Object.keys(filteredGroups)'
            :group='filteredGroups[group]'
            :key='idx'
            :id='group'
          )
        Loading(v-else)
      .error-message(v-else)
        | Failed to fetch command list. Please try again later, and if
        | the issue persists, please report the issue on GitHub.
</template>

<script>
import fetchCommands from '@/lib/fetchCommands';
import clone from '@/lib/clone';

import AppTemplate from '@/Template';
import GroupLayout from '@/components/commands/Group';
import Loading from '@/components/Loading';

import pull from 'lodash.pull';

export default {
  name: 'commands-page',
  data: function () {
    return {
      areCommandsLoaded: false,
      isErrored: false,
      groups: null,
      groupFilter: [],
      filteredGroups: null
    };
  },
  mounted: function () {
    fetchCommands()
      .then(data => {
        this.groups = data;
        this.filteredGroups = data;
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
  },
  methods: {
    resetFilters: function () {
      this.areCommandsLoaded = false;

      this.filteredGroups = clone(this.groups);
      this.groupFilter = [];

      this.areCommandsLoaded = true;
    },

    applyFilter: function (id) {
      this.areCommandsLoaded = false;

      if (this.groupFilter.includes(id)) {
        delete this.filteredGroups[id];
        pull(this.groupFilter, id);

        if (!this.groupFilter.length) {
          return this.resetFilters();
        }

        this.areCommandsLoaded = true;

        return;
      }

      if (!this.groupFilter.length) {
        this.filteredGroups = {};
      }

      this.groupFilter.push(id);
      this.filteredGroups[id] = clone(this.groups[id]);

      this.areCommandsLoaded = true;
    },

    aliasFilter: function (aliases, target) {
      return !!aliases.filter(alias => alias.includes(target)).length;
    },

    deepSearch: function (e) {
      const target = e.currentTarget.value;

      this.resetFilters();

      if (!target.trim().length) {
        return;
      }

      this.filteredGroups = {};

      Object.keys(this.groups).forEach(id => {
        const commands = this.groups[id].commands;

        const filteredCommands = commands.filter(command => {
          return command.name.includes(target.toLowerCase)
            || command.description.toLowerCase().includes(target.toLowerCase())
            || this.aliasFilter(command.aliases, target);
        });

        if (filteredCommands.length) {
          if (!this.filteredGroups[id]) {
            this.filteredGroups[id] = clone(this.groups[id]);
          }

          this.filteredGroups[id].commands = filteredCommands;
        }
      });
    }
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

  .categories {
    text-align: center;

    a {
      padding: 3px 15px;
      display: inline-block;
      border: 3px solid $thimble-green;
      margin: 10px 5px;
      transition: .2s background linear, .2s color linear;
      border-radius: 4px;

      &:hover, &.active {
        color: #fff;
        background: $thimble-green;
      }
    }
  }

  .search-box {
    position: relative;

    i {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 15px;
      color: $thimble-dark-blue;
    }

    input {
      padding-left: 40px;
    }
  }
</style>
