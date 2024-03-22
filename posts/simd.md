# Single Instruction, Multiple Data

Or Simd for short, is a tool to leverage the CPUs ability to run instructions in parallel. Lets look at a simple example:

```zig
const std = @import("std");

fn dot_product(v: []const f64, u: []const f64) f64 {
    std.debug.assert(v.len == u.len);

    var result: f64 = 0.0;
    for (0..v.len) |i| {
        result += v[i] * u[i];
    }
    return result;
}
```