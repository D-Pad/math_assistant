<script setup>
import SinCosTan from './SinCosTan.vue';

const unitCircleRows = [
  { deg: '0°',   rad: '0',    sin: '0',    cos: '1',     tan: '0' },
  { deg: '30°',  rad: 'π/6',  sin: '1/2',  cos: '√3/2',  tan: '√3/3' },
  { deg: '45°',  rad: 'π/4',  sin: '√2/2', cos: '√2/2',  tan: '1' },
  { deg: '60°',  rad: 'π/3',  sin: '√3/2', cos: '1/2',   tan: '√3' },
  { deg: '90°',  rad: 'π/2',  sin: '1',    cos: '0',     tan: 'undef.' },
  { deg: '120°', rad: '2π/3', sin: '√3/2', cos: '−1/2',  tan: '−√3' },
  { deg: '135°', rad: '3π/4', sin: '√2/2', cos: '−√2/2', tan: '−1' },
  { deg: '150°', rad: '5π/6', sin: '1/2',  cos: '−√3/2', tan: '−√3/3' },
  { deg: '180°', rad: 'π',    sin: '0',    cos: '−1',    tan: '0' },
  { deg: '270°', rad: '3π/2', sin: '−1',   cos: '0',     tan: 'undef.' },
];
</script>

<template>

  <h2>Quick reference</h2>
  <p class="hint">
    Identities, angle values, and shape facts worth having memorized cold.
  </p>

  <div class="ref-card">
    <h3>Right Triangle Components</h3>  
    <SinCosTan />
  </div>

  <div class="ref-grid">
    <div class="ref-card">
      <h3>Core identities</h3>
      <table>
        <tbody> 
          <tr>
            <td class="f">Pythagorean</td>
            <td>sin²θ + cos²θ = 1</td>
          </tr>
          <tr>
            <td class="f"></td>
            <td>1 + tan²θ = sec²θ</td>
          </tr>
          <tr>
            <td class="f"></td>
            <td>1 + cot²θ = csc²θ</td>
          </tr>
          <tr>
            <td class="f">Quotient</td>
            <td>tan θ = sin θ / cos θ</td>
          </tr>
          <tr>
            <td class="f">Reciprocal</td>
            <td>csc θ = 1/sin θ, sec θ = 1/cos θ</td>
          </tr>
          <tr>
            <td class="f">Co-function</td>
            <td>sin(π/2 − θ) = cos θ</td>
          </tr>
        </tbody> 
      </table>
    </div>

    <div class="ref-card">
      <h3>Sum &amp; difference</h3>
      <table>
        <tbody> 
          <tr>
            <td class="f">sin(A ± B)</td>
            <td>sinA cosB ± cosA sinB</td>
          </tr>
          <tr>
            <td class="f">cos(A ± B)</td>
            <td>cosA cosB ∓ sinA sinB</td>
          </tr>
          <tr>
            <td class="f">tan(A ± B)</td>
            <td>(tanA ± tanB) / (1 ∓ tanA tanB)</td>
          </tr>
        </tbody> 
      </table>
    </div>

    <div class="ref-card">
      <h3>Double angle</h3>
      <table>
        <tbody>
          <tr><td class="f">sin 2θ</td><td>2 sinθ cosθ</td></tr>
          <tr><td class="f">cos 2θ</td><td>cos²θ − sin²θ</td></tr>
          <tr><td class="f"></td><td>= 2cos²θ − 1 = 1 − 2sin²θ</td></tr>
          <tr><td class="f">tan 2θ</td><td>2tanθ / (1 − tan²θ)</td></tr>
        </tbody> 
      </table>
    </div>

    <div class="ref-card">
      <h3>Domain, range &amp; period</h3>
      <table>
        <tbody>
          <tr>
            <th style="color:var(--muted, #8b93a7); font-weight:500;"></th>
            <th style="color:var(--muted, #8b93a7); font-weight:500;">
              domain
            </th>
            <th style="color:var(--muted, #8b93a7); font-weight:500;">
              range
            </th>
            <th style="color:var(--muted, #8b93a7); font-weight:500;">
              period
            </th>
          </tr>
          <tr>
            <td class="f">sin</td>
            <td>ℝ</td>
            <td>[−1, 1]</td>
            <td>2π</td>
          </tr>
          <tr>
            <td class="f">cos</td>
            <td>ℝ</td>
            <td>[−1, 1]</td>
            <td>2π</td>
          </tr>
          <tr>
            <td class="f">tan</td>
            <td>x ≠ π/2 + kπ</td>
            <td>ℝ</td>
            <td>π</td>
          </tr>
        </tbody> 
      </table>
    </div>
  </div>

  <div class="ref-card" style="margin-top:16px;">
    <h3>Unit circle values</h3>
    <table>
      <tbody>
        <tr>
          <th style="color:var(--muted, #8b93a7); font-weight:500;">θ (deg)</th>
          <th style="color:var(--muted, #8b93a7); font-weight:500;">θ (rad)</th>
          <th style="color:var(--muted, #8b93a7); font-weight:500;">sin</th>
          <th style="color:var(--muted, #8b93a7); font-weight:500;">cos</th>
          <th style="color:var(--muted, #8b93a7); font-weight:500;">tan</th>
        </tr>
        <tr v-for="row in unitCircleRows" :key="row.deg">
          <td class="f">{{ row.deg }}</td>
          <td class="f">{{ row.rad }}</td>
          <td>{{ row.sin }}</td>
          <td>{{ row.cos }}</td>
          <td>{{ row.tan }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p class="note">
    Try these on the Unit Circle tab by snapping to 15° increments, or plug 
    amplitude/period values from here into the Wave Explorer to see them 
    drawn out.
  </p>

</template>

