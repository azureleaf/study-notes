# Rails + Heroku

## ToC

- [Rails + Heroku](#rails--heroku)
  - [ToC](#toc)
  - [Install](#install)
    - [Create the Project](#create-the-project)
    - [Introduce Bootstrap](#introduce-bootstrap)
    - [Introduce PostgreSQL](#introduce-postgresql)
    - [Configure Rails for Postgres](#configure-rails-for-postgres)
    - [Set node.js version](#set-nodejs-version)

## Install

### Create the Project

- `rails new . -d postgresql` としておけば、楽だった。DB を指定しないと SQLite になる

```sh
nvm use v10
node -v
rails new .
rails webpacker:install
```


### Introduce Bootstrap

```sh
yarn add bootstrap jquery popper.js
```

```js
/**
 * Add to app/assets/stylesheets/application.scss
 */
@import "bootstrap/scss/bootstrap"; // put in the end of the file

/**
 * app/javascript/packs/application.js
 */
import 'bootstrap'
require("@rails/ujs").start()	require("@rails/ujs").start() // existing line

/**
 * config/webpack/environment.js
 */
const { environment } = require("@rails/webpacker"); // existing line
const webpack = require("webpack");
environment.plugins.append(
  "Provide",
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    Popper: ["popper.js", "default"],
  })
);
module.exports = environment; // existing line
```

### Introduce PostgreSQL

- `createdb myapp_test`などを行うチュートリアルもあるが、ＤＢは migration 時に自動で作成されるので不要。

```sh
# Installation (for the 1st run only)
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get -y install postgresql

# Create the role for this app
sudo -i -u postgres # change the Ubuntu user to postgres
createuser -d -P -e myapp # -d: CREATE DB privilege, -P: password, -e: echo details

# Check if the user is successfully created
psql
\du # display users
\l # list DBs
\q

exit
```

- 後に出てくる `createdb` 系コマンドが `WARNING: could not flush dirty data: Function not implemented`エラーを出すのに対する対策
- ただし、不要かもしれない

```sh
# /etc/postgresql/13/main/postgresql.confの最後尾に追加
fsync = off
data_sync_retry = true

# restart postgresql
sudo service postgresql restart
```

- 以下はユーザ作成にあたり不要だったし、やらない方がいいっぽい（古いやりかた？）

```sh
sudo -u postgres psql
CREATE ROLE myapp WITH CREATEDB LOGIN PASSWORD 'blah';
\q

sudo vim /etc/postgresql/13/main/pg_hba.conf
# Change line: "local all postgres peer" to "local all postgres md5"
sudo service postgresql restart
```

### Configure Rails for Postgres

```yml
# config/database.yml
default: &default
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  username: myapp
  password: <%= ENV['myapp_DB_PASSWORD'] %>
  host: localhost # lack of this line caused "peer authentication failed" error
  timeout: 5000

development:
  <<: *default
  database: myapp_development

test:
  <<: *default
  database: myapp_test

production:
  <<: *default
  database: myapp_production
```

```sh
# "libpq-dev" is a dependency of pg gem
sudo apt install libpq-dev
echo "gem 'pg'" >> Gemfile
bundle install

# security: パスワードを直接database.ymlに保存してはいけない
echo 'export myapp_DB_PASSWORD="blah"' >> ~/.bash_profile

rails db:migrate:reset
rails s
```

### Set node.js version

- https://devcenter.heroku.com/articles/nodejs-support#specifying-a-node-js-version

```json
// package.json
{
  "name": "myapp",
  "description": "a really cool app",
  "version": "1.0.0",
  "engines": {
    "node": "12.x"
  }
}

```