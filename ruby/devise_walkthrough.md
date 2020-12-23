# Devise Walkthrough

- 私がRubyを勉強しはじめてそろそろ１カ月になります。Railsアプリを作っていてログイン認証のgem「Devise」というgemがいいらしいとわかりました。
- Deviseの実装確認と、Rubyのシンタックスの勉強の一挙両得を兼ねて、Deviseの中身を覗いてみることにしました。
- 私の現時点での背景知識はJavaScriptですので、そちらとの比較を。

これは３つの記事の一つ目です。

1. Deviseのディレクトリ構造確認（現在）
2. Deviseについての
3. Deviseに登場する、Ruby/Railsのシンタックスの確認

## ToC

- [Devise Walkthrough](#devise-walkthrough)
  - [ToC](#toc)
  - [Directory](#directory)
  - [Looking into every directory](#looking-into-every-directory)
    - [/](#)
  - [Syntax of Ruby / Rails](#syntax-of-ruby--rails)
    - [Module / Class](#module--class)
    - [Gemfile](#gemfile)
    - [Namespaces?](#namespaces)

## Directory

- gemそれ自体がMVCのwebアプリのようになっているように見えます。

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
    │   ├── devise # gemの本体
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

## Looking into every directory

### /




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

## Syntax of Ruby / Rails

- 目についた表現を調べてみました。

```rb
# JSと同じくrequire
# これらのルートは、それぞれ別のgemの名前（gemのlib以下）
# orm_adapter gemなら、lib/orm_adapter/adapters/mongoid.rbというファイル構成になっているから以下の記述になる。
require 'bundler/setup'
require 'orm_adapter/adapters/mongoid'


# スコープ？
# /app/mailers.devise/meiler.rbに以下の記述があった。
# /lib/devise/mailers/helpers.rbという構造があることから、Devise::のルートはlibだと思われる。
include Devise::Mailers::Helpers


Rails::TestUnit::Runner.run(ARGV)

ActiveRecord::Base.establish_connection( adapter: :sqlite3, database:  ':memory:')


# JSのtry, catch相当
begin
  require 'bundler/inline'
rescue LoadError => e
  # $はグローバル変数。
  # 「$:」というのが
  $stderr.puts 'Bundler version 1.10 or later is required. Please update your Bundler'
  raise e
end


# グローバル変数「$:」
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

```