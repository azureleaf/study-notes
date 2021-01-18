# How to use Devise

## ToC

- [How to use Devise](#how-to-use-devise)
  - [ToC](#toc)
  - [Refs](#refs)
  - [README digest](#readme-digest)
    - [Devise Modules](#devise-modules)
    - [Helpers](#helpers)
    - [Strong Parameters](#strong-parameters)
    - [Views / Controllers / Routes](#views--controllers--routes)
    - [Tests](#tests)
    - [MISC](#misc)
  - [Installation](#installation)
    - [Setup (When all the members share the identical auth strategy)](#setup-when-all-the-members-share-the-identical-auth-strategy)
  - [Config](#config)
  - [Use case: admins manage the password of the users](#use-case-admins-manage-the-password-of-the-users)
  - [Helper Methods](#helper-methods)
  - [Devise Wiki Digest: Upgrading](#devise-wiki-digest-upgrading)
    - [Upgrade: General Instructions](#upgrade-general-instructions)
    - [Upgrade to Devise 4.4](#upgrade-to-devise-44)
    - [Upgrade to Devise 3.1](#upgrade-to-devise-31)
    - [Upgrade to Devise 2.2](#upgrade-to-devise-22)
    - [Upgrade to Devise 2.1](#upgrade-to-devise-21)
    - [Upgrade to Devise 2.0](#upgrade-to-devise-20)
    - [Upgrade to Devise 2.0 migration schema style](#upgrade-to-devise-20-migration-schema-style)
    - [Migration legacy database](#migration-legacy-database)
  - [Devise Wiki Digest: Workflow Customization](#devise-wiki-digest-workflow-customization)
    - [Automatically generate password for users (simpler registration)](#automatically-generate-password-for-users-simpler-registration)
    - [Change the default sign_in and sign_out routes](#change-the-default-sign_in-and-sign_out-routes)
    - [Change Default Sign_up Registration Path with Custom Path](#change-default-sign_up-registration-path-with-custom-path)
    - [Customize routes to user registration pages](#customize-routes-to-user-registration-pages)
    - [Redirect to a specific page on successful sign in out](#redirect-to-a-specific-page-on-successful-sign-in-out)
    - [Customize the redirect after a user edits their profile](#customize-the-redirect-after-a-user-edits-their-profile)
    - [Customize the redirect path after destroying a session (signing out)](#customize-the-redirect-path-after-destroying-a-session-signing-out)
    - [Override confirmations so users can pick their own passwords as part of confirmation activation](#override-confirmations-so-users-can-pick-their-own-passwords-as-part-of-confirmation-activation)
    - [Retain User Data after account Delete (soft delete)](#retain-user-data-after-account-delete-soft-delete)
    - [Use Omniauth in a localized scope](#use-omniauth-in-a-localized-scope)
    - [Redirect with locale after authentication failure](#redirect-with-locale-after-authentication-failure)
    - [Require admin to activate account before sign_in](#require-admin-to-activate-account-before-sign_in)
    - [Set up devise as a single user system](#set-up-devise-as-a-single-user-system)
    - [Two step confirmation](#two-step-confirmation)
    - [Redirect back to current page after sign in, sign out, sign up, update](#redirect-back-to-current-page-after-sign-in-sign-out-sign-up-update)
    - [Redirect from HTTPS to HTTP on successful sign out](#redirect-from-https-to-http-on-successful-sign-out)
    - [Redirect to a specific page on successful sign in, sign up, or sign out](#redirect-to-a-specific-page-on-successful-sign-in-sign-up-or-sign-out)
    - [Redirect to a specific page when the user can not be authenticated](#redirect-to-a-specific-page-when-the-user-can-not-be-authenticated)
    - [Do not redirect to login page after session timeout](#do-not-redirect-to-login-page-after-session-timeout)
    - [Create a guest user](#create-a-guest-user)
    - [Allow users to edit their password](#allow-users-to-edit-their-password)
    - [Require authentication for all pages and avoid "You need to sign in..." message when hitting the application root](#require-authentication-for-all-pages-and-avoid-you-need-to-sign-in-message-when-hitting-the-application-root)
    - [Use a custom email validator with Devise](#use-a-custom-email-validator-with-devise)
    - [Notify users via email when their passwords change](#notify-users-via-email-when-their-passwords-change)
    - [Customize minimum password length](#customize-minimum-password-length)
  - [Devise Wiki Digest: View/Content Customization](#devise-wiki-digest-viewcontent-customization)
    - [Create custom layouts](#create-custom-layouts)
    - [Custom mailer](#custom-mailer)
    - [I18n](#i18n)
    - [Set :host and :port for all devise mailer urls](#set-host-and-port-for-all-devise-mailer-urls)
    - [Override devise_error_messages! for use in views](#override-devise_error_messages-for-use-in-views)
    - [Integrate I18n Flash Messages with Devise and Bootstrap](#integrate-i18n-flash-messages-with-devise-and-bootstrap)
    - [I18n Messages for Scoped Resources](#i18n-messages-for-scoped-resources)
    - [Add sign_in, sign_out, and sign_up links to your layout template](#add-sign_in-sign_out-and-sign_up-links-to-your-layout-template)
  - [Devise Wiki Digest: Custom Authentication Methods](#devise-wiki-digest-custom-authentication-methods)
    - [IMPORTANT: Allow users to sign in with something other than their email address](#important-allow-users-to-sign-in-with-something-other-than-their-email-address)
    - [Authenticate via LDAP](#authenticate-via-ldap)
    - [Create a guest user](#create-a-guest-user-1)
    - [Email-only sign-up](#email-only-sign-up)
    - [Edit an account without providing a password](#edit-an-account-without-providing-a-password)
    - [HTTP Authentication](#http-authentication)
    - [HTTP Auth Basic](#http-auth-basic)
    - [Recaptcha](#recaptcha)
    - [Remote authentication with Devise](#remote-authentication-with-devise)
    - [Set up devise as a single user system](#set-up-devise-as-a-single-user-system-1)
    - [Sign in using either a username or email address](#sign-in-using-either-a-username-or-email-address)
    - [Simple Token Authentication Example](#simple-token-authentication-example)
    - [Use case insensitive emails](#use-case-insensitive-emails)
    - [Use SSL (HTTPS)](#use-ssl-https)
    - [Use subdomains](#use-subdomains)
    - [AWS Cognito Federated Identity Authentication Example](#aws-cognito-federated-identity-authentication-example)
  - [Devise Wiki Digest: OmniAuth](#devise-wiki-digest-omniauth)
    - [OmniAuth: Overview](#omniauth-overview)
    - [OmniAuth: Testing](#omniauth-testing)
    - [Omniauthable, sign out action and rememberable](#omniauthable-sign-out-action-and-rememberable)
    - [OmniAuth: Azure AD](#omniauth-azure-ad)
  - [Devise Wiki Digest: Testing](#devise-wiki-digest-testing)
    - [Capybara](#capybara)
    - [Controller tests with Rails (and RSpec)](#controller-tests-with-rails-and-rspec)
    - [Cucumber](#cucumber)
    - [OmniAuth: Testing](#omniauth-testing-1)
    - [Rspec with devise and machinist](#rspec-with-devise-and-machinist)
    - [Speed up your unit tests](#speed-up-your-unit-tests)
    - [Stub authentication in controller specs](#stub-authentication-in-controller-specs)
  - [Devise Wiki Digest: Privileges/Authorization](#devise-wiki-digest-privilegesauthorization)
    - [Add an Admin role](#add-an-admin-role)
    - [Add a default role to a User](#add-a-default-role-to-a-user)
    - [Create a guest user](#create-a-guest-user-2)
    - [Integrate with CanCan for roles management](#integrate-with-cancan-for-roles-management)
    - [Manage Users with an Admin Role (CanCan method)](#manage-users-with-an-admin-role-cancan-method)
    - [Require admin to activate account before sign_in](#require-admin-to-activate-account-before-sign_in-1)
    - [Sign in as another user if you are an admin](#sign-in-as-another-user-if-you-are-an-admin)
    - [Turn off trackable for admin users](#turn-off-trackable-for-admin-users)
  - [Devise Wiki Digest: Special Configurations](#devise-wiki-digest-special-configurations)
    - [Add :confirmable to Users](#add-confirmable-to-users)
    - [Add :lockable to Users](#add-lockable-to-users)
    - [Create a custom encryptor](#create-a-custom-encryptor)
    - [Create Haml and Slim Views](#create-haml-and-slim-views)
    - [Configure a master password](#configure-a-master-password)
    - [Customize user account status validation when logging in](#customize-user-account-status-validation-when-logging-in)
    - [Disable user from destroying their account](#disable-user-from-destroying-their-account)
    - [Disallow previously used passwords](#disallow-previously-used-passwords)
    - [Dynamic user registration timeout](#dynamic-user-registration-timeout)
    - [Embed users in your account model with Mongoid](#embed-users-in-your-account-model-with-mongoid)
    - [Protect Resque Web with Devise](#protect-resque-web-with-devise)
    - [Send emails from subdomains](#send-emails-from-subdomains)
    - [Send emails in background (Resque, Sidekiq and Delayed::Job)](#send-emails-in-background-resque-sidekiq-and-delayedjob)
    - [Using paranoid mode, avoid user enumeration on registerable](#using-paranoid-mode-avoid-user-enumeration-on-registerable)
    - [Use Devise Inside a Mountable Engine](#use-devise-inside-a-mountable-engine)
    - [Elsewhere in your App](#elsewhere-in-your-app)
    - [Add sign_in, sign_out, and sign_up links to your layout template](#add-sign_in-sign_out-and-sign_up-links-to-your-layout-template-1)
    - [Display a custom sign_in form anywhere in your app](#display-a-custom-sign_in-form-anywhere-in-your-app)
    - [Sign in from a controller](#sign-in-from-a-controller)
    - [Use Devise generated method and filters for controllers](#use-devise-generated-method-and-filters-for-controllers)
    - [Find a user when you have their credentials](#find-a-user-when-you-have-their-credentials)
    - [Make Devise work with other formats like mobile, iPhone and iPad (Rails specific)](#make-devise-work-with-other-formats-like-mobile-iphone-and-ipad-rails-specific)
    - [Manage users through a CRUD interface](#manage-users-through-a-crud-interface)
    - [Mass password reset and email notification](#mass-password-reset-and-email-notification)
    - [JavaScript](#javascript)
    - [Use with BackboneJS models](#use-with-backbonejs-models)
    - [Migrating from other authentication plugins](#migrating-from-other-authentication-plugins)
    - [Migrate from restful_authentication to Devise](#migrate-from-restful_authentication-to-devise)
    - [Add devise required columns to an existing users table](#add-devise-required-columns-to-an-existing-users-table)

## Refs

- [GitHub README](https://github.com/heartcombo/devise/)
- [GitHub Wiki](https://github.com/heartcombo/devise/wiki)
- [GitHub Rubydoc](https://www.rubydoc.info/github/heartcombo/devise/)

## README digest

### Devise Modules

Pass the necessary feature modules for your app to `devise` method in the model.

- Database Authenticatable: hashes and stores a password in the database.
  - A. POST requests Authentication: standard auth
  - B. HTTP Basic Authentication: `.htaccess` & `.htpasswd`
- Omniauthable: Add Omniauth for social login.
- Confirmable: sends emails with confirmation instructions and verifies whether an account is already confirmed during sign in.
- Recoverable: resets the user password and sends reset instructions with E-mail.
- Registerable: handles signing up users through a registration process, also allowing them to edit and destroy their account.
- Rememberable: manages generating and clearing a token for remembering the user from a saved cookie.
- Trackable: Store stats of login counts / timestamps / IP addresses.
- Timeoutable: 一定時間が経過したらセッションを無効にする。
- Validatable: Validates E-mail & Password. Validation rule customizable.
- Lockable: ログイン失敗が特定回数続いたらアカウントをロックできる。ロック解除はメール経由か、もしくは一定時間経過後に可能。

### Helpers

```rb
defore_action :authenticate_admin!
current_admin
admin_signed_in?
admin_session

# path helper
admin_root_path
```

### Strong Parameters

### Views / Controllers / Routes

- For authentications with multiple models.

Config

```rb
config.scoped_views = true # multiple auth entities

```

View Generation


```sh
# generator
$ rails generate devise:views admins

# output
confirmations/new.html.erb #	「認証メール再送信」画面
passwords/edit.html.erb	# Password change page
passwords/new.html.erb	# 「パスワードを忘れた場合のメール送信」画面
registrations/edit.html.erb	# Edit user profile page
registrations/new.html.erb	# User registration page
sessions/new.html.erb # Login page
unlocks/new.html.erb	# 「ロック解除メール再送信」画面
mailer/confirmation_instructions.html.erb	# 「アカウント認証」時のメール用メッセージ
mailer/password_change.html.erb #	「パスワード変更完了」時のメール用メッセージ
mailer/reset_password_instructions.html.erb	# 「パスワードリセット」時のメール用メッセージ
mailer/unlock_instructions.html.erb # Define the mail message body for password reset
```

Controller Generation

```sh
$ rails generate devise:controllers admins


```


Models

```rb
# model
devise_for :admins,
  path: 'admins',
  controllers: {
    sessions:      'admins/sessions',
    passwords:     'admins/passwords',
    registrations: 'admins/registrations'
  },
  # Optional: if you want to override the default paths
  path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    password: 'secret',
    confirmation: 'verification',
    unlock: 'unblock',
    registration: 'register',
    sign_up: 'cmon_let_me_in'
  }
```

Routes

```sh
# default routes


```


```rb
# Optional: If you want deeply customized routes
devise_scope :user do
  get 'sign_in', to: 'devise/sessions#new'
end

```

### Tests

idk well about the testing.

- test tool
  - minitest (by default)
  - Rspec
- Controller test
- Integration test

### MISC

- I18n: Configure `locale` files.
   1. `config.i18n.default_locale = :ja`
   2. Create `config/locales/devise.ja.yml`: Google and get the sample.
- Omniauth: Requires additional gems; e.g. `gem 'omniauth'` and `gem 'omniauth-facebook'` for Facebook.
- Multiple Models: Generate the views / controllers / routes for every model.
- Using Devise with API-only Rails: Seemingly Devise offers limited support for this.
- Warden: Devise is based on Warden (Rack authentication framework)

## Installation


```sh
$ rails new myapp -d postgresql

$ printf "gem 'devise'" >> Gemfile
$ bundle install

# Generate 2 files:
#   config/initializers/devise.rb
#   config/locales/devise.en.yml
$ bundle exec rails g devise:install

$ vim config/routes.rb
root 'pages#main' # Set the root URL (for example)

# add tags for flash message. for example:
$ vim app/views/layouts/application.html.erb
<body>
  <p class="notice"><%= notice %></p>
  <p class="alert"><%= alert %></p>
  <%= yield %>
</body>

$ vim config/environments/development.rb # add mailer options when you use a mailer
config.action_mailer.default_url_options = { host: 'localhost', port: 3000 } # for example

$ vim config/initializers/devise.rb
config.scoped_views = true # Enable scoped view

# This command set the files with devise presets:
#   Create model
#   Create migration
#   Set routes @config/routes.rb
$ bundle exec rails g devise user
$ bundle exec rails g devise admin

# Choose "blah-able" to use in the model.
# this overrides some settings at config/initializers/devise.rb
$ vim app/models/user.rb
$ vim app/models/admin.rb

# Generate controllers
$ bundle exec rails g devise:controllers users # app/controllers/users/*_controller.rb
$ bundle exec rails g devise:controllers admins # app/controllers/staffs/*_controller.rb

# Configure the routes @config/routes.rb
# Because CRUD routes for "admins" are totally overwrapped with those for "users",
# you need to set the dinstinct routes manually.
# Check the generated path helper with "rails routes"
devise_for :admins, path: 'admins', controllers: {
  sessions:      'admins/sessions',
  passwords:     'admins/passwords',
  registrations: 'admins/registrations'
}
devise_for :users, path: 'users', controllers: {
  sessions:      'users/sessions',
  passwords:     'users/passwords',
  registrations: 'users/registrations'
}

# Generate views
$ bundle exec rails g devise:views users
$ bundle exec rails g devise:views admins


# Set up i18n
$ vim config/application.rb
module App
  class Application < Rails::Application
    config.load_defaults 6.0
    config.i18n.default_locale = :ja # add this line
  end
end
```

### Setup (When all the members share the identical auth strategy)

```sh
vim config/initializers/devise.rb
rails g devise:views # this creates the app/views/devise
```



## Config

## Use case: admins manage the password of the users

Feature I want:

- Users use the user ID instead of email address.
- Users can't user create / edit the account.
- Admins login with email addresses.
- Admins create the user accounts, and give the credential infos to users directly.

Functionalities I need:

- Database Authenticatable
- Rememberable
- Trackable
- Timoutable
- Validatable
- Lockable

1. Edit the initializer.

```rb
# config/initializers/devise.rb

# Change the key from email to customized column
config.authentication_keys = [:user_id]
config.case_insentive_keys = [:user_id]
config.strip_whitespace_keys = [:user_id]

# Because we disable "confirmable"
config.reconfirmable = false

# Because we enable "timeoutable"
config.timeout_in = 30.minutes

# Because we enable "rememberable"
config.remember_for = 1.weeks


# Because we enable "unlockable"
config.unlock_keys = [:user_id]
config.unlock_strategy = :time
config.maximum_attempts = 10
config.unlock_in = 12.hour
config.last_attempt_warning = true
```

2. Edit the view file.


```html
<!-- view file such as: layouts/application.html.erb -->
 <nav>
  <% if user_signed_in? %>
    <strong><%= link_to current_user.username, pages_show_path %></strong>
    <%= link_to 'プロフィール変更', edit_user_registration_path %>
    <%= link_to 'ログアウト', destroy_user_session_path, method: :delete %>
  <% else %>
    <%= link_to 'サインアップ', new_user_registration_path %>
    <%= link_to 'ログイン', new_user_session_path %>
  <% end %>
</nav>

```

## Helper Methods

- Devise generates helpers according to the model names.

```rb
# assumption: the model name is "Member"


def index
    flash[:notice] = "ログイン済ユーザーのみ記事の詳細を確認できます" unless user_signed_in?
end
member_signed_in?


current_member
current_member.id
current_member.name

member_session

before_action :authenticate_member! # auth is required for all the actions
before_action :authenticate_user!, only: [:show] # auth is required for "show" action only

# controller:
before_action :configure_permitted_parameters, if: :devise_controller?
#新規登録時のストロングパラメータに「nicknameカラム」の追加
def configure_permitted_parameters
    #新規登録時のストロングパラメータに「nicknameカラムとageカラム」の追加
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname, :age])
end

```


## Devise Wiki Digest: Upgrading

### Upgrade: General Instructions
### Upgrade to Devise 4.4
### Upgrade to Devise 3.1
### Upgrade to Devise 2.2
### Upgrade to Devise 2.1
### Upgrade to Devise 2.0
### Upgrade to Devise 2.0 migration schema style
### Migration legacy database

## Devise Wiki Digest: Workflow Customization

### Automatically generate password for users (simpler registration)

実現したい流れ：
1. ユーザはメールアドレスを入力
2. 登録申請するとそのメールアドレスにパスワードが送られる
3. ユーザはパスワード変更できる。

- `Devise.friendly_token.first(8)` generates 8-digit random string.

### Change the default sign_in and sign_out routes

- for example: Change login route /users/sing_in (default) into /login

A. Add `path_names` args to `devise_for`
B. Use `devise_scope`
C. Use `as`

### Change Default Sign_up Registration Path with Custom Path


- What's `Customer::Private` ???

### Customize routes to user registration pages

### Redirect to a specific page on successful sign in out

### Customize the redirect after a user edits their profile

### Customize the redirect path after destroying a session (signing out)

### Override confirmations so users can pick their own passwords as part of confirmation activation

### Retain User Data after account Delete (soft delete)

### Use Omniauth in a localized scope

### Redirect with locale after authentication failure

### Require admin to activate account before sign_in

### Set up devise as a single user system

### Two step confirmation

### Redirect back to current page after sign in, sign out, sign up, update

### Redirect from HTTPS to HTTP on successful sign out

### Redirect to a specific page on successful sign in, sign up, or sign out

### Redirect to a specific page when the user can not be authenticated

### Do not redirect to login page after session timeout

### Create a guest user

### Allow users to edit their password

### Require authentication for all pages and avoid "You need to sign in..." message when hitting the application root

### Use a custom email validator with Devise

### Notify users via email when their passwords change

### Customize minimum password length


## Devise Wiki Digest: View/Content Customization

### Create custom layouts

### Custom mailer

### I18n
- Set default locale in `config/application.rb`
- Use `devise-i18n` gem to get translations.
- You can put custom locale files in config/locales.

### Set :host and :port for all devise mailer urls

### Override devise_error_messages! for use in views

### Integrate I18n Flash Messages with Devise and Bootstrap

### I18n Messages for Scoped Resources

### Add sign_in, sign_out, and sign_up links to your layout template


## Devise Wiki Digest: Custom Authentication Methods

### IMPORTANT: Allow users to sign in with something other than their email address

deviseではデフォルトで`email`をユーザー識別子として利用するが、これを変更できる。例： usernameやuuidなどで識別する。

1. `authentication_keys`属性を変更する。
   - A. `config/initializers/devise.rb` で設定する方法。
   - B. モデルで設定する方法。認証主体のモデルごとに異なる認証方式を使う場合はこれ。識別子のバリデーションも忘れずに。
2. 追加した識別子を、`permit()`で許可する。
3. Viewファイルを生成し編集する。例えばデフォルトのユーザ登録画面はメールアドレス入力欄になっているので。
4. `config/locales/devise.en.yml`でエラーメッセージを編集する。「メールアドレスが無効です」みたいになっているので。

- 注意： emailが識別子でなく、かつemailを使う場合には`recoverable`モジュールがうまく動かないため工夫が必要。同じemailで複数のアカウントが存在してしまうことになるのでこうなる。
- 注意： emailが識別子でなく、`validatable`を使う場合には、emailの存在確認などのバリデーションルールをモデル側で外してやる必要がある。

### Authenticate via LDAP

-

### Create a guest user

### Email-only sign-up

### Edit an account without providing a password

### HTTP Authentication

### HTTP Auth Basic

### Recaptcha

### Remote authentication with Devise

### Set up devise as a single user system

### Sign in using either a username or email address

### Simple Token Authentication Example

### Use case insensitive emails

### Use SSL (HTTPS)

### Use subdomains

### AWS Cognito Federated Identity Authentication Example


## Devise Wiki Digest: OmniAuth

### OmniAuth: Overview

### OmniAuth: Testing

### Omniauthable, sign out action and rememberable

### OmniAuth: Azure AD


## Devise Wiki Digest: Testing

### Capybara

### Controller tests with Rails (and RSpec)

### Cucumber

### OmniAuth: Testing

### Rspec with devise and machinist

### Speed up your unit tests

### Stub authentication in controller specs

## Devise Wiki Digest: Privileges/Authorization

### Add an Admin role

3つの方法がある。

1. Adminモデルを作成する方法
2. Userモデルに`admin`(boolean)属性を追加する方法
3. Userモデルに`role`(integer)属性を追加し、モデルでenum（admin, user, vip...)を属性として追加する方法

### Add a default role to a User

### Create a guest user

- [Qiita](https://qiita.com/take18k_tech/items/35f9b5883f5be4c6e104)
-

### Integrate with CanCan for roles management

### Manage Users with an Admin Role (CanCan method)

### Require admin to activate account before sign_in

### Sign in as another user if you are an admin

### Turn off trackable for admin users



## Devise Wiki Digest: Special Configurations

### Add :confirmable to Users

### Add :lockable to Users

### Create a custom encryptor

### Create Haml and Slim Views

### Configure a master password

### Customize user account status validation when logging in

### Disable user from destroying their account

### Disallow previously used passwords

### Dynamic user registration timeout

### Embed users in your account model with Mongoid

### Protect Resque Web with Devise

### Send emails from subdomains

### Send emails in background (Resque, Sidekiq and Delayed::Job)

### Using paranoid mode, avoid user enumeration on registerable

### Use Devise Inside a Mountable Engine

### Elsewhere in your App

### Add sign_in, sign_out, and sign_up links to your layout template

### Display a custom sign_in form anywhere in your app

### Sign in from a controller

### Use Devise generated method and filters for controllers

### Find a user when you have their credentials

### Make Devise work with other formats like mobile, iPhone and iPad (Rails specific)

### Manage users through a CRUD interface

### Mass password reset and email notification

### JavaScript

### Use with BackboneJS models

### Migrating from other authentication plugins

### Migrate from restful_authentication to Devise

### Add devise required columns to an existing users table
