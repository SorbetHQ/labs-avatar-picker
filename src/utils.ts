export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function randomTransform(el) {
  var trans = "matrix3d(" + Math.random() + ", -" + Math.random() + ", " + Math.random() + ", " + Math.random() + ", " + Math.random() + ", " + Math.random() + ", " + Math.random() + ", 0, -" + Math.random() + ", 0, " + Math.random() + ", " + Math.random() + ", " + Math.random() + ", " + Math.random() + ", " + Math.random() + ", 1)";

  setTransform(el, "");
  setTransform(el, trans);
}

export function setTransform(el, trans) {
  el.style.transform = trans;
  el.style.webkitTransform = trans;
  el.style.MozTransform = trans;
  el.style.msTransform = trans;
  el.style.OTransform = trans;
}

export function setCSSVariable(name: string, value: string) {
  document.documentElement.style.setProperty(`--${name}`, `var(--${value})`);
  return value;
}
