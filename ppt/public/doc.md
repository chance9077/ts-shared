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

JSDoc 提供了很多标签，使用以上列出的标签就可以满足我们的需求
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
## TypeScript 类型
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
<!-- next -->
