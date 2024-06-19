#include <emmintrin.h>
#include <mmintrin.h>
#include <smmintrin.h>
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>

#define get_tickcount() ((long)__builtin_ia32_rdtsc())

#define TICKCOUNT_OF_BLOCK(x)       \
  ({                                \
    long __start = get_tickcount(); \
    x;                              \
    long __end   = get_tickcount(); \
    long __delta = __end - __start; \
    __delta;                        \
  })

#define TIME_A_BLOCK_NS(x)                                  \
  ({                                                        \
    struct timespec __start, __end;                         \
    clock_gettime(CLOCK_MONOTONIC_RAW, &__start);           \
    x;                                                      \
    clock_gettime(CLOCK_MONOTONIC_RAW, &__end);             \
    ulong __delta = (__end.tv_sec - __start.tv_sec) * 1e9 + \
                    (__end.tv_nsec - __start.tv_nsec);      \
    __delta;                                                \
  })

void
array_init(int* arr, int sz) {
  int incr = 0;
  for (size_t i = 0; i < sz; i++) arr[i] = incr++;
}

int
array_sum(int* arr, int sz) {
  int acc = 0;
  for (size_t i = 0; i < sz; i++) acc += arr[i];
  return acc;
}

int
array_sum_simd(int* arr, int sz) {
  // Initialize a vector of 4 x i32 with zero
  __m128i acc = _mm_setzero_si128();

  int i;
  // Process 4 integers at a time
  for (i = 0; i <= sz - 4; i += 4) {
    // Load 4 integers from the array (unaligned load)
    __m128i i_4 = _mm_loadu_si128((__m128i*)&arr[i]);
    // Add the previous acc to the 4 x i32 value
    acc = _mm_add_epi32(acc, i_4);
  }

  // Horizontal add the accumulated values
  acc = _mm_hadd_epi32(acc, acc);
  acc = _mm_hadd_epi32(acc, acc);

  // Extract the sum from the vector
  int total = _mm_cvtsi128_si32(acc);

  // Handle the remaining elements
  for (; i < sz; ++i) {
    total += arr[i];
  }

  return total;
}
#define sz 10000

int
main() {
  int to_sum1[sz] = {};
  int to_sum2[sz] = {};

  array_init(to_sum1, sz);
  array_init(to_sum2, sz);

  int     sum    = 0;
  int64_t cycles = TICKCOUNT_OF_BLOCK(
      { sum = array_sum(to_sum1, sz) + array_sum(to_sum2, sz); });

  printf("sum: %d, took %ld cycles\n", sum, cycles);
  printf("sum: %d \n", to_sum1[sz - 1]);
  printf("sum: %d \n", to_sum2[sz - 1]);

  sum                 = 0;
  int64_t cycles_simd = TICKCOUNT_OF_BLOCK(
      { sum = array_sum_simd(to_sum1, sz) + array_sum_simd(to_sum2, sz); });

  printf("sum: %d, took %ld cycles\n", sum, cycles_simd);

  return 0;
}