---
title: Linear and binary search
summary: Two ways to find an item in a list — one works on anything, the other is dramatically faster but needs the data sorted first.
minutes: 25
difficulty: 2
objectives:
  - Describe and implement a linear search.
  - Describe and implement a binary search on a sorted list.
  - Trace both algorithms on a given list.
  - Compare their efficiency using the number of comparisons in the worst case.
prerequisites:
  - Lists (arrays) and indexing
  - While loops and selection
formulas:
  - name: Linear search, worst case
    latex: 'n \text{ comparisons} \;\Rightarrow\; O(n)'
  - name: Binary search, worst case
    latex: '\lfloor \log_2 n \rfloor + 1 \text{ comparisons} \;\Rightarrow\; O(\log n)'
definitions:
  - term: Linear search
    definition: A search that checks each element in turn, from the start, until it finds the target or reaches the end of the list.
  - term: Binary search
    definition: A search on a **sorted** list that repeatedly compares the target with the middle element and discards the half that cannot contain it.
  - term: Time complexity
    definition: How the number of steps an algorithm takes grows as the size of its input grows, usually written in Big O notation.
mistakes:
  - Running a binary search on an unsorted list. It may report “not found” for an item that is there.
  - Updating `low = mid` or `high = mid` instead of `mid + 1` / `mid - 1`, which can cause an infinite loop.
  - Assuming binary search is always the better choice — for a small or unsorted list, sorting first may cost more than a linear search.
tips:
  - When tracing, draw a table with columns for `low`, `high`, `mid` and the value at `mid`. One row per loop iteration.
  - State the precondition (“the list must be sorted”) explicitly whenever you describe binary search.
related:
  - computer-science/b1-computational-thinking
  - computer-science/b4-adts
---

## Introduction

Searching is one of the most common jobs a program does: is this username taken, which record matches this ID, where is this word in the dictionary? How you search matters enormously once the data gets large.

## Linear search

The simplest strategy: start at the beginning and look at every item until you find the target.

```python
def linear_search(items, target):
    for i in range(len(items)):
        if items[i] == target:
            return i        # found: return its index
    return -1               # not found
```

Linear search works on **any** list, sorted or not. But in the worst case — the target is last, or missing — it checks all $n$ items.

## Binary search

If the list is **sorted**, we can do much better. Look at the middle item:

- if it is the target, stop;
- if the target is smaller, it can only be in the left half;
- if the target is larger, it can only be in the right half.

Each comparison throws away half of the remaining items.

```python
def binary_search(items, target):
    low, high = 0, len(items) - 1
    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            low = mid + 1    # discard the left half
        else:
            high = mid - 1   # discard the right half
    return -1
```

```example
Trace a binary search for 23 in the list `[3, 8, 12, 17, 23, 31, 40]`.
---
| low | high | mid | items[mid] | action |
|---|---|---|---|---|
| 0 | 6 | 3 | 17 | 23 > 17, so low = 4 |
| 4 | 6 | 5 | 31 | 23 < 31, so high = 4 |
| 4 | 4 | 4 | 23 | found at index 4 |

Three comparisons. A linear search would have needed five.
```

```keyidea
Halving the search space each step means doubling the list adds only **one** extra comparison. A sorted list of a million items needs at most 20 comparisons with binary search, against up to a million with linear search.
```

## Comparing efficiency

| | Linear search | Binary search |
|---|---|---|
| Needs sorted data? | No | Yes |
| Worst-case comparisons | $n$ | about $\log_2 n$ |
| Time complexity | $O(n)$ | $O(\log n)$ |
| Best for | small or unsorted lists | large sorted lists searched often |

```mistake
Binary search on unsorted data doesn’t crash — it just gives wrong answers, which is worse. Always check the precondition.
```

## Try it yourself

```question
binary-precondition
```

```question
first-midpoint
```

## Summary

- Linear search checks items one by one: simple, works on anything, $O(n)$.
- Binary search halves a **sorted** list each step: $O(\log n)$.
- Choose based on the size of the data, whether it is sorted, and how often you search it.
