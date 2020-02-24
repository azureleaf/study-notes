# JS における関数

## Object Literal のメンバとしての関数

```js
John = {
  origin: "UK",
  greet: function() {
    console.log("I'm from", this.origin);
  }
};
John.greet();
```

## Arrow Function

- "function"と書かずに済む
- 矢印の方向により、見た目が直感的になる
- アロー関数を使うと、無名のコールバック関数を定義する時に記述が短くなる

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

## Default Parameter

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

## Spread Operator vs Rest Parameters

- 見た目は同じ（...を使う）だが何が違う？

- 可変長引数

```js
// Spread Operatorを使って配列を展開する
function sum(...nums) {
  let sum = 0;
  nums.forEach(num => {
    sum += num;
  });
  return sum;
}

sum([1, 2, 3]); // 6
```

## 配列の分割代入（Destructuring Assignment）

```js
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

## オブジェクトの分割代入

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

## Callback

```js
var sayHello = () => {
  return "hello";
};

var sayHelloWorld = callback => {
  console.log(callback(), ", world!");
};

sayHelloWorld(sayHello);
```
