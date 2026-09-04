<script setup>
import { ref, watch } from "vue";
import MarkdownRenderer from "../../components/MarkdownRenderer.vue";

// ------------------- Markdown documents here --------------------- //
// General notes 
import GenHeader from "../../../markdown_notes/general/header.md?raw";

// Calculus Made Easy 
import CMEHeader from "../../../markdown_notes/calc_made_easy/header.md?raw";
import CMEone from "../../../markdown_notes/calc_made_easy/ch1.md?raw";
import CMEtwo from "../../../markdown_notes/calc_made_easy/ch2.md?raw";

// Mobius reading material
import MobHeader from "../../../markdown_notes/mobius/header.md?raw";
import MobModOne from "../../../markdown_notes/mobius/mod_1.md?raw";

// ------------------ Markdown rendering helpers ------------------- //
const noteSections = {
  general: {
    headerDoc: GenHeader,
    title: "General",
    sections: {}
  }, 
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
  },
  mobius: {
    headerDoc: MobHeader, 
    title: "Mobius",
    sections: {
      mod1: {
        title: "Module 1",
        comp: MobModOne
      }    
    }
  }
};

const selectedNotebook = ref("general");
const selectedSection = ref("");

// Selected content
const header = ref(GenHeader);
const loadHeader = () => {
  
  const sec = noteSections[selectedNotebook.value];
  header.value = sec.headerDoc;
  
  const sectionKeys = Object.keys(sec.sections);
  if (sectionKeys.length === 0) {
    selectedSection.value = "";
    return;
  } 

  selectedSection.value = sectionKeys[0];
}

const content = ref(null);
const loadContent = () => {
  const sections = noteSections[selectedNotebook.value].sections;
  const comp = sections[selectedSection.value].comp;
  content.value = comp;
}

watch(selectedNotebook, loadHeader);
watch(selectedSection, loadContent);
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

    <div class="note-content-select"
      v-if="selectedSection !== ''">
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

