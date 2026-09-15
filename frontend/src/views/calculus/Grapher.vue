<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import {
  compileExpr, safe, deriv, sampleFn, autoY, sx, sy, buildPath, gridSVG
} from '../../static/scripts/calculusMath.js'
import NumInput from '@/components/CustomNumInput.vue';

const expr = ref('x^3 - 3x + 1')
const expr2 = ref('')
const show2 = ref(false)
const xMin = ref(-5)
const xMax = ref(5)
const showTangent = ref(true)
const x0 = ref(1)

// Keep x0 inside [xMin, xMax] if the user narrows the range
const clampedX0 = computed(() => {
  return Math.min(Math.max(x0.value, xMin.value), xMax.value)
})

const fnResult = computed(() => {
  try {
    const retObj = { fn: compileExpr(expr.value), err: '' };
    return retObj;
  } catch (e) {
    return { fn: null, err: e.message }
  }
})

const fn2Result = computed(() => {
  if (!show2.value || !expr2.value) return { fn: null, err: '' }
  try {
    const retObj = { fn: compileExpr(expr2.value), err: '' };
    return retObj;
  } catch (e) {
    return { fn: null, err: e.message }
  }
})

const tangentInfo = computed(() => {
  const { fn } = fnResult.value
  if (!fn || !showTangent.value) return { fx0: '—', slope: '—' }

  const y0 = safe(fn, clampedX0.value)
  const m = deriv(fn, clampedX0.value)

  if (!isFinite(y0) || !isFinite(m)) return { fx0: '—', slope: '—' }
  return { fx0: y0.toFixed(4), slope: m.toFixed(4) }
})

const svgInner = computed(() => {
  const { fn } = fnResult.value
  if (!fn) return ''

  const pts = sampleFn(fn, xMin.value, xMax.value)
  const [yMin, yMax] = autoY(pts)

  let svg = gridSVG(xMin.value, xMax.value, yMin, yMax)
  svg += `<path class="curve" 
  d="${buildPath(pts, xMin.value, xMax.value, yMin, yMax)}"/>`

  const { fn: fn2 } = fn2Result.value
  if (fn2) {
    const pts2 = sampleFn(fn2, xMin.value, xMax.value)
    svg += `<path class="curve2" 
    d="${buildPath(pts2, xMin.value, xMax.value, yMin, yMax)}"/>`
  }

  if (showTangent.value) {
    const x0v = clampedX0.value
    const y0 = safe(fn, x0v)
    const m = deriv(fn, x0v)

    if (isFinite(y0) && isFinite(m)) {
      const yA = y0 + m * (xMin.value - x0v)
      const yB = y0 + m * (xMax.value - x0v)

      svg += `<line class="tangent"
        x1="${sx(xMin.value, xMin.value, xMax.value)}" 
        y1="${sy(yA, yMin, yMax)}"
        x2="${sx(xMax.value, xMin.value, xMax.value)}" 
        y2="${sy(yB, yMin, yMax)}"/>`
      svg += `<circle class="pt"
        cx="${sx(x0v, xMin.value, xMax.value)}" 
        cy="${sy(y0, yMin, yMax)}" r="5"/>`
    }
  }

  return svg
})


watch(expr, (val) => {
  if (val != null) localStorage.setItem('graphExpressionA', val);
})

watch(expr2, (val) => {
  if (val != null) localStorage.setItem('graphExpressionB', val);
})


onMounted(() => {
  
  const lastExprA = localStorage.getItem('graphExpressionA');
  if (lastExprA != null) {
    expr.value = lastExprA;
  }

  const lastExprB = localStorage.getItem('graphExpressionB');
  if (lastExprB != null) {
    expr2.value = lastExprB;
  }

})
</script>

<template>
  <h2>Function grapher</h2>
  <p class="hint">
    Plot f(x) and drag the slider to slide a point along the curve —
    the dashed line is the secant-turned-tangent, i.e. the derivative
    at that point.
  </p>

  <div class="controls">
    <div class="field" :class="{ err: fnResult.err }">
      <label>f(x) =</label>
      <input type="text" v-model="expr">
    </div>
    <div class="field">
      <label>x min</label>
      <NumInput v-model.number="xMin" />
    </div>
    <div class="field">
      <label>x max</label>
      <NumInput v-model.number="xMax" />
    </div>
    <div class="btnrow">
      <button
        class="opt"
        :class="{ active: showTangent }"
        @click="showTangent = !showTangent"
      >
        tangent line
      </button>
      <button
        class="opt"
        :class="{ active: show2 }"
        @click="show2 = !show2"
      >
        compare g(x)
      </button>
    </div>
  </div>

  <div class="errmsg">{{ fnResult.err }}</div>

  <div class="controls" v-if="show2" style="margin-top:-8px;">
    <div class="field" :class="{ err: fn2Result.err }">
      <label>g(x) =</label>
      <input type="text" v-model="expr2" placeholder="e.g. x^2 - 1">
    </div>
    <div class="errmsg" style="margin-left:2px;">{{ fn2Result.err }}</div>
  </div>

  <svg class="graph" viewBox="0 0 660 360" v-html="svgInner"></svg>

  <div v-if="showTangent">
    <div class="controls" style="margin-top:16px;">
      <div class="field" style="flex:1; min-width:220px;">
        <label>x₀ = {{ clampedX0.toFixed(2) }}</label>
        <input
          type="range"
          :min="xMin"
          :max="xMax"
          step="0.01"
          v-model.number="x0"
        >
      </div>
    </div>

    <div class="readout">
      <div class="item">
        <span class="k">f(x₀)</span>
        <span class="v">{{ tangentInfo.fx0 }}</span>
      </div>
      <div class="item">
        <span class="k">f′(x₀) — slope</span>
        <span class="v coral">{{ tangentInfo.slope }}</span>
      </div>
    </div>
  </div>
</template>

