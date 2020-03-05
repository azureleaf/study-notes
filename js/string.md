# 文字列関係

## Basic

- 文字列を操作する系のメソッドは、みんな非破壊的であることに注意
- 改変後の文字列が返り値になるので、それを別の変数を代入して使っていく

```js
var txt = "Hello World";
console.log(txt.length);
console.log(txt.toUpperCase()); // HELLO WORLD
console.log(txt.toLowerCase()); // hello world

console.log(txt.charAt(1)); // e
console.log(txt[1]); // e

//以下の結果は予測できないので、これをやってはいけない
txt[0] = "A"; // 動かない
console.log(txt);
```

## 探索

- indexOf()と search()は同じようなものだが
- indexOf()は、探索の開始位置を指定できる
- search()は、正規表現を使うことができる

```js
console.log(txt.indexOf("round")); //
console.log(txt.indexOf("round"), 10); //
console.log(txt.search("round")); //
```

## 配列の一部を取り出す

- 同じようなメソッドが３つある
- 位置の指定には-1, -3 のような後ろからアクセスするのも可

```js
str.slice(start, end);
str.substring(start, end);
str.substr(start, length);
```

## 結合

```js
var text = "Hello" + " " + "World!";
var text = "Hello".concat(" ", "World!");
```

## 置換

```js
// 語句指定
str.replace("Microsoft", "W3Schools");

// 空白除去
var str = "       Hello World!        ";
alert(str.trim());
```

## 文字列と配列の変換

```js
// string to array
var txt = "a,b c"; 
var arr = txt.split(","); // ["a", "b c"]
var arr = txt.split(" "); // ["a,b" , "c"]
var arr = txt.split(""); // ["a", ",", "b", " ", "c"]

// array to string
var arr = ["shut", "down"];
var str = arr.toString(); // shut,downとなる。カンマが挿入される
var str = arr.join(""); // shutdown
```

## Template Literal

- 文字列の一部にJSの表現を埋め込む時、"+"による接続よりも柔軟に記述できる

```js
var a = 1;
var b = 2;
var greet = "こんにちは";

// 普通に表示
console.log(greet, "。結果は", a + b, "です");

// template literalで表示
// back quoteでかこむ（single quoteではない）
console.log(`${greet}。結果は${a + b}です`);
```

- 以下のように、「変数の生成＋文字列への転換」をやることもできる

```js
export const UserPermissionSeed = [
  {
    name: "Create Post",
    description: "Create Post",
    createdAt: `${new Date()}`,
    updatedAt: `${new Date()}`,
    enabled: true
  }
];
```