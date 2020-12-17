# devise

## ToC

- [devise](#devise)
  - [ToC](#toc)
  - [Overview](#overview)
  - [Setup procedure](#setup-procedure)
    - [Setup](#setup)
    - [Setup (When all the members share the identical auth strategy)](#setup-when-all-the-members-share-the-identical-auth-strategy)
    - [Setup details](#setup-details)
  - [Config](#config)
    - [Choose functionality](#choose-functionality)
    - [Config Method A. Configure in `config/initializers/devise.rb`:](#config-method-a-configure-in-configinitializersdeviserb)
    - [Config Method B. Configure in Model](#config-method-b-configure-in-model)
  - [Use case](#use-case)
    - [case: Default](#case-default)
    - [case: admins manage the password of the users](#case-admins-manage-the-password-of-the-users)

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
printf "gem 'devise'" >> Gemfile
bundle install

rails g devise:install # generate initializer
vim config/environments/development.rb # add mailer option (optional)
vim config/routes.rb # set root URL if not set yet

# This command set the files with devise presets:
#   Create model
#   Create migration
#   Set routes @config/routes.rb
rails g devise user
rails g devise admin

# Enable scoped view
vim config/initializers/devise.rb
config.scoped_views = true # edit this line in the file above

# Choose "blah-able" to use in the model.
# this overrides some settings at config/initializers/devise.rb
vim app/models/user.rb
vim app/models/admin.rb

# Generate controllers
rails g devise:controllers users # app/controllers/users/*_controller.rb
rails g devise:controllers admins # app/controllers/staffs/*_controller.rb

# Configure the routes @config/routes.rb
# Because CRUD routes for "admins" are totally overwrapped with those for "users",
# you need to set the dinstinct routes manually
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
rails g devise:views users
rails g devise:views admins

# add tags for flash message.
vim app/views/layouts/application.html.erb 

```

### Setup (When all the members share the identical auth strategy)

```sh
vim config/initializers/devise.rb
rails g devise:views # this creates the app/views/devise
```

### Setup details


## Config

### Choose functionality

- Database Authenticatable: hashes and stores a password in the database to validate the authenticity of a user while signing in. The authentication can be done both through POST requests or HTTP Basic Authentication.
- Omniauthable: adds OmniAuth (https://github.com/omniauth/omniauth) support.
- Confirmable: sends emails with confirmation instructions and verifies whether an account is already confirmed during sign in.
- Recoverable: resets the user password and sends reset instructions.
- Registerable: handles signing up users through a registration process, also allowing them to edit and destroy their account.
- Rememberable: manages generating and clearing a token for remembering the user from a saved cookie.
- Trackable: tracks sign in count, timestamps and IP address.
- Timeoutable: expires sessions that have not been active in a specified period of time.
- Validatable: provides validations of email and password. It's optional and can be customized, so you're able to define your own validations.
- Lockable: locks an account after a specified number of failed sign-in attempts. Can unlock via email or after a specified time period.

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

## Use case

### case: Default

1. 

### case: admins manage the password of the users

Feature I want:

- Doesn't require email address for registration.
- Doesn't let the user create / edit the account.

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

- Note that devise generates helpers according to the model names.
  
```rb
# assumption: the model name is "Member"

# in the controller
before_action :authenticate_member! # in the controller

# in the view
member_signed_in?
current_member
member_session
```