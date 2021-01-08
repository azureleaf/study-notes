# RoR

## ToC

- [RoR](#ror)
  - [ToC](#toc)
  - [Installation](#installation)
    - [Install Ruby with Rbenv](#install-ruby-with-rbenv)
    - [Install dependencies for the Rails project](#install-dependencies-for-the-rails-project)
    - [Key files](#key-files)
    - [Functionalities](#functionalities)
  - [Rails Command](#rails-command)
  - [Default config for resourceful routes](#default-config-for-resourceful-routes)
  - [Naming](#naming)
  - [Views](#views)
    - [Render](#render)
    - [Section](#section)
    - [View Helpers](#view-helpers)
    - [Forms](#forms)
    - [Validation](#validation)
    - [Partials](#partials)
    - [MISC](#misc)
  - [Controller & Rails Router](#controller--rails-router)
    - [Params](#params)
    - [Routing with DSL](#routing-with-dsl)
    - [Session & Cookie](#session--cookie)
  - [Models / Active Records](#models--active-records)
    - [Keywords](#keywords)
    - [Basics](#basics)
    - [Conditions](#conditions)
    - [Limit](#limit)
    - [Calculation](#calculation)
    - [Active Records](#active-records)
    - [Active Record Callbacks](#active-record-callbacks)
    - [ActiveModel](#activemodel)
    - [Authentication](#authentication)
    - [Migration](#migration)
    - [Association](#association)
  - [API-only App](#api-only-app)
  - [VS Code](#vs-code)
  - [Troubleshooting](#troubleshooting)
  - [Postgres + Rails + Heroku](#postgres--rails--heroku)
    - [Create the Project](#create-the-project)
    - [Introduce Bootstrap](#introduce-bootstrap)
    - [Introduce PostgreSQL](#introduce-postgresql)
    - [Configure Rails for Postgres](#configure-rails-for-postgres)
  - [Bundler](#bundler)
  - [Internationalization](#internationalization)
  - [6.9 Initializer](#69-initializer)
  - [7.3 Generator](#73-generator)
    - [Methods：　ファイルの生成などの実作業を制御する。](#methodsファイルの生成などの実作業を制御する)
    - [Config](#config)
  - [Tips](#tips)
    - [Bundle execとは](#bundle-execとは)
    - [rake vs rails](#rake-vs-rails)
  - [受けたコードレビューの要旨](#受けたコードレビューの要旨)
  - [Basics: pikawaka](#basics-pikawaka)
  - [form_with vs form_with + form_tag](#form_with-vs-form_with--form_tag)

## Installation

### Install Ruby with Rbenv

- Installed on Oct. 30, 2020 on Ubuntu 20.04 (WSL)
- [rbenv official](https://github.com/rbenv/rbenv)
- [rbenv installer official](https://github.com/rbenv/rbenv-installer)

```sh

echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# This clones the rbenv to ~/.rbenv, and build it
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-installer | bash

echo 'eval "$(rbenv init -)"' >> ~/.bashrc
source ~/.bashrc

# This adds ~/.rbenv/shim in the path
rbenv init

# validate installation
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-doctor | bash

# install ruby
rbenv install -l # list the stable ruby versions
rbenv install 2.7.2
rbenv install -L # list the local ruby versions
rbenv global 2.7.2 # use the ruby version globally
rbenv local 2.7.2 # optional: when you want to use the ruby version inside the specific dir only

sudo apt update

# node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
nvm ls-remote --lts
nvm install v14.15.0 # choose the latest lts
nvm use v14.15.0 # if necessary
nvm ls # check current version

# yarn
# Procedure described in the official website using "apt install yarn" failed;
# yarn installed by this gets "git+0.32" version which Ruby doesn't recognize correctly
npm install -g yarn

# rails
gem install rails

# sqlite3 (optional)
sudo apt install sqlite3
```

### Install dependencies for the Rails project

```sh
# Choose the right version of Node.js
# As of Nov. 2020, v15 wasn't compatible with the latest RoR
nvm use v10.23.0 # for example

# For new project:
rails new my_project # Hyphenation in the project name (e.g. my-project) caused "Errno::EACCES: Permission denied @ rb_file_s_rename"
rails webpacker:install

# For existing project:
bundle install # on Gemfile
yarn install # on package.json
rails migrate # if the app uses DB
```



### Key files

```sh
app/
  controllers/blahblah_controller.rb
  views/blahblah/
  models/
config/
  routes.rb
db
  migrate/YYYYMMDDHHMMSS_create_articles.rb
  schema.rb

```

### Functionalities

- Article: Title & Body
  - create
  - show single / show multiple
  - edit
  - delete (with its comments)
- Comment: Commentor & Body
  - create
  - show
  - edit
  - delete

## Rails Command

```sh
# use local rail to create project
rails new MyProject

bin/rails webpacker:install

bin/rails server


# show settings
bin/rails routes
bin/rails middleware

#
# Rails generation
#
rails g controller Articles # controller, view, routing
rails g model Article # model, migration
rails g migration Article # migration
rails g scaffold Article # controller, view, model, migration, routing

# delete
rails d controller article #

# controller:
# create app/controllers/patients_controller.rb
# create app/views/patients
# create test/controllers/patients_controller_test.rb
# create app/helpers/patients_helper.rb
# create app/assets/stylesheets/patients.scss
bin/rails g controller Articles index
bin/rails g controller Articles # Generate the views for all the action


# migration:
# create db/migrate/20200101012345_create_patients.rb
# create app/models/patient.rb
# create test/models/patient_test.rb
# create test/fixtures/patients.yml
bin/rails g model Article title:string text:string # model + migration
bin/rails g migration CreateProducts name:string part_number:string
bin/rails g migration AddPartNumberToProducts part_number:string
bin/rails g migration AddPartNumberToProducts part_number:string:index
bin/rails g migration ChangeProductsPrice
bin/rails g migration RemovePartNumberFromProducts part_number:string
bin/rails g migration AddUserRefToProducts user:references
bin/rails db:migrate
bin/rails db:reset # drop DB, restore from db/schema.rb (Migration files not considered)
bin/rails db:migrate:reset # drop DB, renew db/schema.rb (Migration files considered)

# production
bin/rails db:create RAILS_ENV=production
bin/rails db:migrate RAILS_ENV=production
rake assets:precompile RAILS_ENV=production assets:clean
bundle exec rails s -e production
```

## Default config for resourceful routes

- In the controller file, better keep this order of actions!

| helper            | verb   | uri                          | controller#action |
| :---------------- | :----- | :--------------------------- | :---------------- |
| patients_path     | GET    | /patients(.:format)          | patients#index    |
|                   | POST   | /patients(.:format)          | patients#create   |
| new_patient_path  | GET    | /patients/new(.:format)      | patients#new      |
| edit_patient_path | GET    | /patients/:id/edit(.:format) | patients#edit     |
| patient_path      | GET    | /patients/:id(.:format)      | patients#show     |
|                   | PATCH  | /patients/:id(.:format)      | patients#update   |
|                   | PUT    | /patients/:id(.:format)      | patients#update   |
|                   | DELETE | /patients/:id(.:format)      | patients#destroy  |

## Naming

```rb
# routes.rb
resources :articles

# Helpers (automatically named after `resources`)
articles_path # etc.

#views/articles/new.html.erb (named manually)
scope: :article

# Controller: articles_controller.rb (named by "rails generate controller")
class ArticlesController < ApplicationController # CamelCase

# Migration

```

## Views

### Render

```rb
render "products/edit"
redirect_to(@product)	# returns redirection
head() # returns HTTP header only
send_file
send_data	streaming

# default rendering type is .erb. However it can take various types: plain, html, js, json, etc.
render plain: "OK"
render status: 500
render :json => { name: "yamada" } # json will be serialized


redirect_to article_path, status: 301
redirect_to @article


```

### Section

```rb
yield
yield :head # Placeholder
content_for :head do # Content to be inserted

```

### View Helpers

```rb
form_with() # create form
link_to() # create link
button_to() # create button

data: {
  confrim: 'are you sure?', # will be "data-confirm"
  "disable-with": "Saving...",
}


# form_with
scope: # ???
url:
local: true # true for HTML form submission, false for Ajax submimission

```

### Forms

```rb
<form action=""></form>

# Embed hidden input of CSRF token. Yields Form Builder Object
form_with scope: :article, url: articles_path, local: true do |f|
form_with(url: "/search", method: "get") do |f|
form_with model: @article do |f|


# Generate sub-tags inside <form>
f.label :title
f.text_field :title
f.text_area :text
f.submit data:  { "disable-with": "Saving..." }

label_tag(:q, "Search for:")
text_field_tag(:q)
submit_tag("Search")

check_box_tag(:pet_dog)

radio_button_tag(:age, "child")
```

### Validation

### Partials

### MISC

```rb
# Asset Tag Helper
javascript_include_tag "main"
stylesheet_link_tag "main", "photos/columns"
image_tag "icons/delete.gif", {height: 45}

# helper?
linked_to
time_ago_in_words()
```

## Controller & Rails Router

- Action is a method of the controller
- A controller is inherited from `ApplicationController`
- Actions must be `public`
- Actions must be declared prior to `private` methods

```rb
class ArticlesController < ApplicationController
  def create
    # This new instance is available in views
    @article = Article.new(params[:article]) # FAILS
    @article = Article.new(params.require(:article).permit(:title, :text)) # ok

    @article.save
    redirect_to @article
  end

  def default_url_options
    { locale: I18n.locale } # must return hash
  end
end
```

### Params

- Both params can be accessed in the same way:
  - Route params
  - POST request body params
- Params can be JSON

```rb

# access to param
params[:article]
params[:article].inspect # to readable string

# This fails, because the param :person isn't permitted
def create
  Person.create(params[:person])
end

params.require(:article).permit(:title, :text) # strong parameters
params.require(:article).permit! # permit all



```

### Routing with DSL

- DSL
  - Order of description matters; route of the 1st match will be applied.

```rb
#
# config/routes.rb
#
# Ruby DSL
Rails.applicaiton.routes.draw do
  # route the access to "/welcome/index" to "Welcome" controller "index" action
  get 'welcome/index'
  get '/patients/:id', to: 'patients#show'
  get '/patients/:id', to: 'patients#show', as: 'patient'

  # route the access to "/" to "Welcome" controller "index" action
  root 'welcome#index'

  # route the access to: "/articles/<CRUD actions>
  resources :articles

  # namespace
  # Requires this dir structure as well;
  # articles/ & comments/ must be put under app/controllers/admin
  namespace :admin do
    resources :articles, :comments
  end
end
```

- Path and URL Helpers for corresponding views
  - `article` is named after `resources:` in DSL
  - Can be manually set by `as:` keyword

```rb
#
# `views/articles/update.html.erb`
#
articles_path # plural
article_path(:id) # singular
new_article_path
edit_article_path(:id)

```

### Session & Cookie

- `memcached` is the default cache store

```rb
ActionDispatch::Session::CookieStore # Store on the client. Up to 4 KB
ActionDispatch::Session::CacheStore #
ActionDispatch::Session::ActiveRecordStore # Store in the server DB

session[:current_user_id]

cookies[:commenter_name]
cookies.delete(:commenter_name)

```

## Models / Active Records

### Keywords

- Scope
  - whereクエリに別名を与えるような使い方
  - 実際に使うときに短くて済むので、可動性up。
  - 引数をとることもできるので、柔軟性高い。
  - スコープ同士を連結できる。
  - default_scopeで全てのクエリに暗黙でscopeを付けることができる。
  - 逆に、unscopedを使ってかかっているscopeを外すこともできる。
- Enums
  - 属性がその値になっている全てのレコードを抽出できる。
  - あるレコードの値が、特定の値になっているのか「?」で抽出できる。
  - 同じ値を持つenumを定義できない（するなら`prefix: true`が必要）なのは、このへんに理由がありそう。
- Method Chaining
- find_by_sql

### Basics

```rb

#
customer = Customer.find(10)
customers = Customer.find([1, 10])
customer = Customer.take
customer = Customer.take(10)
customer = Customer.take!(10)
customer = Customer.first
customers = Customer.first(3)
customer = Customer.last
customer = Customer.order(:first_name).first

# equivalent two notations
Customer.find_by first_name: 'Lifo'
Customer.where(first_name: 'Lifo').take

# equivalent
Customer.find_by! first_name: 'does not exist'

# BAD
Customer.all.each do |customer|
  NewsMailer.weekly(customer).deliver_now
end

# GOOD
Customer.find_each do |customer|
  NewsMailer.weekly(customer).deliver_now
end


# Scope
#
scope :in_print, -> { where(out_of_print: false) } # controller


```

### Conditions

```rb
Customer.where.not(orders_count: [1,3,5])
Customer.where(last_name: 'Smith').or(Customer.where(orders_count: [1,3,5]))


```

### Limit

```rb
Customer.order(:created_at)
Customer.order(created_at: :desc)
Customer.order(created_at: :asc)


Book.select(:isbn, :out_of_print)
Customer.select(:last_name).distinct


Customer.limit(5)
Customer.limit(5).offset(30)

Book.where('id > 100').limit(20).order('id desc').unscope(:order)
Book.where('id > 10').limit(20).order('id desc').only(:order, :where)


# group
Order.group(:status).count


# exists
Customer.exists?(1)
Order.shipped.any?
Order.many?
Order.any?

```

### Calculation


```rb
Customer.count
Order.average("subtotal")
Order.minimum("subtotal")
Order.maximum("subtotal")
Order.sum("subtotal")



```
### Active Records

```rb

# Access
user1.save # Returns a bool to tell if saving was successful
User.create()	# shorthand: User.new + user1.save
User.all
User.first
User.order()
user1.update() # shorthand: assignments +  user1.save
User.update_all	 # shorthand
user1.destroy
User.destroy_by()	# shorthand: find_by + user1.destroy
User.destroy_all	# shorthand

# Value of the Boolean col can be accessed with "?"
user1.activated?
user1.admin?

# Search
User.find()	# find by id. Get a single record
User.find_by()	# find by id / values but id. Get a single record
User.where()	# find by arbitrary criteria. Get multiple records

```


### Active Record Callbacks

### ActiveModel

- ActiveRecord

```rb
ActiveModel::Serialization

```

### Authentication

```rb
class User < ActiveRecord::Base
  has_secure_password validations: false
end

user1.authenticate()
user1.has_secure_password
user1.recovery_password
user1.recovery_password_digest

```

### Migration

```rb
class CreateArticles < ActiveRecord::Migration[6.0]
  # change methods runs on migration
  def change
    create_table :articles do |t| # what's this syntax???
      # primary key "id" will be inserted implicitly
      t.string :title # what's this syntax???
      t.text :text

      t.timestamps
    end
  end
end

create_table :articles # Create "articles" table
create_table :products, options: "ENGINE=BLACKHOLE" do |t|
t.string # type?
t.timestamps # adds created_at & updated_at


def change
  # table
  create_table :products do |t|

  end
  drop_table :products do |t|

  end
  # Seemingly, change_table is wrapper for methods below
  change_table :products do |t|
    t.remove :description, :name
    t.string :part_number
    t.index :part_number
    t.column :name, :string, limit: 60
    t.rename :upccode, :upc_code
  end
  rename_table :products


  # col
  # last value is "column modifier"
  add_column :products, :part_number, :string
  change_column :products, :part_number, :text
  remove_column :products, :part_number, :string
  change_column_null :products, :name, false
  change_column_default :products, :approved, from: true, to: false

  add_foreign_key :articles, :authors
  remove_foreign_key
  add_reference :products, :user, foreign_key: true
  remove_reference
  add_index :products, :part_number
  remove_index

  create_join_table :products, :categories
  drop_join_table

  # reverse
  reversible do |dir|
    change_table :products do |t|
      dir.up   { t.change :price, :string }
      dir.down { t.change :price, :integer }
    end
  end
```

### Association

## API-only App

```sh
rails new my_api --api

```

## VS Code

- Install Rubocop

```sh
gem install rubocop
```

- Ruby (by Peng Lv) Extension
- ruby-robocop Extension
- settings.json

## Troubleshooting

- `node-gyp` fails because it tries to find `python2` in the environment variables.

  - Downgrading node version from 15 to 10 worked.
  - `npm install -g node-gyp` is also necessary? not sure.

- `Errno::EACCES: Permission denied @ rb_file_s_rename` on `rails new`
  - Remove hyphenation in the project name (e.g. my-project). It's not allowed.

## Postgres + Rails + Heroku

### Create the Project

- `rails new . -d postgresql` としておけば、楽だった。DB を指定しないと SQLite になる

```sh
nvm use v10
node -v
rails new .
rails webpacker:install
```


### Introduce Bootstrap

```sh
yarn add bootstrap jquery popper.js
```

```js
/**
 * Add to app/assets/stylesheets/application.scss
 */
@import "bootstrap/scss/bootstrap"; // put in the end of the file

/**
 * app/javascript/packs/application.js
 */
import 'bootstrap'
require("@rails/ujs").start()	require("@rails/ujs").start() // existing line

/**
 * config/webpack/environment.js
 */
const { environment } = require("@rails/webpacker"); // existing line
const webpack = require("webpack");
environment.plugins.append(
  "Provide",
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    Popper: ["popper.js", "default"],
  })
);
module.exports = environment; // existing line
```

### Introduce PostgreSQL

- `createdb myapp_test`などを行うチュートリアルもあるが、ＤＢは migration 時に自動で作成されるので不要。

```sh
# Installation (for the 1st run only)
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get -y install postgresql

# Create the role for this app
sudo -i -u postgres # change the Ubuntu user to postgres
createuser -d -P -e myapp # -d: CREATE DB privilege, -P: password, -e: echo details

# Check if the user is successfully created
psql
\du # display users
\l # list DBs
\q

exit
```

- 後に出てくる `createdb` 系コマンドが `WARNING: could not flush dirty data: Function not implemented`エラーを出すのに対する対策
- ただし、不要かもしれない

```sh
# /etc/postgresql/13/main/postgresql.confの最後尾に追加
fsync = off
data_sync_retry = true

# restart postgresql
sudo service postgresql restart
```

- 以下はユーザ作成にあたり不要だったし、やらない方がいいっぽい（古いやりかた？）

```sh
sudo -u postgres psql
CREATE ROLE myapp WITH CREATEDB LOGIN PASSWORD 'blah';
\q

sudo vim /etc/postgresql/13/main/pg_hba.conf
# Change line: "local all postgres peer" to "local all postgres md5"
sudo service postgresql restart
```

### Configure Rails for Postgres

```yml
# config/database.yml
default: &default
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  username: myapp
  password: <%= ENV['myapp_DB_PASSWORD'] %>
  host: localhost # lack of this line caused "peer authentication failed" error
  timeout: 5000

development:
  <<: *default
  database: myapp_development

test:
  <<: *default
  database: myapp_test

production:
  <<: *default
  database: myapp_production
```

```sh
sudo apt install libpq-dev # pg gem dependency
echo "gem 'pg'" >> Gemfile
bundle install

# パスワードを直接database.ymlに保存しないため
echo 'export myapp_DB_PASSWORD="blah"' >> ~/.bash_profile

rails db:migrate:reset
rails s
```

## Bundler

```sh
bundle # maybe same as "bundle install"
bundle install # install from Gemfile
bundle install --without production # install except "group :production do" block gems

```

## Internationalization

- 言語、時間などの設定

```yml



time:
  formats:
    default: "%Y年%-m月%-d日"
    number: "%Y%m%d"

```


```sh
printf "rails-i18n" >> Gemfile
printf "enum-help" >> Gemfile
bundle install

# config/application.rb
config.i18n.default_locale = :ja
config.time_zone = "Tokyo"
config.active_record.default_timezone = :local

```

## 6.9 Initializer

```rb
railties/exe/rails
railties/lib/rails/app_loader.rb
bin/rails
config/boot.rb
rails/commands.rb
rails/command.rb
actionpack/lib/action_dispatch.rb
rails/commands/server_command.rb
Rack: lib/rack/server.rb
config/application
Rails::Server#start
config/environment.rb
config/application.rb
railties/lib/rails/all.rb
```

## 7.3 Generator

- ThorというCLI作成支援のgemを利用している。
- `rails new` も `rails g` コマンドもジェネレータを利用している。
- `$ bin/rails generate generator mygenerator`：ジェネレータを生成するジェネレータ
- ジェネレータの基底クラス
```rb
# A
class InitializerGenerator < Rails::Generators::Base

# B
class InitializerGenerator < Rails::Generators::NamedBase
```

### Methods：　ファイルの生成などの実作業を制御する。

```rb
# helpのテキスト
desc "このジェネレータはconfig/initializersにイニシャライザファイルを作成します"

# 生成ファイルを直書きする場合
create_file "config/initializers/initializer.rb", "# イニシャライザの内容"

# 生成ファイルをコピーする場合（こっちのほうが実戦でよくみる）
copy_file "initializer.rb", "config/initializers/#{file_name}.rb"

# 生成先のディレクトリ指定
source_root File.expand_path('templates', __dir__)


```

### Config

```rb
# config/application.rb
config.generators do |g|
  g.orm             :active_record
  g.template_engine :erb
  g.test_framework  :shoulda, fixture: false
  g.stylesheets     false
  g.javascripts     false
  g.scaffold_stylesheet false

  g.fallbacks[:shoulda] = :test_unit
end

```

## Tips

### Bundle execとは

### rake vs rails

`rake`を使う場面で `rails`を使えるようになった。



## 受けたコードレビューの要旨

```rb
#
# refactor: Don't include the business logic in the views. Use helpers instead.
#

#
# refactor: Common processes in the controller actions should be put in the "before_action" section.
#

#
# refactor: For hash, use symbol notation (name: john) instead of hash-rocket notation (:name => john)
# This is better for performance.
#

#
# refactor: Put the methods in alphabetical order
#

#
# refactor: Don't use permit! for params!!! List all the params manually, or it can be a severe security hole
#
```

## Basics: pikawaka

- 部分テンプレートの使い方を徹底解説！
- form_withの使い方を徹底解説！
- MVCフレームワークを1から丁寧に解説！
- whereメソッドを使って欲しいデータの取得をしよう！
- マイグレーションファイルを徹底解説！
- アソシエーションを図解形式で徹底的に理解しよう！
- Railsのバリデーションの使い方をマスターしよう！
- dotenv-railsの導入方法と使い方を理解して環境変数を管理しよう！
- form_forの使い方をマスターしよう！
- link_toの使い方をマスターして簡単にリンクを作成しよう！
- renderメソッドの使い方を徹底解説！
- paramsって一体何？使い方を徹底解説！
- N+1問題をincludesメソッドで解決しよう！
- groupメソッドの使い方を図解形式で仕組みを徹底解説！
- exists?メソッドの基礎から応用の使い方〜present?メソッドとの違いが良くわかる！
- CarrierWaveチュートリアル
- left_joinsメソッドで定義する左外部結合とは？
- before_actionの使い方を徹底解説！
- 結局bundlerって何？bundlerの仕組みを図解形式で徹底解説
- ストロングパラメータの仕組みを理解しよう！
- deviseの使い方をマスターしてログイン認証機能を実装しよう！
- モデルのスコープ機能(scope)の使い方を１から理解する
- hamlの書き方をマスターしよう！
- enumチュートリアル
- button_toの使い方をどこよりもわかりやすく解説！
- resourcesメソッドを使ってルーティングを定義しよう！
- joinsメソッドのテーブル結合からネストまでの解説書
- permitメソッドを使ってストロングパラメーターにしよう
- orderメソッドを使って取得したデータを並び替えよう！
- updateメソッドの使い方を徹底解説！
- image_tagを使って簡単に画像を表示させよう！
- present?メソッドの使い方やリファクタリングの方法を具体的なコードを使って丁寧に解説
- I18n入門書
- Pryについて徹底解説！
- 豊富なサンプルコードでselectメソッドを理解する！
- rake routesコマンドの使い方をマスターしよう！
- JSON形式のデータを返却する方法とは？
- redirect_toの使い方を徹底解説！
- Active Storageを使って画像をアップしよう！
- jbuilderの使い方辞典〜メソッドの文法と使い方がすぐわかる
- distinctメソッドでユニークなデータを取得する方法
- rails newの書き方について徹底解説！
- 世界で一番詳しいfind_byメソッドのいろいろな使い方
- layoutメソッドの使い方をマスターしよう！
- 世界で一番分りやすく詳しいcountメソッドの使い方
- envメソッドで環境確認する方法と各コマンドの環境指定方法とは？
- form_tagの使い方を徹底解説！
- rails5の環境構築方法を画像を使いながら丁寧に解説！
- destoryメソッドの使い方を徹底解説！
- destroy_allメソッドの使い方を徹底解説！
- 便利なpluckメソッドをマスターしよう！
- N+1問題って何？原因と対処法を徹底解説！
- 完全保存版！flashの使い方についてを徹底解説！
- slimの書き方をマスターしよう！
- font-awesome-sassの使い方を徹底解説！
- blank?メソッドの使い方
- rails g model コマンドでモデルを作成しよう！
- findメソッドを使って指定したレコードを取得しよう！
- find_by_idメソッドの使い方と他のfind系メソッドとの違い
- kaminariの使い方をマスターしよう！
- strftimeの使い方ついて徹底解説！
- Ruby on Railsとは？Rubyとの違いを徹底解説！
- font-awesome-railsの使い方を徹底解説！
- presenceメソッドを使ってpresent?メソッドのコードをリファクタリングしよう！
- allメソッドを徹底解説！
- tryメソッドとtry!メソッドと&.演算子の違いを分りやすく説明します。
- active_hashを使って疑似モデルを作ろう
- remote: trueでフォーム送信をAjax実装する方法とは？
- Ajaxチュートリアル(Rails + jQuery)~処理の流れを理解しよう！
- respond_toメソッドの使い方をマスターしてリクエストのフォーマットで処理を分けよう！
- reCAPTCHAを使ったユーザー登録機能を作ろう
- createメソッドの使い方と似ているメソッドとの違いとは？
- rails console(rails c)コマンドの使い方まとめ
- find_eachメソッドでメモリを節約して大量データを扱う方法
- rails serverコマンド(rails s)の使い方まとめ
- ransackを使って検索機能がついたアプリを作ろう！
- ancestryを使って多階層のデータを扱おう


## form_with vs form_with + form_tag

[Qiita: ](https://qiita.com/hmmrjn/items/24f3b8eade206ace17e2)

- 基本的にはRails 5.1で採用された新しい `form_with`を覚えれば良い。
- しかし、gemのgeneratorによっては旧式の書式の場合があり、また参考コード等も古い場合がある。
- このため、`form_for`についても最低限の知識は必要だ。

###