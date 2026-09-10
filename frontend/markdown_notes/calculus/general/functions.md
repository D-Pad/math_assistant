# Graphing Functions: Domain, Range, and Limits

## 1. What Is a Function Graph?
A function's graph is the set of all points **(x, f(x))** plotted on a 
coordinate plane. The x-axis represents the input values, and the y-axis 
represents the output values. Reading a graph well means being able to answer 
three key questions:

 - **What inputs are allowed?** → Domain
 - **What outputs are possible?** → Range
 - **What does the function approach at a particular point or at infinity?** 
 → Limit

## 2. Finding the Domain
The **domain** is the complete set of x-values for which the function is 
defined.

### How to find it from a graph:
1. Scan the graph from left to right.
2. Identify the leftmost and rightmost x-values the graph covers.
3. Watch for:
   - **Holes** (open circles) that single x-value is excluded.
   - **Vertical asymptotes** the function is undefined at that x-value.
   - **Endpoints** a filled dot means that value *is* included; an open 
   circle means it is *not*.

### Example
If a graph runs continuously from x = -3 to x = 5, with an open circle at x = 
1:
```
Domain: [-3, 5], x ≠ 1
```

## 3. Finding the Range
The **range** is the complete set of y-values the graph actually reaches.

### How to find it from a graph:
1. Scan the graph from bottom to top.
2. Identify the lowest and highest y-values.
3. Watch for:
   - **Horizontal asymptotes** — the graph gets close to a y-value but never 
   touches it.
   - **Local max/min points** — these often mark the boundaries of range on 
   curved graphs.
   - **Open vs. closed points**, same rule as domain.

### Example
If a parabola opens upward with a vertex (minimum point) at y = -2:
```
Range: [-2, ∞)
```

## 4. Finding the Limit at a Point
The **limit** of a function as x approaches a value *a* describes what y-
value the graph is *heading toward* regardless of whether the function 
actually equals that value at x = a.

### Steps:
1. Trace the graph from the **left side** toward x = a. Note the y-value it 
approaches (left-hand limit).
2. Trace the graph from the **right side** toward x = a. Note the y-value it 
approaches (right-hand limit).
3. Compare the two:
   - If both sides approach the **same y-value**, the limit exists:
     `lim(x→a) f(x) = L`
   - If the sides approach **different y-values**, the limit does not exist (
   DNE) at that point.

### Example
A graph has a jump: as x approaches 2 from the left, y approaches 3; from the 
right, y approaches 5.

```
lim(x→2⁻) f(x) = 3
lim(x→2⁺) f(x) = 5
lim(x→2) f(x) = DNE (left ≠ right)
```

## 5. Limits at Infinity

To find the **end behavior** of a graph:
 - Look at what happens as the graph extends far to the **right** (x → ∞).
 - Look at what happens as the graph extends far to the **left** (x → -∞).
 - If the graph flattens toward a horizontal line, that line's y-value is the 
 limit (often marked by a horizontal asymptote).

### Example
```
lim(x→∞) f(x) = 0   (graph flattens toward y = 0 on the right)
```

## 6. Quick Reference Table
| Concept | What to Look For | Notation |
|---|---|---|
| Domain | Left-to-right extent, holes, asymptotes | e.g., `[-3, 5]` |
| Range | Bottom-to-top extent, min/max, asymptotes | e.g., `[-2, ∞)` |
| Limit at a point | Where graph *approaches* from both sides | `lim(x→a) f(x)` |
| Limit at infinity | End behavior on far left/right | `lim(x→±∞) f(x)` |

## 7. Common Pitfalls
 - **Confusing domain/range with limits**: Domain and range describe *what 
 the graph covers*; limits describe *what the graph approaches*.
 - **Ignoring open circles**: A hole excludes a single point from both the 
 domain and any function value, even if the limit exists there.
 - **Assuming symmetry**: Left-hand and right-hand limits can differ — always 
 check both sides independently.

