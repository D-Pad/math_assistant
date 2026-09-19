# Module 1 - Chapter 2.3: The Limit Laws

## Evaluating Limits with the Limit Laws
The first two limit laws were stated in Theorem 2.1 Two Important Limits and 
we repeat them here. These basic results, together with the other limit laws, 
allow us to evaluate limits of many algebraic functions.

### Basic Limit Results
For any real number $a$ and any constant $c$

**i.** Limit of $x$ as $x$ approaches $a$
$$
\lim_{x \to a} x = a
$$

**ii.** Limit of constant $c$ as $x$ approaches $a$
$$
\lim_{x \to a} c = c
$$

#### Evaluating a Basic Limit
**Problem:**
Evaluate each of the following limits using Basic Limit Results.
 - **Q1:** $\lim_{x \to 2} x$
 - **Q2:** $\lim_{x \to 2} 5$

**Solution:**
 - **A1:** The limit of $x$ as $x$ approaches $a$ is $a$: 
 $$\lim_{x \to 2}x = 2$$
 - **A2:** The limit of a constant is that constant: 
 $$\lim_{x \to 2}5 = 5$$

## Limit Laws
Let $f(x)$ and $g(x)$ be defined for all $x \neq a$ over some open interval 
containing $a$. Assume that $L$ and $M$ are real numbers such that 
$\lim_{x \to a} f(x) = L$ and $\lim_{x \to a} g(x) = M$. Let $c$ be a constant.
Then, each of the following statements holds:

- Sum law for limits:
$$
\lim_{x \to a}(f(x)+g(x))=\lim_{x \to a}f(x)+\lim_{x \to a}g(x)=L+M
$$

- Difference law for limits:
$$
\lim_{x \to a}(f(x)-g(x))=\lim_{x \to a}f(x)-\lim_{x \to a}g(x)=L-M
$$

- Constant multiple law for limits:
$$
\lim_{x \to a}cf(x)=c\cdot\lim_{x \to a}f(x)=cL
$$

- Product law for limits:
$$
\lim_{x \to a}(f(x)\cdot g(x))=\lim_{x \to a}f(x)\cdot\lim_{x \to a}g(x)=L\cdot M
$$

- Quotient law for limits:
$$
\lim_{x \to a}\frac{f(x)}{g(x)}=\frac{\lim_{x \to a}f(x)}{\lim_{x \to a}g(x)}=\frac{L}{M} \text{for} (M \neq 0)
$$

- Power law for limits:
$$
\lim_{x \to a}(f(x))^n=\bigl(\lim_{x \to a}f(x)\bigr)^n=L^n \text{for every positive integer} (n)
$$

- Root law for limits:
$$
\lim_{x \to a}\sqrt[n]{f(x)}=\sqrt[n]{\lim_{x \to a}f(x)}=\sqrt[n]{L} 
$$
$$
\text{for all (L) if (n) is odd}
$$
$$
\text{and for} (L \geq \text{0) if (n) is even and} \, (f(x) \geq 0)
$$

### Evaluating a Limit Using Limit Laws
Use the limit laws to evaluate $\lim_{x \to −3} (4x + 2)$

Let’s apply the limit laws one step at a time to be sure we understand how 
they work. We need to keep in mind the requirement that, at each application 
of a limit law, the new limits must exist for the limit law to be applied.

**Apply the sum law**
$$
\lim{x \to −3} (4x+2) = \lim_{x \to −3}4x + \lim{x \to −3}2 
$$
**Apply the constant multiple law**
$$
= 4 \cdot \lim{x \to −3}x + \lim_{x \to −3}2
$$
**Apply the basic limit results and simplify**
$$
= 4 \cdot (−3) + 2 = −10
$$

#### Practice Problem
Use the limit laws to evaluate $\lim_{x \to 4}(4x - 5) \sqrt{x = 4}$.

*Use the product law to treat the expression as 2 functions:*
$$
(4x - 5)\sqrt{x + 4}
$$
Let
$$
f(x) = 4x - 5 
$$
and 
$$
g(x) = \sqrt{x + 4}
$$
The product law says:
$$
\lim_{x \to a}[f(x)g(x)] = (\lim_{x \to a}f(x))(\lim_{x \to a}g(x))
$$
So our problem becomes:
$$
\lim_{x \to 4}(4x - 5)\sqrt{x + 4} = [\lim_{x \to 4}(4x - 5)][\lim_{x \to 4}\sqrt{x + 4}]
$$

*Find the first limit*

For 
$$
\lim_{x \to 4}(4x - 5) = \lim_{x \to 4}(4x) - \lim_{x \to 4}(5)
$$
We can use the difference law 
$$
\lim_{x \to 4}(4x - 5) = \lim_{x \to 4}(4x) - \lim_{x \to 4}(5)
$$
Now we can use the **constant multiple** law on 4x:
$$
= 4\lim_{x \to 4}x - 5
$$
And we know:
$$
\lim_{x \to 4} = 4
$$
Therfore: 
$$
4(4) - 5) = 16 - 5 = 11
$$
So: $L = 11$

*Find the second limit*

Now we have:
$$
\lim{x \to 4}\sqrt{x + 4}
$$
This is where the **root law** comes in 
$$
\lim_{x \to 4} \sqrt{\lim_{x \to 4}(x + 4)}
$$
Using the **sum law**:
$$
= \sqrt{\lim_{x \to 4}x + \lim_{x \to 4}4}
$$
$$
= \sqrt{4 + 4} = \sqrt{8} = \sqrt{4 \cdot 2} = \sqrt{4} \cdot \sqrt{2} = 2\sqrt{2}
$$
So: $M = 2\sqrt{2}$

**Use the product law**

$L \cdot M = (11)(2\sqrt{2}) = 22\sqrt{2}$
So:
$$
\lim_{x \to 4}(4x - 5)\sqrt{x + 4} = 22\sqrt{2}
$$

**Shortcut method**

This whole problem could be solved in a shorter way:
$$
\lim_{x \to 4}(4x - 5)\sqrt{x + 4} = (4(4) - 5)\sqrt{4 + 4} = 11\sqrt{8} = 22\sqrt{2}
$$

## Limits of Polynomial and Rational Functions
By now you have probably noticed that, in each of the previous examples, it 
has been the case that $\lim_{x \to a}f(x) = f(a)$. This is not always true, 
but it does hold for all polynomials for any choice of a and for all rational 
functions at all values of a for which the rational function is defined.

### Limits of Polynomial and Rational Functions
Let $p(x)$ and $q(x)$ be polynomial functions. Let a be a real number. Then, 
$$
\lim_{x \to a}p(x) = p(a)
$$
$$
\lim_{x \to a}\frac{p(x)}{q(x)} = \frac{p(a)}{q(a)} \text{when}\, q(a) \neq 0
$$

#### Example:
Evaluate the following polynomial function
$$
\lim_{x \to -1}(10x^2 - 9x + 6)
$$
Substitute $-1$ for $x$
$$
(10(-1)^2 - 9(-1) + 6) = (10(1) - 9(-1) + 6) = 10 + 9 + 6 = 25
$$
Therefore, $L = 25$


### Evaluating a Limit of a Rational Function
Evaluate the $\lim_{x \to 3}\frac{2x^2 − 3x + 1}{5x + 4}$.

Since 3 is in the domain of the rational function
$f(x) = \frac{2x^2 − 3x + 1}{5x + 4}$, we can calculate the limit by 
substituting 3 for x into the function. Thus, 
$$
\lim{x \to 3}\frac{2x^2 − 3x + 1}{5x + 4} = \frac{10}{19}
$$

## Additional Limit Evaluation Techniques
As we have seen, we may evaluate easily the limits of polynomials and limits 
of some (but not all) rational functions by direct substitution. However, as 
we saw in the introductory section on limits, it is certainly possible for  
$\lim{x \to a}f(x)$ to exist when $f(a)$ is undefined. The following 
observation allows us to evaluate many limits of this type:

If for all $x \neq a$, $f(x) = g(x)$ over some open interval containing $a$, 
then $\lim_{x \to a}f(x) = \lim_{x \to a}g(x)$

### Problem-Solving Strategy:
*Calculating a Limit When* $\frac{f(x)}{g(x)}$ has the Indeterminate Form 
$\frac{0}{0}$ 

1. First, we need to make sure that our function has the appropriate
form and cannot be evaluated immediately using the limit laws. 

2. We then need to find a function that is equal to $h(x) = \frac{f(x)}{g(x)} 
for all $x \neq a$ over some interval containing $a$. To do this, we may need 
to try one or more of the following steps: 

 - If $f(x)$ and $g(x)$ are polynomials, we should factor each function and 
 cancel out any common factors. 
 - If the numerator or denominator contains a difference involving a square 
 root, we should try multiplying the numerator and denominator by the 
 conjugate of the expression involving the square root. 
 - If  f(x)/g(x) is a complex fraction, we begin by simplifying it. Last, we 
 apply the limit laws.

3. Last, we apply the limit laws.

### Evaluating a Limit by Multiplying the Conjugate
A conjugate is simply reversing the operator of an expression. Given $a + b$,
the conjugate is $a - b$.

**Evaluate** $\lim_{x \to -1} \frac{\sqrt{x + 2} - 1}{x + 1}$
 
 - **Step 1:** $\frac{\sqrt{x + 2} - 1}{x + 1}$ has the form $0/0$ at $-1$.
 Let's begin by multiplying by $\sqrt{x + 2} + 1$, the conjugate of 
 $\sqrt{x + 2} - 1$, on the numerator and denominator:
 $$
 \lim_{x \to -1}\frac{\sqrt{x + 2} - 1}{x + 1} = \lim_{x \to -1}\frac{\sqrt{x + 2} - 1}{x + 1} \cdot \frac{\sqrt{x + 2} + 1}{\sqrt{x + 2} + 1}
 $$

 - **Step 2:** We then multiply out the numerator. We don't simply multiply out
 the denominator because we are hoping that the $(x + 1)$ in the denominator
 cancels out in the end:
 $$
 = \lim_{x \to -1}\frac{x + 1}{(x + 1)(\sqrt{x + 2} + 1)}
 $$

 - **Step 3:** Then we cancel:
 $$
 = \lim_{x \to -1}\frac{1}{\sqrt{x + 2} + 1}
 $$

 - **Step 4:** Last we apply limit laws:
 $$
 = \lim_{x \to -1}\frac{1}{\sqrt{x + 2} + 1} = \frac{1}{2}
 $$

## The Squeeze Theorem
The techniques we have developed thus far work very well for algebraic 
functions, but we are still unable to evaluate limits of very basic 
trigonometric functions. The next theorem, called the squeeze theorem, 
proves very useful for establishing basic trigonometric limits. This theorem 
allows us to calculate limits by “squeezing” a function, with a limit at a 
point $a$ that is unknown, between two functions having a common known limit 
at $a$.

![Figure 7](../markdown_notes/calculus/mobius/images/fig_7.png)
Let $f(x),g(x),$ and $h(x)$ be defined for all $x \neq a$ over an open 
interval containing $a$. If 
$$
f(x) \leq g(x) \leq h(x)
$$
for all $x \neq a$ in an open interval containing $a$ and
$$
\lim{x \to a}f(x) = L = \lim_{x \to a}h(x)
$$
where $L$ is a real number, then  
$$
\lim_{x \to a}g(x) = L
$$


