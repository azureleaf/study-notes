# Laravel View


## Blade Template


## Viewの返し方

### Directive

Vue.js を使うなら、Blade のディレクティブはそんなに覚えなくて問題ないけど。以下くらいは抑えるべき

- @if
- @for
- @foreach


## View Composer

- Viewが呼ばれるたびに自動で実行される処理を実装する機能
- 同じことをControllerやMiddlewareでもできるが、MVCモデルに従いきちんと機能を切り分ける意味ではView Composerを使うべき状況というものが存在する
  - 具体例は？
- View ComposerはService Providerで登録する
- 実装する機能の例：
  - Viewに常に一定のデータを埋め込む？（日付とか？）
  -


- What's this?

  - View がレンダリングされるとき（つまりコントローラで view()が実行される時）に呼び出されるコールバック関数かクラスメソッドのこと
  - view が render されるたびに情報を変数として結合する
  - View Composer はサービスプロバイダを通じて登録する

- View Composer vs Controller

  - DB へのアクセス、日付の挿入などを行えるという点で両者は共通している？？？
  - じゃあどう使い分けるのか？

- Advantage:
  - MVC を徹底できる； View logic をコントローラに書かず、また Blade template 側にもロジックを入れないようにする
  -

### View Creator

## MVC vs ADR