# Laravel Outline

# ToC

- [Laravel Outline](#laravel-outline)
- [ToC](#toc)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Directory Structure](#directory-structure)
- [Architecture Concepts](#architecture-concepts)
  - [Request Lifecycle](#request-lifecycle)
  - [Service Container](#service-container)
    - [DI](#di)
    - [Binding](#binding)
    - [Resolving](#resolving)
    - [Container Events](#container-events)
  - [Service Provider](#service-provider)
  - [Facade](#facade)
  - [Contract](#contract)
- [The Basics](#the-basics)
  - [Routing](#routing)
  - [Middleware](#middleware)
  - [CSRF Protection](#csrf-protection)
  - [Controllers](#controllers)
  - [Requests](#requests)
  - [Responses](#responses)
  - [Views](#views)
  - [URL Generation](#url-generation)
  - [Session](#session)
  - [Validation](#validation)
  - [Error Handling](#error-handling)
  - [Logging](#logging)
- [Frontend](#frontend)
  - [Blade](#blade)
  - [Localization](#localization)
  - [Frontend Scaffolding](#frontend-scaffolding)
  - [Compiling Assets](#compiling-assets)
- [Security](#security)
  - [Authentication](#authentication)
- [Digging Deeper](#digging-deeper)
- [Database](#database)
- [Eloquent ORM](#eloquent-orm)
- [Testing](#testing)
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

## Service Container

- Service Container は、クラスの依存関係と DI を行うツール

### DI

- DI は、クラスが依存するデータをクラスに自動で注入すること
- DI は普通コンストラクタで行う
- コンストラクタの引数の型としてクラスを指定すると、それが注入される

### Binding

- `$this->app->bind('bind対象', クラスを返すクロージャ);`
- Bindできるのはいろいろある
  - Class
  - Interface
  - Instance
  - Primitive
- 一回のみresolveされる場合は`$this->app->singleton()`
- BindingはService Provider に登録される

### Resolving

- resolveというのは、ある名前を元にして実体を見つけにいくことか？
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

- 外部ファイルのクラスをインポートする際のPathを短縮表記をするProxyのように振る舞うが、実際はそうではない
  1. `Cache`ファサードで`Cache::get()`を呼ぶ
  2. `Cache`クラスの`getFacadeAccessor()`が呼ばれる
  3. このメソッドはbindingが名前`cache`を設定するので、これに対応するサービスコンテナが呼ばれる
- Real-time Facade
  - Facadeは本来`Illuminate\Support\Facades\`に定義される
  - Real-time Facadeでは任意のクラスを「Facadeっぽく」使うことができる
  - これにより、記述量を減らせる
  - `use`でインポートする時にnamespace`Facades\`を追加するだけで実現できる
- Facades vs DI
- Facades vs Helper Functions
  - そもそもhelper functionが何かと言うと、viewの生成やイベント発火など様々な仕事をする関数
  - ヘルパー関数は多くの場合対応するファサードで書き換え可能

## Contract

- Set of PHP interfaces
- Defines framework core service
- Contracts VS Facades

# The Basics

## Routing

- `Route::get('/user', 'UserController@index');`
- URI に正規表現を使いフィルタリングできる
  - `Route::get()->where()`で設定
  - Global Constraints (全ルートに対して正規表現でフィルター)もできる
  - このためには`boot()`の中で`Route::pattern()`する
- メソッド部分を配列にして複数のメソッドに同じ処理をできる
- POST/PUT/DELETE についてはウェブページ側で CSRF token の埋め込みがないとリクエストは拒否
- ルーティングの記述ファイル
  - `routes/web.php`は一般の Web 用のルート定義。メジャー
  - `routes/api.php`は API 用の stateless なルート定義。ちょっとマイナー
- `Route::redirect('/here', '/there', 301);`
- Routing の clojure で`view()`する場合、短縮表記で`Route::view()`も可
- `Route::get('user/{name?}', function ($name = 'John') { return $name;});`
  - optional route parameter
- Named Route
  - 既に定義された route への参照を楽にする
  - `Route::get()->name()`で定義
- Route Group
- Route Model Binding
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

## Session

## Validation

- 既定の検証も使えるし、自分で定義した検証方法も可能
- 

## Error Handling

## Logging

- Configure in `config/logging.php`
- Channelとは
- Chennel Driverとは
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

- Pug とほとんど同じ
- Vue.js をフロントに使うなら覚える必要なし
- Express の`res.render()`に相当するのが`return view()`っぽい
- 値の埋め込みは Vue や Pug と同じく`{{ $name }}`
- `@extends`, `@section`, `@yield`みたいなコンポーネント系
- `@if`, `@foreach`みたいな制御構文系
- `@auth`は便利かも
- `@php`は生の php
- `@csrf` HTML の form では必須のやつ
- `{{ $slot }}`

## Localization

- `setLocale(言語名)`を使って多言語対応
- `resources/lang`で一対一の翻訳対応を定義

## Frontend Scaffolding

- フロントエンドは以下については Laravel 側に基本的な用意がされている
  - Bootstrap
  - 特に Vue, だが React も
  - Less / SASS
- それらは npm で管理
- Laravel との接続は`composer require laravel/ui`が必要
- `php artisan ui`系で各種フロントエンドツールと連携

## Compiling Assets

- Laravel Mix により、Webpack でのビルド手順を定義できる
- `mix.sass(拡張子が.sassのファイル類を列記)`のようにして、どのファイルをコンパイルするか指定
- less, sass, stylus, postcss などなんでも対応している
- `mix.js()`や`mix.react()`などにより、JS や Vue ファイルのコンパイルやバンドリングを行う

# Security

## Authentication

- Guard, Provider の 2 つを抑える
- ユーザ情報を記憶するためには当然 DB が必要。ユーザー用の Eloquent Model は既定で用意されている

##

# Digging Deeper

# Database

# Eloquent ORM

# Testing

# Official Packages
