<script setup>
import { ref, watch, onMounted } from 'vue';
import Grapher from './Grapher.vue';
import Riemann from './Riemann.vue';
import Limits from './limits/LimitMainView.vue';
import Reference from './Reference.vue';
import Notes from './Notes.vue';
import NavRow from '@/components/NavRow.vue';


const lastNotebook = ref("");
const ready = ref(false);


const tab = ref("grapher");
const tabs = [
  { id: 'grapher', title: "Grapher & Tangent", comp: Grapher },
  { id: 'riemann', title: "Riemann Sums", comp: Riemann },
  { id: 'limits', title: "Limits", comp: Limits },
  { id: 'reference', title: "Cheat Sheet", comp: Reference },
  { id: 'notes', title: "Notes", comp: Notes },
];


const updateNotebook = (newBook) => {
  lastNotebook.value = newBook; 
  localStorage.setItem('lastCalcNotebook', newBook);
}


watch(tab, (newTab) => {
  tab.value = newTab;
  localStorage.setItem('lastCalcTab', newTab);
});


onMounted(() => {
  
  const lastTab = localStorage.getItem('lastCalcTab');
  if (lastTab) {
    tab.value = lastTab;
  }

  const lastNb = localStorage.getItem('lastCalcNotebook');
  if (lastNb) {
    lastNotebook.value = lastNb;
  }

  ready.value = true;

});
</script>

<template>

  <NavRow v-model="tab" :tabs="tabs"/>

  <div class="tab-content">
    
    <div
      v-for="item in tabs"
      :id="item.id" 
      :key="item.id" 
      class="panel tab-panel"
      v-show="tab === item.id"
    >
      <component
        v-if="item.id === 'notes' && ready"
        :is="item.comp" 
        :lastNotebook="lastNotebook" 
        @update:book="updateNotebook($event)"
      />
      <component
        v-else
        :is="item.comp" 
      /> 
    </div>
    
  </div>

</template>

