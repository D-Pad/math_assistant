<script setup>
import { ref, computed } from "vue";

const expression = ref("");
const justEvaluated = ref(false);

const display = computed(() => expression.value || "0");

const inputButtons = [
  { label: "sin", insert: "sin(", clear: 1 },
  { label: "cos", insert: "cos(", clear: 1 },
  { label: "tan", insert: "tan(", clear: 1 },
  { label: "(", insert: "(" },
  { label: ")", insert: ")" },

  { label: "ln", insert: "ln(", clear: 1 },
  { label: "log", insert: "log(", clear: 1 },
  { label: "√", insert: "sqrt(", clear: 1 },
  { label: "^", insert: "^" },
  { label: "π", insert: "π", clear: 1 },

  { label: "7", insert: "7" },
  { label: "8", insert: "8" },
  { label: "9", insert: "9" },
  { label: "÷", insert: "/" },
  { label: "C", action: "clear" },

  { label: "4", insert: "4" },
  { label: "5", insert: "5" },
  { label: "6", insert: "6" },
  { label: "×", insert: "*" },
  { label: "⌫", action: "delete" },

  { label: "1", insert: "1" },
  { label: "2", insert: "2" },
  { label: "3", insert: "3" },
  { label: "-", insert: "-" },
  { label: "%", insert: "%" },

  { label: "0", insert: "0" },
  { label: ".", insert: "." },
  { label: "e", insert: "e", clear: 1 },
  { label: "+", insert: "+" },
  { label: "=", action: "evaluate" },
];

const isDigit = (ch) => {
  return ch >= "0" && ch <= "9";
}

const press = (btn) => {
  
  if (btn.action) {
    if (btn.action === "clear") clearAll();
    if (btn.action === "delete") deleteLast();
    if (btn.action === "evaluate") evaluate();
    return;
  }

  if (btn.clear) {
    clearAll();
  }

  // Starting to type a fresh number right after pressing "=" should
  // replace the old result instead of appending to it.
  if (justEvaluated.value) {
    expression.value = 
      isDigit(btn.insert) || 
      btn.insert === "."  ||
      expression.value === 'Error' ? 
        "" : expression.value;
    justEvaluated.value = false;
  }

  expression.value += btn.insert;
}

const clearAll = () => {
  expression.value = "";
  justEvaluated.value = false;
}

const deleteLast = () => {
  const multiCharTokens = ["sin(", "cos(", "tan(", "log(", "ln(", "sqrt("];
  const match = multiCharTokens.find((t) => expression.value.endsWith(t));
  expression.value = expression.value.slice(0, -(match ? match.length : 1));
}

const toEvaluableString = (expr) => {
  return expr
    .replaceAll("π", "Math.PI")
    .replaceAll("sqrt(", "Math.sqrt(")
    .replaceAll("ln(", "Math.log(")
    .replaceAll("log(", "Math.log10(")
    .replaceAll("sin(", "Math.sin(")
    .replaceAll("cos(", "Math.cos(")
    .replaceAll("tan(", "Math.tan(")
    .replaceAll("^", "**")
    .replaceAll("%", "/100");
}

const closeUnbalancedParens = (expr) => {
  const openCount = (expr.match(/\(/g) || []).length;
  const closeCount = (expr.match(/\)/g) || []).length;
  return expr + ")".repeat(Math.max(0, openCount - closeCount));
}

const evaluate = () => {

  if (!expression.value) return;

  try {
    
    const balancedExpr = closeUnbalancedParens(expression.value);
    const safeExpr = toEvaluableString(balancedExpr);
    if (!/^[0-9+\-*/%.()a-zA-Z\s]*$/.test(safeExpr)) {
      throw new Error("Invalid characters");
    }
    const result = Function(`"use strict"; return (${safeExpr});`)();

    if (typeof result !== "number" || !isFinite(result)) {
      throw new Error("Invalid result");
    }

    expression.value = String(Math.round(result * 1e8) / 1e8);
    justEvaluated.value = true;
  } catch {
    expression.value = "Error";
    justEvaluated.value = true;
  }
}
</script>

<template>
  
  <div id="calculator-body" class="panel">
    
    <div id="calc-output-screen">{{ display }}</div>

    <div id="btn-grid">
      
      <button
        v-for="btn in inputButtons"
        :key="btn.label"
        class="calc-btn"
        :class="{
          'number-btn': /^[0-9.]$/.test(btn.label),
          'action-btn': btn.action === 'clear' || btn.action === 'delete',
          'equals-btn': btn.action === 'evaluate',
        }"
        @click="press(btn)"
      >
        {{ btn.label }}
      </button>
    
    </div>
  
  </div>

</template>

<style scoped>
#calculator-body {
  width: 700px;
  padding: 24px;
  border-radius: 12px;
}

#calc-output-screen {
  width: 100%;
  max-height: 100px;
  box-sizing: border-box;
  background-color: var(--teal);
  color: var(--bg);
  border-radius: 6px;
  margin-bottom: 18px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 4rem;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  font-family: 'LcdDot', 'LcdScreen', monospace;
}

#btn-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.calc-btn {
  background-color: var(--axis);
  color: var(--ink);
  border: none;
  border-radius: 6px;
  padding: 15px 0;
  font-size: 1.5rem;
  cursor: pointer;
}

.calc-btn:hover {
  filter: brightness(1.1);
}

.calc-btn.number-btn {
  background-color: var(--ink);
  color: var(--panel);
}

.calc-btn.action-btn {
  background-color: #c0392b;
  color: white;
}

.calc-btn.equals-btn {
  background-color: #2980b9;
  color: white;
}
</style>
