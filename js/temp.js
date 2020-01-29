function returnPromise(i = 1) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      // ランダムに成功・失敗する
      if (Math.random() < 0.9) {
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