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

// Fractions
import FractHeader from "@notes/general/fractions/header.md?raw";
import FractGen from "@notes/general/fractions/general.md?raw";
import FractMult from "@notes/general/fractions/multiply.md?raw";

// Exponents and Roots 
import ExpHeader from "@notes/general/exponents/header.md?raw";
import Exponents from "@notes/general/exponents/info.md?raw";


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
  exponents: {
    headerDoc: ExpHeader,
    title: "Exponents",
    sections: {
      exp1: {
        title: "Exponents and Roots",
        comp: Exponents
      }
    }
  },
  fractions: {
    headerDoc: FractHeader,
    title: "Fractions",
    sections: {
      frac1: {
        title: "General",
        comp: FractGen
      },
      frac2: {
        title: "Multiplying",
        comp: FractMult
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

