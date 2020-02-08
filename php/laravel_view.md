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
