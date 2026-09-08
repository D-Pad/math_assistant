<script setup>
import { ref, computed, onBeforeUnmount } from 'vue';

/* ---------------- geometry constants ---------------- */
const VB = 320;           // svg viewBox is 0 0 VB VB
const CX = VB / 2, CY = VB / 2;
const R = 120;

/* ---------------- state ---------------- */
const angleDeg = ref(30);
const snap = ref(true);
const dragging = ref(false);
const svgEl = ref(null);

const SNAP_STEP = 15; // degrees

/* ---------------- derived values ---------------- */
const angleRad = computed(() => (angleDeg.value * Math.PI) / 180);
const cosV = computed(() => Math.cos(angleRad.value));
const sinV = computed(() => Math.sin(angleRad.value));
const tanV = computed(() => Math.tan(angleRad.value));

const pointX = computed(() => CX + R * cosV.value);
const pointY = computed(() => CY - R * sinV.value);

const quadrant = computed(() => {
  const d = ((angleDeg.value % 360) + 360) % 360;
  if (d === 0 || d === 90 || d === 180 || d === 270) return 'axis';
  if (d < 90) return 'I';
  if (d < 180) return 'II';
  if (d < 270) return 'III';
  return 'IV';
});

const RAD_LABELS = {
  0: '0', 30: 'π/6', 45: 'π/4', 60: 'π/3', 90: 'π/2',
  120: '2π/3', 135: '3π/4', 150: '5π/6', 180: 'π',
  210: '7π/6', 225: '5π/4', 240: '4π/3', 270: '3π/2',
  300: '5π/3', 315: '7π/4', 330: '11π/6', 360: '2π'
};
const radLabel = computed(() => {
  const d = Math.round((((angleDeg.value % 360) + 360) % 360) * 10) / 10;
  return RAD_LABELS[d] ?? null;
});

function fmt(v, digits = 4) {
  if (!isFinite(v)) return 'undefined';
  return v.toFixed(digits);
}

const readouts = computed(() => [
  { k: 'sin θ', v: fmt(sinV.value), color: 'coral' },
  { k: 'cos θ', v: fmt(cosV.value), color: 'amber' },
  { k: 'tan θ', v: fmt(tanV.value), color: 'teal' },
  { k: 'csc θ', v: fmt(1 / sinV.value) },
  { k: 'sec θ', v: fmt(1 / cosV.value) },
  { k: 'cot θ', v: fmt(1 / tanV.value) },
]);

/* ---------------- dragging ---------------- */
function angleFromEvent(e) {
  const rect = svgEl.value.getBoundingClientRect();
  const scale = VB / rect.width;
  const x = (e.clientX - rect.left) * scale;
  const y = (e.clientY - rect.top) * scale;
  let rad = Math.atan2(-(y - CY), x - CX);
  let deg = (rad * 180) / Math.PI;
  if (deg < 0) deg += 360;
  if (snap.value) deg = Math.round(deg / SNAP_STEP) * SNAP_STEP;
  if (deg >= 360) deg = 0;
  return deg;
}
function onPointerDown(e) {
  dragging.value = true;
  angleDeg.value = angleFromEvent(e);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
}
function onPointerMove(e) {
  if (dragging.value) angleDeg.value = angleFromEvent(e);
}
function onPointerUp() {
  dragging.value = false;
  window.removeEventListener('pointermove', onPointerMove);
  window.removeEventListener('pointerup', onPointerUp);
}
onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onPointerMove);
  window.removeEventListener('pointerup', onPointerUp);
});

function nudge(delta) {
  let d = angleDeg.value + delta;
  d = ((d % 360) + 360) % 360;
  angleDeg.value = d;
}
</script>

<template>
  <h2>Unit circle</h2>
  <p class="hint">
    Drag the point around the circle (or use the slider) to see how sine, 
    cosine, and tangent are just the coordinates and slope of a point moving 
    around a circle of radius 1.
  </p>

  <div class="controls">
    <div class="field" style="flex:1;min-width:220px;">
      <label>
        θ = {{ angleDeg.toFixed(0) }}°{{ radLabel ? ` (${radLabel} rad)` : '' }}
      </label>
      <input 
        type="range" 
        min="0" 
        max="360" 
        step="1" 
        v-model.number="angleDeg" 
        style="width:100%;" />
    </div>
    <div class="btnrow">
      <button class="opt" @click="nudge(-15)">−15°</button>
      <button class="opt" @click="nudge(15)">+15°</button>
      <button 
        class="opt" 
        :class="{ active: snap }" 
        @click="snap = !snap">
        snap to 15°
      </button>
    </div>
  </div>

  <svg
    ref="svgEl"
    class="graph unit-circle-svg"
    :viewBox="`0 0 ${VB} ${VB}`"
    @pointerdown="onPointerDown"
  >
    <!-- axes -->
    <line class="axisline" :x1="0" :y1="CY" :x2="VB" :y2="CY" />
    <line class="axisline" :x1="CX" :y1="0" :x2="CX" :y2="VB" />

    <!-- unit circle -->
    <circle 
      :cx="CX" 
      :cy="CY" 
      :r="R" 
      fill="none" 
      stroke="var(--axis, #4a5570)" 
      stroke-width="1.2" />

    <!-- reference triangle: cos leg -->
    <line 
      :x1="CX" 
      :y1="CY" 
      :x2="pointX" 
      :y2="CY" 
      stroke="var(--amber, #F2A65A)" 
      stroke-width="2" />
    <!-- sin leg -->
    <line 
      :x1="pointX" 
      :y1="CY" 
      :x2="pointX" 
      :y2="pointY" 
      stroke="var(--coral, #EF6461)" 
      stroke-width="2" />
    <line 
      :x1="CX" 
      :y1="CY" 
      :x2="pointX" 
      :y2="pointY" 
      stroke="var(--teal, #6FCF97)" 
      stroke-width="1.6" />

    <!-- angle arc -->
    <path
      :d="`M ${CX + 26} ${CY} A 26 26 0 
        ${angleDeg > 180 ? 1 : 0} 0 ${CX + 26 * cosV} 
        ${CY - 26 * sinV}`"
      fill="none" stroke="var(--muted, #8b93a7)" stroke-width="1.2"
    />

    <!-- moving point -->
    <circle
      class="pt drag-handle"
      :cx="pointX" :cy="pointY" r="7"
      @pointerdown.stop="onPointerDown"
    />

    <text class="ticklabel" x="6" y="14">quadrant {{ quadrant }}</text>
  </svg>

  <div class="readout">
    <div class="item" v-for="r in readouts" :key="r.k">
      <span class="k">{{ r.k }}</span>
      <span class="v" :class="r.color">{{ r.v }}</span>
    </div>
  </div>

  <p class="note">
    The amber segment is cos θ (the x-coordinate), the coral segment is sin θ 
    (the y-coordinate), and tan θ is the ratio sin θ / cos θ — it blows up 
    exactly where cos θ = 0, at 90° and 270°. 
  </p>
</template>

<style scoped>
.unit-circle-svg {
  touch-action: none;
  cursor: pointer;
  width: 100%;
  max-width: 600px;
  display: block;
  margin: 0 auto;
}
.drag-handle {
  cursor: grab;
}
.drag-handle:active {
  cursor: grabbing;
}
</style>

