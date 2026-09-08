<script setup>
import NoteBook from "../../components/NoteBook.vue";

// ------------------- Markdown documents here --------------------- //
// General notes 
import GenHeader from "@notes/trig/general/header.md?raw";
import GenOne from "@notes/trig/general/ch1.md?raw";

// ------------------ Markdown rendering helpers ------------------- //
const noteSections = {
  general: {
    headerDoc: GenHeader,
    title: "General",
    sections: {
      ch1: {
        title: "Chapter 1",
        comp: GenOne
      }
    }
  }, 
};
</script>

<template>
  <NoteBook :notes="noteSections" />
</template>

