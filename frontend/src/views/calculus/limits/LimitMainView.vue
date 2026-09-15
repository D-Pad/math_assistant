<script setup>
import { ref, onMounted } from 'vue';
import LimitEstimator from './LimitEstimator.vue';
import LimitGraph from './LimitGrapher.vue';
import NavRow from '@/components/NavRow.vue';


const expr = ref('x^2');
const tab = ref('graphing');
const tabs = [
  { id: 'graphing', title: 'Graphing', comp: LimitGraph },
  { id: 'estimate', title: 'Estimation', comp: LimitEstimator }
];

const updateExpr = (newExpr) => {
  expr.value = newExpr;
  localStorage.setItem('limExpr', newExpr);
}

onMounted(() => {
  const lastExpr = localStorage.getItem('limExpr');
  if (lastExpr !== null || lastExpr !== undefined) {
    expr.value = lastExpr;
  }
});
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
    <component 
      :is="item.comp" 
      :lim-expr="expr" 
      @update:lim-expr="updateExpr($event)"
    /> 
  </div>

</template>

