<script setup>
import { ref } from 'vue';
import Grapher from './Grapher.vue';
import Riemann from './Riemann.vue';
import Limits from './Limits.vue';
import Notes from './Notes.vue';
import Reference from './Reference.vue';


const tab = ref("grapher");

const setTab = (t) => {  
  
  const oldTab = tab.value; 
  
  const oldTag = `${oldTab}-btn`;
  const newTag = `${t}-btn`;

  const oldBtn = document.getElementById(oldTag);
  oldBtn.className = "tabbtn";

  const newBtn = document.getElementById(newTag);
  newBtn.className = "tabbtn active"; 

  tab.value = t;
}
</script>

<template>

  <nav class="tabs">
    <button id="grapher-btn" class="tabbtn active" data-tab="grapher"
            @click="setTab('grapher')">
      01 · Grapher &amp; Tangent
    </button>
    <button id="riemann-btn" class="tabbtn" data-tab="riemann"
            @click="setTab('riemann')">
      02 · Riemann Sums
    </button>
    <button id="limits-btn" class="tabbtn" data-tab="limits"
            @click="setTab('limits')">
      03 · Limits
    </button>
    <button id="reference-btn" class="tabbtn" data-tab="reference"
            @click="setTab('reference')">
      04 · Cheat Sheet
    </button>
    <button id="notes-btn" class="tabbtn" data-tab="notes"
            @click="setTab('notes')">
      05 · Notes 
    </button>
  </nav>
  
  <main id="tab-content">

    <div 
      id="panel-grapher" 
      class="panel tab-panel"
      v-if="tab === 'grapher'" 
    >
      <Grapher /> 
    </div>
  
    <!-- ============================================================
         Panel: Riemann
         ============================================================ -->
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

  </main>

</template>

