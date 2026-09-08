<script setup>
import { ref } from 'vue';
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
</script>

<template>

  <NavRow v-model="tab" :tabs="tabs"/>

  <main id="tab-content">

    <div
      v-for="item in tabs"
      :id="`${item.id}-trig`"
      :key="item.id"
      class="panel tab-panel"
      v-show="tab === item.id"
    >
      <component :is="item.comp" />
    </div>

  </main>

</template>
