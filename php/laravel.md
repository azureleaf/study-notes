# Laravel Study Note

- Laravelで勉強したことを記録することで、自分のモチベーションを高めたい
- 細かいことは公式ドキュメントに任せて、要点とキーワードだけを網羅するように心がけたい。凝りだすとキリがないし...


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


## Set up the project

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



## Maintenance

- `composer dump-autoload` なぜか大体これをやれば解決
- `composer update` composer.jsonを更新した時にやる？


## Keywords

### Bootstrap
    - 

### Composer View:

### Validator

### Middleware

### View Composer

- What's this?
    - Viewがレンダリングされるとき（つまりコントローラでview()が実行される時）に呼び出されるコールバック関数かクラスメソッドのこと
    - viewがrenderされるたびに情報を変数として結合する
    - View Composerはサービスプロバイダを通じて登録する

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


### MVC vs ADR

### DB Facade vs Eloquent

- StackOverflowを見る限り、DB Classを使うことを推す人が結構いる。速度がEloquentよりずっと速いとか
- ただし、自分みたいに使うデータがめちゃくちゃ少ない場合にはEloquentでORMの使い方に慣れるほうが良さそう




