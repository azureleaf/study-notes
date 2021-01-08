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
-  Generate the `Welcome` \_VC + routes
-  Generate the `Article` MVC + migration + routes
-  Generate the `Comment` MVC + migration + routes
-  Connect the `Article` model to `Comment` model
-  Add auth to `Article` controller

## 2 Models
### Active Record Basics
### Active Record Migrations
### Active Record Validations
### Active Record Callbacks

- 利点：　Active Recordのオブジェクトが生成されたり、更新されたり、破壊されたりする（object life cycle）ときにその前後に操作をさしはさむcallback処理を記述できる。
- 用途：
  - 
- タイミング種別
  - object 作成：`before_validation`, `around_save`, `after_create`など
  - タイミング種別（object 更新）：`before_validation`, `around_save`, `before_update`など
  - タイミング種別（object 破壊）：`before_destroy`, `after_commit`, `after_rollback`など
  - タイミング種別（そのほか）: `after_initialize`, `after_find`, `after_touch`
  - 見た目が似ているが`before_action`などはcallbackではない。???
- callbackの発動：`create`、`destroy`、`save`、`update`、`find`系（これは`after_find` callbackのみ）などのメソッドでトリガーされる。
- callbackのスキップ
- callbackの停止
- 条件付きcallback: 既定で常に実行されてしまうcallbackを、`if`と`else`でトリガーするかどうか分岐できる。
- Callback Class: callback関数を使いまわせるように切り出す。`after_destroy PictureFileCallbacks.new`のように`new`して使う。
- Transaction Callback: 

*"commit"???*
*"around"???*
*"touch"???*

### Active Record Associations
### Active Record Query Interface
### Active Model Basics

## 3 Views

### Action View Overview

template：　Rubyの記法と組み合わせること、冗長な表現を省略することにより、生で書くよりも分量が減らせるのがいずれも特長。
- ERB: HTMLを生成する。
- Builder: XMLを生成する。
- JBuilder: JSONを生成する。

partial: 複数のテンプレートで共有される小さなパーツ
- `render` キーワードで呼び出す
- 名前（というか相対パス）でpartial同士を区別する。

### Layouts and Rendering in Rails
### Action View Helpers
### Action View Form Helpers

## 4 Controllers

### Action Controller Overview

### Rails Routing from the Outside In

## 5 Other Components
### Active Support Core Extensions
### Action Mailer Basics
### Action Mailbox Basics
### Action Text Overview
### Active Job Basics
### Active Storage Overview

- 利点： Active Recordにファイルを添付できる。これにより、

### Action Cable Overview

## 6 Digging Deeper

### Rails Internationalization (I18n) API
### Testing Rails Applications
### Securing Rails Applications
### Debugging Rails Applications
### Configuring Rails Applications
### The Rails Command Line
### The Asset Pipeline
### Working with JavaScript in Rails
### Autoloading and Reloading Constants (Zeitwerk Mode)
### Autoloading and Reloading Constants (Classic Mode)
### Caching with Rails: An Overview
### Active Support Instrumentation
### Using Rails for API-only Applications
### Active Record and PostgreSQL
### Multiple Databases with Active Record

## 7 Extending Rails
### The Basics of Creating Rails Plugins
### Rails on Rack
### Creating and Customizing Rails Generators & Templates
### Getting Started with Engines
### Threading and Code Execution in Rails