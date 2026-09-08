<script setup>
import NoteBook from "../../components/NoteBook.vue";

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
</script>

<template>
  <NoteBook :notes="noteSections" />
</template>

