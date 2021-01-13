# Study Notes on Rails Docs

- [official Guides](https://guides.rubyonrails.org/)
- v6.1.0 (Dec., 2020)
- 写経することはあまり意味がないので、キーワードと概念をまとめるように心がけたい。

## ToC

- [Study Notes on Rails Docs](#study-notes-on-rails-docs)
  - [ToC](#toc)
  - [1 Start Here](#1-start-here)
    - [Getting started](#getting-started)
  - [2 Models](#2-models)
    - [Active Record Basics](#active-record-basics)
    - [Active Record Migrations](#active-record-migrations)
    - [Active Record Validations](#active-record-validations)
    - [Active Record Callbacks](#active-record-callbacks)
    - [Active Record Associations](#active-record-associations)
    - [Active Record Query Interface](#active-record-query-interface)
    - [Active Model Basics](#active-model-basics)
  - [3 Views](#3-views)
    - [Action View Overview](#action-view-overview)
    - [Layouts and Rendering in Rails](#layouts-and-rendering-in-rails)
    - [Action View Helpers](#action-view-helpers)
    - [Action View Form Helpers](#action-view-form-helpers)
  - [4 Controllers](#4-controllers)
    - [Action Controller Overview](#action-controller-overview)
    - [Rails Routing from the Outside In](#rails-routing-from-the-outside-in)
  - [5 Other Components](#5-other-components)
    - [Active Support Core Extensions](#active-support-core-extensions)
    - [Action Mailer Basics](#action-mailer-basics)
    - [Action Mailbox Basics](#action-mailbox-basics)
    - [Action Text Overview](#action-text-overview)
    - [Active Job Basics](#active-job-basics)
    - [Active Storage Overview](#active-storage-overview)
    - [Action Cable Overview](#action-cable-overview)
  - [6 Digging Deeper](#6-digging-deeper)
    - [Rails Internationalization (I18n) API](#rails-internationalization-i18n-api)
    - [Testing Rails Applications](#testing-rails-applications)
    - [Securing Rails Applications](#securing-rails-applications)
    - [Debugging Rails Applications](#debugging-rails-applications)
    - [Configuring Rails Applications](#configuring-rails-applications)
    - [The Rails Command Line](#the-rails-command-line)
    - [The Asset Pipeline](#the-asset-pipeline)
    - [Working with JavaScript in Rails](#working-with-javascript-in-rails)
    - [The Rails Initialization Process](#the-rails-initialization-process)
    - [Autoloading and Reloading Constants (Zeitwerk Mode)](#autoloading-and-reloading-constants-zeitwerk-mode)
    - [Autoloading and Reloading Constants (Classic Mode)](#autoloading-and-reloading-constants-classic-mode)
    - [Caching with Rails: An Overview](#caching-with-rails-an-overview)
    - [Active Support Instrumentation](#active-support-instrumentation)
    - [Using Rails for API-only Applications](#using-rails-for-api-only-applications)
    - [Active Record and PostgreSQL](#active-record-and-postgresql)
    - [Multiple Databases with Active Record](#multiple-databases-with-active-record)
  - [7 Extending Rails](#7-extending-rails)
    - [The Basics of Creating Rails Plugins](#the-basics-of-creating-rails-plugins)
    - [Rails on Rack](#rails-on-rack)
    - [Creating and Customizing Rails Generators & Templates](#creating-and-customizing-rails-generators--templates)
    - [Getting Started with Engines](#getting-started-with-engines)
    - [Threading and Code Execution in Rails](#threading-and-code-execution-in-rails)

## 1 Start Here

### Getting started

- Generate the `Welcome` \_VC + routes
- Generate the `Article` MVC + migration + routes
- Generate the `Comment` MVC + migration + routes
- Connect the `Article` model to `Comment` model
- Add auth to `Article` controller

## 2 Models

### Active Record Basics

### Active Record Migrations

### Active Record Validations

### Active Record Callbacks

- 利点：　 Active Record のオブジェクトが生成されたり、更新されたり、破壊されたりする（object life cycle）ときにその前後に操作をさしはさむ callback 処理を記述できる。
- ## 用途：
- タイミング種別
  - object 作成：`before_validation`, `around_save`, `after_create`など
  - タイミング種別（object 更新）：`before_validation`, `around_save`, `before_update`など
  - タイミング種別（object 破壊）：`before_destroy`, `after_commit`, `after_rollback`など
  - タイミング種別（そのほか）: `after_initialize`, `after_find`, `after_touch`
  - 見た目が似ているが`before_action`などは callback ではない。???
- callback の発動：`create`、`destroy`、`save`、`update`、`find`系（これは`after_find` callback のみ）などのメソッドでトリガーされる。
- callback のスキップ
- callback の停止
- 条件付き callback: 既定で常に実行されてしまう callback を、`if`と`else`でトリガーするかどうか分岐できる。
- Callback Class: callback 関数を使いまわせるように切り出す。`after_destroy PictureFileCallbacks.new`のように`new`して使う。
- Transaction Callback:

_"commit"???_
_"around"???_
_"touch"???_

### Active Record Associations

### Active Record Query Interface

### Active Model Basics

## 3 Views

### Action View Overview

template：　 Ruby の記法と組み合わせること、冗長な表現を省略することにより、生で書くよりも分量が減らせるのがいずれも特長。

- ERB: HTML を生成する。
- Builder: XML を生成する。
- JBuilder: JSON を生成する。

partial: 複数のテンプレートで共有される小さなパーツ

- `render "shared/menu"` は `shared/_menu.html.erb`パーシャルを利用する。
- render の引数のキーワード
  - `locals`: partial に渡すローカル変数。
  - `object`:
  - `as`:
  - `spacer_template`

layout

view paths

helpers: HTML 化したときに DOM に置換されるものが多い。これら以外にも無数にある。

- AssetTagHelper
- AtomFeedHelper
- BenchmarkHelper
- CacheHelper
- CaptureHelper
- DateHelper
- DebugHelper: `debug`メソッドは、内部のオブジェクトの中身を`<pre>`タグの中にページで表示
- FormHelper
- FormOptionsHelper:　ドロップダウンリスト、ラジオボタン、チェックボックスなどを
- FormTagHelper
- JavaScriptHelper
- NumberHelper
- SanitizeHelper
- CsrfHelper
  Localized Views

### Layouts and Rendering in Rails

### Action View Helpers

### Action View Form Helpers

## 4 Controllers

### Action Controller Overview

### Rails Routing from the Outside In

resourceful vs non-resourceful

- そもそものルーティング戦略として resourceful / non-resourceful の２種類があるが、基本的には resourceful を選択すべきである。
  - コントローラの構造を誰が見ても推測しやすくなる
  - 7 つの基本アクションのルートを定義せずに済むのでコードが短くなる
  - デフォルトで生成されるヘルパーをそのまま使えるのでコードが短くなる

基本

- `routes.rb`において上から順番に調べ、最初にマッチしたルートが有効になる。

resourceful routing

- `resource`はネストできる。`magazines` > `ads`のような関係があるときには、ネストによりルーティングが簡潔になる。
  - 注意点：２回以上ネストするのは好ましくない。
  - 解決策：`only:`キーワードにより深いネスト部分に ID を含めないようにするが、これは`:shallow`オプションでさらに簡潔に書ける。
- concern: 共通のルーティングを使いまわすことで、routes.rb を簡潔にできる。
- 既定の７つ以外に、RESTful なアクションを追加することもできる。使うときはルーティングに `:on`を記述。
  - member routing: id を含む場合
  - collection routing: id 不要の場合

non-resourceful routing
resourceful routing のカスタマイズ

ルーティングの調査とテスト：　本当に目論見通りのルーティングになっているのか知りたい

- `rails routes`で一覧表示。かなり巨大な表になるので、表示フォーマットオプションあり。
- `assert_*`系のメソッド： `routes.rb`でのパスの記述が、目論見通りの URL 文字列になっているかどうか、などを確認できる。

## 5 Other Components

### Active Support Core Extensions

### Action Mailer Basics

### Action Mailbox Basics

### Action Text Overview

### Active Job Basics

### Active Storage Overview

- 利点： Active Record にファイルを添付できる。これにより、

### Action Cable Overview

## 6 Digging Deeper

### Rails Internationalization (I18n) API

### Testing Rails Applications

長い（未完）

- `test/`ディレクトリ内部にテスト対象ごとにテストファイルの置き場がある： `helpers`, `controllers`, `models`...
- env: development, test, productionの３つのうちtest環境が選択される。

### Securing Rails Applications

### Debugging Rails Applications

view helpers: `.erb`ファイルなどに記述する。
- `debug`: `<pre>`を生成して中身を表示
- `to_yaml`: `<pre>`の中にYAML形式で表示
- `inspect`: 配列やハッシュを表示するのに便利

Logger
- 出力レベルは6つある：　:debug、:info、:warn、:error、:fatal、:unknown
- コントローラに`logger.debug "New article created"`のように書くなどして使う
- ログを出力する際にタグ付けしてフィルタリングしやすくできる。

`byebug` gem
- `byebug`とapp内で記述すると、その場所で処理を中断できる。
- context: 中断位置までの経過や変数状態などが自動で要約されたもの。
- 中断中にbyebugのターミナル上でいくつかのコマンドが使える。
  - list-
  - backtrace / where
  - frame 4 / up / down
  - thread
  - next
  - instance_variables
  - step
  - break 22
  - quit

`web-console` gem
- byebugと同じようなものだが、ブラウザ上で動作する点が違う。

`Valgrind`ツール
- memory leak

plugins
- `pry`など（これが一番有名な気がする）

### Configuring Rails Applications

_The Rails Initialization Process_ も初期化関係なので参照

- Rails 初期化コードは４か所に置かれる
  - config/application.rb
  - initializer (config/initiazliers にある)
  - after initializer
  - 各種の設定ファイル
    - database.yml
- 実行順序
  1. config/application.rb の `require rails/all`行より前にあるコード
  2. フレームワーク読み込み
  3. gem 読み込み
  4. initializer 読み込み:
  5. config.after_initialize に渡したブロックのコード
- 環境変数: `ENV["RAILS_ENV"]` ,`ENV["RAILS_RELATIVE_URL_ROOT"]`
- ## 初期化イベントは５つある。
- config/application.rb
  - Rails 全般の設定：ログ関係、キャッシュ関係、

### The Rails Command Line

`rails`ではじまるコマンドの使い方。

### The Asset Pipeline

アセットパイプラインとは、

### Working with JavaScript in Rails

- Ajax
- CoffeeScript を使って記述を楽にする例が紹介されている...が、CoffeeScript はあまり使われておらず避けられることが多い気がするので、JS を使えばよいと思う。
- UJS: Unobstructive JavaScript: HTML の中に JS を極力入れないという方向性。これによりコードの保守性を上げる。
- 組み込みヘルパー
  - form_with
  - link_to
  - button_to
- `data-*`: HTML において data-系の属性は、フレームワークや開発者が自由に設定できる。
  - data-method
  - data-url
  - data-params
  - data-type
  - data-confirm
  - data-disable-with
- `rails-ujs`: Rails の機能の一部になっている。
  - `ajax:before`
  - `ajax:error`
- Ajax リクエストに対しては、JSON を返す設計にすることが多い。

Turbolinks

Ajax と CSRF

### The Rails Initialization Process

- `rails server`したときに内部で何が起こるのかを追う

1. `railties/exe/rails`
2. `railties/lib/rails/app_loader.rb`：ここで exec ruby コマンドに変化
3. `bin/rails`
4. `config/boot.rb`
5. `rails/commands.rb`
6. `rails/command.rb`
7. `actionpack/lib/action_dispatch.rb`
8. `rails/commands/server_command.rb`
9. `Rack: lib/rack/server.rb`
10. `config/application`
11. `Rails::Server#start`
12. `config/environment.rb`
13. `config/application.rb`

- 次に,Rails を読み込む

```sh
railties/lib/rails/all.rb
config/environment.rbに戻る
railties/lib/rails/application.rb
Rack: lib/rack/server.rb
```

- 疑問

```rb
next
.reverse_each

```

### Autoloading and Reloading Constants (Zeitwerk Mode)



### Autoloading and Reloading Constants (Classic Mode)

### Caching with Rails: An Overview

キャッシュの目的：　リクエスト/レスポンスサイクルの中で生成されたコンテンツを保存しておき、同じようなリクエストが来たらそのコンテンツを再利用すること。これはサーバのパフォーマンス向上につながる。

Rails既定のキャッシュ方式
- Page Cache
- Action Cache
- Fragment Cache
  - キャッシュ

キャッシュストア
- キャッシュは名前空間を作成できる。
- キャッシュは複数のapp間で共有できる。
- キャッシュは圧縮できる。
- キャッシュは期限を設定できる。
- キャッシュは最大サイズを設定できる。
- キャッシュの保存先は複数から選択できる：　メモリ、ファイル、memcachedサーバ、Redis Cache Store

キャッシュのキー

Conditional GET
- GETリクエストへのレスポンスが前回のリクエストのときとまったく変わっていない場合はブラウザ内キャッシュを使ってもよいと、webサーバーからブラウザに通知します。
- ETag


### Active Support Instrumentation

Active SupportはRubyの拡張やユーティリティを提供する。

Instrumentation APIはActive Supportに含まれており、Railsのイベント動作を計測できる。
  - 例：SQLクエリが発行されるごとに呼び出されるフックを購読することで、クエリ実行数を追跡する。
  - view, controller, mail, active record, storage, jobなど様々なイベントに対応している。
  - カスタムイベントも記述できる。

Subscribe (購読)


### Using Rails for API-only Applications

ウェブサイトではなく、JSONを返すサーバーを構築したいときに。


層：ミドルウェア層と

ミドルウェア層
- 透過的な再読み込み：

Action Pack層


### Active Record and PostgreSQL

### Multiple Databases with Active Record

## 7 Extending Rails

### The Basics of Creating Rails Plugins

### Rails on Rack

### Creating and Customizing Rails Generators & Templates

### Getting Started with Engines

### Threading and Code Execution in Rails
