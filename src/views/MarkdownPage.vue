<template lang="pug">
  app-template
    .content
      .wrapper(v-if='!isErrored')
        div(v-if='isPageLoaded', v-html='content')
        Loading(v-else)
      .error-message(v-else)
        | Failed to render this page.
</template>

<script>
import AppTemplate from '@/Template';
import Loading from '@/components/Loading';

import axios from 'axios';
import Markdown from 'markdown-it';

const markdown = new Markdown({
  linkify: true
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
    Loading
  }
}
</script>
