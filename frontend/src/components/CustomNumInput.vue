<script setup>
import { round, numDecimalsFromDecimalValue } from '@scripts/calculusMath.js';
import { onBeforeMount } from 'vue';


const numElement = defineModel();
let numDecimals = null;


const props = defineProps({
  value: {
    type: Number,
    default: 1
  }, 
  min: {
    type: Number,
    default: null
  },
  max: {
    type: Number,
    default: null
  },
  step: {
    type: Number,
    default: 1
  },
  disabled: {
    type: Boolean,
    default: false
  }
});


const decrement = () => {
  
  if (props.disabled) return;
  
  const current = Number(numElement.value) || 0;
  let next = current - Number(props.step);

  if (props.min !== null && next < props.min) {
    next = props.min;
  }

  numElement.value = round(next, numDecimals);

}


const increment = () => {

  if (props.disabled) return;

  const current = Number(numElement.value) || 0;
  let next = current + Number(props.step);

  if (props.max !== null && next > props.max) {
    next = props.max;
  }

  numElement.value = round(next, numDecimals);

}


onBeforeMount(() => {
  if (props.step != 1) {
    numDecimals = numDecimalsFromDecimalValue(props.step); 
  }
});
</script>

<template>
  
  <div class="number-input" :class="{ 'disabled-input': disabled }">
    
    <input
      v-model.number="numElement"
      class="custom-number-input"
      type="number" 
      value="1" 
      :min="min" 
      :max="max" 
      :step="step"
      :disabled="disabled"
      :class="{ 'disabled-input': disabled }"
    >
 
    <div class="increment-btns">
      <button 
        type="button" 
        :class="{ 'disabled-input': disabled }"
        @click="increment">
        +
      </button>
      <button 
        type="button" 
        :class="{ 'disabled-input': disabled }"
        @click="decrement">
        −
      </button>
    </div>

  </div>

</template>

<style scoped>
.number-input input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
  position: relative;
}

.number-input input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
  border: none;
  outline: none;
  background: transparent;
  padding: 0.5rem 0.75rem; /* extra right padding */
  width: 100%;
  font: inherit;
}

.number-input input[type="number"]::-webkit-inner-spin-button,
.number-input input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.number-input {
  display: inline-flex;
  align-items: center;
  padding: 0;
  margin: 0;
  width: 80px;
}

.increment-btns {
  display: flex;
  flex-direction: column;
  position: relative;
  top: 0;
  right: 5px;
}

.increment-btns button {
  padding: 0;
  margin: 0;
  border: none;
  background-color: #00000000;
  color: var(--amber);
}

.increment-btns button:hover {
  cursor: pointer;
  color: var(--teal);
}

.number-input.disabled-input .increment-btns button {
  color: var(--muted);
}

.number-input.disabled-input .increment-btns button:hover {
  cursor: default;
}

.custom-number-input {
  padding: 0px;
}
</style>

