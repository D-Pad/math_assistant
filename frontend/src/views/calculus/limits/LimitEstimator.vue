<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import NumInput from '@/components/CustomNumInput.vue';


const limitValue = ref(2);
const numRows = ref(3);
const mutationFactor = ref(0.1);
const fnInput = ref("x^2");


const calculationOutput = ref(null);
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


const submitCalculation = async () => {
 
  let concatRows = structuredClone(rows.value.lows);
  concatRows.push(limitValue.value);
  concatRows = concatRows.concat(rows.value.highs);

  const resp = await fetch('/api/limit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fn: fnInput.value,
      inputs: concatRows 
    })
  });

  localStorage.setItem("limitEstimateExpr", fnInput.value);
  calculationOutput.value = await resp.json();

}


const hasData = () => {
  return calculationOutput.value !== null;
}


watch(rows, () => {
  calculationOutput.value = null; 
});


onMounted(() => {
  const expr = localStorage.getItem("limitEstimateExpr");
  fnInput.value = expr;
});
</script>

<template>

  <div id="limit-input-values">
    
    <div class="field">
      <label>Limit Value</label>
      <input type="number" v-model="limitValue">
    </div>

    <div class="field">
      <label>Rows</label>
      <input type="number" v-model="numRows" min="1">
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
      <label>f(x)</label>
      <input type="text" id="fn-input-box" v-model="fnInput">
    </div>

  </div>

  <hr>

  <div id="tab-body-content">
    
    <table class="input-table">
      
      <tbody>
        
        <tr>
          <th>X input values</th>
          <th v-if="hasData()">Output values</th>
        </tr>
        
        <tr v-for="n in Object.keys(rows.lows)">
          <td class="input-row" >
            <input type="number" class="table-input" :value="rows.lows[n]">
          </td>
          <td v-if="hasData()">
            {{ calculationOutput.results[n][1] }} 
          </td>
        </tr>

        <tr id="input-table-values">
          <td style="color:var(--amber)">
            <strong>{{ limitValue }}</strong>
          </td>
          <td v-if="hasData()" style="color:var(--amber)">
            {{ calculationOutput.results[numRows][1] }} 
          </td>
        </tr>

        <tr v-for="n in Object.keys(rows.highs)">
          <td>
            <input type="number" class="input-row" :value="rows.highs[n]">
          </td>
          <td v-if="hasData()">
            {{ calculationOutput.results[Number(n) + 1 + numRows][1] }} 
          </td>
        </tr>

      </tbody>
    
    </table>

  </div>

  <div class="btn-container">
    <button @click="submitCalculation()">Calculate</button>
  </div>

</template>

<style scoped>
.input-table {
  width: 400px;
  border-collapse: collapse;
}

.input-table th {
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 6px 10px;
  color:var(--panel);
  background-color: var(--teal);
  font-weight:500;
  font-size: 11px;
}

.input-table td input[type="number"] {
  border: none;
  background: transparent;
  outline: none;
  box-shadow: none;
  width: 100%;
  font: inherit;
  padding: 0;
  margin: 0;
}

.input-table td {
  width: 50%;
}

.input-table th,
.input-table td,
.input-table tr {
  border: 1px solid var(--muted);
}

.table-input {
  -webkit-appearance: none;
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

.btn-container {
  display: flex;
}

.btn-container button {
  margin: 30px auto 0px auto;
  background-color: var(--cyan);
  border: none;
  padding: 10px;
  border-radius: 10px;
  transform: scale(1);
  font-weight: bold; 
  transition: 
    background-color 0.25s ease,
    transform 0.25s ease; 
}

.btn-container button:hover {
  transform: scale(1.1);
  background-color: var(--amber);
}  
</style>

