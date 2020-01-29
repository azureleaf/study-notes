# Promise とは何なのか？（未完成：async await, Promise.all Promise.race をまだ書いてない）

- Promise は、オブジェクトである
- Promise は、「Promise オブジェクトを new して返すような関数」の中で中身を定義する
- then をつけられるオブジェクトは、必ず Promise でなければならない。（ちなみに、.then()できることを thenable というらしい）
- Promise オブジェクトは、コンストラクタとして関数をとる
  - その関数の第一引数は成功時のコールバック、第二引数は失敗時のコールバック
  - `resolve()`が呼ばれると、その Promise が成功したとみなされる。さらに、`resolve()`の引数が次の.then 内部の関数の引数として渡される。
  - `reject()`が呼ばれると、その Promise は失敗したとみなされる。失敗した箇所以降にある`.then()`は全て中止され、`reject()`の引数がエラー内容として投げられる。これを`catch()`で捕捉すべき。

## Promise を使うとどんないいことがある？

- JavaScript は基本的に非同期である。つまり、順番などを無視して、コード内部での前後関係を無視して実行できるところから一斉にスタートする。
- ただし、callback を使うと、順序を指定して実行できる。関数 A が終わったら関数 B を実行、それが終わったら関数 C を実行...のようにできるということ。しかし、これは**コールバック地獄と呼ばれ、コードの可読性が大幅に低下してしまう**。
- そこで Promise が発明された。これにより、可読性を維持しつつ、順序指定ができる。
- ただし、なんでも同期的にやればいいというわけではない。そもそもなぜ JavaScript が非同期なのかというと、**複数の関数を並行して進めることにより全体の終了速度を早くできるから**である。Promise で同期的にやってしまうと遅くなっていく（そして、それは Web 開発では致命的。ページの読み込みや動作が遅いとユーザはすぐ逃げていってしまう）ので、Promise と非同期処理を組み合わせて最大限の速度となるようにする仕組みもある：
  - `Promise.all([])`:
  - `Promise.race([])`:
- そもそもどういう時に複数の関数を**同期的に**実行したいのか？(この部分要加筆)
  - 外部へのサーバーへのデータ取得をするとき（画像、API の JSON、その他）
  - 実行しようとする関数にデータ依存関係があるとき（HTML ファイルが用意できていない状態で CSS ファイルを適用しようとしても、対象が存在しないのでバグってしまう）
  - ファイルの書き出しや読み込みをするとき

## 実例：ひとつの値をリレーしていく場合

```javascript
// 値を受け取り、１秒待ってから２倍した値を返却するPromise
function returnPromise(value) {
  // Promiseをnewして返却する
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      console.log("現在の値は" + value);
      resolve(value * 2);
    }, 1000);
  });
}

// 実際にPromiseを使って、同期的に関数を実行していく
returnPromise(100)  // 現在の値は100
  .then(value => {
    return returnPromise(value); // 現在の値は200
  })
  .then(value => {
    return returnPromise(value); // 現在の値は400
  });
```

## 実例：複数の値をリレーしていく場合

`resolve(200, 2)`のように resolve に複数の値を渡すことはできない。したがって object literal や配列によってひとかたまりにして渡す必要がある。

```javascript
// 数値と今何回目を受け取り、１秒待ってから２倍した値と今何回目かを返却するPromise
function returnPromise(obj) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      console.log(obj.i + "回目です。現在の値は" + obj.num);
      obj.num = obj.num * 2;
      obj.i = obj.i + 1;
      resolve(obj);
    }, 1000);
  });
}

returnPromise({ num: 100, i: 1 }) // 1回目です。現在の値は100
  .then(obj => {
    return returnPromise(obj); // 2回目です。現在の値は200
  })
  .then(obj => {
    return returnPromise(obj); // 3回目です。現在の値は400
  })
```

## 実例:　 onFulfilled / onRejected の場合分け、及びエラー処理を丁寧にした場合

```javascript
function returnPromise(i = 1) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      // ランダムに成功・失敗する
      if (Math.random() < 0.85) {
        console.log("今回はセーフ！");
        resolve(i + 1);
      } else {
        console.log("アウト！");
        reject(new Error(i + "回目でアウトでした。"));
      }
    }, 1000);
  });
}

returnPromise()
  .then(i => {
    return returnPromise(i);
  })
  .then(i => {
    return returnPromise(i);
  })
  .then(i => {
    return returnPromise(i);
  })
  .then(i => {
    return returnPromise(i);
  })
  .then(() => {
    console.log("全てセーフでした。");
  })
  .catch(error => {
    console.error("エラー内容：", error);
  })
  .finally(() => {
    console.log("終了します。");
  });
```
