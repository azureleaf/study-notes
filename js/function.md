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

## 可変長引数というか Rest parameters

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
