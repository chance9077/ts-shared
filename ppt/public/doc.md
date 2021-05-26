# TypeScript
## 使用分享
<!-- next -->

# JavaScript
## 项目
<!-- more -->
## 缺点
- [代码提示弱，影响开发效率](https://www.typescriptlang.org/play?noImplicitAny=false&filetype=js#code/PQKhAJEKbRIc3ApAygEQPIGFyAubQU4nhMAKADMBXAOwGMAXASwHszwBDAExYAomAacAIwEpwAbwLhwAJwCmVEuMZNwAaj4EAvgQIAbac3ABecAEYCCgwCYN2quADOJALb7mbdoZ5n+BYMFsOAdBqgEAACUjJyNsJkDryS4qrgFHTk1goAtHx4hKSUtAy+vFTiTNScPALCohLSsvLgGbxqWjpSdprWBnaFxaVu4B5ePq0k7X5AA)
- 低级BUG
- 代码质量
- 一些奇技淫巧脑壳痛（限制弱）
<!-- more -->
## 提高
## JavaScript
## 项目开发及维护体验
<!-- more -->
由于 JavaScript 的语言特性，我们可以在项目中使用 ESLint 等工具提高代码质量，比如检查未使用的变量、强制使用全等、函数必须命名等，这些工具不再赘述
<!-- next -->
# JSDoc
使用 JSDoc 给方法、变量、参数等添加注释，不但可以增强代码可读性，还能获得良好的 IDE 智能提示，如果你是 VS Code 用户，在项目中配合 JSDoc 可以获得类似 TypeScript 的开发体验。
<!-- more -->
## 标签
- @type
- @param
- @returns
- @typedef
- @callback
<!-- more -->
- @template
- @class
- @this
- @extends
- @enum
- @deprecated

JSDoc 提供了很多标签

使用以上列出的标签就可以满足我们的需求
<!-- next -->
## @type

可以使用 @type 标签引用 TypeScript 或 @typedef 中定义的类型以及 JSDoc 中定义的类型

<!-- more -->
```javascript
/**
 * @type {string}
 */
var s;

/** @type {Window} */
var win;

/** @type {PromiseLike<string>} */
var promisedString;

/**
 * @type {number | string}
 */
var numberOrString = Math.random() < 0.5 ? "hello" : 100;
var typeAssertedNumber = /** @type {number} */ (numberOrString);

/**
 * @typedef { import("./types").Pet } Pet
 */

/**
 * @type {Pet}
 */
var myPet;
myPet.name;
```
<!-- more -->
## @typedef
## @callback
## @param

@typedef 用于定义复杂的类型

@callback @param 和 @typedef 差不多

<!-- more -->
```javascript
/**
 * @typedef {Object} SpecialType - creates a new type named 'SpecialType'
 * @property {string} prop1 - a string property of SpecialType
 * @property {number} prop2 - a number property of SpecialType
 * @property {number=} prop3 - an optional number property of SpecialType
 * @prop {number} [prop4] - an optional number property of SpecialType
 * @prop {number} [prop5=42] - an optional number property of SpecialType with default
 */

/** @type {SpecialType} */
var specialTypeObject;
specialTypeObject.prop3;

/**
 * @param {Object} options - The shape is the same as SpecialType above
 * @param {string} options.prop1
 * @param {number} options.prop2
 * @param {number=} options.prop3
 * @param {number} [options.prop4]
 * @param {number} [options.prop5=42]
 */
function special(options) {
  return (options.prop4 || 1001) + options.prop5;
}

/**
 * @callback Predicate
 * @param {string} data
 * @param {number} [index]
 * @returns {boolean}
 */

/** @type {Predicate} */
const ok = (s) => !(s.length % 2);
```
<!-- more -->
## @template

相当于 TypeScript 中的泛型（TypeScript 中会提及）

```javascript
/**
 * @template T
 * @param {T} x - A generic parameter that flows through to the return type
 * @return {T}
 */
function id(x) {
  return x;
}

const a = id("string");
const b = id(123);
const c = id({});
```
<!-- more -->
## @this

使用 @this 明确指定上下文

```javascript
/**
 * @this {HTMLElement}
 * @param {*} e
 */
function callbackForLater(e) {
  this.clientHeight = parseInt(e); // should be fine!
}
```
[其他不太常用的具体参考](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
<!-- more -->
## IDE 配合
## JSDoc & jsconfig.json

VS Code 内置了 TypeScript 语言服务，所以它支持类型检测，TypeScript 语言服务支持 JSDoc，它能将 JSDoc 注释中的类型结构提供给 VS Code。有两种方法使用这个特性:

<!-- more -->
在单文件中，使用 @ts-check 注释 JS 文件获取类型检测

[Playground](https://www.typescriptlang.org/play?filetype=js#code/PTAEAEBcGcFoGMAWBTeBrAUCCyBOuB7XaALlACYBmc8rAKjokgE8AHZUAbwDsBXAWwBGeAL6g6wDADcAhrlAAPANwYMC0AF5QABiWhsAeQDSazaABmMgDbRke7ADkCkUMaA)

```javascript
// @ts-check

/** @type {number} */
var x;

x = 0; // OK
x = false; // Not OK
```
<!-- more -->
在项目中添加 JSConfig 配置，可以对多个 JS 文件提供类型检测，以及一些详细的配置
（下面会介绍一种与 webpack 配置使用的方法）
```json
{
  "compilerOptions": {
    "checkJs": true
  }
}

// 更多配置项暂不介绍：https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#using-tsconfigjson-or-jsconfigjson
```
<!-- more -->
经过以上配置，配合 JSDoc 我们可以在 VS Code 中不需要任何第三方工具便可以获得类似 TypeScript 项目类型检查、更好的代码提示，关键是你要写 JSDoc。
<!-- more -->
JSConfig 配置 webpack 路径别名，帮助你写路径别名时获取自动路径提示及导入

(code/exercise__alias)
```json
{
  "include": [
    "./src",
    "./lib"
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "strict": true,
    "moduleResolution": "node",
    "paths": {
      "@/*": ["./src/*"],
      "components/*": ["./src/components/*"],
      "views/*": ["./src/views/*"],
      "javascript/*": ["./src/javascript/*"],
      "assets/*": ["./src/assets/*"],
      "lib/*": ["./lib/*"]
    }
  }
}
```
<!-- more -->
在项目中书写接口的良好体验

（code/exercise__request）
<!-- more -->
使用 JSDoc 工具自动生成 API 接口文档

[开始使用 JSDoc 3](https://jsdoc.zcopy.site/about-getting-started.html)
<!-- next -->

# TypeScript
## 使用
<!-- more -->
TypeScript 是 JavaScript 的超集，

可以理解为一个添加了类型注解的 JavaScript

相比于 JavaScript，TypeScript 存在这些优势：
<!-- more -->
## TypeScript 更可靠
- TypeScript 的静态类型检查帮助我们在开发阶段发现低级错误
- 强类型约束和静态检查提升代码维护性，重构更安全、放心
- 多模块协作、接口及函数调用更安全
<!-- more -->
## 面向接口编程
TypeScript 类型注解本质就是在进行接口设计，可能会帮助我们养成一个好习惯：编写具体逻辑前，我们需要设计好数据结构，类型注解，按照接口约定完成业务逻辑
<!-- more -->
## TypeScript 逐渐成为主流
越来越多的主流框架 Vue、React 等使用 TypeScript 编写源代码或者为 TypeScript 提供了良好的支持，越来越多的团队和个人尝试使用 TypeScript 开发项目。VS Code、WebStorm 等流行 IDE 都对 TypeScript 有着良好的支持。
<!-- more -->
TypeScript 还有很多优点，可以在众多文档中学习：

[掘金](https://juejin.cn/post/6844903497205448711)

[TypeScript安利指南](https://juejin.cn/post/6844903958545170446)

[抛弃 JS，使用 TypeScript](https://juejin.cn/post/6844903877859360776)
<!-- next -->
## TypeScript
## 语法
TypeScript 主要通过类型后置语法来标注类型
<!-- more -->
```typescript
let name: string = 'hello world'

function sum(a: number, b: number): void {
  return a + b
}
```
<!-- more -->
我们可以把 : 后面的 string 换成其他类型

JavaScript 原始类型都有着对应的 TypeScript 类型：

string、number、boolean、undefined、symbol、undefined、null

[Playground](https://www.typescriptlang.org/play?#code/DYUwLgBAzmBOBc04EsB2BzCBeCByAFiMMAPa4CwAUFaJKgK4C2iDjARiLNhAIwBMAZio1wEAGbAAhukRsSJUJNTc49EMMq0IqEonqoAJiDFoQB7gDcSycwAYNWqAE9m0F3ODcAyu4UAKAEoHUQZgFnpiblDgIA)

<!-- more -->
## 类型

- 基础类型
- Arrays
- Enum
- Any
- Unknown
<!-- more -->
- Tuple
- Void
- Null
- Undefined
- Never
- Literal
- Union
- Intersection
<!-- more -->
## Arrays 类型
```typescript
let arr1: number[] = [1, 2, 3]

let arr2: Array<number> = [1, 2, 3]
```
<!-- more -->
## Enum 类型
```typescript
enum PopoverDirection {
  TOP, RIGHT, BOTTOM, LEFT
}
```
[Playground](https://www.typescriptlang.org/play#code/KYOwrgtgBACg9gBzgN2AJwCIEs3AMYAuWcIUA3gFBRQAqA8jADRQBKAkgOIASNzAQnRr0AsswAyAUQBiNCgF8gA)
<!-- more -->
## Any 类型
```typescript
let value: any = 1

value = '123'

value()
```
any 类型是 TypeScript 中的顶级类型

使用 any 类型会丢失类型检查

在项目中我们可以配置 noImplicitAny 使任何隐式 any 类型报错
<!-- more -->
## UnKnown 类型
unknown 类型和 any 类型类似

所有类型都可以赋值给 unknown 类型

不同的是使用 unknown 类型是类型安全的

我们可以对一些不确定的操作结果设置为 unknown 类型。

[Playground](https://www.typescriptlang.org/play/#code/PTAEAEFMCdoe2gZwFygEwFYDsBGAUAGYCuAdgMYAuAlnCaATgBQCGqzJAngJSgDeeoUMwB0AI0ZcA3KBCgA8gGk8AX0KlKNOgTQtUpANYk4AdxI9+gkeKkqgA)
<!-- more -->
## Tuple 类型
```typescript
let t: [string, number] = ['1', 2]
```
<!-- more -->
## Void
## Null
## Undefined
```typescript
function foo(): void {}

let u: undefined = undefined

u = void 0

let n: null = null

n = void 0
```
<!-- more -->
## Never
表示永不存在的值，比如抛出异常、不会有返回值的表达式或者分支中的默认分支

[Playground](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgGIHt3IN4ChnJgCeADhAFzIDkMmVuAvrrqJLIigEJxQ76GkK1AEY96TXMTLIAggBs5yALxpMyAD7JuUXAHpdA6fMUqMWTdo3IADMxgBXEAjDB0IZAAs4IACZyIAGpwcvYQABQAbsGUxgCUfAQAzgDuwGAIHsiRwQB0UhDxeAQECHCJKDR05PzFyPrIgJvxgDOJyFGKgNURgGymgCFegFxyqug1xcJQEHAA1kOl5SJi1bUE9W3IgBTqzYD0Zlo8QwQjY5O1PhDw9nJg8wtLwasbyCAQEdA7yAhuiWDIEAAeXvbvwI8AMIeCAIcaUe6PXgqNrPPYTfhMBhAA)
```typescript
function error(): never {
	throw new Error()
}

function loop(): never {
	while (true) {}
}
```

一些参考：

[尤雨溪](https://www.zhihu.com/question/354601204)
[官方文档](https://www.typescriptlang.org/docs/handbook/2/functions.html#never)
<!-- more -->
## Literal
```typescript
const str = '123'

let x: 1 = 1
```
<!-- more -->
定义一个字面类型作用不大

一般字面类型结合 Union 类型使用

表达一个更具体的概念

还可以使用 as const 将整个对象作为字面类型使用
```typescript
const req = { url: '', method: 'GET' } as const
```
[Playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBAshwAsD2ATAzlAvFA5AcQFEAVHKAH1wAUB5AZRICgGAzAVwDsBjYASyXagAnCAEdWENMAAUAW3jIUALljzUaADRRWggDbLJgnuwDmmlAENg5gPzKkAIwBWEbgEooAbwZQoAel9QRNQAItQMAL5MnPySQqJYnt5QcoioyvjEOOpJ2nq4WUkWVsoekZEM-smqSlAGRsYMwmIS0k0AdCkKmu253aJtReauQA)
<!-- more -->
## Union
TypeScript 可以使用运算符在现有类型上构建新的类型，比如联合类型。它由多个类型组成，表示可能是这些类型中的任何一个

[Playground1](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgCIHsDmyDeAoZZMATwAcIAuZAckF4NwNh3qDkE4AbNqgCgEpkBeAHzIAbumAATZjBABGbnyGjxUgL548oSLEQoAwnDC5mJclTqBePaaFWHBQOFjJ0kACZ7Sp2o0J0IAM5GcCDAALbsVBjYAD7IBkb8xoSmlDQM1AA0zLacyLwOuKpZhDLyeYrCOOqqQA) [Playground2](https://www.typescriptlang.org/play#code/PTAEAEFMCdoe2gZwFygEwGYAsBWAUAGYCuAdgMYAuAlnCaAA7RUkUCSAJgBRXuolEBbAEYxQAH1CIKTEgHMAlKADeeUKDK1EcADaQAdNrizOAIgCacItFCsAIqCopQJ0AGoH7eQG48AXzwgoADyANJ4jMxsXACMAAzR3gFgoeEyUaZosWgmiYEAorAIqZEcnEqgAgCedqhomFhooL7eQA) [Playground3](https://www.typescriptlang.org/play?#code/C4TwDgpgBAshwAsD2ATAzlAvFA5AcQFEAVHKAH1wAUB5AZRICgGAzAVwDsBjYASyXagAnCAEdWENMAAUAW3jIUALljzUaADRRWggDbLJgnuwDmmlAENg5gPzKkAIwBWEbgEooAbwZQoAel9QRNQAItQMAL5MwmIS0vjEOJo4OK5AA)
```typescript
let a: number | string = 1

a = '1'
```
联合类型可以配合字面类型对赋值做一些限定
<!-- more -->
## Intersection 交叉类型
交叉类型类似于将多个类型叠加在一起
```typescript
interface Animal {
	type: string
	call: () => void
}

interface DogType {
	type: 'dog'
}

type Dog = Animal & DogType

const dog: Dog = {
	type: 'dog',
	call: () => {}
}
```
[Playground1](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgIImAWzgG2QbwFgAoASDAE8AHCALmQGcwpQBzE0hXHegCgEpkAXgB8yAG4B7YABMSAXxIlQkWIhQARSawAq1FETKUa9AOQztphUuLHN24WgzY8AMmRbd+mwkkgmyBas9J6OhsjIdmZBpgA0JBFcODzIAsJi+IrE8kA)
[Playground2](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgKJSgeygCTiAEwBtQBzZAbwChlkBnAVwSTroC5kAjTTIifANw1k0LFAD8HCsgC2EVnFIQOdMFDLIAvkM1UqoSLEQoAglDAB3bAGs6AEThg4lYXHNWotqcjDAwfFTUNTQBtAF0dPQNoeCRkM19Ve0dnalo3RLB2SmQQODlA9RByUIiqXSoAekrkABUAC3kUaKMWZDcUBEwZAAdMOggCH0xkergANwgqmq6QOmBVCHARDGxR-GIyABp2wh9G4ChkTAsQZAIUgDo9MABPHtN3GzoAJXk+uZQAXninz2SnMgAGRoVa4DYkYpCO4PX6ZV7vTCfZA-BILLIOQEg9BiPCESGkIRUWaqdb4iBopJvOgfAYo5AACigiM+HEpWWptIgAEoUQA+Fy0YAwRnMmlIgaXUTYXlpWjIEm8CBSsFMlmS6VQS5yBRKblCeXIZlgBhQEAGrR6WiKviXIiYUhq8WfS4ZdF0fXlARAA)
<!-- more -->
## Object 类型
TypeScript 中的 Object 类型和 JavaScript 中的对象类似，只不过 Object types 只有类型
```typescript
let person = {
	name: 'foo',
	age: 12
}

let p: { name: string, age: number } = {
	name: 'foo',
	age: 12
}
```

[类型详细参考文档](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
<!-- next -->
# Functions
<!-- more -->
TypeScript 支持设置函数参数和返回类型
```typescript
function sum(a: string, b: string): number {
	return +(a + b)
}
```
<!-- more -->
和变量类型一样，通常不需要注释返回类型

存在上下文时，TypeScript 可以自己推导出参数类型

[Playground](https://www.typescriptlang.org/play?#code/DYUwLgBAdgrgtgZwgXggbQIwBoICYcDMAugFAmyIB0AZgPYBOAogIYDGAFgBQCWYIcKAHwQA3gF8AlEA)
```typescript
let nums = [1, 2, 3]

nums.forEach(item => {})

// 这里的 item 会自动推导为 number 类型
```
<!-- more -->
## 定义一个函数类型

[Playground](https://www.typescriptlang.org/play?#code/DYUwLgBAzgrgtgLggCgIZIHbwEYgE4A0E2mO+AlBALwB8EWcueAUM7HNRAGYwYDGYAJYB7DGiLZKAb2YQIecDDwYIqCAGpizAL6se-IaOjwATGiRQweQRgDmEi1Zu3ps+YuWqNW3W3id2EwgAemCIAFE8PGE8IA)

```typescript
let sum: (a: number, b: number) => number

sum = function(a, b) {
  return a + b
}

function sum2(a: string, b: string) {
  return a + b
}

sum = sum2 // Error
```
<!-- more -->
## 函数重载

[Playground](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAZxAWwBQEMBcizoBGApgE4A0iheBaJpAlDUWQFCiSwIrrbN1lK1fCwqIIAfn70mIgaXbho8JKky459IdMHipm3QBN9hOHAA2xLGFm16iAD4oopGGADmjxADc4MQ4gA3qyIiDDAiNik7ujEYFDIAHSWHlAAFogAvNmIAEwMQSGhiKTEUCCkSFiIANRURQC+iMTmyMRhEVExaHEJyXHu6Vk5AMwFwcUlZRVVtVRzEI3Nre3hkVjRsfFJKYMZ2ZmIACzjRaGl5ZWIARKI1XWEC4h4AAYAJIH383UQDS9LLTahUmFxmPj8AQADI1WA1WKxLFBxHBwFAAIxZHiYNGUfIIsrI1G5TFqDA4vKUMb4pEQFHxEYk3jk3KUyguEDEAoAei5iAAoqRSHBSEA)
```typescript
function sum(a: number, b: number): number
function sum(a: number, b: number, c?: number): number
function sum(a: number, b: number, c?: number, d?: boolean): number | string | void {
  if (arguments.length === 2) {
    return a + b
  } else if (arguments.length === 3) {
    return a + b + c
  } else if (arguments.length === 4) {
    return d ? a + b + c : `${a + b + c}`
  } else {
    return void 0
  }
}

let count1 = sum(1, 2)
let count2 = sum(1, 2, 3)
let count3 = sum(1, 2, 3, true) // Error
```
<!-- more -->
## 泛型函数

如何让我们的函数更具灵活性，

根据我们的输入类型，返回对应的类型

在 TypeScript 中使用 泛型 表示两个类型之间的关系

这里简单说一下泛型在函数中使用

泛型作用可以回想一下之前的 api 模块代码
```typescript
function print<T>(target: T): T {
	return target
}
```
<!-- next -->
## Optional Properties
可以使用 ? 设置对象属性为可选属性

或者

设置函数参数为可选参数
```typescript
function printName(obj: { first: string; last?: string }) {}

let person: { name: string; age?: 12 } = {
	name: 'foo'
}
```
使用 ?. 操作符获取可选属性值

[Playground](https://www.typescriptlang.org/play?#code/PTAEAEFMCdoe2gZwFygEwFYDMaBQAzAVwDsBjAFwEs5jQAHaS48gOQEMBbSACjgCMAVqgDeofJSTlUico2IBzANygANmxkB+abKbzQAXwCUoYblCgQoAKKwEoALSgOleQAtyoUtHWvQlfKAA5PwCAHRqMoGgAO7qxIEeDHAAbpQAJpBpAIRmnjSIcCqQ4XDyvILh6uSh5HAAqnR0MADC6jyGhoq5-qDlYREeWQC8Q6AkGeLEmcam5uaWAPIA0rnmpPmFxSqlfZUyNfWNLW3cHV3m+ri5lgCCoIhs+JCgbCrkMMRsVMnPhIi6TjgGWgtAAUmxkmwAMpeSh0DyIACezDYAA9kLl1sQCkUSmUQntyBoDg0mtBWoh2p1cPogA)
<!-- next -->
## 断言
```typescript
let value: any = [1, 2, 3]

(value as number[]).forEach(() => {})

let len: number = (<number[]>value).length
```
<!-- next -->
## Type Aliases
## 类型别名
可以使用 type 关键字命名一个类型
```typescript
type Point = {
	x: number
	y: number
}

let point1: Point = {
	x: 1,
	y: 2
}

type boolean = true | false
```
<!-- next -->
## Interfaces
可以使用 Interfaces 命名一个对象类型
```typescript
interface Point {
	x: number
	y: number
}
```
<!-- next -->
# more...