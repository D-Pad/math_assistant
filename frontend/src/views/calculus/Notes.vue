<script setup>
import NoteBook from "@/components/NoteBook.vue";

// ------------------- Markdown documents here --------------------- //
// Calculus Made Easy 
import CMEHeader from "@notes/calculus/calc_made_easy/header.md?raw";
import CMEone from "@notes/calculus/calc_made_easy/ch1.md?raw";
import CMEtwo from "@notes/calculus/calc_made_easy/ch2.md?raw";

// Mobius reading material
import MobModOne_Two_One from "@notes/calculus/mobius/mod_1_2-1.md?raw";
import MobModOne_Two_Two from "@notes/calculus/mobius/mod_1_2-2.md?raw";
import MobModOne_Two_Three from "@notes/calculus/mobius/mod_1_2-3.md?raw";

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
        title: "Module 1: 2.1",
        comp: MobModOne_Two_One
      },
      mod11: {
        title: "Module 1: 2.2",
        comp: MobModOne_Two_Two
      },
      mod12: {
        title: "Module 1: 2.3",
        comp: MobModOne_Two_Three
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

