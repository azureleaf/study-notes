# Iterator & Generator


## Iteratorとは
- 一連の値をひとつずつ取り出す機能のついたオブジェクト
- iteratorは、`next()` methodをもち、実行するたびにiterator resultを返す
- iterateできることをiterableという
    - 配列はiterable
    - 文字列はiterable
    - Generatorはiterable



## Generator

- 通常の関数は、一度実行されるとreturnされるか、最後に行き着くまで実行される
- Generator関数は、関数の途中で停止できる
- `.next()`で呼ぶと、その関数の続きから再開できる
- `.next()`をすると、iterator resultが返ってくる

```js
// Define generator with "function*" keyword
function* gen(x){
  console.log(x);
  yield; // yieldがある場所で一時停止し、呼び出し元へ戻る。returnみたいなもの
  console.log(x*2);
  yield;
  console.log(x*3);
}

// Define "Generator Object"
var g = gen(10);

// Use generator object
console.log("1回目");
g.next(); 
console.log("2回目");
g.next();
console.log("3回目");
g.next();
```

```js
// Define generator with "function*" keyword
function* gen(x){
  console.log(x);
  yield; // yieldがある場所で一時停止し、呼び出し元へ戻る。returnみたいなもの
  console.log(x*2);
  yield;
  console.log(x*3);
}

// Define "Generator Object"
var g = gen(10);

// Use generator object
console.log("1回目");
console.log(g.next(100)); 
console.log("2回目");
console.log(g.next(200));
console.log("3回目");
console.log(g.next(300));

```

