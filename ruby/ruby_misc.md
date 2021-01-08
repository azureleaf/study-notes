# Ruby Misc

## ToC

- [Ruby Misc](#ruby-misc)
  - [ToC](#toc)
  - [Double pipe equal](#double-pipe-equal)
  - [表現](#表現)

## Double pipe equal

```rb
ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)


```

## 表現


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

`<<` の意味

- 文字列連結
- 特異クラス



## たのしいruby (+α)

### 1 Introduction
### 2 Object Basics
### 3 Creating CLI
### 4 Objects / Variables / Constants

```rb
"a".freeze
"a".object_id
"a".dup


```

### 5 条件判断
### 6 繰り返し
### 7 Methods
### 8 Class & Module
### 9 Operator
### 10 Error Handling & Exception
### 11 Block
### 12 Numeric Class
### 13 Array Class
### 14 String Class
### 15 Hash Class
### 16 Regexp Class
### 17 IO Class
### 18 File Class & Dir Class
### 19 Encoding Class
### 20 Time Class & Date Class
### 21 Proc Class
### 22 テキスト処理を行う
### 23 郵便番号データを検索する



File
CSV

## pikawaka

- https://pikawaka.com/ruby

### たい焼きで理解するオブジェクト指向におけるクラスの概念
### オブジェクトとは何か？基本となる知識をマスターしよう！
### eachメソッドを徹底解説！
### mapメソッドの基礎から応用をマスターして、効率的なコードを書けるようにしよう！
### プログラミングの基礎の変数について学んでみよう。
### プログラミング言語のRubyについて徹底解説
### メソッドの使い方とスコープについて理解しよう！
### ハッシュを初めから丁寧に理解してマスターしよう！
### インスタンスとは何か？特徴を理解しよう！
### getsメソッドの使い方と特徴をマスターしよう！
### if文を使っての条件分岐の方法をマスターしよう！
### 三項演算子をマスターしてコードを簡潔に書けるようにしよう。
### 定数について学んでみよう。変数との違いは？
### 式展開を使って文字列の中で変数を使おう
### 配列の基礎を図解形式で丁寧に解説(初心者向け)
### to_sメソッドの使い方を理解しよう
### to_iメソッドの使い方を理解しよう
### putsメソッドを使って出力を確認する方法をマスターしよう！
### to_symメソッドの使い方を理解しよう
### JSON形式のデータをRubyで扱う方法とは？
### while文での繰り返し処理をマスターしよう！
### to_hメソッドの使い方を理解しよう
### to_aメソッドの使い方を理解しよう
### injectメソッドについて徹底解説！
### irbについて徹底解説！
### to_fメソッドの使い方を理解しよう
### 文字列オブジェクトの特徴や便利なメソッドをマスターしよう！
### 数値オブジェクトの特徴や便利なメソッドを理解しよう！
### バックスラッシュ記法の使い方を学習しよう！
### attr_readerメソッドの使い方を基礎から学んで整理しよう
### attr_accessorメソッド初心者入門書~使い方と必要な理由を理解しよう
### splitメソッドの使い方-基礎から応用を理解しよう
### randメソッドの使い方を学んでランダムなデータを作成しよう
### sortメソッドで配列とHashの中身を並び替える方法
### クラスにModuleをincludeする方法を図解形式で１から理解する！
### 便利なany?メソッドの使い方や活用方法まで紹介！
### case whenによる条件分岐を基礎から応用まで学ぼう
### attr_writerメソッド使ってコードの可読性を上げよう
### for文による繰り返し処理を基礎から応用まで学ぼう


## Rubyで非同期処理

### Task vs Thread

- thread safe