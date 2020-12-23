# Devise Walkthrough

- 私が Ruby を勉強しはじめて１カ月ほど経ちますが、ユーザからのログイン処理など具体的な実装になるにつれて行き詰ることが増えてきました。
- 本質的な理解をせず、表面的にその場しのぎでググって実装していたのが理由です。
- そこで、ログイン処理Devise の実装確認と、Ruby のシンタックスの勉強の一挙両得を兼ねて、Devise の中身を覗いてみることにしました！

これは３つの記事の一つ目です。

1. Devise のディレクトリ構造確認（現在）
2. Devise についての
3. Devise に登場する、Ruby/Rails のシンタックスの確認

## ToC

- [Devise Walkthrough](#devise-walkthrough)
  - [ToC](#toc)
  - [Directory](#directory)
  - [root](#root)
  - [lib/devise.rb](#libdeviserb)
  - [lib/devise/rails/routes.rb](#libdeviserailsroutesrb)
  - [devise_mappingメソッドの流れを追ってみる](#devise_mappingメソッドの流れを追ってみる)
  - [lib/devise/models](#libdevisemodels)
    - [authenticatable.rb](#authenticatablerb)
    - [confirmable.rb](#confirmablerb)
    - [database_authenticatable.rb](#database_authenticatablerb)
    - [lockable.rb](#lockablerb)
    - [omniauthable.rb](#omniauthablerb)
    - [recoverable.rb](#recoverablerb)
    - [registerable.rb](#registerablerb)
    - [rememberable.rb](#rememberablerb)
    - [timeoutable.rb](#timeoutablerb)
    - [trackable.rb](#trackablerb)
    - [validatable.rb](#validatablerb)
  - [app/controllers](#appcontrollers)
    - [devise_controllers.rb](#devise_controllersrb)
    - [devise/confirmations_controller.rb](#deviseconfirmations_controllerrb)
    - [devise/omniauth_callbacks_controller.rb](#deviseomniauth_callbacks_controllerrb)
    - [devise/passwords_controller.rb](#devisepasswords_controllerrb)
    - [devise/registrations_controller.rb](#deviseregistrations_controllerrb)
    - [devise/sessions_controller.rb](#devisesessions_controllerrb)
    - [devise/unlocks_controller.rb](#deviseunlocks_controllerrb)
  - [lib/devise/controllers/](#libdevisecontrollers)
    - [helpers.rb](#helpersrb)
    - [rememberable.rb](#rememberablerb-1)
    - [scoped_views.rb](#scoped_viewsrb)
    - [sign_in_out.rb](#sign_in_outrb)
    - [store_location.rb](#store_locationrb)
    - [url_helpers.rb](#url_helpersrb)
  - [app/views/devise](#appviewsdevise)
  - [lib/devise.rb](#libdeviserb-1)
  - [lib/devise/rails/routes.rb](#libdeviserailsroutesrb-1)
  - [lib/devise/generators](#libdevisegenerators)
    - [files](#files)
    - [Syntax](#syntax)
  - [Syntax of Ruby / Rails](#syntax-of-ruby--rails)
    - [Module / Class](#module--class)
    - [Gemfile](#gemfile)
    - [Namespaces?](#namespaces)

## Directory

- gem それ自体が MVC の web アプリのようになっているように見えます。

```sh
# tree -d > devise_structure.txt

.
└── devise
    ├── app
    │   ├── controllers
    │   │   └── devise
    │   ├── helpers
    │   ├── mailers
    │   │   └── devise
    │   └── views
    │       └── devise
    │           ├── confirmations
    │           ├── mailer
    │           ├── passwords
    │           ├── registrations
    │           ├── sessions
    │           ├── shared
    │           └── unlocks
    ├── bin # テストを走らせるときの起点ファイルっぽい
    ├── config
    │   └── locales # 言語別に表示テキストを変える時の辞書を入れる。言語別のYAML
    ├── gemfiles # package.json相当。
    ├── guides
    │   └── bug_report_templates
    ├── lib
    │   ├── devise # gemの本体。devise.rbが重要そう
    │   │   ├── controllers
    │   │   ├── hooks
    │   │   ├── mailers
    │   │   ├── models
    │   │   ├── omniauth
    │   │   ├── orm
    │   │   ├── rails
    │   │   ├── strategies
    │   │   └── test
    │   └── generators # Rails::Generators::Baseを継承したもの
    │       ├── active_record
    │       │   └── templates
    │       ├── devise
    │       ├── mongoid
    │       └── templates
    │           ├── controllers
    │           ├── markerb
    │           └── simple_form_for
    │               ├── confirmations
    │               ├── passwords
    │               ├── registrations
    │               ├── sessions
    │               └── unlocks
    └── test
        ├── controllers
        ├── generators
        ├── helpers
        ├── integration
        ├── mailers
        ├── models
        ├── omniauth
        ├── orm
        ├── rails_app
        │   ├── app
        │   │   ├── active_record
        │   │   ├── controllers
        │   │   │   ├── admins
        │   │   │   ├── custom
        │   │   │   ├── publisher
        │   │   │   └── users
        │   │   ├── helpers
        │   │   ├── mailers
        │   │   │   └── users
        │   │   ├── mongoid
        │   │   └── views
        │   │       ├── admins
        │   │       │   └── sessions
        │   │       ├── home
        │   │       ├── layouts
        │   │       └── users
        │   │           ├── mailer
        │   │           └── sessions
        │   ├── bin
        │   ├── config
        │   │   ├── environments
        │   │   └── initializers
        │   ├── db
        │   │   └── migrate
        │   ├── lib
        │   └── public
        ├── support
        │   ├── action_controller
        │   ├── locale
        │   └── webrat
        │       └── integrations
        └── test

90 directories



```

## root

```sh
# package.jsonに相当する
Gemfile

# package-lock.jsonに相当
Gemfile.lock

#
Rakefile

#
.travis.yml

# このgemのメタ情報
# 依存gemのバージョン、gem名称、連絡先、著者、など
devise.gemspec

# YARDというrubyのdoc toolの設定ファイル。
# Rubyには標準で RDocというツールが入っているんだそうな。
# YARDはそれよりも書式がかっちり決まってて実戦向きだそうだ。
.yardopts

# Rubyに限らずよく見る定番
CHANGELOG.md
CONTRIBUTING.md
ISSUE_TEMPLATE.md
CODE_OF_CONDUCT.md
README.md
MIT-LICENSE
.gitignore
```


## lib/devise.rb

- gem の本体であると思われる
- `Devise.secure_compare()`のように書くとき、この`Devise`はこのファイル内の`Devise` moduleを指している。
- このファイルは、`lib/devise/` ディレクトリ内部のファイルをインポートするラッパとなっている。
- `require`のルートは、この`lib/devise/`を指しているのかも？
- スコープ：　モジュールの内包構造と、実際のディレクトリ構造が相似（devise > mailers > helpers）になっている。そういうルール？

```rb
# /app/mailers.devise/mailer.rb
include Devise::Mailers::Helpers

# /lib/devise/mailers/helpers.rb
module Devise
  module Mailers
    module Helpers
```

- 一部抜粋

```rb
# :nodocというのはRubyのドキュメンテーションツールrdocでこのメソッドを含めないという意味。このメソッドの重要度が低いから？
# Gem::versionというのは、バージョン文字列を比較するrubyの組み込み関数（例えばv1.10はv1.9の次だっていう判別を正しく扱う）
# def self.というのは
def self.activerecord51? # :nodoc:
  defined?(ActiveRecord) && ActiveRecord.gem_version >= Gem::Version.new("5.1.x")
end

# moduleとは
# moduleはネストできる。
module Devise
  module Controllers
    # autoloadとは???
    autoload :Helpers, 'devise/controllers/helpers'
  end
end

# mattr_accessor はクラスへのアクセサ `attr_accessor`のmodule版か？
# @@valueはclass variableである。class instanceである@valueとの違い？
# 2.weeksなどはRailsで拡張されたnumeric。days, bytesなど様々なものがある
mattr_accessor :remember_for
@@remember_for = 2.weeks 

mattr_accessor :password_length
@@password_length = 6..128 # Range

# Rubyにおける << はいくつか意味がある：シフト演算、特異クラス、heredoc
mattr_reader :helpers
@@helpers = Set.new
@@helpers << Devise::Controllers::Helpers


# requireを二か所に分けて書く意味？
require 'rails'
module Devise
  # ...
end
require 'warden'
```

## lib/devise/rails/routes.rb

- **`devise_for`メソッドはここで定義されている。**
- methods:
  - 

## devise_mappingメソッドの流れを追ってみる

```rb
# lib/devise/mapping.rb
module Devise
  class Mapping
    def initialize(name, options) #:nodoc:
      @scoped_path = options[:as] ? "#{options[:as]}/#{name}" : name.to_s
      @singular = (options[:singular] || @scoped_path.tr('/', '_').singularize).to_sym

      @class_name = (options[:class_name] || name.to_s.classify).to_s
      @klass = Devise.ref(@class_name)

      @path = (options[:path] || name).to_s
      @path_prefix = options[:path_prefix]

      @sign_out_via = options[:sign_out_via] || Devise.sign_out_via
      @format = options[:format]

      @router_name = options[:router_name]

      default_failure_app(options)
      default_controllers(options)
      default_path_names(options)
      default_used_route(options)
      default_used_helpers(options)
    end
  end
end

# lib/devise.rb
module Devise
  def self.add_mapping(resource, options)
    mapping = Devise::Mapping.new(resource, options)
    @@mappings[mapping.name] = mapping
    @@default_scope ||= mapping.name
    @@helpers.each { |h| h.define_helpers(mapping) }
    mapping
  end
end

# app/controllers/devise_controller.rb
def devise_mapping
  # request.envとは
  # request.env["HTTP_USER_AGENT"]
  @devise_mapping ||= request.env["devise.mapping"]
end


# 使用例
devise_mapping.registerable?


```



## lib/devise/models

- devise 使用時にモデル内で `devise_for` で列挙するオプションは、このディレクトリ内で module として定義されている。

### authenticatable.rb

### confirmable.rb

### database_authenticatable.rb

### lockable.rb

### omniauthable.rb

### recoverable.rb

### registerable.rb

### rememberable.rb

### timeoutable.rb

### trackable.rb

### validatable.rb

## app/controllers

### devise_controllers.rb

- 以下の`devise/`以下 6 つのコントローラに継承される基底クラス。

```rb
alias :scope_name :resource_name

devise_mapping.name


request.env[]

helper_method(*helpers)

```

### devise/confirmations_controller.rb

```rb
GET /resource/confirmation/new
POST /resource/confirmation
GET /resource/confirmation?confirmation_token=abcdef
```

### devise/omniauth_callbacks_controller.rb

### devise/passwords_controller.rb

### devise/registrations_controller.rb

### devise/sessions_controller.rb

### devise/unlocks_controller.rb

## lib/devise/controllers/

### helpers.rb

### rememberable.rb

### scoped_views.rb

### sign_in_out.rb

### store_location.rb

### url_helpers.rb

## app/views/devise

- Devise用のviewのテンプレート。
- `rails g devise:views` 系コマンドでこれらがコピーされる。
- `resource` というインスタンスに対して操作?

```rb
# instances
@resource
@token
resource
resource_name

# helpers
confirmation_path()
confirmation_url()
edit_password_url()
unlock_url()
password_path()
session_path()

# tokens
reset_password_token
unlock_token

```

- `confirmations/new.html.erb`
- `mailer/confirmation_instructions.html.erb`
- `mailer/email_changed.html.erb`
- `mailer/password_change.html.erb`
- `mailer/reset_password_instructions.html.erb`
- `mailer/unlock_instructions.html.erb`
- `passwords/edit.html.erb`
- `passwords/new.html.erb`
- `registrations/edit.html.erb`
- `registrations/new.html.erb`
- `sessions/new.html.erb`
- `shared/_error_messages.html.erb`
- `shared/_links.html.erb`
- `unlocks/new.html.erb`

## lib/devise.rb

## lib/devise/rails/routes.rb

## lib/devise/generators

- generatorを使うと、テンプレートファイルの自動生成などによりアプリ開発を高速化できる。
  - `rails new` も `bin/rails generate` もgeneratorを利用している。
- `Rails::Generators::Base`を継承している。

### files

```sh

# Generator: 
generators/active_record/devise_generator.rb

# migrationファイルのテンプレート
# ERBのテンプレートを使って、テーブル名やDBカラムなどを差し込めるようになっているのが面白い
generators/active_record/templates/migration_existing.rb # up / down 系のロールバック処理付き。class AddDeviseTo
generators/active_record/templates/migration.rb # 新規テーブル向け。class DeviseCreate

# 
generators/active_record/devise
generators/devise/
generators/mongoid/
generators/templates/


```

### Syntax

```rb
# *_generator.rb系に出てくる表現
source_root File.expand_path("../../templates", __FILE__)
desc "Creates a Devise initializer and copy locale files to your application."
class_option :orm, required: true
template "devise.rb", "config/initializers/devise.rb"
copy_file "../../../config/locales/en.yml", "config/locales/devise.en.yml"
readme "README" if behavior == :invoke
invoke "active_record:model", [name], migration: false unless model_exists? && behavior == :invoke

```

## Syntax of Ruby / Rails

- 目についた表現を調べてみました。

```rb

# 基礎中の基礎だが

def value()
def value=() # setter
def value?() # boolean
def value!() # 呼び出し元のオブジェクトを改変するメソッドだから注意してね！の意味

# 違い？
include
require
autoload


# JSと同じくrequire
# これらのルートは、それぞれ別のgemの名前（gemのlib以下）
# orm_adapter gemなら、lib/orm_adapter/adapters/mongoid.rbというファイル構成になっているから以下の記述になる。
require 'bundler/setup'
require 'orm_adapter/adapters/mongoid'




Rails::TestUnit::Runner.run(ARGV)

ActiveRecord::Base.establish_connection( adapter: :sqlite3, database:  ':memory:')


# JSのtry, catch相当
begin
  require 'bundler/inline'
rescue LoadError => e
  # $はグローバル変数。
  $stderr.puts 'Bundler version 1.10 or later is required. Please update your Bundler'
  raise e
end


# グローバル変数「$:」の定義は"Load path for scripts and binary modules by load or require."
$:.push File.expand_path("../lib", __FILE__)


# #{blah}は、JSのtemplate literal ${blah}に相当
raise "Could not find a valid mapping for #{obj.inspect}"

#
$stderr.puts 'Bundler version 1.10 or later is required. Please update your Bundler'


#
exec 'rake'

# これはrubyのshebang。.rbでない場合には明示的に書いていることが多い
#!/usr/bin/env ruby

#
# frozen_string_literal: true

# syntactic sugar
options[:scope] ||= translation_scope

# double pipe equal
a = nil
b = 4
a ||= b # now a is
a = 1
b = 2
a ||= b # now a is

# single pipe equal
a = a | 3333
a |= 3333

# booleanを返してきそうな見た目だが、返すのは
if defined?(ActionMailer)
    class # blahblah
end

class Mapping
    alias :name :singular
end

# JSでいうところのshort-circuit evaluationですね。
mod = options[:module] || "devise"

# JSにはなさそうな表現。
# 後半の三項演算子はまあいいとして、
@modules ||= to.respond_to?(:devise_modules) ? to.devise_modules : []

# JSだとconstructor()
def initialize(name, options)


# メソッド名にくっついた記号の意味
def self.find_scope!(obj)
def authenticatable?


@@secret_key = nil

desc <<-DESC.strip_heredoc
    Create inherited Devise controllers in your app/controllers folder.

    Use -c to specify which controller you want to overwrite.
    If you do no specify a controller, all controllers will be created.
    For example:

        rails generate devise:controllers users -c=sessions

    This will create a controller class at app/controllers/users/sessions_controller.rb like this:

        class Users::SessionsController < Devise::SessionsController
        content...
        end
DESC

raise MissingORMError, <<-ERROR.strip_heredoc
An ORM must be set to install Devise in your application.

Be sure to have an ORM like Active Record or Mongoid loaded in your
app or configure your own at `config/application.rb`.

    config.generators do |g|
        g.orm :your_orm_gem
    end
ERROR

#
<<RUBY
  field :email,              type: String, default: ""
  field :encrypted_password, type: String, default: ""
RUBY

```

### Module / Class

```rb

# module Deviseというのは、libディレクトリ内に多数存在する。一意の名前である必要性とかはなさそう
#
module Devise
  module Mailers
    module Helpers
      extend ActiveSupport::Concern
      include Devise::Controllers::StoreLocation

    included do
        if respond_to?(:helper_method)
            helper_method :warden, :signed_in?, :devise_controller?
        end
    end

    end
  end
end


class



class
    include

    # 名前空間で表記するとRails::Generators::Base.class_option
    # これは rails/railities/lib/generators/base.rbに記述されている
    class_option

    source_root
    argument

    def
        readme
        invoke
    end
end


module Contollers
    autoload
    mattr_accessor
end

# next
if class_mod.respond_to?(:available_configs)
  available_configs = class_mod.available_configs
  available_configs.each do |config|
    next unless options.key?(config)
    send(:"#{config}=", options.delete(config))
  end
end

```

### Gemfile

```rb
source "https://rubygems.org"

gemspec

gem "rails", "~> 6.0.0"

# :test, :developmentの開発ステージフラグなどでグルーピング
# JSの"npm install --production" が "bundle install --without development test" に相当するのだと思われる。
group :test do
  gem "omniauth-facebook"
  gem "webrat", "0.7.3", require: false
  gem "mocha", "~> 1.1", require: false
end

platforms :ruby do
  gem "sqlite3", "~> 1.4"
end
```

### Namespaces?

```rb
Thor::Error
::BCrypt::Password.create(password, cost: klass.stretches).to_s
Devise.secure_compare(password, hashed_password)

```
