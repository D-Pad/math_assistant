<template>
  <div class="markdown-body" v-html="html"></div>
</template>

<script setup>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import { katex } from '@mdit/plugin-katex';
import hljs from 'highlight.js';

// Styles 
import 'katex/dist/katex.min.css' 
import 'highlight.js/styles/github-dark.css';

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const md = new MarkdownIt({
  html: true,      
  linkify: true,
  typographer: true,
  breaks: false,

  // Code syntax highlighting
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
            hljs.highlight(str, 
              { language: lang, ignoreIllegals: true }).value +
          '</code></pre>'
        )
      } catch (__) {}
    }

    // Fallback for unknown languages
    return (
      '<pre class="hljs"><code>' +
      md.utils.escapeHtml(str) +
      '</code></pre>'
    )
  }

}).use(katex, {
  throwOnError: false,
  // delimiters: 'dollars' | 'brackets' | 'all'  (default is usually dollars)
})

const html = computed(() => md.render(props.content || ''))
</script>

<style>
.markdown-body pre.hljs {
  padding: 1em;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.9em;
  line-height: 1.5;
}

.markdown-body {
  font-family: 'Fraunces', serif;
  font-size: 20px; 
  max-height: 600px;
  overflow-y: auto;
  padding-right: 8px;
  scrollbar-width: thin;
}

.markdown-body img {
  width: 100%;
  height: auto;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5 {
  margin-top: 1.0em;
  margin-bottom: 0.6em;
}

.markdown-body h1 {
  color: var(--coral);
  font-size: 1.5em;
}

.markdown-body h2 {
  color: var(--amber);
  font-size: 1.3em;
}

.markdown-body h3 {
  color: var(--teal);
  font-size: 1.1em;
}

.markdown-body h4 {
  color: var(--cyan);
  font-size: 0.9em;
}

.markdown-body h5 {
  color: var(--purple);
  font-size: 0.7em;
}

.markdown-body em {
  color: var(--cyan); 
  margin: 0px 5px;
}

.markdown-body strong {
  color: var(--amber); 
}

.markdown-body ul {
  color: var(--purple);
}

/* ========== Tables ========== */
.markdown-body table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.2em 0;
  font-size: 0.95em;
}

.markdown-body th,
.markdown-body td {
  border: 1px solid var(--ink);
  padding: 0.55em 0.9em;
  text-align: left;
}

.markdown-body th {
  background-color: var(--ink);
  color: var(--bg);   
  font-weight: 600;
}

.markdown-body tr:nth-child(even) {
  background-color: var(--grid); 
}

.katex { font-size: 1.1em; }
</style>
