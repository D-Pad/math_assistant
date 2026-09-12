<script setup>
import { ref } from 'vue';

const limitVal = ref(2);
</script>

<template>

  <div class="field">
    <label>Limit Value</label>
    <input type="number" v-model="limitVal">
  </div>

  <table>
    
    <tbody>
      
      <tr>
        <th style="color:var(--muted); font-weight:500;">x input values</th>
      </tr>
      
      <tr id="input-values">
        <td class="f">
          <input type="number" class="input-row">
        </td>
      </tr>
    
    </tbody>
  
  </table>

</template>

<style scoped>
td input[type="number"] {
  border: none;
  background: transparent;
  outline: none;
  box-shadow: none;
  width: 100%;
  font: inherit;
  padding: 0;
}
</style>
