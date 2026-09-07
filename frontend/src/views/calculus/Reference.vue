<template>

  <h2>Quick reference</h2>

  <p class="hint">
    The handful of facts that come up constantly in the first few 
    weeks.
  </p>
  
  <div class="ref-grid">
    <div class="ref-card">
      <h3>Derivative rules</h3>
      <table>
        <tbody> 
          <tr>
            <td class="f">Power</td>
            <td>d/dx[xⁿ] = n·xⁿ⁻¹</td>
          </tr>
          <tr>
            <td class="f">Sum</td>
            <td>(f + g)′ = f′ + g′</td>
          </tr>
          <tr>
            <td class="f">Product</td>
            <td>(fg)′ = f′g + fg′</td>
          </tr>
          <tr>
            <td class="f">Quotient</td>
            <td>(f/g)′ = (f′g − fg′)/g²</td>
          </tr>
          <tr>
            <td class="f">Chain</td>
            <td>d/dx[f(g(x))] = f′(g(x))·g′(x)</td>
          </tr>
        </tbody> 
      </table>
    </div>
  
    <div class="ref-card">
      <h3>Common derivatives</h3>
      <table>
        <tbody> 
          <tr>
            <td class="f">sin x</td>
            <td>cos x</td>
          </tr>
          <tr>
            <td class="f">cos x</td>
            <td>−sin x</td>
          </tr>
          <tr>
            <td class="f">tan x</td>
            <td>sec² x</td>
          </tr>
          <tr>
            <td class="f">eˣ</td>
            <td>eˣ</td>
          </tr>
          <tr>
            <td class="f">ln x</td>
            <td>1/x</td>
          </tr>
          <tr>
            <td class="f">aˣ</td>
            <td>aˣ · ln a</td>
          </tr>
        </tbody>
      </table>
    </div>
  
    <div class="ref-card">
      <h3>Limit facts worth memorizing</h3>
      <ul>
        <li>
          lim<sub>x→0</sub> sin(x)/x = 1
          <span>— the one everything else builds on</span>
        </li>
        <li>lim<sub>x→0</sub> (1−cos x)/x = 0</li>
        <li>lim<sub>x→∞</sub> (1 + 1/x)ˣ = e</li>
        <li>
          If f is continuous at c,
          lim<sub>x→c</sub> f(x) = f(c)
        </li>
      </ul>
    </div>
  
    <div class="ref-card">
      <h3>Unit circle essentials</h3>
      <table>
        <tbody>
          <tr>
            <th style="color:var(--muted); font-weight:500;">θ</th>
            <th style="color:var(--muted); font-weight:500;">sin</th>
            <th style="color:var(--muted); font-weight:500;">cos</th>
            <th style="color:var(--muted); font-weight:500;">tan</th>
          </tr>
          <tr>
            <td class="f">0</td>
            <td>0</td>
            <td>1</td>
            <td>0</td>
          </tr>
          <tr>
            <td class="f">π/6</td>
            <td>1/2</td>
            <td>√3/2</td>
            <td>√3/3</td>
          </tr>
          <tr>
            <td class="f">π/4</td>
            <td>√2/2</td>
            <td>√2/2</td>
            <td>1</td>
          </tr>
          <tr>
            <td class="f">π/3</td>
            <td>√3/2</td>
            <td>1/2</td>
            <td>√3</td>
          </tr>
          <tr>
            <td class="f">π/2</td>
            <td>1</td>
            <td>0</td>
            <td>undef.</td>
          </tr>
        </tbody> 
      </table>
    </div>
  </div>
  
</template>
