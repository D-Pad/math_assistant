<script setup>
import { ref } from 'vue';
import Grapher from './Grapher.vue';
import Riemann from './Riemann.vue';
import Limits from './Limits.vue';
import Reference from './Reference.vue';
import Notes from './Notes.vue';
import NavRow from '../../components/NavRow.vue';


const tab = ref("grapher");


const tabs = [
  { id: 'grapher', title: "Grapher & Tangent", comp: Grapher },
  { id: 'riemann', title: "Riemann Sums", comp: Riemann },
  { id: 'limits', title: "Limits", comp: Limits },
  { id: 'reference', title: "Cheat Sheet", comp: Reference },
  { id: 'notes', title: "Notes", comp: Notes },
];
</script>

<template>

  <NavRow v-model="tab" :tabs="tabs"/>

  <main id="tab-content">
    
    <div
      v-for="item in tabs"
      :id="`${item.id}-grapher`" 
      :key="item.id" 
      class="panel tab-panel"
      v-show="tab === item.id"
    >
      <component :is="item.comp" /> 
    </div>
    
  </main>

</template>

