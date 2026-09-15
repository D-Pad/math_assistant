<script setup>
import { ref, computed, watch } from 'vue'
import {
  compileExpr, safe, sampleFn, autoY, sx, buildPath, gridSVG
} from '@scripts/calculusMath.js'
import NumInput from '@/components/CustomNumInput.vue';


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


watch(() => props.limExpr, (newVal) => {
  localExpr.value = newVal;
});


watch(localExpr, (newVal) => {
  emit('update:limExpr', newVal);
});


const cVal = ref(0);
const zoomX = ref(1);
const zoomY = ref(5);
const zoomYAuto = ref(false);
const HS = [0.1, 0.01, 0.001, 0.0001];


const fnResult = computed(() => {
  try {
    const data = { fn: compileExpr(localExpr.value), err: '' };
    emit('update:limExpr', localExpr.value);
    return data;
  } catch (e) {
    return { fn: null, err: e.message }
  }
})


// Builds the left rows, target row, and right rows as real objects
// instead of an HTML string — this feeds a v-for in the template
const tableRows = computed(() => {

  const { fn } = fnResult.value
  if (!fn) return []

  const rows = []

  const cInput = cVal.value !== '' ? cVal.value : 0
  const xMultiplier = zoomX.value >= 1000 ? 100 : zoomX.value >= 100 ? 10 : 1;

  HS.slice().reverse().forEach((h) => {
    const x = cInput - (h * xMultiplier); 
    const y = safe(fn, x)
    rows.push({
      key: `L${h}`,
      x: x,
      y: isFinite(y) ? y.toFixed(6) : 'undefined',
      target: false
    })
  
  })

  const yc = safe(fn, cInput)
  rows.push({
    key: 'target',
    x: `x = ${cInput} (target)`,
    y: isFinite(yc) ? yc.toFixed(6) : 'undefined at c',
    target: true
  })

  HS.forEach((h) => {
    const x = cInput + (h * xMultiplier); 
    const y = safe(fn, x)
    rows.push({
      key: `R${h}`,
      x: x,
      y: isFinite(y) ? y.toFixed(6) : 'undefined',
      target: false
    })
  })

  return rows

});


// Pulls the last left/right values back out of tableRows to build
// the plain-language conclusion, same logic as the original function
const conclusion = computed(() => {

  const { fn } = fnResult.value;
  if (!fn) return null;

  const hMin = HS[HS.length - 1]; 
  const lastL = safe(fn, cVal.value - hMin);
  const lastR = safe(fn, cVal.value + hMin); 

  if (isFinite(lastL) && isFinite(lastR)) {
    if (Math.abs(lastL - lastR) < 0.01) {
      return {
        text: `Both sides are converging toward roughly 
        ${((lastL + lastR) / 2).toFixed(4)} — looks like the limit exists as 
        x → ${cVal.value}.`
      }
    } else {
      return {
        text: `Left side is heading toward ${lastL.toFixed(4)} while the right 
        side heads toward ${lastR.toFixed(4)} — the two sides disagree, so the 
        limit likely does not exist here.`
      }
    }
  } else {
    return {
      text: `One or both sides are blowing up (undefined/infinite) near 
      x = ${cVal.value} — check for a vertical asymptote.`
    }
  }

})


const REFERENCE_ZOOM = 5;
const svgInner = computed(() => {

  const { fn } = fnResult.value;
  if (!fn) return '';

  const xMin = cVal.value - zoomX.value;
  const xMax = cVal.value + zoomX.value;

  const refPts = sampleFn(fn, 
     cVal.value - REFERENCE_ZOOM, cVal.value + REFERENCE_ZOOM);
 
  let [yMin, yMax] = [null, null];
  
  if (zoomYAuto.value) {
    [yMin, yMax] = autoY(refPts);
  }
  else {
    yMin = zoomY.value * -1;
    yMax = zoomY.value;
  }

  const pts = sampleFn(fn, xMin, xMax);

  let svg = gridSVG(xMin, xMax, yMin, yMax);
  svg += `<path class="curve" d="${buildPath(pts, xMin, xMax, yMin, yMax)}"/>`;
  svg += `<line class="tangent"
    x1="${sx(cVal.value, xMin, xMax)}" y1="0"
    x2="${sx(cVal.value, xMin, xMax)}" y2="360"
    stroke="#8b93a7" stroke-dasharray="2 4"/>`;

  return svg;

});
</script>

<template>

  <p class="hint">
    Watch f(x) as x creeps toward c from both sides. This is the
    intuition behind the formal ε-δ definition, before you ever
    write one.
  </p>

  <div class="controls">

    <div class="field" :class="{ err: fnResult.err }">
      <label>f(x) =</label>
      <input type="text" v-model="localExpr">
    </div>
    
    <div class="field">
      <label>x → c</label>
      <NumInput v-model="cVal" /> 
    </div>

    <div class="field">
      <label>X-axis Zoom</label>
      <NumInput v-model="zoomX" :min="0.1" :max="10000" :step="0.5" /> 
    </div> 

    <div class="field">
      <label>Y-axis Zoom</label>
      <NumInput 
        v-model="zoomY" 
        :min="0.1" 
        :max="10000" 
        :step="0.5" 
        :disabled="zoomYAuto"
      /> 
    </div>
 
    <div class="btnrow">
      <button
        class="opt"
        :class="{ active: zoomYAuto === true }"
        @click="zoomYAuto = !zoomYAuto" 
      >
        Auto Y
      </button>
    </div>

  </div>

  <div class="errmsg">{{ fnResult.err }}</div>

  <svg class="graph" viewBox="0 0 660 360" v-html="svgInner"></svg>

  <table class="limtable">
    
    <thead>
      <tr>
        <th>x</th>
        <th>f(x)</th>
      </tr>
    </thead>
    
    <tbody>
      <tr v-for="row in tableRows" 
        :key="row.key" 
        :style="row.target ? 'color:var(--muted)' : ''">
        <td :class="{ hi: !row.target }">{{ row.x }}</td>
        <td :class="{ hi: !row.target }">{{ row.y }}</td>
      </tr>
    </tbody>
  
  </table>

  <div class="conclusion" v-if="conclusion">{{ conclusion.text }}</div>

</template>
