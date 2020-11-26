# PostgreSQL

## ToC

- [PostgreSQL](#postgresql)
  - [ToC](#toc)
  - [Termininology](#termininology)
  - [Commands (from shell)](#commands-from-shell)
  - [Commands (inside psql)](#commands-inside-psql)
  - [Config](#config)
  - [User & Role](#user--role)
  - [Privilege (for roles)](#privilege-for-roles)
  - [Privilege (for tables)](#privilege-for-tables)
  - [Misc](#misc)
  - [Process](#process)
  - [Auth method](#auth-method)
  - [Postgres + Rails](#postgres--rails)
    - [Create the Project](#create-the-project)
    - [Introduce wicked_pdf](#introduce-wicked_pdf)
    - [Introduce Bootstrap](#introduce-bootstrap)
    - [Introduce PostgreSQL](#introduce-postgresql)
    - [Configure Rails for Postgres](#configure-rails-for-postgres)
    - [Deploy to Heroku](#deploy-to-heroku)

## Termininology

- Role
  - A role can be a user
  - A role can be a group
  - A role can be a user & a group
  - Oracle SQL Server & MySQL also have the concept of role.
- Database Cluster


## Commands (from shell)


- `psql -d mydb -U myuser`
- `sudo -U postgres psql`
  - Allegedly better than `sudo su - postgres`
  - Can't be used when the `hba_file` value is converted from `peer` to `md5`
- `sudo -i -u postgres`
  - Available even after `md5`
- `psql -U default -h postgres`
  - h: Server host
- `psql mydb`

## Commands (inside psql)

```
\q # quit
\l # list DB
\d # my_table
\c # my_db connect
\dt # display tables
\du # display users
```

## Config

- Configure `pg_hba.conf`: Host-Based Authentication
- To locate this config file, login to Postgres and `SHOW hba_file;`


## User & Role

Oracle DB & MySQL also has the concept of role

```sql
CREATE ROLE user01; /* No login privilege */
CREATE ROLE user01 LOGIN;
CREATE USER davide WITH PASSWORD 'jw8s0F4';
CREATE ROLE john WITH CREATEDB LOGIN PASSWORD 'password1';
ALTER ROLE user01 LOGIN;
ALTER ROLE user01 NOLOGIN;
DROP ROLE user01;

psql -U john -d mydb
```

## Privilege (for roles)

- `LOGIN` / `NOLOGIN`
- `SUPERUSER` / `NOSUPERUSER`
- `CREATEDB`  / `NOCREATEDB`
- `CREATEROLE` / `NOCREATEROLE`
- `PASSWORD` Password required when the role needs to connect to DB
  - `ALTER ROLE user01 PASSWORD '1234';` to set password
  - `ALTER ROLE user01 PASSWORD NULL;` to remove password

## Privilege (for tables)

- `GRANT select 



## Misc

- Database Cluster
- `initdb`
  - Command to create DB cluster?
  - Executed when you `npm install`


## Process

```sh
sudo systemctl stop postgresql
sudo systemctl start postgresql
sudo systemctl restart postgresql
systemctl status postgresql-service

sudo service postgresql restart
```

## Auth method

Some 

- Password Auth (md5)
- Password Auth (password)
- Peer Auth
  - Default auth method
  - This sets the DB user name which is same as OS user name 
  - Available only for local DB
- Ident
  - Available only for TCP/IP connection
  - When ident is specified for a local (non-TCP/IP) connection, peer authentication will be used instead.


## Postgres + Rails

### Create the Project

- `rails new . -d postgres` としておけば、楽だった。DBを指定しないとSQLiteになる

```sh
nvm use v10
node -v
rails new .
rails webpacker:install
```

### Introduce wicked_pdf

```sh
echo "gem 'wicked_pdf'" >> Gemfile
bundle install
rails generate wicked_pdf
echo "gem 'wkhtmltopdf-binary'" >> Gemfile
bundle install
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

- `createdb myapp_test`などを行うチュートリアルもあるが、ＤＢはmigration時に自動で作成されるので不要。

```sh
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get -y install postgresql

sudo -i -u postgres # change the Ubuntu user to postgres
psql
\du # display users
\l # list DBs
\q
createuser -d -P -e myapp # -d: CREATE DB privilege, -P: password, -e: echo details
exit
```

- 後に出てくる `createdb` 系コマンドが `WARNING:  could not flush dirty data: Function not implemented`エラーを出すのに対する対策
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
  host: localhost
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
sudo apt install libpq-dev # pg gem dependency
echo "gem 'pg'" >> Gemfile
bundle install

# パスワードを直接database.ymlに保存しないため
echo 'export myapp_DB_PASSWORD="blah"' >> ~/.bash_profile

rails db:migrate:reset
rails s
```

### Deploy to Heroku

```sh
curl https://cli-assets.heroku.com/install-ubuntu.sh | sh 
heroku login # prompted to login on your browser

```