# JavaScript における this

- JavaScript における this が何を指すのか？は初学者の壁

## this がオブジェクトになる場合

ほぼ説明不要だと思うが

- Class だと

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

- Object Literal だと

```js
var person = {
  name: "John",
  greet: () => {
    console.log("Hello, I'm", this.name);
  }
};
```

## this が Global Variable になる場合

- これは基本的にやってはいけないことに該当する（いわゆるグローバル汚染）

```js
function show() {
  console.log(this); // thisはglobal object（このfunction自体を含んでいるスコープ）を指す
  this.value1 = 999; //　global objectにvalueを設定する、つまりglobal変数になっている
  value2 = 111;
}
show();

console.log(value1); // 999。value1はグローバル変数なので（グローバル汚染）
console.log(value2); // undefined。value2はshow()内部をスコープとするローカル変数なので
```

## `= this`

```js
function Note() {
  var self = this; // global object
```

##

```js
// thisの中身を表示する
function test() {
  console.log(this); // Google Chrome Console上だと Global ObjectはWindow Object
}

var obj = { name: "obj", test: test };
obj.test();
```

## コンストラクタ

```js
function MyObject(num) {
  this.value = num;
  this.increment = function() {
    this.value++;
  };
}

// 関数をnewするのは初めて見たが...
var obj1 = new MyObject(0);
console.log(obj1.value); // 0

obj1.increment();
console.log(obj1.value); // 1

var obj2 = MyObject(999);
console.log(obj2.value); // undefined. なぜなら、this.valueのthisはグローバルオブジェクトなので、this.valueはobj2のメンバではなくグローバル変数となる
console.log(value); // 999
```

## this を使って Method Chain をつくる

- JSのbuit-in関数でも`.toUpperCase`や`reverse()`などをたくさんつけて順に処理できる
- これをmethod chainなしで実装しようとすると、callback地獄となる
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

## apply(), call()によって this の中身を自由に設定する

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
