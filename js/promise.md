# Promise とは何なのか？（未完成：async await, Promise.all Promise.race をまだ書いてない）

- Promise は、オブジェクトである
- Promise は、「Promise オブジェクトを new して返すような関数」の中で中身を定義する
- then をつけられるオブジェクトは、必ず Promise でなければならない。（ちなみに、.then()できることを thenable というらしい）
- Promise オブジェクトは、コンストラクタとして関数をとる
  - その関数の第一引数は成功時のコールバック、第二引数は失敗時のコールバック
  - `resolve()`が呼ばれると、その Promise が成功したとみなされる。さらに、`resolve()`の引数が次の.then 内部の関数の引数として渡される。
  - `reject()`が呼ばれると、その Promise は失敗したとみなされる。失敗した箇所以降にある`.then()`は全て中止され、`reject()`の引数がエラー内容として投げられる。これを`catch()`で捕捉すべき。

## Promise を使うとどんないいことがある？

- JavaScript は基本的に非同期である。つまり、コード内部での前後関係を無視して、実行できそうなところは全て一斉にスタートする。
- ただし、callback を使うと、順序を指定して実行できる。関数 A が終わったら関数 B を実行、それが終わったら関数 C を実行...のようにできるということ。しかし、これは**コールバック地獄と呼ばれ、コードの可読性が大幅に低下してしまう**。
- そこで Promise が発明された。これにより、可読性を維持しつつ、順序指定ができる。
- ただし、なんでも同期的にやればいいというわけではない。そもそもなぜ JavaScript が非同期なのかというと、**複数の関数を並行して進めることにより全体の終了速度を早くできるから**である。Promise で同期的にやると全体の処理時間は長くなっていく。そして、それは Web 開発では致命的。ページの読み込みや動作が遅いとユーザはすぐ逃げていってしまうから。なので、Promise で同期処理する部分は最小に抑えつつ、非同期処理と組み合わせて全体が最大限の速度となるようにする仕組みもある：
  - `Promise.all([])`:
  - `Promise.race([])`:
- そもそもどういう時に複数の関数を**同期的に**実行したいのか？(この部分要加筆)
  - 外部へのサーバーへのデータ取得をするとき（画像、API の JSON、その他）
  - 実行しようとする関数にデータ依存関係があるとき（HTML ファイルが用意できていない状態で CSS ファイルを適用しようとしても、対象が存在しないのでバグってしまう）
  - ファイルの書き出しや読み込みをするとき

## 実例：ひとつの値をリレーしていく場合

```javascript
// 値を受け取って１秒待ってから２倍した値を返却するPromise...を返却する関数
function returnPromise(value) {
  // Promiseをnewして返却する
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("現在の値は" + value);
      resolve(value * 2);
    }, 1000);
  });
}

// 実際にPromiseを使って、同期的に関数を実行していく
returnPromise(100) // 現在の値は100
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
  return new Promise((resolve, reject) => {
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
  });
```

## 実例:　エラー処理を丁寧にやる場合

onFulfilled / onRejected の場合分け、エラー処理などを全部やるとこうなる

```javascript
function returnPromise(i = 1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // ランダムに成功・失敗する
      if (Math.random() < 0.85) {
        console.log("セーフ！");
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

## 実例： Promise.all()と Promise.race()の直列

- 通常の Promise、Promise.all()、Promise.race()を順に実行するだけ。
- 思い通りの順序で実行されているのか確認するため、所要時間を計測している。

```javascript
let startTime, endTime;

var promiseStart = new Promise(resolve => {
  startTime = Date.now();
  console.log("全体を開始します。");
  resolve();
});

function returnPromise(name) {
  return new Promise(resolve => {
    var delay = 1000 + Math.random() * 2000;
    stat[name] = delay;
    setTimeout(() => {
      console.log(
        name + "を実行中です。" + Math.round(delay) + "ms遅延しました。"
      );
      resolve();
    }, delay);
  });
}

// 各関数の所要時間を記憶
stat = {};

promiseStart
  .then(() => {
    return returnPromise("a");
  })
  .then(() => {
    console.log("Promise.all()を実行します");
    return Promise.all([returnPromise("b1"), returnPromise("b2")]);
  })
  .then(() => {
    console.log("Promise.all()が終了しました。");
    console.log("Promise.race()を開始します。");

    // Promise.resolve()という記法により、onFulfilled状態のPromiseが生成される
    // Promiseを返さないとthenableにできず、次に進まないので
    return Promise.resolve();
  })
  .then(() => {
    return Promise.race([returnPromise("c1"), returnPromise("c2")]);
  })
  .finally(() => {
    endTime = Date.now();
    console.log("Promise.race()が終了しました。");
    console.log("全体を終了しました。各関数の所要時間は以下のとおりです。");
    console.log(stat);
    console.log(
      "それぞれの所要時間から予想される全体の実行時間は" +
        Math.round(
          stat.a +
            (stat.b1 > stat.b2 ? stat.b1 : stat.b2) +
            (stat.c1 > stat.c2 ? stat.c2 : stat.c1)
        ) +
        "msです。"
    );
    console.log(
      "実測値の実行時間は" + Math.round(endTime - startTime) + " msでした"
    );
  });
```

## 実例： Promise同士の入れ子

- Promise同士をネストさせることができる。
- 下では、c2_1の実行後に必ずc2_2を実行するようにしているが、その合計時間がc1よりも遅い場合（thenしているので、多くの場合そうなるだろうが）はc2_1, c2_2いずれも大本のPromise.all()からは無視される。
- 疑問：`Promise.all()[Promise1, Promise2].then((i)=>{console.log(i)})`のとき、Promise1のresolve(value1)とPromise2のresolve(value2)として、iには何が入るのか？？？

```javascript
var startTime, endTime;

// 各関数の所要時間を記憶
stat = {};

var promiseStart = new Promise(resolve => {
  startTime = Date.now();
  console.log("全体を開始します。");
  resolve();
});

function returnPromise(name) {
  return new Promise(resolve => {
    // race()の結果が全体のどう影響するのか確認するため、c2のPromiseを一番遅くする
    var delay = Math.random() * 2000;
    stat[name] = delay;
    setTimeout(() => {
      console.log(
        name + "を実行中です。" + Math.round(delay) + " ms遅延しました。"
      );
      resolve();
    }, delay);
  });
}

promiseStart
  .then(() => {
    console.log("Promise.all()を実行します");
    return Promise.all([
      returnPromise("a"),
      Promise.all([returnPromise("b1"), returnPromise("b2")]),
      Promise.race([
        returnPromise("c1"),
        returnPromise("c2_1").then(() => {
          return returnPromise("c2_2");
        })
      ])
    ]);
  })
  .finally(() => {
    endTime = Date.now();
    console.log("Promise.all()が終了しました。");
    console.log("全体を終了しました。各関数の所要時間は以下のとおりです。");
    console.log(stat);
    console.log(
      "それぞれの所要時間から予想される全体の実行時間は" +
        Math.round(
          Math.max(
            stat.a,
            stat.b1 > stat.b2 ? stat.b1 : stat.b2,
            stat.c1 > stat.c2 ? stat.c2 : stat.c1
          )
        ) +
        " msです。"
    );
    console.log(
      "実測値の実行時間は" + Math.round(endTime - startTime) + " msでした"
    );
    console.log(
      "ちなみに一番遅い奴は" +
        Math.round(Math.max(...Object.values(stat))) +
        "msでした。"
    );
  });

```

## Promise.all()の nest

```javascript
var arr = [{ subarr: [1, 2, 3] }, { subarr: [4, 5, 6] }, { subarr: [7, 8, 9] }];
function processAsync(n) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(n * n);
    }, Math.random() * 2000);
  });
}
Promise.all(
  arr.map(function(entity) {
    return Promise.all(
      entity.subarr.map(function(item) {
        return processAsync(item);
      })
    );
  })
).then(function(data) {
  console.log(data);
});
```
