---
code: 2.6.1
title: Quadratic functions
summary: The three forms of a quadratic — standard, factorised and vertex — and what each tells you about the parabola.
minutes: 25
difficulty: 1
objectives:
  - Identify the y-intercept and axis of symmetry from f(x) = ax² + bx + c.
  - Identify the x-intercepts from f(x) = a(x − p)(x − q).
  - Identify the vertex from f(x) = a(x − h)² + k and complete the square.
formulas:
  - name: Axis of symmetry
    latex: 'x = -\frac{b}{2a}'
  - name: Vertex form
    latex: 'f(x) = a(x - h)^2 + k,\ \text{vertex } (h, k)'
definitions:
  - term: Parabola
    definition: The graph of a quadratic function; it opens up if a > 0 and down if a < 0.
  - term: Vertex
    definition: The turning point of a parabola, lying on its axis of symmetry.
mistakes:
  - Reading the vertex of a(x + 3)² − 2 as (3, −2). It is (−3, −2).
tips:
  - The axis of symmetry is halfway between the x-intercepts — x = (p + q)/2.
related:
  - math-aa/2-7-quadratic-equations
---

## Three forms

| Form | Shows |
|---|---|
| $f(x) = ax^2 + bx + c$ | y-intercept $(0, c)$; axis $x = -\frac{b}{2a}$ |
| $f(x) = a(x - p)(x - q)$ | x-intercepts $(p, 0)$, $(q, 0)$ |
| $f(x) = a(x - h)^2 + k$ | vertex $(h, k)$ |

```figure
src: math-aa/_iitian/ib-mathematics-aa-sl-the-quadratic-function-study-notes/img/fig-e2303d81e73c8edc.png
caption: For f(x) = ax² + bx + c with a > 0: a U-shaped parabola with y-intercept c, roots α and β, and vertex at (−b/2a, −D/4a).
```

```figure
src: math-aa/_iitian/ib-mathematics-aa-sl-the-quadratic-function-study-notes/img/fig-e10e53d35aacbadd.png
caption: Factorised form shows the zeros; vertex form a(x − h)² + k shows the vertex.
```

```figure
src: math-aa/_sme/2-2-quadratic-functions-graphs/img/fig-1e2f437c40e397b2.png
caption: A positive quadratic (a > 0) has a minimum point; a negative one (a < 0) has a maximum point.
```

```plot
caption: y = (x − 1)² − 4 = (x + 1)(x − 3) = x² − 2x − 3: vertex (1, −4), roots −1 and 3, y-intercept −3.
x: -3, 5
y: -5, 6
f: (x-1)^2 - 4 | f(x)
vline: 1
point: 1, -4 | vertex
point: -1, 0
point: 3, 0
point: 0, -3
```

```keyidea
a sets the direction and width: a > 0 opens upward (minimum), a < 0 opens downward (maximum). Larger |a| gives a narrower parabola.
```

## Completing the square

```example
Write $f(x) = 2x^2 - 12x + 7$ in vertex form and state the vertex.
---
$2(x^2 - 6x) + 7 = 2[(x - 3)^2 - 9] + 7 = 2(x - 3)^2 - 11$. Vertex $(3, -11)$, a minimum.
```

```question
vertex-read
```

## Summary

- Standard form → y-intercept and axis $x = -b/2a$.
- Factorised → x-intercepts. Vertex form → turning point $(h, k)$.
- Complete the square to find the vertex.
