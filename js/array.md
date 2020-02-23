# 配列

## 配列に繰り返しアクセスして何か操作する方法たち

- C 言語風

```js
let numbers = [10, 20, 30];
for (var i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i] * 2;
}
console.log(numbers); // 20, 40, 60
```

- for in

```js
let numbers = [10, 20, 30];
for (key in numbers) {
  numbers[key] = numbers[key] * 2;
}
console.log(numbers); // 20, 40, 60
```

- for of

```js
let numbers = [10, 20, 30];
let doubled = [];
for (number of numbers) {
  doubled.push(number * 2);
}
console.log(doubled); // 20, 40, 60
```

- .foreach()

```js
let numbers = [10, 20, 30];

numbers.forEach((value, index) => {
  numbers[index] = value * 2;
});
console.log(numbers); // 20, 40, 60
```

- .map()
  - map()は元の配列を変更せず新しい配列を返すが、foreach は元の配列自体を改変し undefined を返す
  - foreach()でできることは map()でもできるし、逆も然り
  - map()を使う例が一番多いと感じる

```js
let numbers = [10, 20, 30];

doubled = numbers.map(num => {
  return num * 2;
});
console.log(doubled); // 20, 40, 60
```

- .reduce()
  - accumulator（要素一つにアクセスする毎に変化させる変数。合計値とか）を得るときに使う
  - `.reduce(callback, initialValue)`が書式
  - initialValue は callback に最初に渡す値だが省略可
  - callback はアクセスするごとに呼ばれる。次に渡す値を return しないといけない
  - `(accumulator, currentValue, index)`が callback の引数（index は省略可）

```js
let numbers = [10, 20, 30];

sum = numbers.reduce((total, value, index) => {
  console.log(
    "途中経過：",
    index,
    "つの要素を処理しました。現在の合計値は",
    total
  );
  return total + value;
}, 1000);

console.log("合計値は", sum, "、平均値は", sum / numbers.length);
```

- .filter()

```js
let numbers = [10, 20, 30];

// filter関数により、条件に適合する要素だけを取り出す
filteredNumbers = numbers.filter((value, index) => {
  return value > 30; // このように、trueかfalseを返す関数をここに書く
});
console.log("filterをかけた結果：", filteredNumbers);
```


## 配列のソート

```js
// 要素の並び替え
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

// まあ、最大最小を見つけるだけならもっと簡単にできるが
let numbers = [11, 9, 23, 910, 3];
console.log("最大の数は", Math.max(...numbers));
console.log("最小の数は", Math.min(...numbers));
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
```
- spliceを使うと、挿入や削除を複数個自由にできる
- `.splice(開始位置のindex, 既存の配列から削除する要素数, 新たに挿入する要素))`

```js
stations.splice(2, 0, "台原駅", "北仙台駅");
console.log("任意の位置に複数挿入", stations);

stations.splice(2, 2);
console.log("任意の位置から複数削除", stations);

stations.splice(2, 2, "勾当台公園駅", "広瀬通駅");
console.log("任意の位置から複数削除し、同数を挿入（つまり置換）", stations);
```
