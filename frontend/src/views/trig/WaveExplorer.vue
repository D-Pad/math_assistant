<script setup>
import { ref, computed } from 'vue';

/* ---------------- state ---------------- */
const fnType = ref('sin');   // 'sin' | 'cos' | 'tan'
const A = ref(1);            // amplitude
const B = ref(1);            // horizontal compression: f(B*(x - C))
const C = ref(0);            // phase shift, in radians
const D = ref(0);            // vertical shift
const showBase = ref(true);

/* ---------------- math ---------------- */
function baseFn(t) {
  if (fnType.value === 'sin') return Math.sin(t);
  if (fnType.value === 'cos') return Math.cos(t);
  return Math.tan(t);
}
function transformedFn(x) {
  const Bv = Math.abs(B.value) < 0.001 ? 0.001 : B.value;
  return A.value * baseFn(Bv * (x - C.value)) + D.value;
}

const basePeriod = computed(() => (
  fnType.value === 'tan' ? Math.PI : 2 * Math.PI)
);

const period = computed(() => basePeriod.value / Math.max(
  0.001, Math.abs(B.value))
);

/* ---------------- graph geometry ---------------- */
const W = 660, H = 360;
const xHalfRange = computed(() => Math.max(period.value * 1.6, 1.5));
const xMin = computed(() => -xHalfRange.value);
const xMax = computed(() => xHalfRange.value);

const yPad = computed(() => Math.abs(A.value) + 1.5);
const yMin = computed(() => (fnType.value === 'tan' ? 
  D.value - (Math.abs(A.value) * 3 + 3) : D.value - yPad.value)
);
const yMax = computed(() => (fnType.value === 'tan' ? 
  D.value + (Math.abs(A.value) * 3 + 3) : D.value + yPad.value)
);

const sx = (x) => { 
  return ((x - xMin.value) / (xMax.value - xMin.value)) * W; 
}

const sy = (y) => { 
  return H - ((y - yMin.value) / (yMax.value - yMin.value)) * H; 
}

const gcd = (a, b) => { 
  return b === 0 ? a : gcd(b, a % b); 
}

const fracLabel = (k) => {
  if (Math.abs(k) < 1e-9) return '0';
  const sign = k < 0 ? '-' : '';
  const ak = Math.abs(k);
  const num4 = Math.round(ak * 4);
  if (Math.abs(num4 / 4 - ak) < 1e-6) {
    const g = gcd(num4, 4) || 1;
    const n = num4 / g, d = 4 / g;
    const piPart = n === 1 ? 'π' : `${n}π`;
    return d === 1 ? sign + piPart : `${sign}${piPart}/${d}`;
  }
  return `${sign}${ak.toFixed(2)}π`;
}

const piStep = (range) => {
  const target = range / 8;
  const candidates = [0.25, 0.5, 1, 2, 4, 8];
  let best = candidates[0];
  for (const c of candidates) {
    if (Math.abs(c * Math.PI - target) < Math.abs(best * Math.PI - target)) {
      best = c;
    }
  }
  return best * Math.PI;
}

const buildPath = (fn, skipBig) => {
  
  const steps = 700;
  let d = '', drawing = false;
  const ySpan = yMax.value - yMin.value;
  
  for (let i = 0; i <= steps; i++) {
    
    const x = xMin.value + ((xMax.value - xMin.value) * i) / steps;
    const y = fn(x);
    
    if (
      !isFinite(y) || 
      y < yMin.value - ySpan * (skipBig ? 0.5 : 4) || 
      y > yMax.value + ySpan * (skipBig ? 0.5 : 4)) 
    {
      drawing = false;
      continue;
    }
    
    const X = sx(x), Y = sy(y);
    d += (drawing ? 'L' : 'M') + X.toFixed(2) + ',' + Y.toFixed(2) + ' ';
    drawing = true;
  
  }
  
  return d;
}

const gridSvg = computed(() => {
  
  let s = '';
  const stepX = piStep(xMax.value - xMin.value);
  const stepY = Math.max(0.5, Math.round(
    (yMax.value - yMin.value) / 8 * 2) / 2
  );

  const x = Math.ceil(xMin.value / stepX) * stepX;
  for (let gx = x; gx <= xMax.value; gx += stepX) {
    
    const X = sx(gx);
    s += `<line class="gridline" x1="${X}" y1="0" x2="${X}" y2="${H}"/>`;
    
    if (Math.abs(gx) > 1e-9) {
      s += `<text class="ticklabel" x="${X + 3}" 
       y="${H - 4}">${fracLabel(gx / Math.PI)}</text>`;
    } 
  }
 
  const y = Math.ceil(yMin.value / stepY) * stepY;
  for (let gy = y; gy <= yMax.value; gy += stepY) {
    const Y = sy(gy);
    s += `<line class="gridline" x1="0" y1="${Y}" x2="${W}" y2="${Y}"/>`;
    if (Math.abs(gy) > 1e-9) {
      s += `<text class="ticklabel" x="4" 
        y="${Y - 3}">${gy.toFixed(1)}</text>`;
    }
  }
  
  if (0 >= xMin.value && 0 <= xMax.value) {
    s += `<line class="axisline" x1="${sx(0)}" 
      y1="0" x2="${sx(0)}" y2="${H}"/>`;
  }
  
  if (0 >= yMin.value && 0 <= yMax.value) {
    s += `<line class="axisline" x1="0" 
      y1="${sy(0)}" x2="${W}" y2="${sy(0)}"/>`;
  }
  
  return s;

});

const basePath = computed(() => buildPath((x) => baseFn(x), 
  fnType.value === 'tan')
);

const curvePath = computed(() => buildPath((x) => transformedFn(x), 
  fnType.value === 'tan')
);

const midlineY = computed(() => sy(D.value));
const periodBoxX1 = computed(() => sx(C.value));
const periodBoxX2 = computed(() => sx(C.value + period.value));
</script>

<template>
  <h2>Wave explorer</h2>
  <p class="hint">
    y = A · {{ fnType }}(B · (x − C)) + D — nudge each slider on its own and 
    watch which single feature of the graph moves.
  </p>

  <div class="controls">
    <div class="btnrow">
      <button 
        class="opt" 
        :class="{ active: fnType === 'sin' }" 
        @click="fnType = 'sin'">
        sin
      </button>
      <button 
        class="opt" 
        :class="{ active: fnType === 'cos' }" 
        @click="fnType = 'cos'">
        cos
      </button>
      <button 
        class="opt" 
        :class="{ active: fnType === 'tan' }" 
        @click="fnType = 'tan'">
        tan
      </button>
      <button 
        class="opt" 
        :class="{ active: showBase }" 
        @click="showBase = !showBase">
        show parent curve
      </button>
    </div>
  </div>

  <div class="controls">
    
    <div class="field" style="flex:1;min-width:180px;"> 
      <label>A — amplitude ({{ A.toFixed(2) }})</label>
      <input 
        type="range" 
        min="-3" 
        max="3" 
        step="0.1" 
        v-model.number="A" 
        style="width:100%;" />
    </div>
    
    <div class="field" style="flex:1;min-width:180px;">
      <label>B — frequency ({{ B.toFixed(2) }})</label>
      <input 
        type="range" 
        min="0.2" 
        max="4" 
        step="0.1" 
        v-model.number="B" 
        style="width:100%;" />
    </div>
    
    <div class="field" style="flex:1;min-width:180px;">
      <label>C — phase shift ({{ C.toFixed(2) }} rad)</label>
      <input 
        type="range" 
        min="-6.3" 
        max="6.3" 
        step="0.1" 
        v-model.number="C" 
        style="width:100%;" />
    </div>
    
    <div class="field" style="flex:1;min-width:180px;">
      <label>D — vertical shift ({{ D.toFixed(2) }})</label>
      <input 
        type="range" 
        min="-3" 
        max="3" 
        step="0.1" 
        v-model.number="D" 
        style="width:100%;" />
    </div>
  
  </div>

  <svg class="graph" :viewBox="`0 0 ${W} ${H}`">
    <g v-html="gridSvg"></g>
    <line v-if="D !== 0" 
      :x1="0" 
      :y1="midlineY" 
      :x2="W" 
      :y2="midlineY" 
      stroke="var(--muted, #8b93a7)" 
      stroke-dasharray="2 4" />
    <line v-if="Math.abs(C) > 0.001 || B !== 1" 
      :x1="periodBoxX1" 
      y1="0" 
      :x2="periodBoxX1" 
      :y2="H" 
      stroke="var(--teal, #6FCF97)" 
      stroke-dasharray="3 3" opacity="0.6" />
    <line v-if="Math.abs(C) > 0.001 || B !== 1" 
      :x1="periodBoxX2" 
      y1="0" 
      :x2="periodBoxX2" 
      :y2="H" 
      stroke="var(--teal, #6FCF97)" 
      stroke-dasharray="3 3" 
      opacity="0.6" />
    <path v-if="showBase" class="curve2" :d="basePath" />
    <path class="curve" :d="curvePath" />
  </svg>

  <div class="readout">
    <div class="item">
      <span class="k">
        amplitude
      </span>
      <span class="v">{{ Math.abs(A).toFixed(2) }}</span>
    </div>
    <div class="item">
      <span class="k">
        period
      </span>
      <span class="v teal">
        {{ period.toFixed(3) }} ({{ fracLabel(period / Math.PI) }})
      </span>
    </div>
    <div class="item">
      <span class="k">phase shift</span>
      <span class="v coral">
        {{ C.toFixed(2) }} rad 
        {{ C === 0 ? '' : (C > 0 ? '(right)' : '(left)') }}
      </span>
    </div>
    <div class="item">
      <span class="k">midline</span>
      <span class="v">y = {{ D.toFixed(2) }}</span>
    </div>
  </div>

  <p class="note">
    A stretches the graph vertically, B squeezes it horizontally (bigger B = 
    shorter period), C slides it sideways, and D lifts the whole thing up or 
    down. The dashed teal lines mark one full period starting at the phase 
    shift.
  </p>
</template>

