<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import NumInput from '@/components/CustomNumInput.vue';
import { round, numDecimalsFromDecimalValue } from '@scripts/calculusMath.js';


const props = defineProps({
  limExpr: {
    type: String,
    required: true
  }
});


const emit = defineEmits([ 
  'update:limExpr'
]);


const localExpr = ref(props.limExpr);


const limitValue = ref(2);
const limitTolerance = ref(0.01);
const numRows = ref(3);
const mutationFactor = ref(0.1);


const calculationOutput = ref(null);
const rows = computed(() => {

  const lowRows = [];
  const highRows = [];

  let mutator = mutationFactor.value;
  
  for (let i = 0; i < numRows.value; i++) {

    const numDecimals = numDecimalsFromDecimalValue(mutator);

    const lowBase = round(limitValue.value - mutator, numDecimals);
    const highBase = round(limitValue.value + mutator, numDecimals);

    lowRows.push(lowBase); 
    highRows.unshift(highBase);

    mutator = mutator / 10;

  }

  return { lows: lowRows, highs: highRows };

});


const submitCalculation = async () => {
 
  const resp = await fetch('/api/limit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fn: props.limExpr,
      leftInputs: rows.value.lows,
      rightInputs: rows.value.highs,
      limit: limitValue.value,
      tolerance: limitTolerance.value
    })
  });

  const data = await resp.json();
  calculationOutput.value = data;

}


const hasData = () => {
  return calculationOutput.value !== null;
}


const limitExists = (direction) => {
 
  const output = calculationOutput.value; 
  
  if (direction == null || direction == 'both') {
    if (output.estimate != 'No limit' && 
      output.estimate != null &&
      output.estimate != undefined) return true;
    else return false;
  }

  else if (direction == 'left') {
    if (output.leftEstimate != 'No limit' &&
      output.leftEstimate != null &&
      output.leftEstimate != undefined) return true;
    else return false;
  }

  else if (direction == 'right') {
    if (output.rightEstimate != 'No limit' &&
      output.rightEstimate != null &&
      output.rightEstimage != undefined) return true;
    else return false;
  }

}


watch(rows, () => {
  calculationOutput.value = null; 
});

// Keep the expression updated across components
watch(() => props.limExpr, (v) => { localExpr.value = v });
watch(localExpr, (v) => { emit('update:limExpr', v); });


// Update 'last' values 
watch(limitValue, (newVal) => { 
  localStorage.setItem('lastLimEstValue', newVal); 
});

watch(limitTolerance, (newVal) => {
  localStorage.setItem('lastLimEstTolerance', newVal); 
});

watch(numRows, (newVal) => {
  localStorage.setItem('lastLimEstNumRows', newVal); 
});

watch(mutationFactor, (newVal) => {
  localStorage.setItem('lastLimEstMutation', newVal); 
});


onMounted(() => {

  const lastLimVal = localStorage.getItem('lastLimEstValue');
  if (lastLimVal) {
    limitValue.value = Number(lastLimVal);
  }

  const lastLimTolerance = localStorage.getItem('lastLimEstTolerance');
  if (lastLimTolerance) {
    limitTolerance.value = Number(lastLimTolerance);
  }

  const lastLimNumRows = localStorage.getItem('lastLimEstNumRows');
  if (lastLimNumRows) {
    numRows.value = Number(lastLimNumRows);
  }

  const lastLimMutation = localStorage.getItem('lastLimEstMutation');
  if (lastLimMutation) {
    mutationFactor.value = Number(lastLimMutation);
  }

});
</script>

<template>

  <div id="limit-input-values">
    
    <div class="field">
      <label>Limit Value</label>
      <NumInput v-model="limitValue"/>
    </div>

    <div class="field">
      <label>Rows</label>
      <NumInput v-model="numRows" :min="1" /> 
    </div>
    
    <div class="field">
      <label>Mutation Factor</label>
      <NumInput 
        v-model="mutationFactor"
        :min="0.1"
        :step="0.1"
      />
    </div>

    <div class="field">
      <label>Tolerance</label>
      <NumInput 
        v-model="limitTolerance"
        :min="0.0001"
        :step="0.001"
      />
    </div>

    <div class="field">
      <label>f(x)</label>
      <input type="text" id="fn-input-box" v-model="localExpr">
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
            {{ calculationOutput.leftResults[n][1] }} 
          </td>
        </tr>

        <tr id="input-table-values">
          <td style="color:var(--amber)">
            <strong>{{ limitValue }}</strong>
          </td>
          <td v-if="hasData()" style="color:var(--amber)">
            {{ calculationOutput.limitCalc }} 
          </td>
        </tr>

        <tr v-for="n in Object.keys(rows.highs)">
          <td>
            <input type="number" class="input-row" :value="rows.highs[n]">
          </td>
          <td v-if="hasData()">
            {{ calculationOutput.rightResults[n][1] }} 
          </td>
        </tr>

      </tbody>
    
    </table>

    <table class="input-table" v-if="hasData()">

      <tbody>

        <tr>
          <th>Attribute</th>
          <th>Value</th> 
        </tr>

        <tr>
          <td>Left Limit</td>
          <td>{{ calculationOutput.leftEstimate }}</td>
        </tr>
        
        <tr>
          <td>Right Limit</td>
          <td>{{ calculationOutput.rightEstimate }}</td>
        </tr>

        <tr>
          <td>Two-Sided Limit</td>
          <td v-if="calculationOutput.estimate !== null">
            {{ calculationOutput.estimate }}
          </td>
          <td v-else>
            No limit 
          </td>
        </tr>

        <tr>
          <td>Difference</td>
          <td>{{ calculationOutput.difference }}</td>
        </tr>

        <tr>
          <td>Status</td>
          <td>{{ calculationOutput.status }}</td>
        </tr>

      </tbody>

    </table>
  
  </div>

  <template v-if="calculationOutput !== null">
    
    <div class="conclusion">
      <span v-if="limitExists()"> 
        A limit exists at {{ calculationOutput.estimate }} as 
        x→{{ limitValue }}.
      </span>

      <span v-if="limitExists('left')"> 
        A left limit exists at {{ calculationOutput.leftEstimate }}
      </span>
     
      <span v-if="limitExists('left') && limitExists('right')">
        and a
      </span>

      <span v-else>. A</span>

      <span v-if="limitExists('right')"> 
        right limit exists at {{ calculationOutput.rightEstimate }}.
      </span>
    </div>
  </template>
  
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
  height: 20px;
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
  padding-left: 10px;
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
  width: 100%;
}

#tab-body-content {
  display: flex;
  gap: 20px;
}

#fn-input-box {
  width: 150%;
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

