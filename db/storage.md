# データ保存の基礎知識

## Keywords

- DBMS: Database Management System
- BaaS: Backend as a Service
- In-memory DB
  - Store in the memories instead of HDD/SSD
  - Advantage
    - Fast af
  - Disadvantage:
    - Lack "Durability" of ACID
    - Expensive
- Connection
  - You can't access to the DB without Open & Available connection
  - To create connection, you have to addressing info:
    - Server name (if any)
    - DB name
    - User ID
    - Password
- Connection Pool
- Transaction
- CRUD
- Rollback
- cursor
- ER 図
- ORM
- ACID
    - DBのトランザクションが持つべき４つの性質のこと
    - とはいえ、パフォーマンスを確保するためには、ACIDを完全に実装することは難しいらしい
    - Atomicity
    - Consistency
    - Isolation
    - Durability
- Stored Procedure
- Trigger
- Primary Key
- Cursol
- View
- Index

## Migration

- 日本語だと「マイグレーション」と表記されることが多い
- 利点
  - データベーススキーマの変更時に、SQL文を書かずにすむ
    - これはMigrationの利点と言うよりORM全般の利点
  - バージョン管理ができるので、複数人で開発しているときや、変更を元に戻すときに便利
  - 既存のデータを保持したまま、スキーマを変更できる
    - You can do this with ALTER TABLE without migration too, right?
- 疑問：既存データとの整合性はどうとるのか???
  - 新たにカラムを追加した時、それぞれの既存レコードにはそのカラムの既定値が設定される？
  - カラムの名前を変更した時
  - カラムを削除した時
  - データ自体も巻き戻せないなら、スキーマだけバージョン管理しても利益は薄い気がする
- マイグレーションは多くのORMで備えられているが、よく見られる関数
  - `up()`
  - `down()`

## RESTful API

- REST: REpresentational State Transfer とは、分散型システムにおける複数のソフトウェアを連携させるための設計原則のこと
- REST は 4 原則からなる
- Addressability
    - 全ての情報はURIで表現される一意なアドレスをもつ
- Stateless
    - 同じURLやパラメータでHTTP Requestしたら、常に同じ結果が返ってくる
    - Sessionなどは使わない
- Connectivity
    - ある情報から別の情報へ、またある情報の状態から別の状態へ、のリンク情報を情報内部に埋め込める
- Uniform Interface
    - 情報の操作は全てHTTP Method(GET POST PUT DELETE)を使い、それ以外を使わない
- RESTful API とは、REST の原則に則って構築された Web システムの HTTP での呼び出しインターフェースのこと
- 以上からすると、以下はRESTfulではない？
    - Sessionに依存するAPI
    - WebSocketなどを利用するAPI

## GraphQL API

https://employment.en-japan.com/engineerhub/entry/2018/12/26/103000　とかが詳しい

- GraphQL は Web API の規格
- 世界で一般人から嫌われまくってる Facebook だが、GraphQL と React はエンジニアから支持されてる気がする
- GraphQL はクエリ言語、スキーマ言語の２つの言語がある
- 見た感じ、GraphQL の形式は JSON みたい
- クエリ言語：３種類ある
  - Query：
  - Mutation：データ更新に使う
  - Subscription：
- スキーマ言語： リソースの名前や型を定義
  - field：　クラスのメンバみたいなもの(e.g. `name: String`)
  - type：　クラスみたいなもの
  - interface
  - union
  - Scalar
  - Enum
  - Directive
  - Discription
- GraphQL > RESTful な点
  - クエリからレスポンスを推測できる
  - スキーマ駆動開発に対応している
  - クエリの学習コストが小さい
- GraphQL < RESTful な点
  - パフォーマンスの分析が難しい
  - 大容量バイナリが扱いにくいらしい
- MISC
  - Relay Server Specification
  -

## Index

- カラム単位で作成する
- カラムの内容を検索するため、B-TREE という構造にしてデータ本体とは別に保存
- INSERT / DELETE の際には、Index も更新する
- Primary Keyのカラムには、自動的にINDEXが作成される？
- Advantage of Index
  - Fast search
- Disadvantage of Index
  - Additional storage consumption
  - Slow UPDATE / DELETE because Index will be also altered as well as records

## Parts of the DB

|RDBS|MongoDB|
|---|---|
|Database|Database|
|Table|Collection|
|Record|Document|
|Field|Field|

## DBs Categorization

- SQL DBs
  - MySQL
  - PostgreSQL
- No-SQL DBs
  - Document Databases: JSON のような形式保存
    - MongoDB
  - Key-value Database
    - Redis: in-memory
    - memcached: in-memory
  - Graph Database
    - Node で保存
    - SQL ではなく Cypher という言語でクエリする
    - Neo4j が代表的
  - Wide Column Stores
    - Cassandra

## Cloud DB

- Server-less Service
  - Firebase
- Cloud Storage Service
  - AWS S3
- File hosting Service
  - Google Drive
  - Microsoft OneDrive
  - DropBox


## ORM/ODM

- ORM: Object Relation Model
- ODM: Object Data Model

### 抑えるべきっぽい三大ORM
- TypeORM
  - MYSQL, Postgres, SQLite3, MongoDB, MariaDB, MSSQL, Oracle
- Mongoose
  - MongoDB
  - No SQLとしては筆頭格でよく使われる
- Sequelize
  - MySQL, Postgres, SQLite3, MariaDB, MSSQL
  - 伝統があるが、TypeORMに乗り換えていっている人が多い印象

### Node使いには重要じゃなさそうなORM
- Waterline
  - MySQL, Postgres, MongoDB, LDAP, Redis
- Loopback
- Node ORM2
  - MySQL, SQLite3, Progress
- Bookshelf
  - MySQL, Postgres, SQLite3
- Objection
  - MySQL, Postgres, SQLite3
- Eloquent ORM
  - Laravel用
- Active Record
  - Ruby on Rails用
  - Active RecordそのものがORMというか、Active Recordの中でORMも使っているという感じか？