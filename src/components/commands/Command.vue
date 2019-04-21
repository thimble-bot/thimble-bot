<template lang="pug">
  .command
    .command-name(:id='command.name')
      span {{ command.name }}
      a.hyperlink(:href='"#" + command.name', title='Copy link to command') #
    .command-aliases(v-if='command.aliases && command.aliases.length')
      strong Aliases:
      span.alias(v-for='alias in command.aliases') {{ alias }}
    .command-description {{ command.description }}
    .command-usage(v-if='command.examples && command.examples.length')
      strong Usage/examples:
      .example(v-for='example in command.examples') {{ example }}
</template>

<script>
export default {
  name: 'command-layout',
  props: {
    command: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss">
  @import 'src/styles/colors';

  .command {
    .command-name {
      font-weight: 700;
      font-family: 'Courier New', Courier, monospace;
      font-size: 18px;
      margin-bottom: 15px;
      
      span {
        display: inline-block;
        padding: 5px 10px;
        background: #f2f2f2;
        border-radius: 3px;
      }

      .hyperlink {
        margin-left: 15px;
        display: none;
      }

      &:hover {
        .hyperlink {
          display: inline-block;
        }
      }
    }

    .command-aliases {
      font-size: 15px;
      line-height: 1;
      margin-bottom: 10px;

      strong {
        margin-right: 5px;
      }

      .alias {
        display: inline-block;
        font-family: 'Courier New', Courier, monospace;
        padding: 2px 4px;
        background: #f2f2f2;
        border-radius: 3px;
        margin-right: 5px;
      }
    }

    .command-usage {
      margin-top: 10px;

      strong {
        font-size: 18px;
        color: $thimble-dark-blue;
        margin-bottom: 5px;
        display: inline-block;
      }

      .example {
        margin-left: 25px;
        
        &::before {
          font-family: FontAwesome;
          content: '\f054';
          margin-right: 10px;
          color: $thimble-blue;
        }
      }
    }
  }
</style>
