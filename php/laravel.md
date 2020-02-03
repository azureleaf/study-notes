# Laravel Study Note

- Laravelで勉強したことを記録することで、自分のモチベーションを高めたい
- 細かいことは公式ドキュメントに任せて、要点とキーワードだけを網羅するように心がけたい。凝りだすとキリがないし...

## TOC

1. [Setup](#setup-project)
1. [Session & Cookie](#session)
1. [](#)
1. [](#)

## Laravelでの基本的な処理手順

1. `public/index.php` Laravel Appの入り口。nginxやApache側から最初に投げられる場所
1. `app/Http/Kerne.php`
1. Service Provider
1. `routers/web.php` ここでrouting
1. Middleware 認証、データ加工、redirect, etc.
1. Controller　DBへのアクセス
1. Middleware


## (Install Composer)

## (Install Laravel)

## Set up MySQL

1. `sudo apt install mysql-server`
1. `sudo mysql`
1. `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_new_password_here';`
1. `sudo /etc/init.d/mysql stop`
1. `sudo /etc/init.d/mysql start`
1. `sudo apt install php-mysql` Install DB Extension


## Set up the project <a name="setup-project"></a>

1. `laravel new myapp`
1. `cd myapp`
1. `npm install`
1. `composer install`
1. `cp .env.sample .env`
1. `php artisan key:generate`

## Set up the DB

## Set up Middlewares

- Middleware Group
- Global Middleware
- 

## Set up Migrations & Seeders

`php artisan make:migration create_members_table`

## Set up Controllers

`php artisan make:controller UsersController`


## Set up Service Providers

1. `php artisan make:provider TestServiceProvider`
1. Register the service class to `register()` @`app/providers/TestServiceProvider.php` : この動作は「bindする」と呼ばれる
1. Register service provider itself @`config/app.php`


## Set up Blade




### Directive
Vue.jsを使うなら、Bladeのディレクティブはそんなに覚えなくて問題ないけど。以下くらいは抑えるべき

- @if
- @for
- @foreach


## Routing 

- routes/web.phpで定義するのが基本
- コントローラからルートを定義することもある

### 基本のRouting


- `Route::get('/user', 'UserController@index');`

Route Parameters
- `Route::get('user/{id}', 'UserController@show');`
- Regular Expression
```php
Route::get('user/{id}/{name}', function ($id, $name) {
    // 処理
})->where(['id' => '[0-9]+', 'name' => '[a-z]+']);
```



Routingにmiddlewareを組み合わせる
- `Route::get('profile', 'UserController@show')->middleware('auth');`: 外部に書く
- `Route::post($uri, $callback);`

### Resource Controller

`php artisan make:controller PhotoController --resource --model=Photo`: CRUDに則ったルーティングが自動で一括生成される

`Route::resource()`

```php
Route::resource('users', 'AdminUserController')
->parameters([
    'users' => 'admin_user'
]);
```





## Authentication (認証)

- 認証関係の設定はだいたい`config/auth.php`




- Laravelでの認証の種類
    - ログイン認証
    - Laravel Passport
    - API認証

- ログインを要求するページとログイン不要の公開ページをどのようにして一括登録するのか？
    - おそらくmiddleware groupだと思うが
- ログインページをどのようにしてカスタマイズするのか？

- `Auth::routes();`

### Guard
- Web Guard: sessionによる認証
- API Guard: tokenによる認証

#### PHP artisan migrat


## Authorization (認可)

- 認証が本人確認なのに対して、認可は権限の付与っぽい

### Gateによる認可

### Policyによる認可

### misc
- "localhost:8000/login"などのルートはweb.phpではなく、`Illuminate\Routing\Router.php`にある



### 他の便利機能

`Route::redirect('/here', '/there', 301);`

`Route::view('/welcome', 'welcome', ['name' => 'Taylor']);`


## Session & Cookie <a name="session"></a>

### そもそもセッションってなんだっけ？

- Session IDはユーザを識別するための番号
- Session IDをブラウザ側で保管する場所が、Cookie
- Session IDをサーバー側で保管する場所が、Session
- HTTPはstateless。しかし実用的なウェブサイトでは、ページ移動しても状態を保持できなきゃお話にならない。だからセッションができた
- 実装では、DBにユーザ情報を記憶する。こういうカラム
    - id
    - user_id
    - ip_address
    - user_agent
    - payload
    - last_update

### そもそもクッキーってなんだっけ？

- Cookieはkeyとvalueのペアからなる
- ChromeのDevTool > Application TabでCookieを確認可能
    - ここに書いてあるユーザIDは暗号化されるので、DBの値とは別物
- Cookieのデータには制約も多い
    - expirationあり。設定しない場合ブラウザが閉じると破棄される
    - Max size: 4096 bytes / domain, 50 cookies / domain
- Cookieの値はユーザ側で変えたい放題だと思うけど、それを使って他のユーザだと偽ることもできる？

### 使用手順

1. `SESSION_DRIVER=database`
1. `php artisan config:clear` Reflect the change in .env
1. `php artisan make:migration create_sessions_table`
1. Add schema to the migration file
1. Migrate
1. ``
1. ``


## Maintenance

- `composer dump-autoload` なぜか大体これをやれば解決
- `composer update` composer.jsonを更新した時にやる？



## Bootstrap
- 

## Composer View:

## Validator

## Middleware

## View Composer

- What's this?
    - Viewがレンダリングされるとき（つまりコントローラでview()が実行される時）に呼び出されるコールバック関数かクラスメソッドのこと
    - viewがrenderされるたびに情報を変数として結合する
    - View Composerはサービスプロバイダを通じて登録する

- View Composer vs Controller
    - DBへのアクセス、日付の挿入などを行えるという点で両者は共通している？？？
    - じゃあどう使い分けるのか？

- Advantage:
    - MVCを徹底できる； View logicをコントローラに書かず、またBlade template側にもロジックを入れないようにする
    - 
    
### View Creator



### Service Container / Service Provider / Dependency Injection
- サービスとは、メールの送信、暗号化、ファイル操作、などLaravelにおける操作の単位。サービスの実体はクラスのインスタンス。
- サービスコンテナは名前のごとく、サービスの容れ物。つまりクラスのインスタンスを管理する。「管理」というのはサービスの受け入れや取り出しに加えて、サービス同士の依存関係（クラスAがインスタンス化される前にクラスBがインスタンス化されている必要がある、など）を解決することも含む。
    - bind(): コンテナに新しいサービスを登録する。実行するたびに新しいインスタンスを生成する
    - singleton(): コンテナに新しいサービスを登録する。何度実行しても同じインスタンスを使いまわす
    - app(): コンテナ内のサービス一覧を確認
    - make(): コンテナからサービスを取り出す
- サービスプロバイダは、サービスをサービスコンテナにサービスを登録するのが仕事。


## MVC vs ADR

## DB Facade vs Eloquent

- StackOverflowを見る限り、DB Classを使うことを推す人が結構いる。速度がEloquentよりずっと速いとか
- ただし、自分みたいに使うデータがめちゃくちゃ少ない場合にはEloquentでORMの使い方に慣れるほうが良さそう

## Laravel + Vue.js

1. `composer require laravel/ui
1. `php artisan ui vue --auth`
1. `npm install`
1. `npm install vue` 不要？
1. `npm install vue-router` 不要？
1. `npm run dev`
1. Create Vue Component @resources/js/components/MyComponent.vue
1. Register Vue Component to resources/js/app.js: `Vue.component('example-component', require('./components/ExampleComponent.vue').default);`
1. Create resources/js/router.js for Vue Router
1. Add `<router-link>` and `<router-view>` to Blade file
1. `npm run watch`
1. `php artisan serve`


## Laravel実行環境の選択肢
- ローカルにインストール：　一番普通だけど、ローカル環境汚染が嫌なのと、複数パソコンで同一環境を再現するのが面倒
- Laradock：　王道のDocker。一番実用的な気がする。日本語のネット情報も豊富
- Homestead：　VirtualBox + Vagrant。公式が推奨してるけど、本当にそんなに使われているのか？
- Laravel Valet：　Mac専用だから自分には関係ない
