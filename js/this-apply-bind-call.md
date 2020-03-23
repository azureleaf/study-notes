# this, apply, bind, call

- What does `this` refer to? This is a bit confusing
- With `call()`, `apply()`. `bind()`, you can modify its reference by yourself

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

- いずれもオブジェクトの参照先を変更するためのメソッド
- もっぱら`this`の参照先を変更するのに使われる


```js
var myObject = {
  value: 1,
  show: function() {
    console.log(this.value);
  }
};
var yourObject = {
  value: 3
};

myObject.show(); // 1

myObject.show.apply(yourObject); // 3
myObject.show.call(yourObject); // 3
```

- 以下のような car オブジェクトが存在する

```js
var car = {
  registrationNumber: "GA12345",
  displayDetails: function() {
    console.log(this.registrationNumber);
  }
};
```

- そして、以下のような使い方をしたいとする

```js
// 通常の関数は、参照を作れる
function logging(log) {
  console.log(log);
}
var loggingRef = logging;
loggingRef("bonjour!");

var car = {
  registrationNumber: "GA12345",
  displayDetails: function() {
    console.log(this.registrationNumber);
  }
};

// carオブジェクトのメソッドの参照を作りたい
var carDetail = car.displayDetails;

// これは失敗する
// なぜなら、displayDetailsは内部でthisと書いているが、
// 参照の関数のthisはglobal objectであり、carオブジェクトにはなっていないため
carDetail(); // undefined
```

- 以下のように`bind()`を使うと解決

```js
var car = {
  registrationNumber: "GA12345",
  displayDetails: function() {
    console.log(this.registrationNumber);
  }
};
// carオブジェクトのメソッドの参照を作る
var carDetail = car.displayDetails.bind(car);

// これは失敗する
// なぜなら、displayDetailsは内部でthisと書いているが、
// 参照の関数のthisはglobal objectであり、carオブジェクトにはなっていないため
carDetail(); // "GA12345"
```


## Reference

- Qiita https://qiita.com/39_isao/items/c00a200b158ba057363f

## 他人のメソッ

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
