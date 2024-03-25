# SIMD

Single Instruction, Multiple Data, or SIMD for short, is a tool to leverage the CPUs ability to run instructions in parallel. Lets look at a simple example without any SIMD:

```zig
const std = @import("std");

fn dot_product(v: []const f64, u: []const f64) f64 {
    var result: f64 = 0.0;
    for (0..v.len) |i| {
        result += v[i] * u[i];
    }
    return result;
}
```

What dot product actually means isn't very relevant, the question we are going to ask ourselves, is how we can use parallelization at the hardware level to improve performance. Let's use the same example, but now with explicit SIMD:

```zig
const std = @import("std");

const vec3 = @Vector(4, f64);

fn dot_product_simd(v: vec3, u: vec3) f64 {
    // @Vector is a builtin type, math operations take place element-wise.
    const multiply_by_element = v * u;
    return @reduce(.Add, multiply_by_element);
}
```

