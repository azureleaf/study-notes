# Databases

## Overview & Keywords

- Migration
    - Table Schemaの定義をする。Laravelに限らずどこでも使う用語
    - 単なるスキーマ定義だけでなく、その変更をバージョン管理できるのがMigrationの利点？DBは整合性が大切だから？
- Seeder
    - Migration Fileを変更しスキーマを変えるたびにSeederも編集しないといけないのがちょっと面倒
- Factory
    - Seederと同じようにテストデータを用意するための機能
    - 一定のルールに従って、データを自動生成する
- Pagination
    - DBの取得結果の件数次第で変わるという点から、PaginatioはDBと深いつながりがある
    - Eloquentであれ、Query Builderであれ、アクセスして持ってきたデータの塊に`->paginate(15)`のようにつけたすのが基本

## Two ways to access DB:
- Eloquent
    - DBをクラスのように扱うためのORM
    - 基本的にQuery Builderよりも直感的な操作が可能で、ツールも多い感じ
- Query Builder
    - Eloquentよりも高速（データが非常に多い時以外はEloquentの方が良さそう）



## Set up MySQL

1. `sudo apt install mysql-server`
1. `sudo mysql`
1. `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_new_password_here';`
1. Restart mysql
    - `sudo /etc/init.d/mysql stop`
    - `sudo /etc/init.d/mysql start`
1. Install DB Extension
    - `sudo apt install php-mysql` 


## Set up the DB


## Query Builder


## Seeder

