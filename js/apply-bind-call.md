# apply, bind, call

- いずれもオブジェクトの参照先を変更するためのメソッド
- もっぱら`this`の参照先を変更するのに使われる

## Reference

- Qiita https://qiita.com/39_isao/items/c00a200b158ba057363f


## 他人のメソッ

```js
// ペンギンくん
var Penguin = {
    name: 'ペンギン',
};

// 鷹
var Falcon = {
    name: '鷹',
    fly: function(){
        console.log(this.name + 'が大空を飛びました');
    }
};

Falcon.fly();  // '鷹が大空を飛びました

// call 
Falcon.fly.call(Penguin); // ペンギンが大空を飛びました

// bind は一旦変数にしまって使う
var flyPenguin = Falcon.fly.bind(Penguin); 
flyPenguin(); // ペンギンが大空を飛びました
```