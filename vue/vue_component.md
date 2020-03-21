# Vue Component

### 基本形

```
Vue.Component('コンポーネント名', {コンポーネント内容のオブジェクトリテラル})
```

## Naming

- 大文字小文字の違いは無視される。HTML がそもそもそういう仕様なので。

### 内容部分の書き方

- `template:`
  - 常に必要。SFC（シングルファイルコンポーネント）を使う場合は、`<template>`のタグ内に書く。
- `data:`
  - データ
- `props:`: Required when you need to get data from the parent data.

## Component Type

- Dynamic Components
- Static Components
- Global Registration
- Local Registration