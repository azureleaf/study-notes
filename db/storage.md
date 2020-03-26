# Topics on Data Storage

## Keywords: essential

- DBMS: Database Management System
- In-memory DB
  - Store in the memories instead of HDD/SSD
  - Advantage
    - Fast af
  - Disadvantage:
    - Lack "Durability" of ACID
    - Expensive
- Transaction
- CRUD
- Rollback
- cursor
- ER 図
- ORM
- ACID
  - DB のトランザクションが持つべき４つの性質のこと
  - とはいえ、パフォーマンスを確保するためには、ACID を完全に実装することは難しいらしい
  - Atomicity
  - Consistency
  - Isolation
  - Durability
- Stored Procedure
- Trigger
- Primary Key
- Cursol
- View
  - With view, you can make the shorthand to retrieve records with `SELECT`
  - You can `SELECT * FROM view_name_here;` as if the view is a table
  - Therefore, view is fften referred to as "virtual tables"
  - Keywords like `JOIN` are available to define the view
- Index

## Keywords: advanced

- BaaS: Backend as a Service
- JDBC: Java DB Connectivity

## Connection

- You can't access to the DB without Open & Available connection
- To create a connection, you have to addressing info:
  - Server name (if any)
  - DB name
  - User ID
  - Password
- Connections are done over TCP socket
- Connection Pool
  - Cache of connections
  - DBMS requires considerable time to connect to DB, so using the cache
  -

## Migration

- Advantage
  - データベーススキーマの変更時に、SQL 文を書かずにすむ
    - これは Migration の利点と言うより ORM 全般の利点
  - バージョン管理ができるので、複数人で開発しているときや、変更を元に戻すときに便利
  - 既存のデータを保持したまま、スキーマを変更できる
    - You can do this with ALTER TABLE without migration too, right?
- 疑問：既存データとの整合性はどうとるのか???
  - 新たにカラムを追加した時、それぞれの既存レコードにはそのカラムの既定値が設定される？
  - カラムの名前を変更した時
  - カラムを削除した時
  - データ自体も巻き戻せないなら、スキーマだけバージョン管理しても利益は薄い気がする
- Frequently encountered function in migration file
  - `up()`
  - `down()`

## RESTful API

- REST: REpresentational State Transfer
  - 分散型システムにおける複数のソフトウェアを連携させるための設計原則のこと
- REST は 4 原則からなる
- Addressability
  - 全ての情報は URI で表現される一意なアドレスをもつ
- Stateless
  - 同じ URL やパラメータで HTTP Request したら、常に同じ結果が返ってくる
  - Session などは使わない
- Connectivity
  - ある情報から別の情報へ、またある情報の状態から別の状態へ、のリンク情報を情報内部に埋め込める
- Uniform Interface
  - 情報の操作は全て HTTP Method(GET POST PUT DELETE)を使い、それ以外を使わない
- RESTful API とは、REST の原則に則って構築された Web システムの HTTP での呼び出しインターフェースのこと
- 以上からすると、以下は RESTful ではない？
  - Session に依存する API
  - WebSocket などを利用する API

## GraphQL API

- References
  - https://employment.en-japan.com/engineerhub/entry/2018/12/26/103000
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
- Primary Key のカラムには、自動的に INDEX が作成される？
- Advantage of Index
  - Fast search
- Disadvantage of Index
  - Additional storage consumption
  - Slow UPDATE / DELETE because Index will be also altered as well as records

## DB Parts

| RDBS     | MongoDB    |
| -------- | ---------- |
| Database | Database   |
| Table    | Collection |
| Record   | Document   |
| Field    | Field      |

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
  - Alicloud
- File hosting Service
  - Google Drive
  - Microsoft OneDrive
  - DropBox

## ORM/ODM

- ORM: Object Relation Model
- ODM: Object Data Model

### 抑えるべきっぽい三大 ORM

- TypeORM
  - MYSQL, Postgres, SQLite3, MongoDB, MariaDB, MSSQL, Oracle
- Sequelize
  - MySQL, Postgres, SQLite3, MariaDB, MSSQL
  - Traditional and reliable
  - Not so good at collaboration with TypeScript
  -
- Mongoose
  - MongoDB

### Node 使いには重要じゃなさそうな ORM

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
  - Laravel 用
- Active Record
  - Ruby on Rails 用
  - Active Record そのものが ORM というか、Active Record の中で ORM も使っているという感じか？
