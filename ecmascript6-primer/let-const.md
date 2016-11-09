# let和const命令
## 目录
-[let命令](#let命令)
  - [基本用法](#基本用法)
  - [不存在变量提升](#不存在变量提升)
  - [暂时性死区](#暂时性死区)
  - [不允许重复声明](#不允许重复声明)
- [块级作用域](#块级作用域)
  - [为什么需要块级作用域？](#为什么需要块级作用域)
  - [ES6的块级作用域](#es6的块级作用域)
- [const命令](#const命令)
- [全局对象的属性](#全局对象的属性)

## let命令
### 基本用法
ES6新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。

```js
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1
```

上面代码在代码块之中，分别用let和var声明了两个变量。然后在代码块之外调用这两个变量，结果let声明的变量报错，var声明的变量返回了正确的值。这表明，let声明的变量只在它所在的代码块有效。

for循环的计数器，就很合适使用let命令。

```js
for (let i = 0; i < arr.length; i++) {}

console.log(i);
//ReferenceError: i is not defined
```

上面代码的计数器i，只在for循环体内有效。

下面的代码如果使用var，最后输出的是10。

```js
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
```

上面代码中，变量i是var声明的，在全局范围内都有效。所以每一次循环，新的i值都会覆盖旧值，导致最后输出的是最后一轮的i的值。

如果使用let，声明的变量仅在块级作用域内有效，最后输出的是6。

```js
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```

上面代码中，变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6。

### 不存在变量提升
let不像var那样会发生“变量提升”现象。所以，变量一定要在声明后使用，否则报错。

```js
console.log(foo); // 输出undefined
console.log(bar); // 报错ReferenceError

var foo = 2;
let bar = 2;
```

上面代码中，变量foo用var命令声明，会发生变量提升，即脚本开始运行时，变量foo已经存在了，但是没有值，所以会输出undefined。变量bar用let命令声明，不会发生变量提升。这表示在声明它之前，变量bar是不存在的，这时如果用到它，就会抛出一个错误。

### 暂时性死区
只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

```js
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

上面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。

ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称TDZ）。

```js
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```

上面代码中，在let命令声明变量tmp之前，都属于变量tmp的“死区”。

“暂时性死区”也意味着typeof不再是一个百分之百安全的操作。

```js
typeof x; // ReferenceError
let x;
```

上面代码中，变量x使用let命令声明，所以在声明之前，都属于x的“死区”，只要用到该变量就会报错。因此，typeof运行时就会抛出一个ReferenceError。

作为比较，如果一个变量根本没有被声明，使用typeof反而不会报错。

```js
typeof undeclared_variable // "undefined"
```

上面代码中，undeclared_variable是一个不存在的变量名，结果返回“undefined”。所以，在没有let之前，typeof运算符是百分之百安全的，永远不会报错。现在这一点不成立了。这样的设计是为了让大家养成良好的编程习惯，变量一定要在声明之后使用，否则就报错。

有些“死区”比较隐蔽，不太容易发现。

```js
function bar(x = y, y = 2) {
  return [x, y];
}

bar(); // 报错
```

上面代码中，调用bar函数之所以报错（某些实现可能不报错），是因为参数x默认值等于另一个参数y，而此时y还没有声明，属于”死区“。如果y的默认值是x，就不会报错，因为此时x已经声明了。

```js
function bar(x = 2, y = x) {
  return [x, y];
}
bar(); // [2, 2]
```

ES6规定暂时性死区和不存在变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。这样的错误在ES5是很常见的，现在有了这种规定，避免此类错误就很容易了。

总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

### 不允许重复声明
let不允许在相同作用域内，重复声明同一个变量。

```js
// 报错
function () {
  let a = 10;
  var a = 1;
}

// 报错
function () {
  let a = 10;
  let a = 1;
}
```

因此，不能在函数内部重新声明参数。

```js
function func(arg) {
  let arg; // 报错
}

function func(arg) {
  {
    let arg; // 不报错
  }
}
```

## 块级作用域
### 为什么需要块级作用域？
ES5只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。

第一种场景，内层变量可能会覆盖外层变量。

```js
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = "hello world";
  }
}

f(); // undefined
```

上面代码中，函数f执行后，输出结果为undefined，原因在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量。

第二种场景，用来计数的循环变量泄露为全局变量。

```js
var s = 'hello';

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5
```

上面代码中，变量i只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。

### ES6的块级作用域
let实际上为JavaScript新增了块级作用域。

```js
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
```

上面的函数有两个代码块，都声明了变量n，运行后输出5。这表示外层代码块不受内层代码块的影响。如果使用var定义变量n，最后输出的值就是10。

ES6允许块级作用域的任意嵌套。

```js
{{{{{let insane = 'Hello World'}}}}};
```

上面代码使用了一个五层的块级作用域。外层作用域无法读取内层作用域的变量。

```js
{{{{
  {let insane = 'Hello World'}
  console.log(insane); // 报错
}}}};
```

内层作用域可以定义外层作用域的同名变量。

```js
{{{{
  let insane = 'Hello World';
  {let insane = 'Hello World'}
}}}};
```

块级作用域的出现，实际上使得获得广泛应用的立即执行匿名函数（IIFE）不再必要了。

```js
// IIFE写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}
```

另外，ES6也规定，函数本身的作用域，在其所在的块级作用域之内。

```js
function f() { console.log('I am outside!'); }
(function () {
  if(false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());
```

上面代码在ES5中运行，会得到“I am inside!”，但是在ES6中运行，会得到“I am outside!”。这是因为ES5存在函数提升，不管会不会进入 if代码块，函数声明都会提升到当前作用域的顶部，得到执行；而ES6支持块级作用域，不管会不会进入if代码块，其内部声明的函数皆不会影响到作用域的外部。

```js
{
  let a = 'secret';
  function f() {
    return a;
  }
}
f(); // 报错
```

上面代码中，块级作用域外部，无法调用块级作用域内部定义的函数。如果确实需要调用，就要像下面这样处理。

```js
let f;
{
  let a = 'secret';
  f = function () {
    return a;
  };
}
f(); // "secret"
```

ES5的严格模式规定，函数只能在顶层作用域和函数内声明，其他情况（比如if代码块、循环代码块）的声明都会报错。

```js
// ES5
'use strict';
if (true) {
  function f() {} // 报错
}
```

ES6由于引入了块级作用域，这种情况可以理解成函数在块级作用域内声明，因此不报错，但是构成区块的大括号不能少，否则还是会报错。

```js
// 不报错
'use strict';
if (true) {
  function f() {}
}

// 报错
'use strict';
if (true)
  function f() {}
```

另外，这样声明的函数，在区块外是不可用的。

```js
'use strict';
if (true) {
  function f() {}
}
f(); // ReferenceError: f is not defined
```

上面代码中，函数f是在块级作用域内部声明的，外部是不可用的。

## const命令
const 声明一个只读的常量。一旦声明，常量的值就不能改变。

```js
'use strict';
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: "PI" is read-only
```

上面代码表明改变常量的值会报错。注意，如果是常规模式，对常量赋值不会报错，但也是无效的。

```js
const PI = 3.1415;
PI = 3; // 常规模式时，重新赋值无效，但不报错
PI // 3.1415
```

const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。

```js
'use strict';
const foo;
// SyntaxError: missing = in const declaration
```

上面代码表示，对于const来说，只声明不赋值，就会报错。同样的，这行命令在常规模式下不报错，但foo以后也没法重新赋值了。

```js
const foo;
foo = 1; // 常规模式，重新赋值无效
foo // undefined
```

const的作用域与let命令相同：只在声明所在的块级作用域内有效。

```js
if (true) {
  const MAX = 5;
}

MAX // Uncaught ReferenceError: MAX is not defined
```

const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

```js
if (true) {
  console.log(MAX); // ReferenceError
  const MAX = 5;
}
```

上面代码在常量MAX声明之前就调用，结果报错。

const声明的常量，也与let一样不可重复声明。

```js
var message = "Hello!";
let age = 25;

// 以下两行都会报错
const message = "Goodbye!";
const age = 30;
```

对于复合类型的变量，变量名不指向数据，而是指向数据所在的地址。const命令只是保证变量名指向的地址不变，并不保证该地址的数据不变，所以将一个对象声明为常量必须非常小心。

```js
const foo = {};
foo.prop = 123;

foo.prop
// 123

foo = {}; // TypeError: "foo" is read-only
```

上面代码中，常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。

下面是另一个例子。

```js
const a = [];
a.push("Hello"); // 可执行
a.length = 0;    // 可执行
a = ["Dave"];    // 报错
```

上面代码中，常量a是一个数组，这个数组本身是可写的，但是如果将另一个数组赋值给a，就会报错。

如果真的想将对象冻结，应该使用Object.freeze方法。

```js
const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
```

上面代码中，常量foo指向一个冻结的对象，所以添加新属性不起作用，严格模式时还会报错。

除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。

```js
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, value) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```

ES5只有两种声明变量的方法：var命令和function命令。ES6除了添加let和const命令，后面章节还会提到，另外两种声明变量的方法：import命令和class命令。所以，ES6一共有6种声明变量的方法。

## 全局对象的属性
全局对象是最顶层的对象，在浏览器环境指的是window对象，在Node.js指的是global对象。ES5之中，全局对象的属性与全局变量是等价的。

```js
window.a = 1;
a // 1

a = 2;
window.a // 2
```

上面代码中，全局对象的属性赋值与全局变量的赋值，是同一件事。（对于Node来说，这一条只对REPL环境适用，模块环境之中，全局变量必须显式声明成global对象的属性。）

未声明的全局变量，自动成为全局对象window的属性，这被认为是JavaScript语言最大的设计败笔之一。这样的设计带来了两个很大的问题，首先是没法在编译时就报出变量未声明的错误，只有运行时才能知道，其次程序员很容易不知不觉地就创建了全局变量（比如打字出错）。另一方面，从语义上讲，语言的顶层对象是一个有实体含义的对象，也是不合适的。

ES6为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是全局对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于全局对象的属性。也就是说，从ES6开始，全局变量将逐步与全局对象的属性脱钩。

```js
var a = 1;
// 如果在Node的REPL环境，可以写成global.a
// 或者采用通用方法，写成this.a
window.a // 1

let b = 1;
window.b // undefined
```

上面代码中，全局变量a由var命令声明，所以它是全局对象的属性；全局变量b由let命令声明，所以它不是全局对象的属性，返回undefined。
