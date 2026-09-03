<script setup>
import { ref, computed } from 'vue'
import {
  compileExpr, safe, sampleFn, autoY, sx, sy, buildPath, gridSVG, simpson
} from '../../static/scripts/calculusMath.js'

const expr = ref('4 - 0.25*x^2')
const a = ref(-3)
const b = ref(3)
const n = ref(8)
const method = ref('best')

const fnResult = computed(() => {
  try {
    return { fn: compileExpr(expr.value), err: '' }
  } catch (e) {
    return { fn: null, err: e.message }
  }
})

const riemannData = computed(() => {
  const { fn } = fnResult.value
  if (!fn) return { svgInner: '', sum: null, exact: null }

  const lo = Math.min(a.value, b.value)
  const hi = Math.max(a.value, b.value)
  const span = (hi - lo) || 1

  const pts = sampleFn(fn, lo - 0.5 * span, hi + 0.5 * span)
  const [yMinRaw, yMaxRaw] = autoY(pts)
  const yMin = Math.min(0, yMinRaw)
  const yMax = Math.max(0, yMaxRaw)
  const xMin = lo - 0.15 * span
  const xMax = hi + 0.15 * span

  let svg = gridSVG(xMin, xMax, yMin, yMax)

  let sum = 0
  const rectCount = n.value
  const dx = (hi - lo) / rectCount

  for (let i = 0; i < rectCount; i++) {
    const xL = lo + i * dx
    let sample
    if (method.value === 'left') sample = xL
    else if (method.value === 'right') sample = xL + dx
    else if (method.value === 'best') sample = xL < 0 ? xL : xL + dx
    else sample = xL + dx / 2

    const h = safe(fn, sample)
    if (!isFinite(h)) continue

    sum += h * dx

    const top = Math.max(0, h)
    const bot = Math.min(0, h)
    const rx = sx(xL, xMin, xMax)
    const rx2 = sx(xL + dx, xMin, xMax)
    const ry = sy(top, yMin, yMax)
    const ry2 = sy(bot, yMin, yMax)
    const color = h >= 0 ? '#F2A65A' : '#EF6461'

    svg += `<rect
      x="${Math.min(rx, rx2)}" y="${ry}"
      width="${Math.abs(rx2 - rx)}" height="${Math.max(1, ry2 - ry)}"
      fill="${color}" fill-opacity="0.35"
      stroke="${color}" stroke-width="1"/>`
  }

  const fullPts = sampleFn(fn, xMin, xMax)
  svg += `<path class="curve" 
    d="${buildPath(fullPts, xMin, xMax, yMin, yMax)}"/>`

  const exact = simpson(fn, lo, hi, 1000)

  return { svgInner: svg, sum, exact }
})
</script>

<template>

  <h2>Riemann sums</h2>

  <p class="hint">
    Approximate the area under f(x) on [a, b] with n rectangles,
    then watch the estimate close in on the true definite integral
    as n grows.
  </p>

  <div class="controls">

    <div class="field" :class="{ err: fnResult.err }">
      <label>f(x) =</label>
      <input type="text" v-model="expr">
    </div>

    <div class="field">
      <label>a</label>
      <input type="number" v-model.number="a">
    </div>

    <div class="field">
      <label>b</label>
      <input type="number" v-model.number="b">
    </div>

    <div class="btnrow">

      <button
        class="opt"
        :class="{ active: method === 'best' }"
        @click="method = 'best'">
        best fit
      </button>

      <button
        class="opt"
        :class="{ active: method === 'left' }"
        @click="method = 'left'">
        left
      </button>

      <button
        class="opt"
        :class="{ active: method === 'right' }"
        @click="method = 'right'">
        right
      </button>

      <button
        class="opt"
        :class="{ active: method === 'mid' }"
        @click="method = 'mid'">
        midpoint
      </button>

    </div>
  </div>

  <div class="errmsg">{{ fnResult.err }}</div>

  <svg class="graph" viewBox="0 0 660 360" v-html="riemannData.svgInner"></svg>

  <div class="controls" style="margin-top:16px;">
    <div class="field" style="flex:1; min-width:220px;">
      <label>n = {{ n }} rectangles</label>
      <input type="range" min="1" max="80" step="1" v-model.number="n">
    </div>
  </div>

  <div class="readout">
    <div class="item">
      <span class="k">{{ method }} sum</span>
      <span class="v">{{ riemannData.sum !== null ? 
        riemannData.sum.toFixed(4) : '—' }}</span>
    </div>
    <div class="item">
      <span class="k">high-res estimate (n=1000)</span>
      <span class="v teal">{{ riemannData.exact !== null ? 
        riemannData.exact.toFixed(4) : '—' }}</span>
    </div>
    <div class="item">
      <span class="k">error</span>
      <span class="v coral">
        {{ riemannData.sum !== null ? 
          Math.abs(riemannData.sum - riemannData.exact).toFixed(4) : '—' }}
      </span>
    </div>
  </div>

  <p class="note">
    Amber bars sit above the axis, coral bars below (negative area).
    Drag n up and watch the sum converge — that limiting process is
    the definite integral, ∫<sub>a</sub><sup>b</sup> f(x) dx.
  </p>

</template>

