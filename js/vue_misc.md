# Vue 超要約

（※個人的な学習メモなので、正確性は全然保証いたしません）

## 到達度チェックリスト

- Vue Component と Vue インスタンスでの data プロパティの書き方の違いがわかりますか？
- 親コンポーネントから子コンポーネントへデータを流せますか？
- 子コンポーネントから親コンポーネントへデータを流せますか？
- 親子関係にないコンポーネント間でデータを作用させられますか？
- v-slot を使えますか？
- パスワードや API のキーなどを、パソコン内部に環境変数として登録・利用できますか？
- マウントできない DOM 要素（Window, Body など）に対するイベントからの処理を書けますか？
- computed:と methods:の、キャッシュの違いを説明できますか？
- v-bind:と v-model:の違いを説明できますか？
- リアクティブなデータをどのように定義するか説明できますか？
- 動的コンポーネントを説明できますか？
- 関数コンポーネントを説明できますか？
- ユニットテストができますか？
- E2E テストができますか？
- CI/CD ツールを設定できますか？





## Vue 使いとして重要な関連ツール群（重要度順）

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
   - backend の定番
1. Visual Studio Code
   - 最近では、VS Code が Vue 開発のデファクトスタンダードになっている気がする。
1. ESlint / TSlint (VS Code)
   - 文法を監督し、変な場所にエラーを出してくれる。
1. Vetur Plugin (VS Code)
   - コードの Syntax Highlighting や、わかりきったコードの自動生成をやってくれる。
1. Prettier Plugin (VS Code)
   - autoformat のツール。
1. SQL 系のデータベース：Postgresql / MySQL / SQLite
1. NoSQL 系のデータベース：MongoDB
   - MEVN Stack (MongoDB, Express.js, Vue.js, Node.js)の一員。
1. Firebase
   - データベースの新しい潮流
1. GraphQL
1. TypeScript
1. TypeORM
   - めんどくさい SQL 文などを、簡単に書くために使う
   - データベースが変わっても、TyprORM 上では同じように書けるので覚えることが減る
1. Docker / Kubernetes
   - 各種サーバーの立ち上げや環境複製を簡単にやるために使うっぽい
   - Kubernetes は、複数の Docker コンテナ同士の相互作用なども行うやつ
1. Nuxt.js
   - SSR, Bundling, Transpiling, Routing など
   - Vue エンジニア界隈では当たり前のように使われている
1. Quasar
   - Vue で PWA, SPA, SSR, Multiplatform, Material Design をやってくれるすごいやつ
   - つまり、Vue Router + Electron + Apache Cordova + Nuxt.js + Vuetify?
   - Quasar か Nuxt.js の片方あればいいのかも？日本での知名度は Nuxt が上だと思う。
1. Vue Loader
1. Vuetify
   - Material Design Framework for Vue
1. GitHub / GitLab / BitBucket
1. SourceTree
1. AWS / Google Cloud Platform / Heroku
   - AWS が最強最大。猫も杓子も AWS
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

- 大文字小文字の違いは無視される。HTML がそもそもそういう仕様なので。

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

## Vue Dev Procedure


### Prepare Requirements

1. `npm install eslint babel-eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue eslint-loader prettier -D`
1. Install VS Code Extensions:
   - Vetur
   - ESLint
   - ~~Prettier~~ Seemingly, this extension isn't necessary. Installing Node package will be enough
1. workspace file setting (or global `setting.json` of vscode)
    ```js
    "editor.formatOnSave": true,
    "vetur.validation.template": false,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
    ```

1. `.eslintrc.js`

    ```js
    module.exports = {
    root: true,
    env: {
        node: true,
        browser: true
    },
    extends: [
        "plugin:vue/recommended",
        "eslint:recommended",
        "prettier/vue",
        "plugin:prettier/recommended"
    ],
    rules: {
        "vue/component-name-in-template-casing": ["error", "PascalCase"],
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
    },
    globals: {
        $nuxt: true
    },
    parserOptions: {
        parser: "babel-eslint"
    }
    };
    ```

1. `.prettierrc` (or .prettierc.json)
