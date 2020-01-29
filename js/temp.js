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
    console.log("実測値の実行時間は" + Math.round(endTime - startTime) + " msでした");

  });