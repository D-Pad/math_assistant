<script setup>
import { ref, onMounted, watch } from 'vue';
import UnitCircle from './UnitCircle.vue';
import WaveExplorer from './WaveExplorer.vue';
import Reference from './Reference.vue';
import Notes from './Notes.vue';
import NavRow from '../../components/NavRow.vue';


const tab = ref("circle");
const tabs = [
  { id: 'circle', title: "Unit Circle", comp: UnitCircle },
  { id: 'waves', title: "Wave Explorer", comp: WaveExplorer },
  { id: 'reference', title: "Cheat Sheet", comp: Reference },
  { id: 'notes', title: "Notes", comp: Notes },
];


const ready = ref(false);
const lastNotebook = ref("");


const updateNotebook = (newBook) => {
  lastNotebook.value = newBook; 
  localStorage.setItem('lastTrigNotebook', newBook);
}


watch(tab, (newTab) => {
  tab.value = newTab;
  localStorage.setItem('lastTrigTab', newTab);
});


onMounted(() => {
  
  const lastNb = localStorage.getItem('lastTrigNotebook');
  if (lastNb) {
    lastNotebook.value = lastNb;
  }

  const lastTab = localStorage.getItem('lastTrigTab');
  if (lastTab) {
    tab.value = lastTab;
  }

  ready.value = true;

});
</script>

<template>

  <NavRow v-model="tab" :tabs="tabs"/>

  <div class="tab-content">

    <div
      v-for="item in tabs"
      :id="`${item.id}-trig`"
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
