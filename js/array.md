# 配列

## 配列に繰り返しアクセスする方法たち

- C 言語風

```js
```

- for in

```js
```

- for of

```js
```

- foreach

```js
```

- .map()

```js
```

- .reduce()

```js
```

- .map()

```js
```

- .map()

```js
```

## 配列のソート

```js
// 要素の並び替え
function sortArray() {
  let greeting = ["r", "e", "d", "r", "u", "m"];
  greeting.reverse();
  console.log(greeting); // murder

  let prefs = ["Sendai", "Iwanuma", "Natori", "Tagajo", "Shiogama"];
  prefs.sort();
  console.log(prefs);

  let numbers = [11, 9, 23, 910, 3];
  numbers.sort(); // これは失敗する。数字が辞書的にソートされてしまうので
  console.log("数字の辞書的なソート：", numbers); // 11, 23, 3, 9, 910

  // 降順ソート
  numbers.sort((a, b) => {
    return b - a;
  });
  console.log("降順ソート：", numbers);

  // 昇順ソート
  numbers.sort((a, b) => {
    return a - b;
  });
  console.log("昇順ソート：", numbers);

  // ソートすると、最大の数や最小の数を見つけることもできる
  console.log("最大の数は", numbers[numbers.length - 1]);
  console.log("最小の数は", numbers[0]);
}
```

## 配列へのアクセスと改変

```js
let stations = ["八乙女駅", "旭ヶ丘駅", "仙台駅", "長町駅"];

// 要素に番号でアクセスする
console.log("最後の要素", stations[stations.length - 1]);

// 要素を見つける（複数ある場合は、最初のもの）
console.log("仙台駅のindex", stations.indexOf("仙台駅"));

// 要素が見つからないときは、-1が返る
console.log("荒井駅のindex", stations.indexOf("荒井駅"));

// 配列に要素を足したり引いたり
stations.push("富沢駅");
console.log("末尾に追加", stations);

stations.pop();
console.log("末尾から削除", stations);

stations.unshift("泉中央駅");
console.log("先頭に追加", stations);

stations.shift();
console.log("先頭から削除", stations);

// spliceを使うと、挿入や削除を複数個自由にできる
// .splice(開始位置のindex, 既存の配列から削除する要素数, 新たに挿入する要素))
stations.splice(2, 0, "台原駅", "北仙台駅");
console.log("任意の位置に複数挿入", stations);

stations.splice(2, 2);
console.log("任意の位置から複数削除", stations);

stations.splice(2, 2, "勾当台公園駅", "広瀬通駅");
console.log("任意の位置から複数削除し、同数を挿入（つまり置換）", stations);
```
