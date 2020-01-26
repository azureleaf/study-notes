# Vue超要約
## （※現時点での個人的な学習メモなので、正確性は全然保証しません）

## 到達度チェックリスト

- Vue ComponentとVueインスタンスでのdataプロパティの書き方の違いがわかりますか？
- 親コンポーネントから子コンポーネントへデータを流せますか？
- 子コンポーネントから親コンポーネントへデータを流せますか？
- 親子関係にないコンポーネント間でデータを作用させられますか？
- v-slotを使えますか？
- パスワードやAPIのキーなどを、パソコン内部に環境変数として登録・利用できますか？
- マウントできないDOM要素（Window, Bodyなど）に対するイベントからの処理を書けますか？
- computed:とmethods:の、キャッシュの違いを説明できますか？
- v-bind:とv-model:の違いを説明できますか？
- リアクティブなデータをどのように定義するか説明できますか？
- 動的コンポーネントを説明できますか？
- 関数コンポーネントを説明できますか？
- ユニットテストができますか？
- E2Eテストができますか？
- CI/CDツールを設定できますか？

## 重要なDirective（重要度順）

1. v-bind 
1. v-on
1. v-for
    - `v-bind:key`が必須！
1. v-model
1. v-if
1. v-show
1. v-html: 

紛らわしいdirectiveの比較
- v-bind VS v-model


## 重要なプロパティ

1. data:
    - 基本的な変数はここに書く
    - Vueインスタンスの場合は、変数を直接オブジェクトリテラルで書く
    - Vue Componentの場合は、「オブジェクトリテラルをreturnする関数」
1. computed:
1. methods:
1. props:
1. watch:
    - data:はもともと監視されているので、watchする必要はない（？）
1. components:
    - 別の場所で定義されたコンポーネントを利用するときに記述する


## Vue使いとして重要な関連ツール群（重要度順）

1. Git
    - commit
    - push / pull / clone
    - merge / fork
1. Vue CLI
    - プロジェクトの生成
    - プロジェクトへのツールの追加。既存のファイル類と矛盾がないようによしなにやってくれる（ことが多い）
1. Vue Router
    - SPA (Single Page Application)を構築するのに必要
    - 表示が速くなる。
    - 通信量を削減できる。
1. Vuex
    - 状態管理の定番
1. Express.js
    - backendの定番
1. Visual Studio Code
    - 最近では、VS CodeがVue開発のデファクトスタンダードになっている気がする。
1. ESlint / TSlint (VS Code)
    - 文法を監督し、変な場所にエラーを出してくれる。
1. Vetur Plugin (VS Code)
    - コードのSyntax Highlightingや、わかりきったコードの自動生成をやってくれる。
1. Prettier Plugin (VS Code)
    - autoformatのツール。
1. SQL系のデータベース：Postgresql / MySQL / SQLite
1. NoSQL系のデータベース：MongoDB
    - MEVN Stack (MongoDB, Express.js, Vue.js, Node.js)の一員。
1. Firebase
    - データベースの新しい潮流
1. GraphQL
1. TypeScript
1. TypeORM
    - めんどくさいSQL文などを、簡単に書くために使う
    - データベースが変わっても、TyprORM上では同じように書けるので覚えることが減る
1. Docker / Kubernetes
    - 各種サーバーの立ち上げや環境複製を簡単にやるために使うっぽい
    - Kubernetesは、複数のDockerコンテナ同士の相互作用なども行うやつ
1. Nuxt.js
    - SSR, Bundling, Transpiling, Routingなど
    - Vueエンジニア界隈では当たり前のように使われている
1. Quasar
    - VueでPWA, SPA, SSR, Multiplatform, Material Designをやってくれるすごいやつ
    - つまり、Vue Router + Electron + Apache Cordova + Nuxt.js + Vuetify?
    - QuasarかNuxt.jsの片方あればいいのかも？日本での知名度はNuxtが上だと思う。
1. Vue Loader
1. Vuetify
    - Material Design Framework for Vue
1. GitHub / GitLab / BitBucket
1. SourceTree
1. AWS / Google Cloud Platform / Heroku
    - AWSが最強最大。猫も杓子もAWS
1. Three.js
    - 3DCG
1. Babylon.js
1. Chart.js
    - シンプルなグラフや図表の表示
1. D3.js
    - 高度なグラフなどの表示。データ可視化界の大御所。

## Vue Component

### 基本形

```
Vue.Component('コンポーネント名', {コンポーネント内容のオブジェクトリテラル})
```

### コンポーネント名の書き方

- 大文字小文字の違いは無視される。HTMLがそもそもそういう仕様なので。

### 内容部分の書き方

- `template:`
    - 常に必要。SFC（シングルファイルコンポーネント）を使う場合は、`<template>`のタグ内に書く。
- `data:`
    - データ
- `props:`: Required when you need to get data from the parent data.

## コンポーネントの種類

###　による分類
- Dynamic Components
- Static Components

### 有効範囲による分類
- Global Registration
- Local Registration

