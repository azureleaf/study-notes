# Currying

```js
// 入れ子のそれぞれの段階で関数をreturnしているのがポイントか？
// volume(2, 3, 4)という表記だった場合には、volume(length){}だと２つめ以降の引数は単に捨てられてしまう
// しかしcurrying functionの表記だと、捨てられることなく一個ずつ取り出せるっぽい
function volume(length) {
  console.log("引数は", length);
  return function(width) {
    console.log("引数は", width);
    return function(height) {
      console.log("引数は", height);
      // 内部にあるので、length, width, heightの全てのスコープが有効
      return height * width * length;
    };
  };
}

volume(2)(3)(4);
// 24
// console.log()の結果は2, 3, 4の順番になる。つまり、左側の引数から順番に消費されていく
```

- 上記のような不思議な構図は currying を使用している
- Curry という名前は、Haskell Curry というアメリカの数学者の名前に由来している。名前からわかるように、プログラミング言語の Haskell も彼にちなんでいる
- Currying 自体は functional programming の機能の一つ。なので JS 以外の言語にもある
- Passport.js の実装の部分で見かけたのは以下：

```js
// authenticate()()という形になっている
passport.authenticate("local", function(err, user, info) {...})(req, res, next);
```

## 投入した引数を全て消費しないとどうなるか

- 関数が返ってくるので、それをさらに使える

```js
function volume(length) {
  return width => {
    return height => {
      return height * width * length;
    };
  };
}

var temp1 = volume(2)(3);
temp1(4); // 24

var temp2 = volume(2);
temp2(3)(4); // 24
```

- 以上の例は、curry function の有用性の一つを示している。つまり、「引数が多数ある関数があるが、引数のいくつかはほぼ固定されている」場合に引数の表記を省略することができる

```js
function volume(length) {
  return width => {
    return height => {
      return height * width * length;
    };
  };
}

// 長さが２のグループ
var vol_l2 = volume(2);

vol_l2(10)(15);
vol_l2(20)(30);
vol_l2(50)(10);

// 長さが5のグループ
var vol_l5 = volume(5);

vol_l5(10)(15);
vol_l5(20)(30);
vol_l5(50)(10);
```

## 一つの括弧に複数の引数を入れる場合

- 関数を実行するたびに一つの`()`分ずつ消費していくという点は同じ
- ただ、一つの括弧の中に複数の引数をとることは可能

```js
function volume(length) {
  return (width, height) => {
    return height * width * length;
  };
}

volume(2)(3, 4); // 24
```

## 再帰の方法の定義と、関数処理の実体を分ける

```js
// 関数そのものを引数として、再帰のときの引数の処理のみを定義する
// こうやることで、引数の数が同じ限りは、使いまわせそう
function curry(f) {
  return function(a) {
    return function(b) {
      return function(b) {
        return f(a, b);
      };
    };
  };
}

// 実処理
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

curriedSum(1)(2)(3); // 3
```

## エレガントな定義の仕方

- 引数の数によらず一般的に定義するための方法
- わかるような

```js
function curry(fn, ...args) {
  return (..._arg) => {
    return fn(...args, ..._arg);
  };
}
```

- よくわからん

```js
var curry = (fn, ...args) => {
  // currying functionは引数を一つずつ消費していく
  fn.length <= args.length
    ? fn(...args) // 関数１回分の引数よりも、渡された引数の数が多いときは内部の関数を返す？
    : (...more) => curry(fn, ...args, ...more); // これは関数そのものを返している?
};
```

- `myFunc().length`は、その関数を定義したときの実引数の数を返す
  - `function myFunc(a, b, c, d){}`なら`4`
  - `function myFunc(a, b, c, ...d){}`なら`3`(rest parameter はカウントされないっぽい)
