
# classとmodule

## ToC

- [classとmodule](#classとmodule)
  - [ToC](#toc)
  - [Basic](#basic)
  - [Class Method vs Instance Method](#class-method-vs-instance-method)
  - [send()](#send)
  - [mattr_accessor](#mattr_accessor)
  - [autoload](#autoload)
  - [include](#include)
  - [補足: yiled, proc, block](#補足-yiled-proc-block)
  - [moduleとは](#moduleとは)
  - [`include` vs `extend`](#include-vs-extend)
  - [`require` vs `require_relative`](#require-vs-require_relative)
  - [`autoload` vs `require`](#autoload-vs-require)
  - [`include` vs `prepend`](#include-vs-prepend)
  - [インスタンス変数、クラス変数、クラスインスタンス変数](#インスタンス変数クラス変数クラスインスタンス変数)
  - [名前空間](#名前空間)
  - [特異クラス](#特異クラス)

## Basic

```rb
class Book
  # access methods
  attr_reader :author # getter
  attr_writer :lang # setter
  attr_accessor :title # getter + setter

  # constructor
  def initialize(title, author, lang)
    @title  = title
    @author = author
    @lang = lang
  end
end

book1 = Book.new('Lord of the Rings', 'Tolkien', 'English')
book1.title = 'Hobbit'
book1.lang = 'EN'
puts book1.author # You can't show book1.lang here, because it doesn't have a getter
p book1

class ElectronicBook < Book
  attr_reader :data_size

  def initialize(title, author, lang, data_size)
    super(title, author, lang)
    @data_size = data_size
  end
end

ebook1 = ElectronicBook.new('HHGTTG', 'Douglas Adams', 'English', 100)
p ebook1
puts ebook1.author # .lang still fails; accessor is also inherited.
```

## Class Method vs Instance Method

```rb
class Movie
  def i_method
    p 'Instance method called!'
  end
end

movie = Movie.new

# obj1にのみ
# これにより、特異クラス
def movie.s_method
  p 'Singlton method called!'
end

movie.i_method #=> 'instance method'
movie.s_method #=> 'singlton method'
```

## send() 


## mattr_accessor

## autoload


## include

- `included do ... end` block
  - moduleがincludeされたときに実行される
  - Railsにおけるsynctactic sugar。（Vanilla Rubyでは def self.includedメソッドを定義すれば同じ動作が実現できる）
```rb
# non-Rails version
module MyModule
  def self.included(base)
    base.class_eval do
      # somecode
    end
  end
end

# Rails version with ActiveSupport::Concerns
module MyModule
  included do
    # somecode
  end
end
```


## 補足: yiled, proc, block

## moduleとは

- モジュールの役割
  - 


```rb
# 

# module同士のネスト
module Devise
  module Controllers
    autoload :Helpers, 'devise/controllers/helpers' # さらにmoduleをロード
  end
end

```

##  `include` vs `extend`


## `require` vs `require_relative`

- 名前から想像できるが
  - `$LOAD_PATH`からの絶対パスでアクセスするのが `require`
  - 現在の参照元ファイルからの相対パスで表記するのが `require_relative`

## `autoload` vs `require`

- https://www.xmisao.com/2013/11/22/ruby-autoload.html
- 共通点
  - どちらもクラスやモジュールを読み込む。
- 相違点
  - `require`は即座に読み込む。
  - `autoload`はコード内で参照されたら読み込む。
- `require`に時間がかかりすぎるとき、内部で`if`などにより必要になったりならなかったりする場合には`autoload`がいい。

## `include` vs `prepend`

- 共通点
  - どちらもクラスにモジュールをmix-inする
- 違い
  - `include`は、まずクラスを呼び、その後モジュールを呼ぶ。
  - `prepend`は、まずモジュールを呼び、その後クラスを呼ぶ。
- 使い分け
  - この違いが重要になるのは、モジュールとクラスに同名のメソッドがあるとき。
  - `prepend`だと、クラスの既存のメソッドをoverrideできる。

```rb
class RouteSet 
  prepend Devise::RouteSet
end

```

- `prepend_before_action`というのがある。

## インスタンス変数、クラス変数、クラスインスタンス変数

- 参考：[Qiita:【まとめ】インスタンス変数、クラス変数、クラスインスタンス変数](https://qiita.com/mogulla3/items/cd4d6e188c34c6819709)

```rb


```

## 名前空間

- `名前の`

## 特異クラス

- `<<`記号
- 参考：[Qiita:【Ruby】特異メソッド・特異クラスを理解する](https://qiita.com/k-penguin-sato/items/d637dced7af32e4ec7c0)

```rb


class << self

```