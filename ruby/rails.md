# RoR

## ToC

- [RoR](#ror)
  - [ToC](#toc)
  - [Install Rbenv](#install-rbenv)
  - [Install Ruby with rbenv](#install-ruby-with-rbenv)
  - [Install Rails and its dependencies](#install-rails-and-its-dependencies)
  - [Official Tutorial](#official-tutorial)
    - [Key files](#key-files)
    - [Functionalities](#functionalities)
    - [Dev Procedures](#dev-procedures)
  - [Rails Command](#rails-command)
  - [Naming](#naming)
  - [Routing](#routing)
  - [Controller](#controller)
  - [Views](#views)
  - [VS Code](#vs-code)
    - [Install Robocop](#install-robocop)
    - [Ruby (by Peng Lv) Extension](#ruby-by-peng-lv-extension)
    - [ruby-robocop Extension](#ruby-robocop-extension)
    - [settings.json](#settingsjson)
  - [Troubleshooting](#troubleshooting)

## Install Rbenv

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
```

## Install Ruby with rbenv

```sh
rbenv install -l # list the stable ruby versions
rbenv install 2.7.2
rbenv install -L # list the local ruby versions
rbenv global 2.7.2 # use the ruby version globally
rbenv local 2.7.2 # optional: when you want to use the ruby version inside the specific dir only
```

## Install Rails and its dependencies

```sh
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

# For new project:
rails new my_project # Hyphenation in the project name (e.g. my-project) caused "Errno::EACCES: Permission denied @ rb_file_s_rename"
rails webpacker:install

# For existing project:
bundle # Gemfile
yarn # package.json
rails migrate # if the app uses DB
```

## Official Tutorial

- Follow the [official tutorial](https://guides.rubyonrails.org/getting_started.html)

### Key files

```sh
app/
  controllers/blahblah_controller.rb
  views/blahblah/
  models/
config/
  routes.rb
db/migrate/YYYYMMDDHHMMSS_create_articles.rb
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

### Dev Procedures

1. Generate the `Welcome` \_VC + routes
1. Generate the `Article` MVC + migration + routes
1. Generate the `Comment` MVC + migration + routes
1. Connect the `Article` model to `Comment` model
1. Add auth to `Article` controller

## Rails Command

```sh
rails new MyProject
rails server
rails webpacker:install
rails generate controller Articles index
rails generate controller Articles
rails generate model Article title:string text:string
rails db:migrate
rails routes

```

## Naming

- routes.rb
  - `resources :articles`
- views/articles/new.html.erb
  - `scope: :article`
- articles_controller.rb
  - `class ArticlesController < ApplicationController`
- 


## Routing

```rb
# config/routes.rb
# Ruby DSL
Rails.applicaiton.routes.draw do
    # route the access to "/welcome/index" to "Welcome" controller "index" action
    get 'welcome/index'

    # route the access to "/" to "Welcome" controller "index" action
    root 'welcome#index'

    # route the access to: "/articles/<CRUD actions>
    resources :articles


```

## Controller

- Action is a method of the controller
- A controller is inherited from `ApplicationController`
- Actions must be `public`
- Actions must be declared prior to `private` methods

```ruby
index
show
new
edit
create
update
destroy
```

- `create` vs `new`
  - `new` requires `save`
  - `create` requires `new + save`

## Views

```ruby
# form_with: helper
# scope: Why is it singular???
# url: specify the <form action=""> path
<%= form_with scope: :article, url: articles_path, local: true do |form| %>
  <p>
    <%= form.label :title %><br>
    <%= form.text_field :title %>
  </p>

  <p>
    <%= form.label :text %><br>
    <%= form.text_area :text %>
  </p>

  <p>
    <%= form.submit %>
  </p>
<% end %>

```

## VS Code


### Install Robocop

```sh
gem install rubocop
```

### Ruby (by Peng Lv) Extension

### ruby-robocop Extension

### settings.json

## Troubleshooting

- `node-gyp` fails because it tries to find `python2` in the environment variables.
  - Downgrading node version from 15 to 10 worked.
  - `npm install -g node-gyp` is also necessary? not sure.
