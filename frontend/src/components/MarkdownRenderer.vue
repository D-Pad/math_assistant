<template>
  <div class="markdown-body" v-html="html"></div>
</template>

<script setup>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import { katex } from '@mdit/plugin-katex';
import 'katex/dist/katex.min.css' 

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
  breaks: false 
}).use(katex, {
  throwOnError: false,
  // delimiters: 'dollars' | 'brackets' | 'all'  (default is usually dollars)
})

const html = computed(() => md.render(props.content || ''))
</script>

<style>
.markdown-body {
  font-family: 'Fraunces', serif;
}
.katex { font-size: 1.1em; }
</style>
