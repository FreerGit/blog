# 🍚 risotto

dddd

## hejsvej

risotto is a minimalist, responsive [hugo](https://gohugo.io) theme inspired by terminal ricing aesthetics.
. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

# TODO colorscheme https://www.euler.finance/

```C
void
prep_send(int fd, struct io_uring *ring, char *buf, size_t sz) {
  log_debug("prep_send");
  struct io_uring_sqe *sqe = io_uring_get_sqe(ring);
  io_uring_prep_send(sqe, fd, buf, sz, 0);
  io_uring_submit(ring);
}
```
