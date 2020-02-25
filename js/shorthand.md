# Shorthand

## Ternary Operator 三項演算子

```js
// before
const x = 20;
let answer;
if (x > 10) {
    answer = 'is greater';
} else {
    answer = 'is lesser';
}

// after
const answer = x > 10 ? 'is greater' : 'is lesser';
```

### Short-circuit Evaluation

- 「値が存在する時はそれを代入、そうでないときは既定値を代入」などの動作

```js
// before

if (variable1 !== null || variable1 !== undefined || variable1 !== '') {
     let variable2 = variable1;
}

// after
const variable2 = variable1  || 'new';
```

```js
// before
let dbHost;
if (process.env.DB_HOST) {
  dbHost = process.env.DB_HOST;
} else {
  dbHost = 'localhost';
}

// after
const dbHost = process.env.DB_HOST || 'localhost';
```

### 変数宣言


```js
// before
let x;
let y;
let z = 3;

// after
let x, y, z = 3;
```

```js
// before
let x = 1, y = 1, z = 1;

// after1
let x = y = z = 1;

// after2: Using destructuring assignment
let [x, y, z] = new Array(3).fill(1)
```

### 値の存在確認

- 以下は厳密には等価ではない

```js
// before
if (likeJavaScript === true)

// after-ish
if (likeJavaScript)
```


```js
```


```js
```


```js
```


```js
```


```js
```