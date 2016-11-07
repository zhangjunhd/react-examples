# Mixin
# 目录
- [含义](#含义)
- [Trait](#trait)

JavaScript语言的设计是单一继承，即子类只能继承一个父类，不允许继承多个父类。这种设计保证了对象继承的层次结构是树状的，而不是复杂的[网状结构][1]。

但是，这大大降低了编程的灵活性。因为实际开发中，有时不可避免，子类需要继承多个父类。举例来说，“猫”可以继承“哺乳类动物”，也可以继承“宠物”。

各种单一继承的编程语言，有不同的多重继承解决方案。比如，Java语言也是子类只能继承一个父类，但是还允许继承多个界面（interface），这样就间接实现了多重继承。Interface与父类一样，也是一个类，只不过它只定义接口（method signature），不定义实现，因此又被称为“抽象类”。凡是继承于Interface的方法，都必须自己定义实现，否则就会报错。这样就避免了多重继承的最大问题：多个父类的同名方法的碰撞（naming collision）。

JavaScript语言没有采用Interface的方案，而是通过代理（delegation）实现了从其他类引入方法。

```js
var Enumerable_first = function () {
  this.first = function () {
    return this[0];
  };
};

var list = ["foo", "bar", "baz"];
Enumerable_first.call(list); // explicit delegation
list.first() // "foo"
```

上面代码中，list是一个数组，本身并没有first方法。通过call方法，可以把Enumerable_first里面的方法，绑定到list，从而list就具有first方法。这就叫做“代理”（delegation），list对象代理了Enumerable_first的first方法。

## 含义
Mixin这个名字来自于冰淇淋，在基本口味的冰淇淋上面混入其他口味，这就叫做Mix-in。

它允许向一个类里面注入一些代码，使得一个类的功能能够“混入”另一个类。实质上是多重继承的一种解决方案，但是避免了多重继承的复杂性，而且有利于代码复用。

Mixin就是一个正常的类，不仅定义了接口，还定义了接口的实现。

子类通过在this对象上面绑定方法，达到多重继承的目的。

很多库提供了Mixin功能。下面以Lodash为例。

```js
function vowels(string) {
  return /[aeiou]/i.test(this.value);
}

var obj = { value: 'hello' };
_.mixin(obj, {vowels: vowels})
obj.vowels() // true
```

上面代码通过Lodash库的_.mixin方法，让obj对象继承了vowels方法。

Underscore的类似方法是_.extend。

```js
var Person = function (fName, lName) {
  this.firstName = fName;
  this.lastName = lName;
}

var sam = new Person('Sam', 'Lowry');

var NameMixin = {
  fullName: function () {
    return this.firstName + ' ' + this.lastName;
  },
  rename: function(first, last) {
    this.firstName = first;
    this.lastName = last;
    return this;
  }
};
_.extend(Person.prototype, NameMixin);
sam.rename('Samwise', 'Gamgee');
sam.fullName() // "Samwise Gamgee"
```

上面代码通过_.extend方法，在sam对象上面（准确说是它的原型对象Person.prototype上面），混入了NameMixin类。

extend方法的实现非常简单。

```js
function extend(destination, source) {
  for (var k in source) {
    if (source.hasOwnProperty(k)) {
      destination[k] = source[k];
    }
  }
  return destination;
}
```

上面代码将source对象的所有方法，添加到destination对象。

## Trait
Trait是另外一种多重继承的解决方案。它与Mixin很相似，但是有一些细微的差别。

- Mixin可以包含状态（state），Trait不包含，即Trait里面的方法都是互不相干，可以线性包含的。比如，Trait1包含方法A和B，Trait2继承了Trait1，同时还包含一个自己的方法C，实际上就等同于直接包含方法A、B、C。
- 对于同名方法的碰撞，Mixin包含了解决规则，Trait则是报错。

[1]: https://en.wikipedia.org/wiki/Multiple_inheritance#The_diamond_problem
