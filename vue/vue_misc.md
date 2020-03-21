# Vue 

## Global API

- `Vue` *
- `Vue.extend`
- `Vue.nextTick`
- `Vue.set`
- `Vue.delete`
- `Vue.directive`
- `Vue.filter`
- `Vue.component` *
- `Vue.use`
- `Vue.mixin`
- `Vue.compile`
- `Vue.observable`
- `Vue.version`

## Instance Property

- `vm.$data`
- `vm.$props`
- `vm.$el`
- `vm.$options`
- `vm.$parent`
- `vm.$root`
- `vm.$children`
- `vm.$slots`
- `vm.$scopedSlots`
- `vm.$refs`
- `vm.$isServer`
- `vm.$attrs`
- `vm.$listeners`

## Instance Methods

- `vm.$watch`
- `vm.$set`
- `vm.$delete`
- `vm.$on`
- `vm.$once`
- `vm.$off`
- `vm.$emit`
- `vm.$mount`
- `vm.$forceUpdate`
- `vm.$nextTick`
- `vm.$destroy`

## Built-in Component

- `<component>`
- `<transition>`
- `<transition-group>`
- `<keep-alive>`
- `<slot>`

## Built-in Attribute

- `key` *
- `ref`
- `is`
- `slot`
- `slot-scope`
- `scope`

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


## Vue Dev Procedure



## Vueに関係する設定ファイルたち

### VS code
- setting.json
   - VS code自体のセッティング
   - formatterの設定とか、フォントの設定とかをやる
   - ここを改変してしまうと、全てのプロジェクトに影響する。なので、本当にいつも必要な設定以外はcode-workspaceに書くほうがよさげ
- blahblah.code-workspace
   - 意味的には
### node.js
- package.json
   - `dependencies:`
      - `npm install --save`したパッケージはここに追加される
   - `devDependencies:`
      - `npm install --save-dev`したパッケージはここに追加される
      - ここのパッケージは、`npm install --production`したときにインストール**されない**
      - ユニットテスト関係など、開発のときにのみ必要なパッケージは--save-devをつけてインストールすべき。productionではウェブサイト全体のサイズを軽くしたいので、本番でいらない機能は切りたい。
- packaege-lock.json

### Linter
- .prettierrc.json
- .eslintrc.js

### testing
- jest.config.js
- cypress.json

### processing
- babel.config.js
- postcss.config.js
- .browserslistrc
   - CSSにおいてどのVendor Prefixを自動で付加するか、を指定するファイル
   - BabelやAutoprefixerは、このファイルを参考にする
   - Vendor Prefixはこういうやつ。３つともCSS3のtransitionをやるためのものだが、ブラウザごとに記法がずれているので何種類も書かないといけない
      - -webkit-transition:all 0.2s ease 0s;
      - -moz-transition:all 0.2s ease 0s;
      - -o-transition:all 0.2s ease 0s;
   - このファイルはとても小さい。「少なくとも各ブラウザの最新２バージョンは対応できるようにする」「ここ１年以内にリリースされたブラウザのバージョンに対応できるようにする」のように、何％のブラウザをカバーするのか指定する
   


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



