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
  
  returnPromise({ num: 100, i: 1 })
    .then(obj => {
      return returnPromise(obj); // 2回目です。現在の値は200
    })
    .then(obj => {
      return returnPromise(obj);
    })
    .then(obj => {
      return returnPromise(obj);
    });