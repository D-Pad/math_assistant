# Module 1 - Chapter 2.1: A Preview of Calculus 

## The Tangent Problem and Differential Calculus
Rate of change is one of the most critical concepts in calculus. We begin our 
investigation of rates of change by looking at the graphs of the three lines. 
 - $f(x) = −2x − 3$
 - $g(x) = 12x + 1$
 - $h(x) = 2$

![Figure 1](../markdown_notes/calculus/mobius/images/fig_1.png)

We can approximate the rate of change of a function $f(x)$ at a point 
$(a,f(a))$ on its graph by taking another point $(x,f(x))$ on the graph of
$f(x)$, drawing a line through the two points, and calculating the slope of the 
resulting line. Such a line is called a **secant line**.
![Figure 2](../markdown_notes/calculus/mobius/images/fig_2.png)

We formally define a secant line as follows:

The secant to the function $f(x)$ through the points $(a,f(a))$ and $(x,f(x))$
is the line passing through these points. Its slope is given by.
$$
m_{sec} = \frac{f(x) - f(a)}{x - a}
$$

The accuracy of approximating the rate of change depends on how close the two
sample points are to each other. For example, in the image below, the rate of
change at point $(a, f(a))$ is more accurately demonstrated using the slope
of the teal line, not the orange one.
![Figure 3](../markdown_notes/calculus/mobius/images/fig_3.png)

The secant lines themselves approach a line that is called the tangent to the 
function $f(x)$ at $a$. The slope of the tangent line to the graph at $a$ 
measures the rate of change of the function at $a$. This value also 
represents the derivative of the function $f(x)$ at $a$, or the rate of change 
of the function at $a$. This derivative is denoted by $f\prime(a)$. 
Differential calculus is the field of calculus concerned with the study of 
derivatives and their applications.

### Tangent vs Secant Lines
A **secant line** intersects a curve at two or more distinct points and 
represents the average rate of change of the function over the interval 
between those points. A **tangent line** touches the curve at exactly one point
(locally) and represents the instantaneous rate of change at that specific
location.

### Finding the Slope of a Secant Line
The secant to a function $f(x)$ through the points $(a,f(a))$ and $(x,f(x))$ 
is the line that passes through these two points. Its slope is given by
$$
m_{sec} = \frac{f(x) − f(a)}{x − a}
$$
For example, given points $y = (2, 4)$ and $z = (\frac{4}{3}, \frac{16}{9})$ on
the graph of $f(x) = x^2$, we can first calculate the numerator by subtracting
$z_2$ by $y_2$ ($(\frac{16}{9}) - 4$). Then calculate the denominator by 
subtracting $z_1$ by $y_1$. 
$$
m_{sec} = \frac{\frac{16}{9} − 4}{\frac{4}{3} − 2}
$$
$$
m_{sec} = \frac{(16 - (4 \cdot 9))}{(9)} \cdot \frac{3}{(4 - (2 \cdot 3))}
$$
$$
m_{sec} = \frac{-20}{9} \cdot \frac{3}{-2}
$$
$$
m_{sec} = \frac{10}{3}
$$

Suppose that we have a function, $s(t)$, that gives the position of an object 
along a coordinate axis at any given time $t$. Can we use these same ideas to 
create a reasonable definition of the instantaneous velocity at a given time  
$t = a$?

**Definition**
Let $s(t)$ be the position of an object moving along a coordinate axis at time  
$t$. The **average velocity** of the object over a time interval $[a,t]$ where  
$a < t$ (or $[t,a]$ if $t < a$) is
$$
u_{ave} = \frac{s(t) - s(a)}{t - a}
$$
As $t$ is chosen closer to $a$, the average velocity becomes closer to the 
instantaneous velocity.

**Participation Activity:**

An object moves along a coordinate axis so that its position at time $t$ is 
given by $s(t) = t^4$. Estimate its instantaneous velocity at time $t = 3$ by 
computing its average velocity over the time interval $[3,3.001]$.
$$
u_{ave} = \frac{s(3.001) - s(3)}{3.001 - 3}
$$
$$
= \frac{3.001^4 - 3^4}{3.001 - 3}
$$
$$
= \frac{81.108054012 - 81}{3.001 - 3}
$$
$$
= \frac{0.108054012}{0.001}
$$
$$
u_{ave} = 108.054
$$

## The Area Problem and Integral Calculus
We now turn our attention to a classic question from calculus. Many 
quantities in physics—for example, quantities of work—may be interpreted as 
the area under a curve. This leads us to ask the question: How can we find 
the area between the graph of a function and the x-axis over an interval.

![Figure 4](../markdown_notes/calculus/mobius/images/fig_4.png)

As in the answer to our previous questions on velocity, we first try to 
approximate the solution. We approximate the area by dividing up the interval 
$[a,b]$ into smaller intervals in the shape of rectangles. The approximation of
the area comes from adding up the areas of these rectangles. (See the *Riemann
Sums* module to simulate this yourself)

![Figure 5](../markdown_notes/calculus/mobius/images/fig_5.png)
As the widths of the rectangles become smaller (approach zero), the sums of 
the areas of the rectangles approach the area between the graph of $f(x)$ and 
the x-axis over the interval $[a,b]$.



