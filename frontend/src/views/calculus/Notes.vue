<script setup>
import { ref, watch } from "vue";
import MarkdownRenderer from "../../components/MarkdownRenderer.vue";

// ------------------- Markdown documents here --------------------- //
// Calculus Made Easy 
import CMEHeader from "../../../markdown_notes/calc_made_easy/header.md?raw";
import CMEone from "../../../markdown_notes/calc_made_easy/ch1.md?raw";
import CMEtwo from "../../../markdown_notes/calc_made_easy/ch2.md?raw";


// ------------------ Markdown rendering helpers ------------------- //
const noteSections = {
  calculusMadeEasy: {
    headerDoc: CMEHeader, 
    title: "Book: Calculus Made Easy",
    sections: {
      ch1: {
        title: "Chapter 1",
        comp: CMEone
      },
      ch2: {
        title: "Chapter 2",
        comp: CMEtwo
      }
    }
  }
};

const selectedNotebook = ref("calculusMadeEasy");
const selectedSection = ref("ch1");

// Selected content
const header = ref(CMEHeader);
const content = ref(CMEone);

const loadContent = () => {
  header.value = noteSections[selectedNotebook.value].headerDoc;
  content.value = noteSections[
    selectedNotebook.value
  ].sections[
    selectedSection.value 
  ].comp;
}

watch([selectedNotebook, selectedSection], loadContent);
</script>

<template>
  
  <nav class="tabs">
  
    <div class="note-content-select">
      <span>Notebook: </span>
      <select v-model="selectedNotebook" class="select-box">
        <option 
          v-for="(nb, key) in noteSections"
          :value="key"
          :key="key"
        >
          {{ nb.title }} 
        </option>
      </select> 
    </div>

    <div class="note-content-select">
      <span>Section: </span>
      <select v-model="selectedSection" class="select-box">
        <option 
          v-for="(sec, key) in noteSections[selectedNotebook].sections"
          :value="key"
          :key="key"
        >
          {{ sec.title }}  
        </option>
      </select> 
    </div>

  </nav>

  <MarkdownRenderer :content="header" />
  <MarkdownRenderer :content="content" />
</template>

<style scoped>
.note-content-select span {
  color: var(--amber);
}

.note-content-select {
  margin-right: 20px;
}
</style>

