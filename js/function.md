# Functions

## ToC

- [Functions](#functions)
  - [ToC](#toc)
  - [Class Method <a id="method" name="method"></a>](#class-method)
  - [Callback <a name="callback" id="callback"></a>](#callback)
  - [Arrow Function <a id="arrow" name="arrow"></a>](#arrow-function)
  - [Default Parameter <a name="default" id="default"></a>](#default-parameter)
  - [Parameter as an Object Literal](#parameter-as-an-object-literal)
  - [Spread Operator vs Rest Parameters <a name="spread" id="spread"></a>](#spread-operator-vs-rest-parameters)
  - [Destructuring Assignment <a name="" id=""></a>](#destructuring-assignment)
  - [Higher-order Function <a id="higher" name="higher"></a>](#higher-order-function)

## Class Method <a id="method" name="method"></a>

```js
John = {
  origin: "UK",
  greet: function () {
    console.log("I'm from", this.origin);
  },
};
John.greet();
```

## Callback <a name="callback" id="callback"></a>

```js
var sayHello = () => {
  return "hello";
};

var sayHelloWorld = (callback) => {
  console.log(callback(), ", world!");
};

sayHelloWorld(sayHello);
```

## Arrow Function <a id="arrow" name="arrow"></a>

- Advantages
  - Shorter code; no need to write keywords "function"
  - Intuitive data flow; arguments value are thrown into the function

```js
function greet1(name) {
     console.log("Hello, I'm", name)
     };
greet1("Mike");


var greet2 = function(name) { console.log("Hello, I'm", name)};
greet2("Mike");

// 引数が一つしか無い時は引数のカッコは省略可
// 関数の定義が一行なら、関数の波括弧は省略可
var greet3 = name => console.log("Hello, I'm", name);
greet3("Mike");

// 引数が無い時はカッコは省略不可
var sayHello = () => console.log("hello");

// 引数が２つなら省略不可
var greet4 = (name, origin) => {
    console.log("Hello, I'm", name, "I'm from" country)
};
greet4("Mike", "UK");
```

- 関数定義がreturnの一行しか無い場合は`{}`とreturnを省略可
- ただし、オブジェクトを返す場合は`()`で囲む

```js
// return number
var getDouble = (num) => num * 2;
var double = getDouble(10);
console.log(double);

// return object
var getObj = () => ({capital: "Tokyo"}); // Parenthesis required
console.log(getObj());

// object as an arg
class Person {
  constructor(name, country) {
    this.name = name;
    this.country = country;
  }
}
var John = new Person("John", "UK");
var getProfile = (person) => person.name + " is from " + person.country;
var profile = getProfile(John);
console.log(profile);
```

## Default Parameter <a name="default" id="default"></a>

```js
function greet(name, country = "UK") {
  console.log("I'm", name, "I'm from", country);
}

greet("John", "Australia"); // John, Australia
greet("John"); // John, UK
```

## Parameter as an Object Literal

- 引数の順序を、関数定義の時と関数呼び出しの時とで自由に変えられるのが利点
- なんの値を引数に渡しているのか明確化できる

```js
// 引数をobject literalっぽく書く
var greet = ({ country, age, name }) => {
  console.log("I'm", name, "from", country, "I'm", age, "years old!");
};

greet({ name: "John", country: "USA", age: 20 });
```

## Spread Operator vs Rest Parameters <a name="spread" id="spread"></a>

- 見た目は同じ（...を使う）だが何が違う？
- 可変長引数

```js
// Spread Operatorを使って配列を展開する
function sum(...nums) {
  let sum = 0;
  nums.forEach((num) => {
    sum += num;
  });
  return sum;
}

sum([1, 2, 3]); // 6
```

## Destructuring Assignment <a name="" id=""></a>

- 分割代入

```js
// Destructuring Assignment of Arrays

// 左辺が２つしかないので、右辺の３つめ以降は捕捉されない
let [a, b] = [10, 20, 30];
console.log(a); // 10
console.log(b); // 20
// 興味がない値を無視する
let [s, , t] = [10, 20, 30];
console.log(s); // 10
console.log(t); // 30
// 既定値の設定
let [x, y, z = 99] = [10, 20];
console.log(x); // 10
console.log(y); // 20
console.log(z); // 99
```

- Spread 構文（...で配列やオブジェクトリテラルを展開するやつ）と分割代入を組み合わせる

```js
let a, b, rest;

[a, b, ...rest] = [10, 20, 30, 40, 50];

console.log(rest); // [30,40,50]
```

- Destructuring Assignment of Objects

```js
// 変数の宣言時に分割代入する場合
var obj1 = { a: 10, b: 20 };
var { a, b } = myobj1;

console.log(a); // 10
console.log(b); // 20

// 変数の初期化時以外で分割代入する場合
// 外側にカッコをつけないとエラーになる
var obj2 = { name: "John", nationality: "UK", city: "London", age: 20 };
({ city, name } = obj2); // objectの場合は、keyを使って取り出すので順序は無関係

console.log(name);
console.log(city);

// 異なる名前として代入する
var o = { p: 10, q: 20 };
var { p: foo = 99, q: bar = 99, r: blah = 99 } = o; // 代入元に存在しないkeyについて既定値を設定

console.log(foo); // 10
console.log(bar); // 20
console.log(blah); // 99
```

## Higher-order Function <a id="higher" name="higher"></a>

- What's High-order function(高階関数)?
  - Functions which take another function as an argument
  - Functions which return another function as a return value
- Advantage:
  - More
- There're many built-in high-order functions:

```js
data.forEach(function (value, index, array) {
  console.log(value * value); //25 , 36, 49, 64
});

mypromise.then(function (value) {
  console.log(value);
});
```

- Sample of higher-order function
  - This sample doesn't show why higher-order f is useful, tho...

```js
function higherOrder(f, ...args) {
  f(...args);
}

function add(...args) {
  console.log(
    "sum:",
    args.reduce((acc, cur) => acc + cur)
  );
}

function multiply(...args) {
  console.log(
    "product:",
    args.reduce((acc, cur) => acc * cur)
  );
}

higherOrder(add, 1, 2, 3, 4, 5); // 15
higherOrder(multiply, 1, 2, 3, 4, 5); // 120
```
