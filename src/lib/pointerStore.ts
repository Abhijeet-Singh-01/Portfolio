/** Mutable pointer values shared with the render loop; mouse moves never render React. */
export const pointerStore = {
  x: 0, y: 0, nx: 0, ny: 0, active: false, pressed: false, burst: 0,
};
