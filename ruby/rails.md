# RoR

## ToC

- [RoR](#ror)
  - [ToC](#toc)
  - [Installation](#installation)
    - [Install Ruby with Rbenv](#install-ruby-with-rbenv)
    - [Install dependencies for the Rails project](#install-dependencies-for-the-rails-project)
  - [Official Docs](#official-docs)
    - [Key files](#key-files)
    - [Functionalities](#functionalities)
  - [Rails Command](#rails-command)
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
    - [REST resources](#rest-resources)
    - [Params](#params)
    - [Routing with DSL](#routing-with-dsl)
    - [Session & Cookie](#session--cookie)
  - [Models / Active Records](#models--active-records)
    - [Active Records](#active-records)
    - [ActiveModel](#activemodel)
    - [Authentication](#authentication)
    - [Migration](#migration)
    - [Association](#association)
  - [API-only App](#api-only-app)
  - [VS Code](#vs-code)
  - [Troubleshooting](#troubleshooting)
  - [Postgres + Rails + Heroku](#postgres--rails--heroku)
    - [Create the Project](#create-the-project)
    - [Introduce wicked_pdf](#introduce-wicked_pdf)
    - [Introduce Bootstrap](#introduce-bootstrap)
    - [Introduce PostgreSQL](#introduce-postgresql)
    - [Configure Rails for Postgres](#configure-rails-for-postgres)
  - [Bundler](#bundler)
  - [Internationalization](#internationalization)

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

# sqlite3
sudo apt install sqlite3

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

## Official Docs

[official Guides](https://guides.rubyonrails.org/)

- Start Here
  - [ ] Getting started
    1. Generate the `Welcome` \_VC + routes
    2. Generate the `Article` MVC + migration + routes
    3. Generate the `Comment` MVC + migration + routes
    4. Connect the `Article` model to `Comment` model
    5. Add auth to `Article` controller
- Models
  - [ ] Active Record Basics
  - [x] Active Record Migrations
  - [ ] Active Record Validations
  - [ ] Active Record Callbacks
  - [ ] Active Record Associations
  - [ ] Active Record Query Interface
- Views
  - [ ] Layouts and Rendering in Rails
  - [ ] Action View Form Helpers
- Controllers
  - [ ] **Action Controller Overview**
  - [ ] Rails Routing from the Outside In
- Other Components
  - [ ] Active Support Core Extensions
  - [ ] Action Mailer Basics
  - [ ] Active Job Basics
  - [ ] Active Storage Overview
  - [ ] Action Cable Overview
- Digging Deeper
  - [ ] Rails Internationalization (I18n) API
  - [ ] Testing Rails Applications
  - [ ] Securing Rails Applications
  - [ ] Debugging Rails Applications
  - [ ] Configuring Rails Applications
  - [ ] The Rails Command Line
  - [ ] The Asset Pipeline
  - [ ] Working with JavaScript in Rails
  - [ ] Autoloading and Reloading Constants (Zeitwerk Mode)
  - [ ] Autoloading and Reloading Constants (Classic Mode)
  - [ ] Caching with Rails: An Overview
  - [ ] Using Rails for API-only Applications

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

# controller
bin/rails generate controller Articles index
bin/rails generate controller Articles


# migration
bin/rails generate model Article title:string text:string # model + migration
bin/rails generate migration CreateProducts name:string part_number:string
bin/rails generate migration AddPartNumberToProducts part_number:string
bin/rails generate migration AddPartNumberToProducts part_number:string:index
bin/rails generate migration ChangeProductsPrice
bin/rails generate migration RemovePartNumberFromProducts part_number:string
bin/rails generate migration AddUserRefToProducts user:references
bin/rails db:migrate
bin/rails db:reset # drop DB, restore from db/schema.rb (Migration files not considered)
bin/rails db:migrate:reset # drop DB, renew db/schema.rb (Migration files considered)
```

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

### REST resources

- Should define in this order

| action  | route | method | helper | role |
| :-----: | :---: | :----: | :----: | :--: |
|  index  |       |        |        |      |
|  show   |       |        |        |      |
|   new   |       |        |        |      |
|  edit   |       |        |        |      |
| create  |       |        |        |      |
| update  |       |        |        |      |
| destroy |       |        |        |      |

### Params

- Both params can be accessed in the same way:
  - Route params
  - POST request body params
- Params can be JSON

```rb

# access to param
params[:article]
params[:article].inspect # to readable string

# strong parameters
# This fails
def create
  Person.create(params[:person])
end

params.require(:article).permit(:title, :text) # strong parameters



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

- Install Robocop

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

- `rails new . -d postgresql` としておけば、楽だった。DBを指定しないとSQLiteになる

```sh
nvm use v10
node -v
rails new .
rails webpacker:install
```

### Introduce wicked_pdf

```sh
echo "gem 'wicked_pdf'" >> Gemfile
bundle install
rails generate wicked_pdf
echo "gem 'wkhtmltopdf-binary'" >> Gemfile
bundle install
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

- `createdb myapp_test`などを行うチュートリアルもあるが、ＤＢはmigration時に自動で作成されるので不要。

```sh
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get -y install postgresql

sudo -i -u postgres # change the Ubuntu user to postgres
psql
\du # display users
\l # list DBs
\q
createuser -d -P -e myapp # -d: CREATE DB privilege, -P: password, -e: echo details
exit
```

- 後に出てくる `createdb` 系コマンドが `WARNING:  could not flush dirty data: Function not implemented`エラーを出すのに対する対策
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
  host: localhost
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

```sh
printf "rails-i18n" >> Gemfile
printf "enum-help" >> Gemfile
bundle install

# config/application.rb
config.i18n.default_locale = :ja
```

