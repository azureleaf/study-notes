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
        returnPromise("c2"),
        returnPromise("c3_1").then(() => {
          return returnPromise("c3_2");
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
