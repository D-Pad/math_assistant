# Logarithms
Some general rules and quick notes on logarithms

## What is a logarithm
A logarithm can be though of as the inverse of an exponent. Mathematically, if 
$b^y = x$, then $log_b(x) = y$, meaning the logarithm tells you how many 
times the base $b$ must be multiplied by itself to equal $x$. For example, 
since $2^3 = 8$, the logarithm base 2 of 8 is 3, written as $log_2(8) = 3$

### More examples
| Logarithm               | Exponent         |
|-------------------------|------------------|
| $log_x(z) = y$          | $x^y = z$        |
| $log_{10}(1,000) = 3$   | $10^3 = 1,000$   |
| $log_3(27) = 3$         | $3^3 = 27$       |
| $log_6(1296) = 4$       | $6^4 = 1296$     |
| $log_b(a) = \frac{1}{log_a(b)}$      | $b^x = a \Leftrightarrow b = a\frac{1}{x}$ |


## Natural Logarithms
A natural logarithm (ln) is shorthand for $log_e$ where $e$ is known as 
*Euler's number* and is approximately equal to $2.71828$. The function $ln(8)$ 
is the same as $log_e(8)$.

## Default Values
In real world applications, $log$ functions have a default base value which 
depends on the application, which are: 
 - **Math**: $log_e$
 - **Engineering**: $log_{10}$
 - **Computer Science**: $log_2$

## Rules 
| Log Rule                            | Exponent Rule                         |
|-------------------------------------|---------------------------------------|
| $log(a * b) = log(a) + log(b)$      | $10^x * 10^y = 10^{x+y}$              |
| $log(a^n) = n * log(a)$             | $(10^x)^n = 10^{nx}$                  | 
| $log_3(1) = 0$ **\***               | $3^0 = 1$                             |

**\*** Any log of 1 will be equal to 0 no matter the base

## Common Shortcuts
 - $log(1000 * x) = 3log(x)$

