<script setup>
import { ref, computed } from 'vue';


const limitValue = ref(2);
const numRows = ref(4);
const mutationFactor = ref(0.1);
const fnInput = ref("x^2");


const rows = computed(() => {
 
  const lowRows = [];
  const highRows = [];

  let mutator = mutationFactor.value;
  
  for (let i = 0; i < numRows.value; i++) {

    const lowBase = limitValue.value - mutator;
    const highBase = limitValue.value + mutator;

    lowRows.push(lowBase); 
    highRows.unshift(highBase);

    mutator = mutator / 10;

  }

  return { lows: lowRows, highs: highRows };

});
</script>

<template>

  <div id="limit-input-values">
    
    <div class="field">
      <label>Limit Value</label>
      <input type="number" v-model="limitValue">
    </div>

    <div class="field">
      <label>Top and Bottom Rows</label>
      <input type="number" v-model="numRows" min="0">
    </div>
    
    <div class="field">
      <label>Mutation Factor</label>
      <input 
        type="number" 
        v-model="mutationFactor" 
        min="0.1"
        step="0.1"
      >
    </div>

    <div class="field">
      <label>f(x) </label>
      <input type="text" id="fn-input-box" v-model="fnInput">
    </div>

  </div>

  <hr>

  <div id="tab-body-content">
    
    <table class="input-table">
      
      <tbody>
        
        <tr id="input-table-header">
          <th>X input values</th>
        </tr>
        
        <tr v-for="n in Object.keys(rows.lows)">
          <td>
            <input type="number" class="input-row" :value="rows.lows[n]">
          </td>
        </tr>

        <tr id="input-table-values">
          <td style="color:var(--amber)">
            <strong>{{ limitValue }}</strong>
          </td>
        </tr>

        <tr v-for="n in Object.keys(rows.highs)">
          <td>
            <input type="number" class="input-row" :value="rows.highs[n]">
          </td>
        </tr>

      </tbody>
    
    </table>
 
  </div>

</template>

<style scoped>
.input-table {
  font-size: 18pt;
}

.input-table th {
  text-align: left;
  color: var(--muted);
  font-weight: 500;
  font-size: 10pt;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 6px 10px;
  border-bottom: 1px solid var(--line);
}

.input-table td input[type="number"] {
  border: none;
  background: transparent;
  outline: none;
  box-shadow: none;
  width: 100%;
  font: inherit;
  padding: 0;
}

.input-table td {
  border-bottom: 1px solid var(--teal);
}

#limit-input-values {
  display: flex;
  gap: 20px;
}

#tab-body-content {
  display: flex;
  gap: 20px;
}

#fn-input-box {
  width: 200%;
}
</style>
