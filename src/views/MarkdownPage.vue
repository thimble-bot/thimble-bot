<template lang="pug">
  app-template
    .content
      .wrapper(v-if='!isErrored')
        vue-code-highlight(v-if='isPageLoaded', v-html='content')
        Loading(v-else)
      .error-message(v-else)
        | Failed to render this page.
</template>

<script>
import AppTemplate from '@/Template';
import Loading from '@/components/Loading';

import { component as VueCodeHighlight } from 'vue-code-highlight';

import axios from 'axios';
import Markdown from 'markdown-it';

const markdown = new Markdown({
  linkify: true,
  html: true
});

export default {
  name: 'markdown-page',
  props: {
    documentId: { type: String, required: true }
  },
  data: function () {
    return {
      isPageLoaded: false,
      isErrored: false,
      content: null
    };
  },
  mounted: function () {
    return axios
      .get(`/markdown-static/${this.documentId}.md`)
      .then(res => res.data)
      .then(data => {
        this.content = markdown.render(data);
        this.isPageLoaded = true;
        this.isErrored = false;
      })
      .catch(function () {
        this.isErrored = true;
      }.bind(this));
  },
  components: {
    'app-template': AppTemplate,
    Loading,
    VueCodeHighlight
  }
}
</script>

<style lang="scss">
@import 'src/styles/colors';

code {
  padding: 2px 8px;
  display: inline-block;
  background: $thimble-dark-blue;
  border-radius: 3px;
  color: #fff;
  font-size: .9rem;
  margin-bottom: 2px;
}

@import '~vue-code-highlight/themes/prism-okaidia.css';
</style>
