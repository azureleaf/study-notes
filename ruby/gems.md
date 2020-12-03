# Gems

## ToC

- [Gems](#gems)
  - [ToC](#toc)
  - [devise](#devise)
    - [Procedure](#procedure)
    - [Config](#config)

## devise

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

### Procedure

```sh
vim Gemfile # add gems
bundle install

rails g devise:install # create files in config/
vim config/environments/development.rb # add mailer option (optional)
vim config/routes.rb # set root URL if not set yet
vim app/views/layouts/application.html.erb # add tags for flash message

# Generate view files for devise inside app/views/devise
rails g devise:views

# create the model & migration with devise presets
rails g devise User
vim app/models/user.rb # declare the necessary modules

vim config/initializers/devise.rb


```

### Config



