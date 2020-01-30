# Laravel Study Note

- Laravelで毎日勉強したことを記録し、自分のモチベーションにしたい
- 細かいことは公式ドキュメントに任せて、要点とキーワードだけを網羅するように心がけたい。凝りだすとキリがないし...



## (Install Composer)

## (Install Laravel)

## Set up MySQL

1. `sudo apt install mysql-server`
1. `sudo mysql`
1. `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_new_password_here';`
1. `sudo /etc/init.d/mysql stop`
1. `sudo /etc/init.d/mysql start`
1. `sudo apt install php-mysql` Install DB Extension


## Set up the project

1. `laravel new myapp`
1. `cd myapp`
1. `npm install`
1. `composer install`
1. `cp .env.sample .env`
1. `php artisan key:generate`

## Set up the DB

## Set up Middlewares

- Middleware Group
- Global Middleware
- 

## Set up Migrations & Seeders


## Set up Controllers


## Set up Blade


### Directive
Vue.jsを使うなら、Bladeのディレクティブはそんなに覚えなくて問題ないけど。以下くらいは抑えるべき

- @if
- @for
- @foreach



## Maintenance

- `composer dump-autoload` なぜか大体これをやれば解決
- `composer update` composer.jsonを更新した時にやる？


## Keywords

- Composer View:

- Validator

- Middleware

- Service Container


- Service Provider


- MVC vs ADR

- DB class vs Eloquent

    - StackOverflowを見る限り、DB Classを使うことを推す人が結構いる。速度がEloquentよりずっと速いとか
    - ただし、自分みたいに使うデータがめちゃくちゃ少ない場合にはEloquentでORMの使い方に慣れるほうが良さそう



