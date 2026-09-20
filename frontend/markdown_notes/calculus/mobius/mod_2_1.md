# Module 1 - Chapter 4.6: Limits at Infinity and Asymptotes
 - 4.6.1 Calculate the limit of a function as  x increases or decreases 
 without bound.
 - 4.6.2 Recognize a horizontal asymptote on the graph of a function.
 - 4.6.3 Estimate the end behavior of a function as  x increases or decreases 
 without bound.
 - 4.6.4 Recognize an oblique asymptote on the graph of a function.
---
*Important Notes*
 - The output of a function cannot cross a **vertical asymptote**, but can 
 cross a **horizontal asymptote** an infinite number of times.

---
To graph a function $f$ defined on an unbounded domain, we also need to know 
the behavior of $f$ as $x \to \pm \infty$

## Infinite Limits
Using the graph of $h(x) = \frac{1}{(x-2)^2}$ as an example, we can see that 
as the $x-values$ approach $2$, the $y-values$ get larger and larger. 
Mathematically we can say that as the limit of $h(x)$ as $x$ approaches 2 is 
positive infinity. Symbolically we express this idea as
$\lim_{x \to 2}h(x) = \pm \infty$

### Three Types of Infinite Limits
#### Infinite Limits from the Left:
Let $f(x)$ be a function defined at all values in an open interval of the form,
$(b,a)$. 

 - i. If the values of $f(x)$ increase without bound as the values of $x$
 (where  $x < a$) approach the number $a$, then we say that the limit as $x$ 
 approaches $a$ from the left is positive infinity and we write:
 $$
 \lim_{x \to a^-} f(x) = +\infty
 $$

 - ii. If the values of $f(x)$ decrease without bound as the values of $x$
 (where  $x < a$) approach the number $a$, then we say that the limit as $x$ 
 approaches $a$ from the left is negative infinity and we write:
 $$
 \lim_{x \to a^-} f(x) = -\infty
 $$

#### Infinite Limits from the Right:
Let $f(x)$ be a function defined at all values in an open interval of the form,
$(a,c)$. 

 - i. If the values of $f(x)$ increase without bound as the values of $x$
 (where $x > a$) approach the number $a$, then we say that the limit as $x$ 
 approaches $a$ from the right is positive infinity and we write:
 $$
 \lim_{x \to a^+} f(x) = +\infty
 $$

 - ii. If the values of $f(x)$ decrease without bound as the values of $x$
 (where $x > a$) approach the number $a$, then we say that the limit as $x$ 
 approaches $a$ from the right is negative infinity and we write:
 $$
 \lim_{x \to a^+} f(x) = -\infty
 $$

#### Two-sided infinite limit: 
Let $f(x)$ be defined for all  $x \neq a$ in an open interval containing $a$.

 - i. If the values of $f(x)$ increase without bound as the values of $x$ 
 (where $x \neq a$) approach the number $a$, then we say that the limit as $x$
 approaches $a$ is positive infinity and we write: 
 $$
 \lim_{x \to a} f(x) = +\infty
 $$

 - ii. If the values of $f(x)$ decrease without bound as the values of $x$ 
 (where $x \neq a$) approach the number $a$, then we say that the limit as $x$
 approaches $a$ is positive infinity and we write: 
 $$
 \lim_{x \to a} f(x) = +\infty
 $$

For the limit of a function $f(x)$ to exist at $a$, it must approach a real 
number $L$ as $x$ approaches $a$. That said, if, for example,  
$\lim_{x \to a}f(x) = + \infty$, we always write
$\lim_{x \to a}f(x) = + \infty$ rather than $\lim_{x \to a}f(x) = DNE$

#### Recognizing an Infinite Limit
Evaluate each of the following limits, if possible. Use a table of functional
values and graph $f(x) = \frac{1}{x}$ to confirm your conclusion.

 - **a.** 
 $$
 \lim_{x \to 0}^- \frac{1}{x}
 $$
 - **b.** 
 $$
 \lim_{x \to 0}^+ \frac{1}{x}
 $$
 - **c.** 
 $$
 \lim_{x \to 0} \frac{1}{x}
 $$

*Solution*
Begin by constructing a table of functional values
| x                                    | 1/x                                  |
|--------------------------------------|--------------------------------------|
| 0.1                                  | 0.1                                  |
| 0.01                                 | 0.01                                 |
| 0.001                                | 0.001                                |
| 0.0001                               | 0.0001                               |
| 0.00001                              | 0.00001                              |
| 0.000001                             | 0.000001                             |
| -0.000001                            | -0.000001                            |
| -0.00001                             | -0.00001                             |
| -0.0001                              | -0.0001                              |
| -0.001                               | -0.001                               |
| -0.01                                | -0.01                                |
| -0.1                                 | -0.1                                 |

### Infinite Limits from Positive Integers
If $n$ is a positive even integer, then 
$$
\lim_{x \to a}\frac{1}{(x − a)^n} = +\infty
$$

If $n$ is a positive odd integer, then
$$
\lim_{x \to a}^+ \frac{1}{(x−a)^n} = +\infty
$$
and
$$
\lim_{x \to a}^- \frac{1}{(x−a)^n} = +\infty
$$

We should also point out that in the graphs of $f(x) = \frac{1}{(x−a)}^n$, 
points on the graph having $x$-coordinates very near to $a$ are very close to 
the vertical line $x = a$. That is, as $x$ approaches $a$, the points on the 
graph of $f(x)$ are closer to the line $x = a$. The line $x = a$ is called a 
vertical asymptote of the graph. We formally define a vertical asymptote as 
follows:

**Definition**
Let $f(x)$ be a function. If any of the following conditions hold, then the 
line $x = a$ is a vertical asymptote of $f(x)$.
$$
\lim_{x \to a}^− f(x) = +\infty \text{or} -\infty
$$
$$
\lim_{x \to a}^+ f(x) = +\infty \text{or} -\infty
$$
$$
\lim_{x \to a} f(x) = +\infty \text{or} -\infty
$$

#### Participation Activity #3
Evaluate $\lim_{x \to 2}f(x)$ for $f(x)$ shown here:
![Figure 8](../markdown_notes/calculus/mobius/images/fig_8.png)


## Limits at Infinity and Horizontal Asymptotes
Recall that $\lim_{x \to a}f(x) = L$ means $f(x)$ becomes arbitrarily close 
to $L$ as long as $x$ is sufficiently close to $a$. We can extend this idea 
to limits at infinity. For example, consider the function 
$f(x) = 2 + \frac{1}{x}$. As the values of this function get larger, the values
of $f(x)$ approach $2$. We say that the limit as $x$ approaches $\infty$ of 
$f(x)$ is $2$ and write $\lim_{x \to \infty}f(x) = 2$. Similarly, for $x < 0$,
as the values $\lvert x \rvert$ get larger, the values of $f(x)$ approaches 
$2$. We say the limit as $x$ approaches $-\infty$ of $f(x)$ is $2$ and write 
$lim_{x \to -\infty} = 2$. 
![Figure 9](../markdown_notes/calculus/mobius/images/fig_9.png)
The function approaches the asymptote $y = 2$ as $x$ approaches $\pm\infty$.
More generally, for any function $f$, we say the limit as $x \to \infty$ of 
$f(x)$ is $L$ if $f(x)$ becomes arbitrarily close to $L$ as long as $x$ is 
sufficiently large. In that case, we write $\lim_{x \to \infty} $f(x) = L$. 
Similarly, we say the limit as $x \to −\infty$ of $f(x)$ is $L$ if $f(x)$ 
becomes arbitrarily close to $L$ as long as $x < 0$ and $\lvert x \rvert$ is 
sufficiently large. In that case, we write $\lim_{x \to -\infty}f(x) = L$. We 
now look at the definition for a function having a limit at infinity. 

**Definition**
(Informal) If the values of $f(x)$ become arbitrarily close to $L$ as $x$
becomes sufficiently large, we say the function $f$ has a limit at $\infty$ 
and write:
$$
\lim_{x \to \infty}f(x) = L
$$

If the values of $f(x)$ becomes arbitrarily close to $L$ for $x < 0$ as
$\lvert x \rvert$ becomes sufficiently large, we say that the function $f$ has 
a limit at negative infinity and write.
$$
\lim_{x \to -\infty}f(x) = L
$$

If the values $f(x)$ are getting arbitrarily close to some finite value $L$ as 
$x \to \infty$ or $x \to −\infty$, the graph of $f$ approaches the line 
$y = L$. In that case, the line $y = L$ is a horizontal asymptote of 
$f(x) = \frac{1}{x}$.

**Definition**
If $\lim_{x \to \infty}f(x) = L$ or $\lim_{x \to -\infty} f(x) = L$, we say 
the line $y = L$ is a *horizontal asymptote* of $f$.

A function cannot cross a vertical asymptote because the graph must approach 
$\infty$ (or $−\infty$) from at least one direction as $x$ approaches the 
vertical asymptote. However, a function may cross a horizontal asymptote. In 
fact, a function may cross a horizontal asymptote an unlimited number of times.
For example, the function $f(x) = \frac{(cosx)}{x} + 1$ intersects the 
horizontal asymptote $y = 1$ an infinite number of times as it oscillates 
around the asymptote with ever-decreasing amplitude.

#### Participation Activity #4
Evaluate $\lim_{x \to −\infty}(4 + \frac{4}{x}) and 
$\lim_{x \to \infty}(4 + \frac{4}{x}$). Determine the horizontal asymptotes of
$f(x) = (4 + \frac{4}{x}), if any.

$\lim_{x \to \infty}(4 + \frac{4}{x}$ = 4 
$\lim_{x \to \infty}(4 + \frac{4}{x}$ = 4 
Horizontal Asymptote: y = 4

## End Behavior
The behavior of a function as $x \to \pm\infty$ is called the function’s end 
behavior. At each of the function’s ends, the function could exhibit one of 
the following types of behavior: 

 - The function $f(x)$ approaches a horizontal asymptote $y = L$.
 - The function $f(x) \to \infty$ or $f(x) \to −\infty$.
 - The function does not approach a finite limit, nor does it approach 
 $\infty$ or $−\infty$. In this case, the function may have some oscillatory 
 behavior. Let’s consider several classes of functions here and look at the 
 different types of end behaviors for these functions.

## End Behavior for Polynomial Functions
Consider the power function $f(x) = x^n$ where $n$ is a positive integer.
$$
\lim_{x \to \infty}x^n = \infty;n = 1,2,3,...
$$
and 
$$
\lim_{x \to -\infty} x^n = \begin{cases} \infty & ; \; n = 2, 4, 6, \ldots \\ -\infty & ; \; n = 1, 3, 5, \ldots \end{cases} 
$$

