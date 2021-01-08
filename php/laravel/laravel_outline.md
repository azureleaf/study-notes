# Laravel Outline

# ToC

- [Laravel Outline](#laravel-outline)
- [ToC](#toc)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Directory Structure](#directory-structure)
- [Architecture Concepts](#architecture-concepts)
  - [Request Lifecycle](#request-lifecycle)
  - [Service Container & Service Provider](#service-container--service-provider)
    - [DI](#di)
    - [Binding](#binding)
    - [Resolving](#resolving)
    - [Container Events](#container-events)
  - [Service Provider](#service-provider)
  - [Facade](#facade)
  - [Contract](#contract)
- [The Basics](#the-basics)
  - [Routing](#routing)
    - [Redirections](#redirections)
    - [View](#view)
    - [Route params](#route-params)
    - [Named Route](#named-route)
    - [Route Group](#route-group)
    - [Route Model Binding](#route-model-binding)
  - [Middleware](#middleware)
  - [CSRF Protection](#csrf-protection)
  - [Controllers](#controllers)
  - [Requests](#requests)
  - [Responses](#responses)
  - [Views](#views)
  - [URL Generation](#url-generation)
    - [Options](#options)
  - [Session](#session)
  - [Validation](#validation)
    - [Working with `$error`](#working-with-error)
    - [Validation Rules (default)](#validation-rules-default)
    - [Validation Rules (user-defined)](#validation-rules-user-defined)
    - [Conditionally adding rules](#conditionally-adding-rules)
    - [Validation Arrays](#validation-arrays)
  - [Error Handling](#error-handling)
  - [Logging](#logging)
- [Frontend](#frontend)
  - [Blade](#blade)
  - [Localization](#localization)
  - [Frontend Scaffolding](#frontend-scaffolding)
  - [Compiling Assets](#compiling-assets)
- [Security](#security)
  - [Facades for security](#facades-for-security)
  - [Helpers for security](#helpers-for-security)
  - [Controllers for security](#controllers-for-security)
  - [Config files for security](#config-files-for-security)
  - [artisan commands for security](#artisan-commands-for-security)
  - [Authentication](#authentication)
  - [API Authentication](#api-authentication)
  - [Authorization](#authorization)
  - [Email Verification](#email-verification)
  - [Encryption](#encryption)
  - [Hashing](#hashing)
  - [Password Reset](#password-reset)
- [Digging Deeper](#digging-deeper)
- [DB](#db)
  - [DB Summary](#db-summary)
  - [DB Syntax](#db-syntax)
  - [Query Builder](#query-builder)
  - [Pagination](#pagination)
  - [Migration](#migration)
  - [Seeding](#seeding)
  - [Redis](#redis)
- [Eloquent ORM](#eloquent-orm)
  - [At a glance](#at-a-glance)
  - [Eloquent Artisan Commands](#eloquent-artisan-commands)
  - [Models](#models)
  - [Relationships](#relationships)
  - [Collections](#collections)
  - [Mutators & Accessor](#mutators--accessor)
  - [API Resources](#api-resources)
  - [Serialization](#serialization)
- [Testing](#testing)
  - [Mocking](#mocking)
- [Official Packages](#official-packages)

# Getting Started

## Installation

以下の方法のどれか

- Composer でローカルに Laravel を install
  - `laravel new` などが使えるようになる
- Laravel 自体はインストールせず、composer の`create-project`コマンドを使う
- Laravel Homestead
  - LEMP 環境の Vagrant Box である
- Docker (Laradock)
- Docker (Laravel)
- Valet
  - for Mac users only

## Directory Structure

- app/
  - Broadcasting/
  - Console/
  - Events/
  - Exceptions/
  - Http/
  - Jobs/
  - Listeners/
  - Mail/
  - Notifications/
  - Policies/
  - Providers/
  - Rules/
- bootstrap/
- config/
- database/
- public/
- resources/
- routes/
- storage/
- tests/
- vendor/

# Architecture Concepts

## Request Lifecycle

1. Apache/Nginx がリクエストを受け取る
1. `public/index.php`

## Service Container & Service Provider

- Service Container は、クラスの依存関係と DI を行うツール

### DI

- DI は、クラスが依存するデータをクラスに自動で注入すること
- DI は普通コンストラクタで行う
- コンストラクタの引数の型としてクラスを指定すると、それが注入される

### Binding

- `$this->app->bind('bind対象', クラスを返すクロージャ);`
- Bind できるのはいろいろある
  - Class
  - Interface
  - Instance
  - Primitive
- 一回のみ resolve される場合は`$this->app->singleton()`
- Binding は Service Provider に登録される

### Resolving

- resolve というのは、ある名前を元にして実体を見つけにいくことか？
- `$api = $this->app->make('HelpSpot\API');`
-

### Container Events

## Service Provider

- Service providers are registered in `config/app.php`
- Service provider is a class
  - Create with `php artisan`
- Methods & Properties of service providers
  - `register()`
  - `boot()`
  - `provides()`
  - `$bindings`
  - `$singletons`

## Facade

- 外部ファイルのクラスをインポートする際の Path を短縮表記をする Proxy のように振る舞うが、実際はそうではない
  1. `Cache`ファサードで`Cache::get()`を呼ぶ
  2. `Cache`クラスの`getFacadeAccessor()`が呼ばれる
  3. このメソッドは binding が名前`cache`を設定するので、これに対応するサービスコンテナが呼ばれる
- Real-time Facade
  - Facade は本来`Illuminate\Support\Facades\`に定義される
  - Real-time Facade では任意のクラスを「Facade っぽく」使うことができる
  - これにより、記述量を減らせる
  - `use`でインポートする時に namespace`Facades\`を追加するだけで実現できる
- Facades vs DI
- Facades vs Helper Functions
  - そもそも helper function が何かと言うと、view の生成やイベント発火など様々な仕事をする関数
  - ヘルパー関数は多くの場合対応するファサードで書き換え可能

## Contract

- Set of PHP interfaces
- Defines framework core service
- Contracts VS Facades

# The Basics

## Routing

```php
// 1st arg: route
// 2nd arg: callback / controller + action
Route::get('/user', 'UserController@index');


/* specify route with regex */

```

- URI に正規表現を使いフィルタリングできる
  - `Route::get()->where()`で設定
  - Global Constraints (全ルートに対して正規表現でフィルター)もできる
  - このためには`boot()`の中で`Route::pattern()`する
- メソッド部分を配列にして複数のメソッドに同じ処理をできる
- POST/PUT/DELETE についてはウェブページ側で CSRF token の埋め込みがないとリクエストは拒否
- ルーティングの記述ファイル
  - `routes/web.php`は一般の Web 用のルート定義。メジャー
  - `routes/api.php`は API 用の stateless なルート定義。ちょっとマイナー

### Redirections

- `Route::redirect('/here', '/there', 301);`

### View

- Routing の clojure で`view()`する場合、短縮表記で`Route::view()`も可

### Route params

- `Route::get('user/{name?}', function ($name = 'John') { return $name;});`

  - optional route parameter

### Named Route

- 既に定義された route への参照を楽にする
- `Route::get()->name()`で定義

### Route Group

### Route Model Binding

- ルーティングの callback 内で Eloquent のモデルを呼び出す必要があるときに記述を楽にする仕組み
-

## Middleware

## CSRF Protection

## Controllers

- `class UserController extends Controller{}`
- 内部で定義するメソッドが action
- Single Action Controller: １つのアクションしか持たないと、ルーティングでアクション名指定が不要
- コントローラとミドルウェアをくっつけるのは２つの方法がある：
  - `Route::get('profile', 'UserController@show')->middleware('auth');`
  - コントローラのコンストラクタ内部で`$this->middleware('auth');`。これを Controller Middleware という？
- Resource Controller
- DI とコントローラの関係
- Route Caching

## Requests

## Responses

## Views

- Blade という template engine
- `view('admin.greeting', ['name' => 'James']);`
  - `resources/views/admin/greeting.blade.js`に変数を埋め込み描画
  - `resources/views/`をルートとして、ドットでディレクトリ構造を表現
- `View::` facade
- View Composer
  - View がレンダーされたときに呼ばれる関数・クラスメソッド
  - Service Provider で登録する
  -
- View 関係の artisan

## URL Generation

- When you want to get the URL inside the project, you don't have to fully specify it; you can "generate" it

### Options

- Using helper function `url()`
- Using helper function `route()`
- Using helper function `action()`
  - To access controller action
- Using facade `URL::`

## Session

- Session is necessary because you want these features while HTTP is stateless:
  - You want to identify the user after login
- Session Driver:
- You can use multiple session drivers; so DB isn't the only session storage for server-side
  - file
  - cookie
  - database
    - You need to create a table in advance
  - memcached
  - redis
  - array (not persistent)

## Validation

- Validate the `$request` inside controllers
- 3 ways to validate:
  - For simple validation: `$request->validate([検証ルールの組]);`
  - For mildly complex validation: Create "Form Request Class" and add its method `rules(){return [検証ルールの組]}`
  - For complex validation: Create validator with `Validator::make()` Facade
- When the validation failed, you need to feedback to the user
  - Validation error will be flashed session
  - When the validation failed, exception is thrown and the remaining procedures will be aborted
  - In `Blade`, use `$errors` directive to catch the validation error from the Laravel
- Using Form Request
  1. Create template with artisan
  2. Define rules in `rules()`
  3. Validate in the controller with DI: `store(form requestの名前 $request)`
  4. `$validated = $request->validated()`で検証済みデータを引き出せる
  - What's "validated data"??? How is it altered from the original request?
- Form Request methods inside a controller:
  - `rules(){return [検証ルール]}`
  - `authorize()`
  - `messages(){return [フォームのフィールド名＆それに対応するエラーメッセージの組]}`
  - `attributes(){}`
  - `prepareForValidation(){}`
- `Validator::` Facade inside a controller:
  - `$validator = Validator::make($request->all(), [RULES_HERE]);`
    - Define validator
    - 1st arg is the data to be validated
  - `$validator->fails()`
    - Get boolean to get the result of validation

### Working with `$error`

- `\$errors

### Validation Rules (default)

### Validation Rules (user-defined)

- Use this when you wanna use complex rules for a field, such as:
  - Check if the input text are all in uppercase
- Ways to define user-defined rule
  - Using Rule object
  - Using clojures
  - Using extensions
  - Using implicit extensions
- Rule Object
  - create with `artisan make:rule`
  - `passes()` method returns bool which tells the result of validation
  - `message()` method defines validation error message

### Conditionally adding rules

### Validation Arrays

## Error Handling

- Exception handler class has 2 methods: `report()` and `render()`

## Logging

- Configure in `config/logging.php`
- Channel とは
- Chennel Driver とは
-
- Log stack: 複数のログチャンネルを一つに連結したもの
- Log level: Seemingly same as Python `logging` lib
  - `Log::emergency($message);`
  - `Log::alert($message);`
  - `Log::critical($message);`
  - `Log::error($message);`
  - `Log::warning($message);`
  - `Log::notice($message);`
  - `Log::info($message);`
  - `Log::debug($message);`

# Frontend

## Blade

- Almost same as `Pug`
- You don't need to know Blade as long as you use Vue.js as the frontend
- Express の`res.render()`に相当するのが`return view()`っぽい
- Embed values with `{{ $name }}`
- `@extends`, `@section`, `@yield`みたいなコンポーネント系
- `@if`, `@foreach`みたいな制御構文系
- `@auth` to know if the user is authed
- `@php` to use raw Php
- `@csrf` required for all the pages with input forms
- `{{ $slot }}`

## Localization

- `setLocale(LANG_HERE)` to support multi-language
- `resources/lang` to define one-on-one translation for each lang

## Frontend Scaffolding

- Convenient to use these because Laravel is already prepared for these:
  - Bootstrap
  - Vue
  - React
  - Less / SASS
- Manage these with `npm`
- Laravel との接続は`composer require laravel/ui`が必要
- `php artisan ui`系で各種フロントエンドツールと連携

## Compiling Assets

- Laravel Mix により、Webpack でのビルド手順を定義できる
- `mix.sass(拡張子が.sassのファイル類を列記)`のようにして、どのファイルをコンパイルするか指定
- less, sass, stylus, postcss などなんでも対応している
- `mix.js()`や`mix.react()`などにより、JS や Vue ファイルのコンパイルやバンドリングを行う

# Security

## Facades for security

- `Hash::make()`
  - Hash the password
- `Hash::check()`
  - Verify the password
- `Hash::needsRehash()`
  - Check if the work factor has changed
-

## Helpers for security

- `encrypt()`

## Controllers for security

- `LoginController`
  - Uses Bcrypt by default
- `RegisterController`
  - Uses Bcrypt by default
- `UpdatePasswordController`
  - `update()` Hash the password in the `$request`

## Config files for security

- `config/app.php`
- `config/hashing.php`

## artisan commands for security

- `php artisan key:generate`

## Authentication

- Guard, Provider の 2 つを抑える
- ユーザ情報を記憶するためには当然 DB が必要。ユーザー用の Eloquent Model は既定で用意されている

## API Authentication

## Authorization

## Email Verification

## Encryption

- Encrypter for laravel is OpenSSL (AES-256, AES-128)
-

## Hashing

- Hashing is needed to store the password to DB securely
- Support 3 hashing drivers:
  - Bcrypt
  - Argon2i
  - Argon2id
- Work factor

## Password Reset

# Digging Deeper

# DB

## DB Summary

- 3 Ways to access to DB
  - Raw SQL
  - Fluent Query Builder
  - Eloquent ORM
- 4 DBs supported
  - MySQL
  - PostgreSQL
  - SQLite
  - SQL Server
- Listen to query events

## DB Syntax

- `config/database.php`
- `class RedisSubscribe extends Command`
- `DB::select()`
- `DB::insert()`
- `DB::update()`
- `DB::delete()`
- `DB::statement()`
- `DB::transaction()`
- `DB::beginTransaction()`
- `DB::table()`
- `DB::rollBack()`
- `DB::commit()`
- `DB::()`
- `Redis::get()`
- `Redis::lrange()`
- `Redis::set()`
- `Redis::command()`
- `Redis::connection()`
- `Redis::pipeline()`
- `Redis::publish()`
- `Redis::psubscribe()`
- `Redis::()`
-

## Query Builder

## Pagination

## Migration

- Migration is benefitial because you can version-control the DB schemas
- `Schema` facade
- `databse/migrations`
- `php artisan make:migration create_users_table`

## Seeding

## Redis

- Seemingly, for Laravel, Redis is recommended over memcached?
- What's Redis?
  - Key-value store
  - However key can contain: `string`, `hash`, `list`, `set`, `sorted set`
  - Redis can form "cluster"; group of Redis master nodes & Redis slave nodes
- Use either extension of the 2:
  - `PhpRedis` by PECL: Better performance than `predis`
  - `predis/predis` by composer
- Configure `config/database.php`
  - use of phpredis / predis
  - host URL & port
  - password
  - cluster setting
- Access
- Publish / Subscribe

# Eloquent ORM

## At a glance

- Model:
  - Model defines links between DB tables & PHP objects
  - Model is a class
- Collection:
  - Returned value with Eloquent by `get()` are Collection object
  - Collections are iterable
  - Collections have convenient methods
- Relationship
- Accessor & Mutator
  - Automatically apply methods to the Eloquent attributes
  - Similar to "computed property" of Vue.js
  - When the attr is accessed as getter, accessor works
  - When the attr is accessed as setter, mutator works
  - Accessors are defined in the model class

## Eloquent Artisan Commands

- `php artisan make:model Flight`
- `php artisan make:model Flight -m`
- `ucfirst()`

## Models

- Define a model

```php
class Flight extends Model
{
  // related table name is plural, model is singular
  protected $table = 'my_flights';

  // set default values
  protected $attributes = [
    'delayed' => false,
  ];

}

```

- Using a model

```php
$flights = App\Flight::all();

foreach ($flights as $flight) {
    echo $flight->name;
}

// you can use query builder
$flights = App\Flight::where('active', 1)
               ->orderBy('name', 'desc')
               ->take(10)
               ->get();
$flight = App\Flight::where('number', 'FR 900')->first();

// force re-retrieval from the DB
$freshFlight = $flight->fresh();

// Retrieval: by its primary key...
$flight = App\Flight::find(1);
$flights = App\Flight::find([1, 2, 3]);


// Retrieval: the first model matching the query constraints
$flight = App\Flight::where('active', 1)->first();
$flight = App\Flight::firstWhere('active', 1);

```

## Relationships

## Collections

```php
// vanilla PHP methods
foreach ($users as $user) {
    echo $user->name;
}

// filter active users, return list of their names
$names = $users->reject(function ($user) {
    return $user->active === false;
})
->map(function ($user) {
    return $user->name;
});

```

## Mutators & Accessor

- Purpose
  - Format strings
  - 

```php
class User extends Model
{
  // accessor
  // must be "get" + attr name + "Attribute"
  public function getFirstNameAttribute($value)
  {
    // always convert the string to upper case
    return ucfirst($value);
  }

  // mutator
  // must be "set" + attr name + "Attribute"
  public function setFirstNameAttribute($value)
  {
    // always convert the string to lower case
    $this->attributes['first_name'] = strtolower($value);
  }
}

```

## API Resources

## Serialization

# Testing

- `PHPUnit`
- `php artisan make:test UserTest --unit`
- Test Types
  - Unit Test
  - Console Test
  - Browser Test
  - DB Test

## Mocking

- Mock Object
- Bus fake
- Event fake
- Mail fake
- Notification fake
- Queue
- Storage

# Official Packages

