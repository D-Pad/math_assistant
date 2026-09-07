<script setup>
import { ref } from 'vue';
import Grapher from './Grapher.vue';
import Riemann from './Riemann.vue';
import Limits from './Limits.vue';
import Reference from './Reference.vue';
import Notes from './Notes.vue';
import { getTabTitle } from '../../static/scripts/stringOps.js';


const tab = ref("grapher");


const tabs = [
  { 
    id: 'grapher', 
    title: "Grapher & Tangent",
    comp: Grapher
  },
  { 
    id: 'riemann', 
    title: "Riemann Sums", 
    comp: Riemann 
  },
  { 
    id: 'limits', 
    title: "Limits", 
    comp: Limits 
  },
  { 
    id: 'reference', 
    title: "Cheat Sheet", 
    comp: Reference 
  },
  { 
    id: 'notes', 
    title: "Notes", 
    comp: Notes 
  },
];
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
    
    <!--
    <div 
      id="panel-grapher" 
      class="panel tab-panel"
      v-if="tab === 'grapher'" 
    >
      <Grapher /> 
    </div>
  
    <div 
      id="panel-riemann" 
      class="panel tab-panel" 
      v-else-if="tab === 'riemann'" 
    >
      <Riemann />      
    </div>
  
    <div 
      id="panel-limits" 
      class="panel tab-panel"
      v-else-if="tab === 'limits'" 
    >
      <Limits /> 
    </div>
  
    <div 
      id="panel-reference" 
      class="panel tab-panel"
      v-else-if="tab === 'reference'"
    >
      <Reference />   
    </div>

    <div 
      id="panel-reference" 
      class="panel tab-panel"
      v-else-if="tab === 'notes'"
    >
      <Notes />   
    </div>
    -->

  </main>

</template>

