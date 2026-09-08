<script setup>
import { getTabTitle } from '../static/scripts/stringOps.js';


const tab = defineModel();


const props = defineProps({
  tabs: {
    type: Array,
    required: true
  }
});
</script>

<template>
  
  <nav class="tabs">
    <button
      v-for="(t, i) in tabs"
      :class="['tabbtn', tab === t.id ? 'active' : '']"
      @click="tab = t.id">
      {{ getTabTitle(i, t.title) }} 
    </button>
  </nav>
 
</template>
