# Laravel Summary (Depth 1)

# ToC

- [Laravel Summary (Depth 1)](#laravel-summary-depth-1)
- [ToC](#toc)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Directory Structure](#directory-structure)
- [Architecture Concepts](#architecture-concepts)
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

1. Apache/Nginxがリクエストを受け取る
1. `public/index.php`

## Service Container
## Service Provider
## Facade
## Contract


# The Basics

## Routing

- `Route::get('/user', 'UserController@index');`が一般的な姿
- routingに正規表現が使えたり配列が使えたり
- `routes/web.php`は一般のWeb用のルート定義。メジャー
- `routes/api.php`はAPI用のstatelessなルート定義。ちょっとマイナー
- `Route::redirect('/here', '/there', 301);`
- Route Group

## Middleware

## CSRF Protection

## Controllers

- `class UserController extends Controller{}`
- 内部で定義するメソッドがaction
- Single Action Controller: １つのアクションしか持たないと、ルーティングでアクション名指定が不要
- コントローラとミドルウェアをくっつけるのは２つの方法がある：
  - `Route::get('profile', 'UserController@show')->middleware('auth');`
  - コントローラのコンストラクタ内部で`$this->middleware('auth');`。これをController Middlewareという？
- Resource Controller
- DIとコントローラの関係
- Route Caching

## Requests

## Responses

## Views

- Bladeというtemplate engine
- `view('admin.greeting', ['name' => 'James']);`
  - `resources/views/admin/greeting.blade.js`に変数を埋め込み描画
  - `resources/views/`をルートとして、ドットでディレクトリ構造を表現
- `View::` facade
- View Composer
  - Viewがレンダーされたときに呼ばれる関数・クラスメソッド
  - Service Providerで登録する
  - 
- View関係のartisan

## URL Generation

## Session

## Validation

## Error Handling

## Logging

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
- `@csrf` HTMLのformでは必須のやつ
- `{{ $slot }}` 

## Localization

- `setLocale(言語名)`を使って多言語対応
- `resources/lang`で一対一の翻訳対応を定義

## Frontend Scaffolding

- フロントエンドは以下についてはLaravel側に基本的な用意がされている
  - Bootstrap
  - 特にVue, だがReactも
  - Less / SASS
- それらはnpmで管理
- Laravelとの接続は`composer require laravel/ui`が必要
- `php artisan ui`系で各種フロントエンドツールと連携

## Compiling Assets

- Laravel Mixにより、Webpackでのビルド手順を定義できる
- `mix.sass(拡張子が.sassのファイル類を列記)`のようにして、どのファイルをコンパイルするか指定
- less, sass, stylus, postcssなどなんでも対応している
- `mix.js()`や`mix.react()`などにより、JSやVueファイルのコンパイルやバンドリングを行う


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
