<script setup>
import NoteBook from "@/components/NoteBook.vue";

// ------------------- Markdown documents here --------------------- //
// Calculus Made Easy 
import CMEHeader from "@notes/calculus/calc_made_easy/header.md?raw";
import CMEone from "@notes/calculus/calc_made_easy/ch1.md?raw";
import CMEtwo from "@notes/calculus/calc_made_easy/ch2.md?raw";

// Mobius reading material
import MobModOne_One from "@notes/calculus/mobius/mod_1_1.md?raw";
import MobModOne_Two from "@notes/calculus/mobius/mod_1_2.md?raw";
import MobModOne_Three from "@notes/calculus/mobius/mod_1_3.md?raw";

import MobModTwo_One from "@notes/calculus/mobius/mod_2_1.md?raw";

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
  },
  mobius: {
    title: "Mobius",
    sections: {
      mod10: {
        title: "Module 1-1:",
        comp: MobModOne_One
      },
      mod11: {
        title: "Module 1-2:",
        comp: MobModOne_Two
      },
      mod12: {
        title: "Module 1-3:",
        comp: MobModOne_Three
      },
      mod20: {
        title: "Module 2-1:",
        comp: MobModTwo_One
      },
    }
  }
};


const props = defineProps({
  lastNotebook: {
    type: String,
    default: ""
  }
});


const emit = defineEmits([ 'update:book' ]);


const updateNotebook = (newBook) => {
  emit('update:book', newBook); 
}
</script>

<template>
  <NoteBook 
    :notes="noteSections" 
    :lastNotebook="props.lastNotebook"
    @update:book="updateNotebook($event)"
  />
</template>

