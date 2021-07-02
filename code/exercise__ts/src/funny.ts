import { Primitive } from 'type-fest'

interface Funny {
  <T extends Primitive>(val: T): T
  value: Primitive
  [Symbol.toStringTag]: string
  [Symbol.toPrimitive]: (hint: string) => Primitive
}

const funny = <Funny>function(val) {
  const emoji = '0123456789'.split("")
  funny.value = val
  funny[Symbol.toStringTag] = 'number'
  funny[Symbol.toPrimitive] = () => +emoji.sort(() => Math.random() - 0.5)[0]
  return val
}

export default funny