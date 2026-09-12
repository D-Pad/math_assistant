## Chapter 1: What is a Function?
If *every value* of **x** is associated with *exactly one* value of **y**, then
**Y** is said to be a function of **x**.

It is customary to call the value of **x** the *independent variable* and the
value of **y** the *dependent variable* because the value of **y** *depends* 
on the value of x. Thus $f(x) = y$ means that **y**, the dependent variable, 
is the square of **x**. 

### One-to-one Functions
A *one-to-one* function is a function where both variables depend on each other,
such as the area of a square depending on the length of it's sides and vice 
versa. A squares area is a function of it's side length, and the side length
is a function of it's area.

Instead of writing something like $y = 2x - 7$ we write 
$y = f(x) = 2x - 7$ (or simply $f(x) = 2x - 7$). This means that **y**, a 
function of **x**, depends on the value of **x** in the expression $2x - 7$. In
this form the expression is called an *explicit* function of **x**. If the 
equation instead has the equivalent form $2x - y - 7 = 0$ it is called an 
*implicit* function of **x** because the explicit form is implied by the 
equation.

The Pythagorean theorem states that the hypotenuse of a triangle is equal to 
the sum of the squares of the other 2 sides. To express the hypotenuse as a 
function of the squares side (assuming the triangle is a right-triangle with 
equals base and height), let **y** be the hypotenuse and **x** be the side, 
the write 
$$$python
y = math.sqrt(2 * (x ** 2))
$$$

### Multi-variable Functions
Functions can have any number of independent variables. A simple instance of 
a three-variable function is the volume a rectangular room. It is dependent on 
the rooms width, length, and height.

### Linear vs Non-linear
If a function has the form $y = mx + b$, it is a straight line and is said to
be *linear*. If the function does not have the form $y = mx + b$, then it is 
not a straight line and the function is non-linear.

If a function has 3 independent variables, the Cartesian graph must be extended
to 3-dimensional space with axes **x**, **y**, and **z**.

### Domain and Range 
Values that can be taken by the independent variable are called the variables
*domain*. Values that can be taken by the dependent variable are called the 
*range*.

Domain and ranges can be infinite sets, such as the set of real numbers, or 
the set of integers; or either one can be a finite set such as a portion of 
real numbers.

In modern set theory this way of defining a function can be extended to 
completely arbitrary sets of numbers for a function that is described not by 
an equation but by a set of rules.

Note that if a vertical line from the x axis intersects more than one point
on a curve, the curve cannot represent a function because it maps an **x**
number to more than one **y** number.

