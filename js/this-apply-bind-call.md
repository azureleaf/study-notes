# this, apply, bind, call

- What does `this` refer to? This question often confuses JS beginners
- With `call()`, `apply()`. `bind()`, you can modify its reference by yourself

## ToC

- [this, apply, bind, call](#this-apply-bind-call)
  - [ToC](#toc)
  - [Content of `this`](#content-of-this)
    - [A. `this` inside the object method](#a-this-inside-the-object-method)
    - [B. `this` inside the function](#b-this-inside-the-function)
    - [C. `this` in the Constructor](#c-this-in-the-constructor)
  - [Cases `this` refers to the object](#cases-this-refers-to-the-object)
  - [Cases where `this` is Global Variable](#cases-where-this-is-global-variable)
  - [Create Method Chain with `this`](#create-method-chain-with-this)
  - [apply(), bind(), call()](#apply-bind-call)
    - [Summary](#summary)
    - [`call()` & `apply()`](#call--apply)
    - [`bind()`](#bind)

## Content of `this`

- Reference: [Qiita: JavaScript の「this」は「4 種類」？？](https://qiita.com/takeharu/items/9935ce476a17d6258e27)

### A. `this` inside the object method

```js
var myObject = {
  value: 10,
  show: function() {
    console.log(this.value);
  }
};
myObject.show(); // 10
```

### B. `this` inside the function

```js
function show() {
  console.log(this); // Global object
  this.value = 1; // Pollute global namespace
}
show();
```

```js
var myObject = {
  value: 1,
  show: function() {
    console.log(this.value); // 注１

    function show() {
      console.log(this.value); // 注２
    }
    show();
  }
};
myObject.show();
```

```js
var myObject = {
  value: 1,
  show: function() {
    var self = this;
    console.log(self.value); // 1

    function show() {
      console.log(self.value); // 1
    }
    show();
  }
};
myObject.show();
```

### C. `this` in the Constructor

```js
function MyObject(value) {
  this.value = value;
  this.increment = function() {
    this.value++;
  };
}
var myObject = new MyObject(0);
console.log(myObject.value); // 0

myObject.increment();
console.log(myObject.value); // 1
```

## Cases `this` refers to the object

- Object (w/ class keyword)

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log("Hello, I'm", this.name);
  }
}
```

- Object Literal

```js
var person = {
  name: "John",
  greet: () => {
    console.log("Hello, I'm", this.name);
  }
};
```

- Object (w/ function keyword)

```js
// Constructor
function Person(name){
  this.name = name;
  this.greet = function(){
    console.log("Hello, I'm", this.name);
  }
}

// Check if what "this" refers to
Person.prototype.getThis(){
  return this;
};

var person = new Person('John');
person.greet();
console.log(person === person.getThis()); // true

```

## Cases where `this` is Global Variable

- Anti-pattern (global namespace pollution)!

```js
function show() {
  console.log(this); // thisはglobal object（このfunction自体を含んでいるスコープ）を指す
  this.value1 = 999; //　global objectにvalueを設定する、つまりglobal変数になっている
  value2 = 111;
}

// When this is "new"ed, its scope will be the object, tho
show();

console.log(value1); // 999。value1はグローバル変数なので（グローバル汚染）
console.log(value2); // undefined。value2はshow()内部をスコープとするローカル変数なので
```

- Inside the browser, global object will be Window Object

```js
function test() {
  console.log(this); // Window Object @ Google Chrome
}

var obj = { name: "obj", test: test };
obj.test();
```

- `= this` is frequent expression

```js
function Note() {
  var self = this; // global object
```

```js
function MyObject(num) {
  this.value = num;
  this.increment = function() {
    this.value++;
  };
}

var obj1 = new MyObject(0);
console.log(obj1.value); // 0

obj1.increment();
console.log(obj1.value); // 1

var obj2 = MyObject(999);
console.log(obj2.value); // undefined. なぜなら、this.valueのthisはグローバルオブジェクトなので、this.valueはobj2のメンバではなくグローバル変数となる
console.log(value); // 999
```

## Create Method Chain with `this`

- JS の buit-in 関数でも`.toUpperCase`や`.reverse()`などをたくさんつけて順に処理できる
- これを method chain なしで実装しようとすると、callback 地獄となる
- 同様の機能は自分でも作成できる
- `return this`でオブジェクト自身を返すことがポイント

```js
class StringModifier {
  constructor(str) {
    this.str = str;
  }
  capitalize() {
    this.str = this.str.toUpperCase();
    return this;
  }
  append(newStr) {
    this.str += newStr;
    return this;
  }
  deleteChar() {
    this.str = this.str.substr(0, this.str.length - 1);
    return this;
  }
}

var mod = new StringModifier("Hello");
mod
  .capitalize()
  .append(", ")
  .append("World!!")
  .deleteChar()
  .deleteChar(); // HELLO, world
```

## apply(), bind(), call()

### Summary

- いずれもオブジェクトの参照先を変更するためのメソッド
- もっぱら`this`の参照先を変更するのに使われる
- 要するに「本来の自分は持っていない他人のメソッドを、自分が持っているプロパティなどについて使えるようにする」機能
  - つまり自分と他人に名前が共通するプロパティが無い場合にはこれらを使う意義はない？
- 一時的に呼び出すだけなら、`call()`や`apply()`
- それを恒久的に何度も呼び出して使うなら`bind()`
- Reference:
  - https://qiita.com/39_isao/items/c00a200b158ba057363f
  - https://qiita.com/hosomichi/items/e11ad0c4ea79db2dee84
  - https://www.codementor.io/@niladrisekhardutta/how-to-call-apply-and-bind-in-javascript-8i1jca6jp ありがとう謎のインド人

```js
他人.他人のメソッド.call(自分, 他人のメソッドの引数);
他人.他人のメソッド.apply(自分, 他人のメソッドの引数の配列);

const 収納先 = 他人.他人のメソッド.bind(自分); // これにより、自分に新しいメソッドが追加されるわけではない
収納先(引数);
```

### `call()` & `apply()`

- ペンギンが他人である鷹のメソッドを利用する

```js
// ペンギンくん
var Penguin = {
  name: "ペンギン"
};

// 鷹
var Falcon = {
  name: "鷹",
  fly: function() {
    console.log(this.name + "が大空を飛びました");
  }
};

Falcon.fly(); // '鷹が大空を飛びました

// call
Falcon.fly.call(Penguin); // ペンギンが大空を飛びました

// bind は一旦変数にしまって使う
var flyPenguin = Falcon.fly.bind(Penguin);
flyPenguin(); // ペンギンが大空を飛びました
```

- くっつけるメソッドに引数が無い場合には、applyとcallは全く同じ書き方になる
- 引数がある場合には記述方法が変わる
  - rest parameterとbindを組み合わせれば`call()`は要らない子だったということか

```js

var Basket1 = {
  name: "Fruit basket #1",
  show: function(apple = 0, orange = 0) {
    console.log(this.name, "has", (apple + orange), "fruits");
  }
};
var Basket2 = {
  name: "Bruit basket #2",
};

Basket1.show(2, 3); // 5

Basket1.show.apply(Basket2, [10, 20]); // 30 引数は配列で指定
Basket1.show.call(Basket2, 10, 20); // 30 引数はそのまま指定
```

### `bind()`

- まず前提として、通常の関数は参照を作ることができる

```js
function logging(log) {
  console.log(log);
}
var loggingRef = logging;

// 別名として振る舞っている
loggingRef("bonjour!"); // bonjour
```

- しかし、同じことをオブジェクト内部のメソッドに対してもやろうとすると失敗する

```js
var car = {
  registrationNumber: "GA12345",

  // このメソッドの参照を作りたい
  displayDetails: function() {
    console.log(this.registrationNumber);
  }
};

// carオブジェクトのメソッドの参照を作ったつもり
var carDetail = car.displayDetails;

// これは失敗する
// なぜなら、displayDetailsは内部でthisと書いているが、
// 参照の関数のthisはglobal objectであり、carオブジェクトにはなっていないため
carDetail(); // undefined
```

- 以下のように`bind()`を使うと解決
- `bind()`により、`this`の示す内容が置換された新しい関数を作れる

```js
var car = {
  registrationNumber: "GA12345",
  displayDetails: function() {
    console.log(this.registrationNumber);
  }
};
// carオブジェクトのメソッドの参照を作る
var carDetail = car.displayDetails.bind(car);

carDetail(); // "GA12345"
```
