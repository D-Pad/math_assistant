<script setup>
import NoteBook from "@/components/NoteBook.vue";

// ------------------- Markdown documents here --------------------- //
// General notes 
import GenHeader from "@notes/general/header.md?raw";
import Intro from "@notes/general/info.md?raw";

// Functions
import FnHeader from "@notes/general/functions/header.md?raw";
import Functions from "@notes/general/functions/functions.md?raw";
import FunctionGraph from "@notes/general/functions/function_graph.md?raw";
import Logarithms from "@notes/general/functions/logarithms.md?raw";


// ------------------ Markdown rendering helpers ------------------- //
const noteSections = {
  general: {
    headerDoc: GenHeader, 
    title: "General Information",
    sections: {
      ch1: {
        title: "Intro",
        comp: Intro
      }
    }
  },
  functions: {
    headerDoc: FnHeader,
    title: "Functions",
    sections: {
      fnCh1: {
        title: "Info",
        comp: Functions
      },
      fnCh2: {
        title: "Graphing Functions",
        comp: FunctionGraph
      },
      fnCh3: {
        title: "Logarithms",
        comp: Logarithms 
      }
    } 
  }
};
</script>

<template>
  <NoteBook :notes="noteSections" />
</template>

