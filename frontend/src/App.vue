<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

const tab = ref("trig");

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

  <header>
    <div class="title-block">
      <svg class="mark" width="44" height="44" viewBox="0 0 44 44">
        <rect 
          width="44" height="44" rx="9" fill="#1f2636" stroke="#2a3244"/>
        <path d="M6 32 L6 6" stroke="#4a5570" stroke-width="1.2"/>
        <path d="M6 32 L38 32" stroke="#4a5570" stroke-width="1.2"/>
        <path d="M6 30 C 14 30, 16 8, 24 14 S 34 30, 38 20"
              fill="none" stroke="#F2A65A" stroke-width="2"
              stroke-linecap="round"/>
        <line x1="12" y1="30" x2="30" y2="16" stroke="#EF6461"
              stroke-width="1.6" stroke-dasharray="3 2"/>
        <circle cx="21" cy="23" r="2.3" fill="#EF6461"/>
      </svg>
      <div>
        <h1>Math Tools</h1>
        <div class="sub">
          Tools and notes for college level math classes 
        </div>
      </div>
    </div>
  </header>

  <nav class="tabs">
    <RouterLink 
      id="home-btn"
      class="tabbtn" 
      @click="setTab('home')" 
      to="/">Home</RouterLink>
    <RouterLink
      id="calculus-btn"
      class="tabbtn" 
      @click="setTab('calculus')" 
      to="/calculus">Calculus</RouterLink>
    <RouterLink
        id="trig-btn"
        class="tabbtn" 
        @click="setTab('trig')" 
        to="/trig">Trigonometry</RouterLink>
  </nav>

  <RouterView />
</template>

