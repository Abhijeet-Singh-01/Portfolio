/** Mutable pointer values shared with the render loop; mouse moves never render React. */
export const pointerStore = {
  x: 0, y: 0, nx: 0, ny: 0, active: false, pressed: false, burst: 0,
  dragging: false, rotationX: 0, rotationY: 0, velocityX: 0, velocityY: 0, heroProgress: 0,
};
