<script setup>
import { ref } from "vue";
import MarkdownRenderer from "../../components/MarkdownRenderer.vue";

// Markdown documents here 
import calcOneNotes from "../../../markdown_notes/calculus_one.md?raw";


const content = ref(calcOneNotes);
</script>

<template>
  <MarkdownRenderer :content="content" />
</template>

