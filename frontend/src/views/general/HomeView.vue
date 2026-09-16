<script setup>
import { ref, onMounted, watch } from 'vue';
import Calculator from '@/components/Calculator.vue';
import NavRow from '@/components/NavRow.vue';
import Notes from './Notes.vue';


const tab = ref('calculator');
const tabs = [
  { id: 'calculator', title: 'Calculator', comp: Calculator },
  { id: 'notes', title: 'Notes', comp: Notes }
];


const ready = ref(false);
const lastNotebook = ref("");


const updateNotebook = (newBook) => {
  lastNotebook.value = newBook; 
  localStorage.setItem('lastGenNotebook', newBook);
}


watch(tab, (newTab) => {
  tab.value = newTab;
  localStorage.setItem('lastGenTab', newTab);
});


onMounted(() => {
  
  const lastNb = localStorage.getItem('lastGenNotebook');
  if (lastNb) {
    lastNotebook.value = lastNb;
  }

  const lastTab = localStorage.getItem('lastGenTab');
  if (lastTab) {
    tab.value = lastTab;
  }

  ready.value = true;

});
</script>

<template>

  <NavRow v-model="tab" :tabs="tabs"/>

  <div
    v-for="item in tabs"
    :id="`${item.id}-grapher`" 
    :key="item.id" 
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

</template>
