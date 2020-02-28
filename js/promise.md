# Promise と Async/Await と友達になる

## Promise とは何なのか？

- Promise は、オブジェクトである
- Promise は、「Promise オブジェクトを new して返すような関数」の中で中身を定義する
- then をつけられるオブジェクトは、必ず Promise でなければならない。（ちなみに、.then()できることを thenable というらしい）
- Promise オブジェクトは、コンストラクタとして関数をとる
  - その関数の第一引数は成功時のコールバック、第二引数は失敗時のコールバック
  - `resolve()`が呼ばれると、その Promise が成功したとみなされる。さらに、`resolve()`の引数が次の.then 内部の関数の引数として渡される。
  - `reject()`が呼ばれると、その Promise は失敗したとみなされる。失敗した箇所以降にある`.then()`は全て中止され、`reject()`の引数がエラー内容として投げられる。これを`catch()`で捕捉すべき。
- Promise は ES6(ES2015)で採用
- Async/Await は ES8 で採用
- Async/Await は Promise の進化系であるが、Promise を内部で普通に使っているのでそれを理解するのが前提となる

## Promise を使うとどんないいことがある？

- JavaScript は基本的に非同期である。つまり、コード内部での前後関係を無視して、実行できそうなところは全て一斉にスタートする。
- ただし、callback を使うと、順序を指定して実行できる。関数 A が終わったら関数 B を実行、それが終わったら関数 C を実行...のようにできるということ。しかし、これは**コールバック地獄と呼ばれ、コードの可読性が大幅に低下してしまう**。
- そこで Promise が発明された。これにより、可読性を維持しつつ、順序指定ができる。
- ただし、なんでも同期的にやればいいというわけではない。そもそもなぜ JavaScript が非同期なのかというと、**複数の関数を並行して進めることにより全体の終了速度を早くできるから**である。Promise で同期的にやると全体の処理時間は長くなっていく。そして、それは Web 開発では致命的。ページの読み込みや動作が遅いとユーザはすぐ逃げていってしまうから。なので、Promise で同期処理する部分は最小に抑えつつ、非同期処理と組み合わせて全体が最大限の速度となるようにする仕組みもある：
  - `Promise.all([promise1, promise2])`: promise1, promise2 は非同期に開始するが、両方が終わった時点で return
  - `Promise.race([promise1, promise2])`: promise1, promise2 のうちどちらか一方が終わった時点で return。もう一方も実行自体は続行するが、それが終わっても Promise.race()に影響しない。
- そもそもどういう時に複数の関数を**同期的に**実行したいのか？(この部分要加筆)
  - 外部へのサーバーへのデータ取得をするとき（画像、API の JSON、その他）
  - 実行しようとする関数にデータ依存関係があるとき（HTML ファイルが用意できていない状態で CSS ファイルを適用しようとしても、対象が存在しないのでバグってしまう）
  - ファイルの書き出しや読み込みをするとき

## Promise: これだけは覚えて帰る

- こういう状況を仮定しよう
  - 処理 A, 処理 B, 処理 C を順番に(つまり同期的に)実行したい
    - 例えば、A、B、C の順番でデータを加工していき、その最終成果物を表示する
  - この３つの処理のいずれについても、処理成功と処理失敗の両方のケースがある
    - 例えば、ファイルが存在しないためエラー、API サーバが落ちているためエラー
  - ３つのうちどこかで失敗したら、結果は出せない

```javascript
// 疑似コード
// これは処理Aについて。処理B、処理Cも同様に書く
function doA() {
  return new Promise((resolve, reject) => {
    // 処理A
    if (err) {
      reject("失敗した時に投げる値"); // 失敗したときに、その合図として呼ぶ
    }
    resolve("成功した時に次のPromiseに渡す値"); // 成功したときに、その合図として呼ぶ
  });
}

doA()
  .then(arg => {
    return doB(arg);
  })
  .then(arg => {
    return doC(arg);
  });
```

- つまり
  1. 順番にやりたい処理の１つの段階が終わった箇所に`resolve()`を書く
  1. 失敗したときの処理を書き、最後に`reject()`を書く（エラー処理をしないなら省略可）
  1. それを Promise オブジェクトのコンストラクタとして書く
  1. 「その Promise オブジェクトを new して return する」関数を書く
  1. そのような関数を全ての処理段階についてそれぞれ作る
  1. `.then()`を使ってそれらを順番につなげていく

## ひとつの値をリレーしていく場合

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

## 複数の値をリレーしていく場合

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

## エラー処理を丁寧にやる場合

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

##  Promise.all()と Promise.race()の直列

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
    // 「中身の処理の実装はいらないけど、空っぽのPromise objectは生成したい」状況で有用
    // Promiseを返さないとthenableにできず、次に進まないので
    return Promise.resolve();
  })
  .then(() => {
    // c1, c2のうち速い方だけがresolve()で次に渡される
    return Promise.race([returnPromise("c1"), returnPromise("c2")]);
  })
  .finally(() => {
    endTime = Date.now();
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

##  Promise.all()、Promise.race()の並列（入れ子）

- Promise 同士をネストさせることができる。
- 下では、c2_1 の実行後に c2_2 を実行するようにしているが、その合計時間が c1 よりも遅い場合（then して長くなっている分、だいたい c2 の方が遅いだろうが）は親の Promise.all()は c2 が終了したかどうかを気にしない。

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

    // Promise.all()の中に、PromiseやPromise.race(),別のPromise.all()などを内包
    return Promise.all([
      returnPromise("a"),

      // 以下の表記は実質的に意味ないが、Promsise.all()をネストしてみたかったので
      // b1, b2をaと同じレベルでPromise.all()の配列に入れれば同じことはできる
      Promise.all([returnPromise("b1"), returnPromise("b2")]),

      // c1はPromise１つなのに対して、c2は２つ実行しているので大抵c1の方が速いはず
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
      "ちなみに一番速い奴は" +
        Math.round(Math.min(...Object.values(stat))) +
        "msでした。"
    );
  });
```

## Promise.all()の resolve()内容を確認する

- `Promise1`, `Promise2`はそれぞれ内部で`resolve(value1)`,`resolve(value2)`するとする。
- このとき、`Promise.all([Promise1, Promise2]).then((i)=>{console.log(i)})`の i には一体何が入るのか？という疑問が生じる。通常の Promise と then()は一対一だが、この Promise.all()の場合は resolve()が複数呼ばれるので。
- 答えからいうと`[ value1, value2]`のように配列が入る。この resolve()の結果の配列内部の順序は、最初の Promise.all で書いた順序そのままである。各 Promise 終了の先着順になるのかと思ったら、そうじゃなかった。

```javascript
function returnPromise(name, delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(name + "を実行中");
      resolve(name);
    }, delay);
  });
}

Promise.resolve()
  .then(() => {
    return Promise.all([
      // 実行結果：「cを実行中」->「aを実行中」->「bを実行中」
      returnPromise("a", 600),
      returnPromise("b", 1000),
      returnPromise("c", 200)
    ]);
  })
  .then(arg => {
    console.log(arg); // [ 'a', 'b', 'c' ]
  });
```

## Promise.all()の nest で配列を扱う

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

## async の登場

- async/await を使う利点
  - then, resolve, reject キーワードをあまり書かずにすむ
  - Promise では一つ一つの段階の区切りを示すために.then()で分けていた。これに対して、await はキーワードを目印として同期のタイミングを示せるので、書く量が少ないし、改行も自由なのでゆったり書ける

```js
// async functionはPromiseを返す
async function roulette(i) {
  // ランダムに成功・失敗する
  if (Math.random() < 0.6) {
    console.log(i + "回目はセーフ！");
    return i + 1; // resolveの代わりにreturn。これによりfulfilledなPromiseが返る
  } else {
    console.log(i + "回目でアウト！");
    throw new Error(i + "回目でアウトでしたね。"); // rejectの代わりにthrow。これによりrejectedなPromiseが返る
  }
}

// await を使わないと以下の部分は純 Promise の場合と変わらず、恩恵もあまりない
roulette(1)
  .then(val => {
    return roulette(val);
  })
  .then(val => {
    return roulette(val);
  })
  .then(val => {
    return roulette(val);
  })
  .catch(err => {
    console.log("エラー：", err);
  });
```

## await の登場

- `await`キーワードの右に書くのは、Promise を返す関数（下でいうと double()）でないといけない
- Promise が返るまでは、そこで停止して待つ

```js
// なんの変哲もない、単なるPromiseの関数
// つまり、async / awaitを使ったからといってPromiseとおさらばできるわけでもない
function double(value) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("受け取った値：", value);
      resolve(value * 2);
    }, 1000);
  });
}

async function wrapper(val) {
  const result = await double(val); // Promiseが返るまでに１秒かかる
  console.log("１秒経過しました。結果は", result, "でした。");
  return result; // この一行でreturn new Promise()内部のresolve(result)と同義
}

// wrapper()はasync functionなので、Promiseを返す。なのでthenableである
// 普通は、こういう風にasync関数自体をthenでつなげる書き方はしないだろうが...
// async functionがPromiseを返すという例として書く
wrapper(100)
  .then(val => {
    return wrapper(val);
  })
  .then(val => {
    return wrapper(val);
  })
  .then(val => {
    return wrapper(val);
  })
  .then(val => {
    console.log("最終値は", val);
  });
```

## async / await で実際に記述量が減ってありがたみを感じる書き方

- then でずらずら羅列するのではなく、独立した行で書ける

```js
function double(value) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("受け取った値：", value);
      resolve(value * 2);
    }, 1000);
  });
}

// このwrapper関数そのものも、内部の個々の処理関数も、いずれもPromiseを返す
// ただし、外側のwrapperは何も本質的な働きはしていない
// あくまで、「awaitを使うためには、それがasync functionの内部になければならない」という形式を保つことだけが存在意義にみえる
async function wrapper(val) {
  let result;

  result = await double(val);
  result = await double(result);
  result = await double(result);
  result = await double(result);
  return result; // return Promise
}

// Promiseではこの部分のthenが連続して冗長で見にくいが
// この連続処理部分をasync function内部に移動できるため、この部分はシンプルになる
// とはいえ、最終的なresolveの値を確認するためだけに、ここでthenを使う
wrapper(100)
  .then(finalVal => {
    console.log("最終値は", finalVal);
  })
  .catch(err => {
    console.error(err); // まあこの例だとエラーは起きないけど
  });
```

## await で書いた行は、普通の行と同じように for 文とか制御構造に組み込める

- 上のコードを見れば、誰でも「同じことを繰り返してるなあ、for 文を使いたいなあ」と思うはず。実際、使える
- 同期処理でこういうことができるのも、async / await で「.then メソッドの連鎖」から「独立した行の集まり」に書き換えられた恩恵である

```js
function double(value) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("受け取った値：", value);
      resolve(value * 2);
    }, 1000);
  });
}

// asyncキーワードがある場合も、このようにアロー関数を使った表記をしてもよい
// async function wrapper(val){} と同義
var wrapper = async val => {
  for (var i = 0; i < 5; i++) val = await double(val);
};

wrapper(100);
```

## async / await のエラー処理は、普通の try catch 構文で書ける

- エラー処理などを総出演させると以下のようになる

```js
// これは普通のPromiseのときと同じ
function roulette(i = 1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // ランダムに成功・失敗する
      if (Math.random() < 0.8) {
        console.log(i + "回目はセーフ！");
        resolve(i + 1);
      } else {
        console.log(i + "回目でアウト！");
        reject(new Error(i + "回目でアウトでした。"));
      }
    }, 1000);
  });
}

async function wrapper(count) {
  try {
    for (let i = 0; i < 3; i++) {
      count = await roulette(count);
    }
    return count;
  } catch (err) {
    throw err; // catchしたエラーを投げる
  }
}

wrapper()
  .then(finalCount => console.log(`${finalCount - 1}回ともセーフでした。`))
  .catch(err => console.error(new Error(err))) // catchされて投げられたエラーを、ここで再びcatchしている。エラーのバトンリレー的な
  .finally(() => console.log("終了します。お疲れ様でした！"));
//.finally(console.log("終了します。お疲れ様でした！")); // ちなみに、これだとうまくいかない。finallyの中身は、関数でないといけないから
```

## 並列処理`Promise.all()`を await と使う

- Promise.all()の部分はいつもどおりなので、そんなに特筆すべきこともないが。。。

```js
function wait(delay) {
  return new Promise(resolve =>
    setTimeout(() => {
      console.log(delay + "ms待ちました。");
      resolve("私は" + delay + "ms待ったやつのresolve値ですよ");
    }, delay)
  );
}

let wrapper = async () => {
  // Promise.all()内部の複数のresolve()の結果は配列となって返ってくる
  // その結果を、そのままreturnする、というか正確にはPromiseとして返却するが、その中に配列も含まれている
  return await Promise.all([wait(2500), wait(1200), wait(400)]);
};

var startTime = Date.now();

wrapper().then(results => {
  let endTime = Date.now();

  console.log("Promise.allの返り値はこんなんでした");
  results.map(result => {
    console.log(result);
  });
  console.log(
    "全体の所要時間は大雑把にいうと" +
      Math.round(endTime - startTime) +
      "msでしたが、これは一番長い待ち時間とだいたい同じですよね！"
  );
});
```

## ちょっと実用的な疑似コード

- API へのアクセスなどの時間がかかる処理があり、なおかつそれを順番に処理しないといけない場合には活躍する

```js
async function getSantaWeather() {
  // URLはデタラメなので開けません
  // 現在のサンタクロースの緯度経度情報を教えてくれるAPIからデータ取得
  let santaPosResponse = await fetch("http://santa-no-position-desu.com");

  // もってきたJSONファイルをobject literalにparse
  let santaPos = await santaPosResponse.json();

  // 緯度経度情報を投げて、その場所の天気を教えてくれるAPIからデータ取得
  let weatherResponse = await fetch(
    "http://tenki-desu.com/" + santaPos.longitude + "/" + santaPos.latitude
  );

  // parse
  let weather = await weatherResponse.json();

  return weather;
}

getSantaWeather().then(weather => {
  // 最終的な成果物を表示
  console.log(
    "今サンタクロースがいる場所の天気は",
    weather.condition,
    "です！"
  );
});
```
