# Data Types of JS

困ったら`typeof()`


## Primitive vs Object

### Primitive

- Object ではないもの。メソッドもない
- Primitive は immutable である
  - したがって、`myStr.toUppercase()`は文字列を変更しない。あくまで、改変したものをコピーとして返すだけ
  - 一方で、配列は mutable なので、`myArr.push(1)`は元の配列を改変する
  - 値を代入して変えているように見えるが、実際には違うらしい（？）
- 以下の６種類がprimitive
  - string
  - number
  - bigint
  - boolean
  - null
  - undefined
  - symbol

### Object

- 以下は object である
  - Class を new したもの
  - array
  - Object literal
  - function

## Primitive のデータ型７つ

- Undefined
- Null
- Boolean
- Number
  - 整数
  - 小数
  - Infinity, -Infinity
  - NaN (not a number) これは非常に紛らわしい
- String
- Symbol
  - a unique and immutable primitive new to ES6/2015)

## Truthy vs Falsy

- 以下は falsy

```js
false;
0;
("");
("");
null;
undefined;
NaN;
```

- 上記以外は全て truthy。たとえば以下は truthy

```js
[];
{
}
```

## truthy, falsyを抑えても、まだ紛らわしいことが起こる

```js
1 == "1"; // true
1 == [1]; // true
"1" == [1]; //true

0 == "0"; // true
0 == []; // true
"0" == []; // false (!?)

0.1 + 0.5 == 0.6; // true
0.1 + 0.2 == 0.3; // false (!?)

9999999999999999 == 10000000000000000 // true (!?)

9 + "1"; // 91
91 - "1"; // 90 (9ではない)

typeof(NaN); // Number (!?)
NaN == NaN; // false (!?)
```

- このような紛らわしさは、if文などで致命的になる
- 基本的には、strict equality`===`で解決
- 実用上は、以下を覚えておく

```js
if (x == false) // xがfalse, 0, '', []のときtrue
if (!x) // xがfalse, 0, '', NaN, null, undefinedのときtrue

if (x === y) // xとyが完全に同じときtrue。ただし、いずれもNaNの場合はfalse
if (!!x === !!y) // xとyが完全に同じときtrue。いずれもNaNの場合もtrue
```

