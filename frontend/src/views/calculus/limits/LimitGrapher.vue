<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import {
  compileExpr, safe, sampleFn, autoY, sx, buildPath, gridSVG
} from '@scripts/calculusMath.js'


const expr = ref('sin(x)/x');
const c = ref(0);
const zoom = ref(1);
const maxInputValue = ref(1000);

const HS = [0.1, 0.01, 0.001, 0.0001];


const fnResult = computed(() => {
  try {
    return { fn: compileExpr(expr.value), err: '' }
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

  // approach from left: largest h -> smallest, so values move toward c
  HS.slice().reverse().forEach((h) => {
    const x = c.value - h
    const y = safe(fn, x)
    rows.push({
      key: `L${h}`,
      x: x.toFixed(4),
      y: isFinite(y) ? y.toFixed(6) : 'undefined',
      target: false
    })
  })

  const yc = safe(fn, c.value)
  rows.push({
    key: 'target',
    x: `x = ${c.value} (target)`,
    y: isFinite(yc) ? yc.toFixed(6) : 'undefined at c',
    target: true
  })

  HS.forEach((h) => {
    const x = c.value + h
    const y = safe(fn, x)
    rows.push({
      key: `R${h}`,
      x: x.toFixed(4),
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
  const lastL = safe(fn, c.value - hMin);
  const lastR = safe(fn, c.value + hMin); 

  if (isFinite(lastL) && isFinite(lastR)) {
    if (Math.abs(lastL - lastR) < 0.01) {
      return {
        text: `Both sides are converging toward roughly 
        ${((lastL + lastR) / 2).toFixed(4)} — looks like the limit exists as 
        x → ${c.value}.`
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
      x = ${c.value} — check for a vertical asymptote.`
    }
  }

  /*
  // Text output message
  let outputText = "";
 
  
  // Limit calculations
  const limits = getLimits();
  
  if (limits.left != null && limits.right != null) {
    outputText += `As x→-∞, y→${limits.left} and as x→∞, y→${limits.right}. `;
  }
  else if (limits.left != null) {
    outputText += `As x→-∞, y→${limits.left} `;
  }
  else if (limits.right != null) {
    outputText += `As x→∞, y→${limits.right}. `;
  }
  else {
    outputText += "No limits exist. ";
  }

  // Convergence calculations 
  const convergence = getConvergence();
  */

})


const REFERENCE_ZOOM = 5;
const svgInner = computed(() => {

  const { fn } = fnResult.value;
  if (!fn) return '';

  const xMin = c.value - zoom.value;
  const xMax = c.value + zoom.value;

  const refPts = sampleFn(fn, 
     c.value - REFERENCE_ZOOM, c.value + REFERENCE_ZOOM);
  const [yMin, yMax] = autoY(refPts);

  const pts = sampleFn(fn, xMin, xMax);

  let svg = gridSVG(xMin, xMax, yMin, yMax);
  svg += `<path class="curve" d="${buildPath(pts, xMin, xMax, yMin, yMax)}"/>`;
  svg += `<line class="tangent"
    x1="${sx(c.value, xMin, xMax)}" y1="0"
    x2="${sx(c.value, xMin, xMax)}" y2="360"
    stroke="#8b93a7" stroke-dasharray="2 4"/>`;

  return svg;

});


/*
---------------- Function for estimating limits on a graph -------------------
const getLimits = () => {

  const { fn } = fnResult.value;
  let firstLeftNanVal = null;
  let firstRightNanVal = null;

  // Determine if an X-limit exists or not.
  for (let i = 0; i <= zoom.value; i += HS[0]) {
    
    const leftInput = round(i * -1);
    const rightInput = round(i);

    const leftResult = safe(fn, leftInput);
    const rightResult = safe(fn, rightInput);

    if (Number.isNaN(leftResult) && firstLeftNanVal == null) {
      firstLeftNanVal = leftInput;
    }

    if (Number.isNaN(rightResult) && firstRightNanVal == null) {
      firstRightNanVal = rightInput;
    }

  }

  return { left: firstLeftNanVal, right: firstRightNanVal };

};
*/


watch(expr, (val) => {
  if (val != null) localStorage.setItem('limitExpr', val);
});


onMounted(() => {
  const lastExpr = localStorage.getItem('limitExpr');
  if (lastExpr != null) {
    expr.value = lastExpr;
  }
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
      <input type="text" v-model="expr">
    </div>
    
    <div class="field">
      <label>x → c</label>
      <input type="number" v-model.number="c" step="0.1">
    </div>

    <div class="field">
      <label>Max Input Value</label>
      <input type="number" v-model.number="maxInputValue">
    </div>

    <div class="btnrow">
      <button class="opt" 
        :class="{ active: zoom === 5 }" 
        @click="zoom = 5">±5</button>
      <button class="opt" 
        :class="{ active: zoom === 1 }" 
        @click="zoom = 1">±1</button>
      <button class="opt" 
        :class="{ active: zoom === 0.1 }" 
        @click="zoom = 0.1">±0.1</button>
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
