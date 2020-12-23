# devise

## ToC

- [devise](#devise)
  - [ToC](#toc)
  - [References](#references)
  - [Overview](#overview)
  - [Setup procedure](#setup-procedure)
    - [Setup](#setup)
    - [Setup (When all the members share the identical auth strategy)](#setup-when-all-the-members-share-the-identical-auth-strategy)
    - [Setup details](#setup-details)
  - [Config](#config)
    - [Devise Modules](#devise-modules)
    - [Config Method A. Configure in `config/initializers/devise.rb`:](#config-method-a-configure-in-configinitializersdeviserb)
    - [Config Method B. Configure in Model](#config-method-b-configure-in-model)
  - [Use case: admins manage the password of the users](#use-case-admins-manage-the-password-of-the-users)
  - [Helper Methods](#helper-methods)
  - [i18n](#i18n)

## References

- Basics: https://github.com/heartcombo/devise#getting-started
- Use cases: https://github.com/heartcombo/devise/wiki/How-Tos

## Overview

- Gem for authentication.
- For social login, you need to install other gems as well:
```rb
gem 'devise'
gem 'omniauth'
gem 'omniauth-facebook'
gem 'omniauth-github'
gem 'omniauth-google-oauth2'
gem 'omniauth-linkedin'
gem 'omniauth-twitter'
```
- By default, devise supports the email auth:
  1. User register email & password
- [GitHub README](https://github.com/heartcombo/devise/) has detailed guide.
- [GitHub Wiki](https://github.com/heartcombo/devise/wiki) has FAQ.

## Setup procedure

### Setup

```sh
$ rails new myapp -d postgresql

$ printf "gem 'devise'" >> Gemfile
$ bundle install

$ bundle exec rails g devise:install # generate initializer
$ vim config/environments/development.rb # add mailer option (optional)

$ vim config/initializers/devise.rb
config.scoped_views = true # Enable scoped view

# This command set the files with devise presets:
#   Create model
#   Create migration
#   Set routes @config/routes.rb
$ bundle exec rails g devise user
$ bundle exec rails g devise admin

$ vim config/routes.rb
root 'pages#main' # Set the root URL (for example)

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

# Generate views (default)
# confirmations/new.html.erb	「認証メール再送信」画面
# passwords/edit.html.erb	// Password change page
# passwords/new.html.erb	「パスワードを忘れた場合のメール送信」画面
# registrations/edit.html.erb	// Edit user profile page
# registrations/new.html.erb	// User registration page
# sessions/new.html.erb // Login page
# unlocks/new.html.erb	「ロック解除メール再送信」画面
# mailer/confirmation_instructions.html.erb	「アカウント認証」時のメール用メッセージ
# mailer/password_change.html.erb	「パスワード変更完了」時のメール用メッセージ
# mailer/reset_password_instructions.html.erb	「パスワードリセット」時のメール用メッセージ
# mailer/unlock_instructions.html.erb // Define the mail message body for password reset
$ bundle exec rails g devise:views users
$ bundle exec rails g devise:views admins

# add tags for flash message. for example:
$ vim app/views/layouts/application.html.erb 
<body>
<p class="notice"><%= notice %></p>
<p class="alert"><%= alert %></p>
<%= yield %>
</body>

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

### Setup details


## Config

### Devise Modules

- Database Authenticatable
  - hashes and stores a password in the database to validate the authenticity of a user while signing in. The authentication can be done both through POST requests or HTTP Basic Authentication.
- Omniauthable
  - adds OmniAuth (https://github.com/omniauth/omniauth) support.
- Confirmable
  -  sends emails with confirmation instructions and verifies whether an account is already confirmed during sign in.
- Recoverable
  - resets the user password and sends reset instructions.
- Registerable
  - handles signing up users through a registration process, also allowing them to edit and destroy their account.
- Rememberable
  -  manages generating and clearing a token for remembering the user from a saved cookie.
- Trackable
  -  tracks sign in count, timestamps and IP address.
- Timeoutable
  -  expires sessions that have not been active in a specified period of time.
- Validatable
  -  provides validations of email and password. It's optional and can be customized, so you're able to define your own validations.
- Lockable
  -  locks an account after a specified number of failed sign-in attempts. Can unlock via email or after a specified time period.

### Config Method A. Configure in `config/initializers/devise.rb`:

```sh
 config.authentication_keys = [:username]
```

### Config Method B. Configure in Model
- You need to configure by this when you use multiple auth strategy.
- Because altering initializer affects all the models which isn't desirable for this case.
- e.g.
  - Using email + password strategy for `Admin` model
  - Using id + password strategy for `User` model

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

## i18n

1. Set the default locale to JA:

```rb
config.i18n.default_locale = :ja
```

2. Create `config/locales/devise.ja.yml`

```yml
ja:
  errors:
    messages:
      not_found: "は見つかりませんでした"
#      not_found: "not found"
      already_confirmed: "は既に登録済みです"
#      already_confirmed: "was already confirmed"
      not_locked: "は凍結されていません"
#      not_locked: "was not locked"

  devise:
    failure:
      unauthenticated: 'ログインしてください。'
#      unauthenticated: 'You need to sign in or sign up before continuing.'
      unconfirmed: '本登録を行ってください。'
#      unconfirmed: 'You have to confirm your account before continuing.'
      locked: 'あなたのアカウントは凍結されています。'
#      locked: 'Your account is locked.'
      invalid: 'メールアドレスかパスワードが違います。'
#      invalid: 'Invalid email or password.'
      invalid_token: '認証キーが不正です。'
#      invalid_token: 'Invalid authentication token.'
      timeout: 'セッションがタイムアウトしました。もう一度ログインしてください。'
#      timeout: 'Your session expired, please sign in again to continue.'
      inactive: 'アカウントがアクティベートされていません。'
#      inactive: 'Your account was not activated yet.'
    sessions:
      signed_in: 'ログインしました。'
#      signed_in: 'Signed in successfully.'
      signed_out: 'ログアウトしました。'
#      signed_out: 'Signed out successfully.'
    passwords:
      send_instructions: 'パスワードのリセット方法を数分以内にメールでご連絡します。'
#      send_instructions: 'You will receive an email with instructions about how to reset your password in a few minutes.'
      updated: 'パスワードを変更しました。'
#      updated: 'Your password was changed successfully. You are now signed in.'
    confirmations:
      send_instructions: '登録方法を数分以内にメールでご連絡します。'
#      send_instructions: 'You will receive an email with instructions about how to confirm your account in a few minutes.'
      confirmed: 'アカウントを登録しました。'
#      confirmed: 'Your account was successfully confirmed. You are now signed in.'
    registrations:
      signed_up: 'アカウント登録を受け付けました。確認のメールをお送りします。'
#      signed_up: 'You have signed up successfully. If enabled, a confirmation was sent to your e-mail.'
      updated: 'アカウントを更新しました。'
#      updated: 'You updated your account successfully.'
      destroyed: 'アカウントを削除しました。またのご利用をお待ちしております。'
#      destroyed: 'Bye! Your account was successfully cancelled. We hope to see you again soon.'
    unlocks:
      send_instructions: 'アカウントの凍結解除方法を数分以内にメールでご連絡します。'
#      send_instructions: 'You will receive an email with instructions about how to unlock your account in a few minutes.'
      unlocked: 'アカウントを凍結解除しました。'
#      unlocked: 'Your account was successfully unlocked. You are now signed in.'
    mailer:
      confirmation_instructions:
        subject: 'アカウントの登録方法'
#        subject: 'Confirmation instructions'
      reset_password_instructions:
        subject: 'パスワードの再設定'
#        subject: 'Reset password instructions'
      unlock_instructions:
        subject: 'アカウントの凍結解除'
#        subject: 'Unlock Instructions'
```