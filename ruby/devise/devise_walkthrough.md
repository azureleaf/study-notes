# Devise Walkthrough

- 私が Ruby を勉強しはじめて１カ月ほど経ちますが、ユーザからのログイン処理など具体的な実装になるにつれて行き詰ることが増えてきました。
- 本質的な理解をせず、表面的にその場しのぎでググって実装していたのが理由です。
- そこで、ログイン処理Devise の実装確認と、Ruby のシンタックスの勉強の一挙両得を兼ねて、Devise の中身を覗いてみることにしました！

これは３つの記事の一つ目です。

1. Devise のディレクトリ構造確認（現在）
2. Devise についての
3. Devise に登場する、Ruby/Rails のシンタックスの確認

## 疑問

- CLIでのモデル名などはどう認識するのか？　大文字vs小文字、複数形vs単数形にかかわらず結果が同一のときも多いが
- devise_forはどういう文法なのか？
- strong parameterとはそもそも何か？
- helperの生成名と、その中身はどのように追えるか？


## ToC

- [Devise Walkthrough](#devise-walkthrough)
  - [疑問](#疑問)
  - [ToC](#toc)
  - [devise利用の基礎](#devise利用の基礎)
  - [Directory](#directory)
  - [特に着目した方がよさそうなファイル](#特に着目した方がよさそうなファイル)
  - [lib/devise.rb](#libdeviserb)
    - [メソッド](#メソッド)
    - [一部抜粋](#一部抜粋)
  - [lib/devise/rails/routes.rb](#libdeviserailsroutesrb)
    - [メソッド一覧](#メソッド一覧)
    - [抜粋](#抜粋)
  - [app/controllers/devise_controller.rb](#appcontrollersdevise_controllerrb)
    - [補足：エラー処理](#補足エラー処理)
  - [横断：devise_forの流れを追ってみる](#横断devise_forの流れを追ってみる)
  - [横断：Modelでの"devise"の流れを追ってみる](#横断modelでのdeviseの流れを追ってみる)
  - [横断：helper生成の流れを追ってみる](#横断helper生成の流れを追ってみる)
  - [横断：rails generate devise:viewsの流れを追ってみる](#横断rails-generate-deviseviewsの流れを追ってみる)
  - [横断：rails generate devise:installを追跡する](#横断rails-generate-deviseinstallを追跡する)
  - [横断：基本認証の過程を追ってみる](#横断基本認証の過程を追ってみる)
  - [横断：omniauth認証の過程を追ってみる](#横断omniauth認証の過程を追ってみる)
  - [lib/devise/](#libdevise)
  - [lib/devise/models](#libdevisemodels)
  - [lib/devise/controllers/](#libdevisecontrollers)
  - [app/views/devise](#appviewsdevise)
  - [lib/devise.rb](#libdeviserb-1)
  - [lib/devise/rails/routes.rb](#libdeviserailsroutesrb-1)
  - [lib/devise/generators](#libdevisegenerators)
    - [Generatorってなんだったっけ？](#generatorってなんだったっけ)
    - [Generator Usage](#generator-usage)
    - [Methods](#methods)
    - [Syntax](#syntax)
  - [Syntax of Ruby / Rails](#syntax-of-ruby--rails)
    - [Module / Class](#module--class)
    - [Gemfile](#gemfile)
    - [Namespaces?](#namespaces)
  - [広く参照される変数・メソッド](#広く参照される変数メソッド)
  - [外部gemへの参照の例](#外部gemへの参照の例)


## devise利用の基礎

```rb
class Users
  devise_for :database_authen
end
```

## Directory

```sh
# tree devise -a -I .git

devise
├── .gitignore
├── .travis.yml
├── .yardopts # YARDというrubyのdoc toolの設定ファイル。Ruby標準のRDocよりも書式がかっちり決まってて実戦向きだとか。
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── Gemfile # package.jsonに相当
├── Gemfile.lock # package_lock.jsonに相当
├── ISSUE_TEMPLATE.md
├── MIT-LICENSE
├── README.md
├── Rakefile
├── app
│   ├── controllers
│   │   ├── devise
│   │   │   ├── confirmations_controller.rb
│   │   │   ├── omniauth_callbacks_controller.rb
│   │   │   ├── passwords_controller.rb
│   │   │   ├── registrations_controller.rb
│   │   │   ├── sessions_controller.rb
│   │   │   └── unlocks_controller.rb
│   │   └── devise_controller.rb
│   ├── helpers
│   │   └── devise_helper.rb
│   ├── mailers
│   │   └── devise
│   │       └── mailer.rb
│   └── views
│       └── devise
│           ├── confirmations
│           │   └── new.html.erb
│           ├── mailer
│           │   ├── confirmation_instructions.html.erb
│           │   ├── email_changed.html.erb
│           │   ├── password_change.html.erb
│           │   ├── reset_password_instructions.html.erb
│           │   └── unlock_instructions.html.erb
│           ├── passwords
│           │   ├── edit.html.erb
│           │   └── new.html.erb
│           ├── registrations
│           │   ├── edit.html.erb
│           │   └── new.html.erb
│           ├── sessions
│           │   └── new.html.erb
│           ├── shared
│           │   ├── _error_messages.html.erb
│           │   └── _links.html.erb
│           └── unlocks
│               └── new.html.erb
├── bin
│   └── test
├── config
│   └── locales
│       └── en.yml
├── devise.gemspec # gemのメタ情報。依存gemのバージョン、gem名称、連絡先、著者、など
├── devise.png
├── gemfiles
│   ├── Gemfile.rails-4.1-stable
│   ├── Gemfile.rails-4.1-stable.lock
│   ├── Gemfile.rails-4.2-stable
│   ├── Gemfile.rails-4.2-stable.lock
│   ├── Gemfile.rails-5.0-stable
│   ├── Gemfile.rails-5.0-stable.lock
│   ├── Gemfile.rails-5.1-stable
│   ├── Gemfile.rails-5.1-stable.lock
│   ├── Gemfile.rails-5.2-stable
│   ├── Gemfile.rails-5.2-stable.lock
│   ├── Gemfile.rails-6.0-stable
│   └── Gemfile.rails-6.0-stable.lock
├── guides
│   └── bug_report_templates
│       └── integration_test.rb
├── lib
│   ├── devise
│   │   ├── controllers
│   │   │   ├── helpers.rb # current_userやauthenticate_user!などのヘルパー生成
│   │   │   ├── rememberable.rb
│   │   │   ├── scoped_views.rb
│   │   │   ├── sign_in_out.rb
│   │   │   ├── store_location.rb
│   │   │   └── url_helpers.rb
│   │   ├── delegator.rb
│   │   ├── encryptor.rb
│   │   ├── failure_app.rb
│   │   ├── hooks
│   │   │   ├── activatable.rb
│   │   │   ├── csrf_cleaner.rb
│   │   │   ├── forgetable.rb
│   │   │   ├── lockable.rb
│   │   │   ├── proxy.rb
│   │   │   ├── rememberable.rb
│   │   │   ├── timeoutable.rb
│   │   │   └── trackable.rb
│   │   ├── mailers
│   │   │   └── helpers.rb
│   │   ├── mapping.rb # Devise::Mappingの定義。
│   │   ├── models # modelで"devise :lockable"とかの引数になるシンボルと同名のモジュールを定義
│   │   │   ├── authenticatable.rb
│   │   │   ├── confirmable.rb
│   │   │   ├── database_authenticatable.rb
│   │   │   ├── lockable.rb
│   │   │   ├── omniauthable.rb
│   │   │   ├── recoverable.rb
│   │   │   ├── registerable.rb
│   │   │   ├── rememberable.rb
│   │   │   ├── timeoutable.rb
│   │   │   ├── trackable.rb
│   │   │   └── validatable.rb
│   │   ├── models.rb # devise付きmodelの冒頭にあるdevise()を定義
│   │   ├── modules.rb
│   │   ├── omniauth
│   │   │   ├── config.rb
│   │   │   └── url_helpers.rb
│   │   ├── omniauth.rb
│   │   ├── orm
│   │   │   ├── active_record.rb
│   │   │   └── mongoid.rb
│   │   ├── parameter_filter.rb
│   │   ├── parameter_sanitizer.rb # devise_parameter_sanitizer()の定義はここ
│   │   ├── rails
│   │   │   ├── deprecated_constant_accessor.rb
│   │   │   ├── routes.rb # device_forの定義。
│   │   │   └── warden_compat.rb
│   │   ├── rails.rb
│   │   ├── secret_key_finder.rb
│   │   ├── strategies
│   │   │   ├── authenticatable.rb
│   │   │   ├── base.rb
│   │   │   ├── database_authenticatable.rb
│   │   │   └── rememberable.rb
│   │   ├── test
│   │   │   ├── controller_helpers.rb
│   │   │   └── integration_helpers.rb
│   │   ├── test_helpers.rb
│   │   ├── time_inflector.rb
│   │   ├── token_generator.rb
│   │   └── version.rb
│   ├── devise.rb # 最重要ファイル
│   └── generators # rails g devise系のジェネレータの定義
│       ├── active_record
│       │   ├── devise_generator.rb
│       │   └── templates
│       │       ├── migration.rb
│       │       └── migration_existing.rb
│       ├── devise
│       │   ├── controllers_generator.rb
│       │   ├── devise_generator.rb
│       │   ├── install_generator.rb
│       │   ├── orm_helpers.rb
│       │   └── views_generator.rb
│       ├── mongoid
│       │   └── devise_generator.rb
│       └── templates
│           ├── README
│           ├── controllers
│           │   ├── README
│           │   ├── confirmations_controller.rb
│           │   ├── omniauth_callbacks_controller.rb
│           │   ├── passwords_controller.rb
│           │   ├── registrations_controller.rb
│           │   ├── sessions_controller.rb
│           │   └── unlocks_controller.rb
│           ├── devise.rb
│           ├── markerb
│           │   ├── confirmation_instructions.markerb
│           │   ├── email_changed.markerb
│           │   ├── password_change.markerb
│           │   ├── reset_password_instructions.markerb
│           │   └── unlock_instructions.markerb
│           └── simple_form_for
│               ├── confirmations
│               │   └── new.html.erb
│               ├── passwords
│               │   ├── edit.html.erb
│               │   └── new.html.erb
│               ├── registrations
│               │   ├── edit.html.erb
│               │   └── new.html.erb
│               ├── sessions
│               │   └── new.html.erb
│               └── unlocks
│                   └── new.html.erb
└── test # 省略

89 directories, 278 files
```

## 特に着目した方がよさそうなファイル

- `lib/devise/devise.rb`
- `lib/devise/rails/routes.rb`
- `app/controllers/devise_controller.rb`
- `lib/devise/mapping.rb`
- `lib/devise/models.rb`
- `lib/devise/models/database_authenticatable.rb`
- `lib/devise/controllers/helpers.rb`

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

### メソッド

```rb
module Devise
  module Controllers
  module Hooks
  module Mailers
  module Strategies
  module Test

  def self.activerecord51? # :nodoc:
  def self.setup
  class Getter
    def initialize(name)
    def get
  def self.ref(arg)
  def self.available_router_name
  def self.omniauth_providers
  def self.mailer
  def self.mailer=(class_name)
  def self.add_mapping(resource, options)
  def self.add_module(module_name, options = {})
  def self.warden(&block)
  def self.omniauth(provider, *args)
  def self.include_helpers(scope)
  def self.regenerate_helpers!
  def self.configure_warden! #:nodoc:
  def self.friendly_token(length = 20)
  def self.secure_compare(a, b)
```

### 一部抜粋

```rb
# この行の意味？
# frozen_string_literal: true



# :nodocというのはRubyのドキュメンテーションツールrdocでこのメソッドを含めないという意味。このメソッドの重要度が低いから？
# Gem::versionというのは、バージョン文字列を比較するrubyの組み込み関数（例えばv1.10はv1.9の次だっていう判別を正しく扱う）
# def self.というのは
def self.activerecord51? # :nodoc:
  defined?(ActiveRecord) && ActiveRecord.gem_version >= Gem::Version.new("5.1.x")
end


# mattr_accessor はクラスへのアクセサ `attr_accessor`のmodule版か？
# @@valueはclass variableである。class instanceである@valueとの違い？
# 2.weeksなどはRailsで拡張されたnumeric。days, bytesなど様々なものがある
mattr_accessor :remember_for
@@remember_for = 2.weeks 

mattr_accessor :password_length
@@password_length = 6..128 # Range

# Rubyにおける << はいくつか意味がある：シフト演算、特異クラス、heredocなど
# これは特異クラスである
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




### メソッド一覧

```rb
Devise::RouteSet.finalize! # finalize! そのものはRailsの機能っぽい。
ActionDispatch::Routing
  class RouteSet
  class Mapper
    def devise_for()
    def authenticate()
    def authenticated()
    def unauthenticated()
    def devise_scope()

    # protected methodsに多数出てくる"resource"メソッドはapp/controllers/devise_controller.rbで定義
    protected

    def devise_session()
    def devise_password()
    def devise_confirmation()
    def devise_unlock(mapping, controllers) 
    def devise_registration(mapping, controllers) 
    def devise_omniauth_callback(mapping, controllers) 
    def with_devise_exclusive_scope(new_path, new_as, options) 
    def constraints_for(method_to_apply, scope = nil, block = nil)
    def set_omniauth_path_prefix!(path_prefix) 
    def raise_no_secret_key 
    def raise_no_devise_method_error!(klass) 
       
```

### 抜粋

```rb
# authenticate
def authenticate(scope = nil, block = nil)
  constraints_for(:authenticate!, scope, block) do
    yield
  end
end



```

## app/controllers/devise_controller.rb

- 個別のコントローラ（パスワード管理、セッション、新規ユーザ登録、etc.）の基底となるクラスを定義する。

```rb
class DeviseController < Devise.parent_controller.constantize
  include Devise::Controllers::ScopedViews

  if respond_to?(:helper)
    helper DeviseHelper
  end

  if respond_to?(:helper_method)
    helpers = %w(resource scope_name resource_name signed_in_resource
                 resource_class resource_params devise_mapping)
    helper_method(*helpers)
  end

  prepend_before_action :assert_is_devise_resource!
  respond_to :html if mimes_for_respond_to.empty?

  # Override prefixes to consider the scoped view.
  # Notice we need to check for the request due to a bug in
  # Action Controller tests that forces _prefixes to be
  # loaded before even having a request object.
  #
  # This method should be public as it is in ActionPack
  # itself. Changing its visibility may break other gems.
  def _prefixes #:nodoc:
    @_prefixes ||= if self.class.scoped_views? && request && devise_mapping
      ["#{devise_mapping.scoped_path}/#{controller_name}"] + super
    else
      super
    end
  end

  protected

  # Gets the actual resource stored in the instance variable
  def resource
    instance_variable_get(:"@#{resource_name}")
  end

  # Proxy to devise map name
  def resource_name
    devise_mapping.name
  end
  alias :scope_name :resource_name

  # Proxy to devise map class
  def resource_class
    devise_mapping.to
  end

  # Returns a signed in resource from session (if one exists)
  def signed_in_resource
    warden.authenticate(scope: resource_name)
  end

  # Attempt to find the mapped route for devise based on request path
  def devise_mapping
    @devise_mapping ||= request.env["devise.mapping"]
  end

  # Checks whether it's a devise mapped resource or not.
  def assert_is_devise_resource! #:nodoc:
    unknown_action! <<-MESSAGE unless devise_mapping
Could not find devise mapping for path #{request.fullpath.inspect}.
This may happen for two reasons:

1) You forgot to wrap your route inside the scope block. For example:

  devise_scope :user do
    get "/some/route" => "some_devise_controller"
  end

2) You are testing a Devise controller bypassing the router.
   If so, you can explicitly tell Devise which mapping to use:

   @request.env["devise.mapping"] = Devise.mappings[:user]

MESSAGE
  end

  # Returns real navigational formats which are supported by Rails
  def navigational_formats
    @navigational_formats ||= Devise.navigational_formats.select { |format| Mime::EXTENSION_LOOKUP[format.to_s] }
  end

  def unknown_action!(msg)
    logger.debug "[Devise] #{msg}" if logger
    raise AbstractController::ActionNotFound, msg
  end

  # Sets the resource creating an instance variable
  def resource=(new_resource)
    instance_variable_set(:"@#{resource_name}", new_resource)
  end

  # Helper for use in before_actions where no authentication is required.
  #
  # Example:
  #   before_action :require_no_authentication, only: :new
  def require_no_authentication
    assert_is_devise_resource!
    return unless is_navigational_format?
    no_input = devise_mapping.no_input_strategies

    authenticated = if no_input.present?
      args = no_input.dup.push scope: resource_name
      warden.authenticate?(*args)
    else
      warden.authenticated?(resource_name)
    end

    if authenticated && resource = warden.user(resource_name)
      set_flash_message(:alert, 'already_authenticated', scope: 'devise.failure')
      redirect_to after_sign_in_path_for(resource)
    end
  end

  # Helper for use after calling send_*_instructions methods on a resource.
  # If we are in paranoid mode, we always act as if the resource was valid
  # and instructions were sent.
  def successfully_sent?(resource)
    notice = if Devise.paranoid
      resource.errors.clear
      :send_paranoid_instructions
    elsif resource.errors.empty?
      :send_instructions
    end

    if notice
      set_flash_message! :notice, notice
      true
    end
  end

  # Sets the flash message with :key, using I18n. By default you are able
  # to set up your messages using specific resource scope, and if no message is
  # found we look to the default scope. Set the "now" options key to a true
  # value to populate the flash.now hash in lieu of the default flash hash (so
  # the flash message will be available to the current action instead of the
  # next action).
  # Example (i18n locale file):
  #
  #   en:
  #     devise:
  #       passwords:
  #         #default_scope_messages - only if resource_scope is not found
  #         user:
  #           #resource_scope_messages
  #
  # Please refer to README or en.yml locale file to check what messages are
  # available.
  def set_flash_message(key, kind, options = {})
    message = find_message(kind, options)
    if options[:now]
      flash.now[key] = message if message.present?
    else
      flash[key] = message if message.present?
    end
  end

  # Sets flash message if is_flashing_format? equals true
  def set_flash_message!(key, kind, options = {})
    if is_flashing_format?
      set_flash_message(key, kind, options)
    end
  end

  # Sets minimum password length to show to user
  def set_minimum_password_length
    if devise_mapping.validatable?
      @minimum_password_length = resource_class.password_length.min
    end
  end

  def devise_i18n_options(options)
    options
  end

  # Get message for given
  def find_message(kind, options = {})
    options[:scope] ||= translation_scope
    options[:default] = Array(options[:default]).unshift(kind.to_sym)
    options[:resource_name] = resource_name
    options = devise_i18n_options(options)
    I18n.t("#{options[:resource_name]}.#{kind}", **options)
  end

  # Controllers inheriting DeviseController are advised to override this
  # method so that other controllers inheriting from them would use
  # existing translations.
  def translation_scope
    "devise.#{controller_name}"
  end

  def clean_up_passwords(object)
    object.clean_up_passwords if object.respond_to?(:clean_up_passwords)
  end

  def respond_with_navigational(*args, &block)
    respond_with(*args) do |format|
      format.any(*navigational_formats, &block)
    end
  end

  def resource_params
    params.fetch(resource_name, {})
  end

  ActiveSupport.run_load_hooks(:devise_controller, self)
end

```



### 補足：エラー処理

```rb
begin # try
  raise 
rescue # catch
  retry 
ensure # finally
end
```


## 横断：devise_forの流れを追ってみる

```rb
# routes.rbで以下のように記述したとしよう。
devise_for :users,
    path: '',
    path_names: {
      sign_up: '',
      sign_in: 'login',
      sign_out: 'logout',
      registration: "signup",
    },
    controllers: {
      registrations: "users/registrations",
      sessions: "users/sessions"
    }

# viewやcontrollerでの使用例
devise_mapping.registerable?

#
# lib/devise/rails/routes.rb
#
# *resourcesは可変長配列(splat operator)
# ちなみに main(a, *args, **kwargs) とするとdouble splat operatorはハッシュをとれる。（Pythonと似てる）
class Mapper
  def devise_for(*resources)
    @devise_finalized = false
    raise_no_secret_key unless Devise.secret_key
    options = resources.extract_options! # [:users, path: '', path_names {}] のうちhash部分のみを抜き出す

    # @scopeとは???
    options[:as]          ||= @scope[:as]     if @scope[:as].present?
    options[:module]      ||= @scope[:module] if @scope[:module].present?
    options[:path_prefix] ||= @scope[:path]   if @scope[:path].present?
    options[:path_names]    = (@scope[:path_names] || {}).merge(options[:path_names] || {})
    options[:constraints]   = (@scope[:constraints] || {}).merge(options[:constraints] || {})
    options[:defaults]      = (@scope[:defaults] || {}).merge(options[:defaults] || {})
    options[:options]       = @scope[:options] || {}
    options[:options][:format] = false if options[:format] == false

    # &はprocに変えているが... to_symと組み合わせるとどうなる？
    resources.map!(&:to_sym)

    resources.each do |resource|
      mapping = Devise.add_mapping(resource, options)

      begin
        raise_no_devise_method_error!(mapping.class_name) unless mapping.to.respond_to?(:devise)
      rescue NameError => e
        raise unless mapping.class_name == resource.to_s.classify
        warn "[WARNING] You provided devise_for #{resource.inspect} but there is " \
          "no model #{mapping.class_name} defined in your application"
        next
      rescue NoMethodError => e
        raise unless e.message.include?("undefined method `devise'")
        raise_no_devise_method_error!(mapping.class_name)
      end

      if options[:controllers] && options[:controllers][:omniauth_callbacks]
        unless mapping.omniauthable?
          raise ArgumentError, "Mapping omniauth_callbacks on a resource that is not omniauthable\n" \
            "Please add `devise :omniauthable` to the `#{mapping.class_name}` model"
        end
      end

      routes = mapping.used_routes

      devise_scope mapping.name do
        with_devise_exclusive_scope mapping.fullpath, mapping.name, options do
          routes.each { |mod| send("devise_#{mod}", mapping, mapping.controllers) }
        end
      end
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

```

- 別系統のdevise_mapping?

```rb
# app/controllers/devise_controller.rb
def devise_mapping
  # request.envとは
  # request.env["HTTP_USER_AGENT"]
  @devise_mapping ||= request.env["devise.mapping"]
end
```

## 横断：Modelでの"devise"の流れを追ってみる


## 横断：helper生成の流れを追ってみる



## 横断：rails generate devise:viewsの流れを追ってみる



## 横断：rails generate devise:installを追跡する


## 横断：基本認証の過程を追ってみる

これでついに総仕上げになる。

## 横断：omniauth認証の過程を追ってみる

- ログイン必要ページかどうかの判断
- ログイン画面の表示
- ログイン処理
- ログイン成功：　リダイレクト
- ログイン失敗：　フラッシュメッセージの表示

## lib/devise/


```rb
# models.rb
Devise::Models
  class MissingAttribute < StandardError
    def initialize(attributes)
    def message
  def self.config(mod, *accessors) #:nodoc:
    class << mod; attr_accessor :available_configs; end
  def self.check_fields!(klass)
  def devise(*modules)
  def devise_modules_hook!

require 'devise/models/authenticatable'
```

## lib/devise/models

- devise 使用時にモデル内で `devise_for` で列挙するオプションは、このディレクトリ内で module として定義されている。

```rb
# authenticatable.rb

# confirmable.rb

# database_authenticatable.rb

# lockable.rb

# omniauthable.rb

# recoverable.rb

# registerable.rb

# rememberable.rb

# timeoutable.rb

# trackable.rb

# validatable.rb

## app/controllers

# devise_controllers.rb
```

- 以下の`devise/`以下 6 つのコントローラに継承される基底クラス。

```rb
alias :scope_name :resource_name

devise_mapping.name


request.env[]

helper_method(*helpers)

```

```rb
# devise/confirmations_controller.rb

GET /resource/confirmation/new
POST /resource/confirmation
GET /resource/confirmation?confirmation_token=abcdef

# devise/omniauth_callbacks_controller.rb

# devise/passwords_controller.rb

# devise/registrations_controller.rb

# devise/sessions_controller.rb

# devise/unlocks_controller.rb
```

## lib/devise/controllers/

- deviseが以下のヘルパーを生成する。
  - before_action :authenticate_user!	
  - user_signed_in?
  - current_user
  - user_session

```rb
# helpers.rb

# rememberable.rb

# scoped_views.rb

# sign_in_out.rb
Devise::Controllers::SignInOut
  def signed_in?(scope = nil)
  def sign_in(resource_or_scope, *args)
  def bypass_sign_in(resource, scope: nil)
  def sign_out(resource_or_scope = nil)
  def sign_out_all_scopes(lock = true)
  private
  def expire_data_after_sign_in!
  alias :expire_data_after_sign_out! :expire_data_after_sign_in!

# store_location.rb

# url_helpers.rb

```


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

```rb


```

## lib/devise/generators

### Generatorってなんだったっけ？

- [公式](https://railsguides.jp/generators.html)
- generatorを使うと、テンプレートファイルの自動生成などによりアプリ開発を高速化できる。
- `rails new` も `bin/rails generate` もgeneratorを利用している。
- Generatorは`Rails::Generators::Base`を継承してつくる。

### Generator Usage

- deviseの基本的なジェネレータをまず列挙してみる。

```sh
bundle exec bin/rails g devise:install
bundle exec bin/rails g devise user # model, migration, routes
bundle exec bin/rails g devise:views users
bundle exec bin/rails g devise:controllers users # controllers,

```

### Methods

```rb

# Generatorの元締め？
# generators/active_record/devise_generator.rb
module ActiveRecord
  module Generators
    class DeviseGenerator

      def copy_devise_migration


      def generate_model

      def inject_devise_content
      
      # migrationカラム内容を文字列として返す
      def migration_data 
      
      def ip_column
      def inet?
      def rails5_and_up? # Railsバージョンが5以上か？
      def postgresql? # configのDBがpostgresになってるか？
      def migration_version # 
      def primary_key_type
      def primary_key_string


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

- Scope operator
  - https://stackoverflow.com/questions/10482772/rubys-double-colon-operator-usage-differences

```rb
::Rails::Engine #is an absolute path to the constant.
# like /Rails/Engine in FS.

Rails::Engine #is a path relative to the current tree level.
# like ./Rails/Engine in FS.
```

```rb
Thor::Error
::BCrypt::Password.create(password, cost: klass.stretches).to_s
Devise.secure_compare(password, hashed_password)

```

## 広く参照される変数・メソッド

```rb
# ログイン中のユーザー情報や、サーバーの設定情報にアクセスするハッシュ
request.env
request.env['warden']
request.env['warden'].user(scope)
request.env['warden.options']
request.env['warden'].authenticate?
request.env['warden'].send(method_to_apply, scope: scope)
request.env['devise.allow_params_authentication'] # boolean
request.env['devise.skip_storage'] # boolean
request.env['devise.skip_trackable'] # boolean
request.env['devise.skip_timeout'] # boolean
request.env['devise.mapping']
request.env['action_controller.instance']
request.env['omniauth.auth']
request.env['omniauth.error']
request.env['omniauth.error.strategy']
request.env['PATH_INFO']
request.env['action_controller.instance']
warden.request.env

```

## 外部gemへの参照の例

```rb
# Rails::Generators::BaseはThor gem（CLIの作成支援ツール）を継承している。
# 
Thor::Base::ClassMethods.argument(name, options = {})


# Returns the source root for this generator using default_source_root as default.
Rails::Generators::Base.source_root(path = nil) 

# Make class option aware of Rails::Generators.options and Rails::Generators.aliases.
Rails::Generators::Base.class_option(name, options = {}) 

# 
ActiveSupport::CoreExtensions::Array::ExtractOptions.extract_options!
# 以下のように実装されている。
# Rubyは[1, 2, 3, c:4, d:5] のように値,値,hash, hashみたいな配列が可能。
# ただし、値...→hash...という順序以外だとsyntax errorになる。
# 結局、このメソッドは[a, b, c:1, d:2]という引数に対して、
# {c:1, d:2}をひとかたまりとして認識し抜き出す。
def extract_options!
  last.is_a?(::Hash) ? pop : {}
end

```