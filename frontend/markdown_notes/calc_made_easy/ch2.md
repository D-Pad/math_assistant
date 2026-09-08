## Chapter 2: What is a limit?
A derivative, the fundamental concept of differential calculus, is a limit. An 
integral, the fundamental concept of integral calculus, is a limit.

A sequence is a set of numbers in some order. The numbers don't have to be 
different and they need not be integers.

If the terms of a finite sequence are added to obtain a finite sum, it is 
called a series.

If a series is infinite, the sum up to any specified term is called a 
"partial sum". If the partial sums of an infinite series get closer and closer 
to a number *k*, so that by continuing the series you can make the sum as 
close to *k* as you please, then *k* is called the limit of the partial sums, 
or the limit of the infinite series. The terms are said to *converge* on *k*. 
If there is no convergence, the series is said to *diverge*.

You can't obtain the "sum" of an infinite series by adding because the number
of terms to be added is infinite. When we speak of the "sum" of an infinite
series, this is just a short way of naming its limit.

An infinite series can converge on it's limit in 3 different ways:
 - The partials sums get ever closer to the limit without actually reaching it,
   but they never go beyond the limit.
 - The partial sums reach the limit.
 - The partial sums go beyond the limit, before they converge.

An easy way to "see" that the limit of `1/2 + 1/4 + 1/8 + 1/16 + ... = 1` is to
look at the image below. You can halve the outer square, then continue halving
each new half forever, but you'll still have 1 whole square when adding all of 
the new halves together. 
```
┌───────────────┬───────┬───┬─┬┬┐
│               │       │   │ ├┴┤
│               │       │   ├─┴─┤
│               │       ├───┴───┤
│               │       │       │
│               ├───────┴───────┤
│               │               │
│               │               │
│               │               │
├───────────────┴───────────────┤
│                               │
│                               │
│                               │
│                               │
│                               │
│                               │
└───────────────────────────────┘
```


