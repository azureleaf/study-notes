# Laravel Study Note

## ToC

- [Laravel Study Note](#laravel-study-note)
  - [ToC](#toc)
  - [MISC](#misc)
  - [Lifecycle](#lifecycle)
  - [(Install Composer)](#install-composer)
  - [(Install Laravel)](#install-laravel)
  - [Set up Middlewares](#set-up-middlewares)
  - [Set up Migrations & Seeders](#set-up-migrations--seeders)
  - [Set up Controllers](#set-up-controllers)
  - [Set up Service Providers](#set-up-service-providers)
  - [Composer](#composer)
  - [Event Broadcasting](#event-broadcasting)
    - [What is "event" in the first place?](#what-is-%22event%22-in-the-first-place)
    - [What's this?](#whats-this)
    - [How to broadcast](#how-to-broadcast)
    - [Procedure to add broadcasting](#procedure-to-add-broadcasting)
  - [Job & Queue & Worker](#job--queue--worker)
  - [Mail](#mail)
    - [How to send emails:](#how-to-send-emails)
    - [Set up](#set-up)
  - [Maintenance](#maintenance)
  - [Bootstrap](#bootstrap)
  - [DB Facade vs Eloquent](#db-facade-vs-eloquent)
  - [Debug inside app](#debug-inside-app)
    - [`dd()`](#dd)
    - [`var_export()`](#varexport)
    - [`var_dump()`](#vardump)
    - [`print_r()`](#printr)
  - [Laravel 実行環境の選択肢](#laravel-%e5%ae%9f%e8%a1%8c%e7%92%b0%e5%a2%83%e3%81%ae%e9%81%b8%e6%8a%9e%e8%82%a2)

## MISC

- IoC:
- Contract:
- Reflection:
- Model Factory
- `Illuminate`
   - namespace which contains all components of Laravel framework
- View Composer
- Broadcasting
- Event & Listener


## Lifecycle

1. `public/index.php`

   - Entry point of whole Laravel app
   - nginx or Apache pass the data to this point

   1. Autoloader を登録する `/vendor/autoload.php`
   1. Bootstrap the framework `/bootstrap/app.php`
   1. Take the kernel service out of service container
   1. Run `handle(\$request)` and generate response
      - この handle()が app の全処理(controller, middlewares, etc.)を含んでいる？
   1. Return response
   1. Terminate the kernel

1. `/vendor/autoload.php`
1. Require `/composer/autoload_real.php`
1. `/composer/autoload_real.php` 
1. `/bootstrap/app.php`
1. Instantiate \$app from Illuminate\Foundation\Application
1. Register `Http/Kernel` service to the service container
1. Register `Http/Kernel` service to the service container
1. Register `Http/Kernel` service to the service container

1. `app/Http/Kernel.php`
1. Service Provider
1. `routers/web.php`
   - Routing
1. Middleware (before)
   - Modify request
   - Auth, data processing, redirection, etc.
1. Controller
   - Access to DB, calculation, etc.
1. Middleware (after)
   - Modify response

## (Install Composer)

## (Install Laravel)



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
1. Register the service class to `register()` @`app/providers/TestServiceProvider.php` : この動作は「bind する」と呼ばれる
1. Register service provider itself @`config/app.php`

## Composer

- `composer install`
- `composer install --dev`
- `composer install --no-dev`
- `composer update`
  - Run this after you edit composer.json
- `composer require --dev phpunit/phpunit ^6.2`
- `composer install`

## Event Broadcasting

### What is "event" in the first place?

### What's this?

- Sending the
- WebSocket
- With broadcasting, you can implement useful functions such as:
  - Real-time notification on the website

### How to broadcast

- A. Pusher
- B. Redis

### Procedure to add broadcasting

1. Register `App\Providers\BroadcastServiceProvider::class,` @config\app.php (By default, this line is just commented out)
1. Set broadcast deriver @.env
1. `php artisan make:event TaskAdded`
1. Edit the generated event file:

   ```php
   use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

   class TaskAdded implements ShouldBroadcast
   {
       use Dispatchable, InteractsWithSockets, SerializesModels;
   }
   ```

## Job & Queue & Worker

- 実行待ちの Job のリストが Queue
- Job を処理するのが Worker

## Mail

- ウェブサイトからのパスワード再発行などをテストするには、ダミーの SMTP サーバが必要
- Mailtrap というオンラインサービスが便利。これを使うと fake の SMTP サーバが使える
  - You need to create account
- Sending & Receiving the mail can be done inside Mailtrap

### How to send emails:

- A. Using `Mail::send`
- B. Using `Mailable` class
- C. Using Gmail

### Set up

1. Edit .env
   ```
   MAIL_DRIVER=smtp
   MAIL_HOST=smtp.mailtrap.io
   MAIL_PORT=2525
   MAIL_USERNAME=XXXXXXX
   MAIL_PASSWORD=XXXXXXX
   MAIL_FROM_ADDRESS=from@example.com
   MAIL_FROM_NAME=Example
   ```
1. `php artisan make:cokntroller MailSendController` and edit it

   ```php
   namespace App\Http\Controllers;

   use Illuminate\Http\Request;

   use Mail;

   class MailSendController extends Controller
   {
       public function index(){

           $data = [];

           Mail::send('emails.welcome', $data, function($message){
               $message->to('abc987@example.com', 'Test')
               ->subject('This is a test mail');
           });
       }

   }
   ```

1. Edit web.php
   - `Route::get('/mail', 'MailSendController@index');`
1.

## Maintenance

- `composer dump-autoload` なぜか大体これをやれば解決
- `composer update` composer.json を更新した時にやる？

## Bootstrap

-



## DB Facade vs Eloquent

- StackOverflow を見る限り、DB Class を使うことを推す人が結構いる。速度が Eloquent よりずっと速いとか
- ただし、自分みたいに使うデータがめちゃくちゃ少ない場合には Eloquent で ORM の使い方に慣れるほうが良さそう


## Debug inside app

- 変数やクラスインスタンスの中身がどうなっているのか覗くための関数がいくつか用意されている
- ちなみにプログラミングにおけるdumpとは、メモリなどの記憶媒体からデータをコピーして画面やプリンタに表示することである。これによりデバッグを行う。

### `dd()`
- Laravel function
### `var_export()`
- PHP built-in
### `var_dump()`
- PHP built-in
### `print_r()`
- PHP built-in

## Laravel 実行環境の選択肢

- ローカルにインストール：　一番普通だけど、ローカル環境汚染が嫌なのと、複数パソコンで同一環境を再現するのが面倒
- Laradock：　みんな大好き Docker。一番実用的な気がする。日本語のネット情報も豊富
- Homestead：　 VirtualBox + Vagrant。公式が推奨してるけど、本当にそんなに使われているのか？
- Laravel Valet：　 Mac 専用だから自分には関係ない
