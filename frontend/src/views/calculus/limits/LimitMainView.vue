<script setup>
import { ref } from 'vue';
import LimitEstimator from './LimitEstimator.vue';
import LimitGraph from './LimitGrapher.vue';
import NavRow from '@/components/NavRow.vue';


const tab = ref('graphing');
const tabs = [
  { id: 'graphing', title: 'Graphing', comp: LimitGraph },
  { id: 'estimate', title: 'Estimation', comp: LimitEstimator }
];
</script>

<template>

  <h2>Limits</h2>  
  
  <NavRow v-model="tab" :tabs="tabs"/>
  
  <div
    v-for="item in tabs"
    :id="item.id" 
    :key="item.id" 
    class="tab-panel"
    v-show="tab === item.id"
  >
    <component :is="item.comp" /> 
  </div>

</template>

