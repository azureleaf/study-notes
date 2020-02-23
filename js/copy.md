# JS での正しいコピー

- コピーしたつもりで、参照になってしまっている罠
- 一度バラバラにしてからコピーすれば、ちゃんと独立したコピーを作れる

## 単体の数値のコピーは、うまくいく

```js
var val1 = 1;
var val2 = val1;

val1 = 0;
console.log(val1); // 0
console.log(val2); // 1
```

## 配列のコピー

- 配列のそれぞれの値をコピーしたつもりで、配列の参照を作ってしまう

```js
var arr1 = [1, 2, 3];
var arr2 = arr1;

arr1[0] = 0;
console.log(arr1); // 0, 2, 3
console.log(arr2); // 0, 2, 3
```

- 以下のように Spread Operator を使うと意図通りになる

```js
var arr1 = [1, 2, 3];
var arr2 = [...arr1];

arr1[0] = 0;
console.log(arr1); // 0, 2, 3
console.log(arr2); // 1, 2, 3
```

## Object のコピー

- 配列と同様、オブジェクトもコピーしたように見えて参照を作っている（というか配列もオブジェクトだが）

```js
var person1 = {
  name: "John",
  origin: "UK"
};

var person2 = person1;

person1.name = "Mike";
console.log(person1); // {name: "Mike", origin: "UK"}
console.log(person2); // {name: "Mike", origin: "UK"}
```

- `Object.assign()`によりコピーできる

```js
var person1 = {
  name: "John",
  origin: "UK"
};

var person2 = Object.assign({}, person1);

person1.name = "Mike";
console.log(person1); // {name: "Mike", origin: "UK"}
console.log(person2); // {name: "John", origin: "UK"}
```

- しかし、Object.assign()も深いコピーはできない

```js
var person1 = {
  name: "John",
  location: {
    country: "UK",
    city: "London"
  }
};

var person2 = Object.assign({}, person1);

person1.name = "Mike"; // 浅い部分の変更
person1.location.city = "Liverpool"; //　深い部分の変更

// 浅い部分は、きちんと独立している
console.log(person1.name); // Mike
console.log(person2.name); // John

// 深い部分は、依然として参照になってしまっている
console.log(person1.location.city); //　Liverpool
console.log(person2.location.city); //　Liverpool
```

- 正しくは JSON を経由すればよい

```js
var person1 = {
  name: "John",
  location: {
    country: "UK",
    city: "London"
  }
};

var person2 = JSON.parse(JSON.stringify(person1));

person1.name = "Mike"; // 浅い部分の変更
person1.location.city = "Liverpool"; //　深い部分の変更

console.log(person1.name); // Mike
console.log(person2.name); // John
console.log(person1.location.city); //　Liverpool
console.log(person2.location.city); //　London
```

- `Object.assign(基準のobject literal, 追加するobject literal)`という書式
- 返ってくる値は、２つの object literal を合わせたもの
- なので、第一引数を空っぽ Obj にするとコピーになる
- 同じキーのペアについては、第二引数の方の値で上書きされる

```js
let obj1 = { a: 1, b: 2 };
let obj2 = { b: 3, c: 4 };
Object.assign(obj1, obj2);
console.log(obj1); // a:1, b:3, c:4
```

## 関数のコピー

- コピーと言うか、関数に別名を与えているだけ

```js
function echo(msg) {
  console.log(msg);
}

var alias = echo; // echo()ではない。カッコはつけない

alias("hello");
echo("hello");
```