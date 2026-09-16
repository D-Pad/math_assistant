<script setup>
import { ref, watch, onMounted } from "vue";
import MarkdownRenderer from "./MarkdownRenderer.vue";


// ------------------ Markdown rendering helpers ------------------- //
const props = defineProps({
  notes: {
    type: Object,
    required: true
  },
  lastNotebook: {
    type: String,
    default: ""
  }
});


const emit = defineEmits(['update:book']);


const selectedNotebook = ref(props.lastNotebook);
const selectedSection = ref("");

// Selected content
const header = ref(null);
const loadHeader = () => {

  const sec = props.notes[selectedNotebook.value];
  header.value = sec.headerDoc ? sec.headerDoc : null;

  const sectionKeys = Object.keys(sec.sections);
  if (sectionKeys.length === 0) {
    selectedSection.value = "";
    return;
  } 

  selectedSection.value = sectionKeys[0];

}


const content = ref(null);
const loadContent = () => {
  
  const sections = props.notes[selectedNotebook.value].sections;
  const sec = sections[selectedSection.value];
  if (sec) {
    const comp = sections[selectedSection.value].comp;
    content.value = comp;
  }
  else {
    content.value = null;
  }
}


watch(selectedNotebook, (val) => {
  if (val) { 
    emit('update:book', val);
  }
  loadHeader();
});


watch(selectedSection, (val) => {
  if (val) {
    emit('update:section', val);
  } 
  loadContent()
});


onMounted(() => {

  const notebookKeys = Object.keys(props.notes);

  if (props.lastNotebook && props.notes[props.lastNotebook]) {
    selectedNotebook.value = props.lastNotebook;
  }
  else {
    selectedNotebook.value = notebookKeys[0] || "";
  }

  const nb = props.notes[selectedNotebook.value];
  if (nb) {
    const sectionKeys = Object.keys(nb.sections);

    if (props.lastSection && nb.sections[props.lastSection]) {
      selectedSection.value = props.lastSection;
    }
    else {
      selectedSection.value = sectionKeys[0] || "";
    }
  }

  loadHeader();
  loadContent();

});
</script>

<template>
  
  <nav class="tabs">
  
    <div class="note-content-select">
      <span>Notebook: </span>
      <select v-model="selectedNotebook" class="select-box">
        <option 
          v-for="(nb, key) in notes"
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
          v-for="(sec, key) in notes[selectedNotebook].sections"
          :value="key"
          :key="key"
        >
          {{ sec.title }}  
        </option>
      </select> 
    </div>

  </nav>

  <MarkdownRenderer v-if="header != null" :content="header" />
  <hr v-if="header !== null && content !== null"> 
  <MarkdownRenderer v-if="content != null" :content="content" />

</template>

<style scoped>
.note-content-select span {
  color: var(--amber);
}

.note-content-select {
  margin-right: 20px;
}
</style>

