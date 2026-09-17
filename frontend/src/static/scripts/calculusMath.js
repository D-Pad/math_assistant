export const compileExpr = (raw) => {
  let e = raw.trim();
  if (!e) throw new Error('Enter a function of x.');

  e = e.replace(/\s+/g, '');
  e = e.replace(/\^/g, '**');

  e = e.replace(/(\d)([a-zA-Z(])/g, '$1*$2');
  e = e.replace(/(\))(\d|[a-zA-Z(])/g, '$1*$2');
  e = e.replace(/(x)(\()/g, '$1*$2');

  const FN_MAP = {
    ln: 'Math.log',
    log: 'Math.log10',
    sqrt: 'Math.sqrt',
    abs: 'Math.abs',
    asin: 'Math.asin',
    acos: 'Math.acos',
    atan: 'Math.atan',
    sin: 'Math.sin',
    cos: 'Math.cos',
    tan: 'Math.tan',
    exp: 'Math.exp',
  };

  e = e.replace(
    /\b(ln|log|sqrt|abs|asin|acos|atan|sin|cos|tan|exp)\(/g,
    (m, name) => FN_MAP[name] + '('
  );

  e = e.replace(/\bpi\b/g, 'Math.PI');
  e = e.replace(/\be\b/g, 'Math.E');

  let fn;
  try {
    fn = new Function('x', '"use strict"; return (' + e + ');');
    const t = fn(1.3);
    if (typeof t !== 'number') throw new Error('bad');
  } catch (err) {
    throw new Error('Could not parse that function.');
  }

  return fn;
};

export const safe = (fn, x) => {
  try {
    const y = fn(x);
    return (typeof y === 'number' && isFinite(y)) ? y : NaN;
  } catch (e) {
    return NaN;
  }
};

export const deriv = (fn, x, h = 0.0005) => {
  return (safe(fn, x + h) - safe(fn, x - h)) / (2 * h);
};

/* 
==========================================================================
   Graph rendering
========================================================================== 
*/

export const W = 660;
export const H = 360;

export const niceStep = (range) => {
  const rough = range / 8;
  const mag = Math.pow(10, Math.floor(Math.log10(rough || 1)));
  const norm = rough / mag;
  const step = norm < 1.5 ? 1 : (norm < 3 ? 2 : (norm < 7 ? 5 : 10));
  return step * mag;
};


const percentile = (sorted, p) => {
  
  const idx = (sorted.length - 1) * p, 
    lo = Math.floor(idx), 
    hi = Math.ceil(idx);
  
  if (lo === hi) return sorted[lo];
  
  const frac = idx - lo;
  return sorted[lo] * (1 - frac) + sorted[hi] * frac;

}


export function sampleFn(fn, xMin, xMax, opts = {}) {
  
  const {
    baseSegments = 60,   
    maxDepth = 16,       
    maxPoints = 40000,   
    relTol = 0.004,      
  } = opts;

  const safe = (x) => {
    try { 
      const y = fn(x); 
      return (typeof y === 'number' && isFinite(y)) ? y : NaN; 
    }
    catch (e) { return NaN; }
  };

  const coarseYs = [];
  for (let i = 0; i <= baseSegments; i++) {
    const y = safe(xMin + (xMax - xMin) * i / baseSegments);
    if (isFinite(y)) coarseYs.push(y);
  }
  
  let flatTol = 0.01;
  if (coarseYs.length) {
    const sorted = coarseYs.slice().sort((a, b) => a - b);
    const range = percentile(sorted, 0.98) - percentile(sorted, 0.02);
    flatTol = Math.max(1e-6, (range * relTol) || 0.01);
  }

  const pts = [];
  let count = 0;
  const pushPoint = (x, y) => { 
    pts.push([x, y]); 
    count++; 
  };

  const recurse = (x0, y0, x1, y1, depth) => {
   
    if (count >= maxPoints || depth >= maxDepth || x1 - x0 < 1e-12) {
      pushPoint(x0, y0);
      return;
    }
    
    const xm = (x0 + x1) / 2;
    const ym = safe(xm);
    if (isFinite(y0) && isFinite(y1) && isFinite(ym)) {
      const yLinear = (y0 + y1) / 2;
      if (Math.abs(ym - yLinear) < flatTol) { pushPoint(x0, y0); return; }
    }
    
    recurse(x0, y0, xm, ym, depth + 1);
    recurse(xm, ym, x1, y1, depth + 1);
  
  }

  for (let i = 0; i < baseSegments; i++) {
    const x0 = xMin + (xMax - xMin) * i / baseSegments;
    const x1 = xMin + (xMax - xMin) * (i + 1) / baseSegments;
    recurse(x0, safe(x0), x1, safe(x1), 0);
  }
  
  pushPoint(xMax, safe(xMax));
  return pts;

}


export const autoY = (pts, padFrac = 0.15) => {

  // Separate Y values from pts, which looks like [[x1, y1], [x2, y2], ... ]
  const ys = pts.map((p) => p[1]).filter((y) => isFinite(y));
  if (!ys.length) return [-10, 10];

  // Sort y-values
  const sorted = [...ys].sort((a, b) => a - b);

  // Get min and max values
  let min = percentile(sorted, 0.02);
  let max = percentile(sorted, 0.98);

  if (min === max) {
    min -= 1;
    max += 1;
  }

  // Set padding then calculate min/max
  const pad = (max - min) * padFrac;
  return [min - pad, max + pad];

};


export const sx = (x, xMin, xMax) => {
  return ((x - xMin) / (xMax - xMin)) * W;
};


export const sy = (y, yMin, yMax) => {
  return H - ((y - yMin) / (yMax - yMin)) * H;
};


export const buildPath = (pts, xMin, xMax, yMin, yMax) => {
  let d = '';
  let drawing = false;
  const yspan = yMax - yMin;

  for (const [x, y] of pts) {
    if (!isFinite(y) || y < yMin - yspan * 4 || y > yMax + yspan * 4) {
      drawing = false;
      continue;
    }

    const X = sx(x, xMin, xMax);
    const Y = sy(y, yMin, yMax);
    d += (drawing ? 'L' : 'M') + X.toFixed(2) + ',' + Y.toFixed(2) + ' ';
    drawing = true;
  }

  return d;
};


export const numDecimalsFromDecimalValue = (val) => {
  if (val === 0) return 0;

  const str = Number(val).toString();
  if (str.includes('e-')) {
    return parseInt(str.split('e-')[1], 10);
  }
  const parts = str.split('.');
  return parts[1] ? parts[1].length : 0;
};


export const round = (n, decimals = 2) => {
  if (Math.abs(n) < 1e-12) return 0;          // slightly tighter epsilon

  // Clamp to a safe maximum so we never exceed float64 precision
  const places = Math.min(decimals == null ? 2 : decimals, 12);
  const multiplier = 10 ** places;
  return Math.round(n * multiplier) / multiplier;
};


export const gridSVG = (xMin, xMax, yMin, yMax) => {
  let s = '';
  const stepX = niceStep(xMax - xMin);
  const stepY = niceStep(yMax - yMin);

  for (let gx = Math.ceil(xMin / stepX) * stepX; gx <= xMax; gx += stepX) {
    const X = sx(gx, xMin, xMax);
    s += `<line class="gridline" x1="${X}" y1="0" x2="${X}" y2="${H}"/>`;
    if (Math.abs(gx) > 1e-9) {
      s += `<text class="ticklabel" 
        x="${X + 3}" 
        y="${H - 4}">${round(gx)}</text>`;
    }
  }

  for (let gy = Math.ceil(yMin / stepY) * stepY; gy <= yMax; gy += stepY) {
    const Y = sy(gy, yMin, yMax);
    s += `<line class="gridline" x1="0" y1="${Y}" x2="${W}" y2="${Y}"/>`;
    if (Math.abs(gy) > 1e-9) {
      s += `<text class="ticklabel" x="4" y="${Y - 3}">${round(gy)}</text>`;
    }
  }

  if (0 >= xMin && 0 <= xMax) {
    s += `<line class="axisline" 
      x1="${sx(0, xMin, xMax)}" 
      y1="0" x2="${sx(0, xMin, xMax)}" y2="${H}"/>`;
  }

  if (0 >= yMin && 0 <= yMax) {
    s += `<line class="axisline" x1="0" y1="${sy(0, yMin, yMax)}" 
    x2="${W}" y2="${sy(0, yMin, yMax)}"/>`;
  }

  return s;
};

export const simpson = (fn, a, b, n) => {
  if (n % 2 !== 0) n++;
  const h = (b - a) / n;
  let s = safe(fn, a) + safe(fn, b);

  for (let i = 1; i < n; i++) {
    const y = safe(fn, a + i * h);
    if (!isFinite(y)) continue;
    s += (i % 2 === 0 ? 2 : 4) * y;
  }
  return s * h / 3;
};

