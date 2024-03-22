## Floating point representation of Money

Floating points have the pain point round-off error, im sure you've seen this example before:

```python
0.1 + 0.2 = 0.300000000004
```

This is obviously problematic in most application but certainly in financial applications where drifitng floating points have a direct cost where adding up a bunch of payments now leads to the incorrect result. There are several ways to fix this problem, an example would be libraries such as BigDecimal or the usage of a standard such as IEEE floats. Lets explore these options for a bit:

