<script setup>
import { ref } from 'vue';
import Calculator from '@/components/Calculator.vue';
import NavRow from '@/components/NavRow.vue';
import Notes from './Notes.vue';


const tab = ref('calculator');
const tabs = [
  { id: 'calculator', title: 'Calculator', comp: Calculator },
  { id: 'notes', title: 'Notes', comp: Notes }
];
</script>

<template>

  <NavRow v-model="tab" :tabs="tabs"/>

  <div
    v-for="item in tabs"
    :id="`${item.id}-grapher`" 
    :key="item.id" 
    v-show="tab === item.id"
  >
    <component :is="item.comp" /> 
  </div>

</template>
