# JS General Knowledge

独立させる程にはボリュームのない、JS関係の小ネタを貯蔵する場所


## Terminology

- Polyfill
  - 標準となったメソッドが存在しない場合に、自分で供給してしまう方法
  - polyfillは隙間を埋める、という意味
- Service Worker
- V8 Engine


## JS Versions

以下は不正確なので、調べ直すこと

- ES6 = ES2015
  - let, const
  - arrow function
  - class
  - extends
  - default parameters of function
  - template literals: `` `I'm ${name} from ${country}` ``
  - destructuring assignment
- ES7 = ES2016
  - 小さい機能追加しかなかった
- ES8 = ES2017
  - async/await
- ES9 = ES2018
  - Spread / Rest operator
  - Promise.prototype.finally()
- ES10 = ES2019
- Common JS
  - JS本体に外部モジュールを読み込む機能が無いことにキレたMozillaの人が始めた、新しい仕様
  - `require`を用いて外部のコードを読み込めるようにした

## Console

```js
console.log("hello");
console.error("Error");
console.debug("here we go");
console.dir(req); // Return interactive hierarchical structure
```


