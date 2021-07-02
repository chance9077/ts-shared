import funny from './funny'

const result1 = funny(1)
const result2 = funny(false)
const result3 = funny('abc')
const result4 = funny(null)
const result5 = funny(undefined)

console.log(result1, result2, result3, result4, result5)

console.log(typeof funny)
console.log(Object.prototype.toString.call(funny))

const a = funny as unknown as number
const b = funny as unknown as number
console.log(a + b === a + b)
// console.log(a + b)
// console.log(a + b)
// console.log(a + b)
// console.log(a + b)