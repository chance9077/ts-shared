/** @typedef {(a: number, b: number) => number} Counter */

/**
 * count  a + b
 * @type {Counter}
 */
export function sum(a, b) {
  return a + b
}

/**
 * count  a - b
 * @type {Counter}
 */
export function subtract(a, b) {
  return a - b
}