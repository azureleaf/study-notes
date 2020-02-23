# JavaScript における this

- JavaScript における this が何を指すのか？はわかりにくいことで有名

## thisがオブジェクトになる場合

ほぼ説明不要だと思うが

- Class

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

## thisがGlobal Variableになる場合

```js
function show() {
  console.log(this); // thisはglobal object（このfunction自体を含んでいるスコープ）を指す
  this.value1 = 999; //　global objectにvalueを設定する、つまりglobal変数になっている
  value2 = 111;
}
show(); 

console.log(value1) // 999。value1はグローバル変数なので
console.log(value2) // undefined。value2はshow()内部をスコープとするローカル変数なので
```

## `= this`

```js
function Note() {
  var self = this;
```

##

```js
// thisの中身を表示する
function test() {
  console.log(this); // Google Chrome Consoleだと Windowオブジェクトになる
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

## thisを使ってMethod Chainをつくる

- `A.B`という表現

```js
var textObj = {
    capitalize: str => {
        str = str.toUpperCase();
        return this;
    },
    deleteFirst: str => {
        str = str.substr(1);
        return this;
    },
   
}

```


## apply(), call()によってthisの中身を自由に設定する

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