# DB

# ToC

- [DB](#db)
- [ToC](#toc)
- [DB MISC](#db-misc)
- [3層スキーマ](#3層スキーマ)
- [DB Model](#db-model)
- [ER Diagram](#er-diagram)
- [DB types](#db-types)
- [正規形](#正規形)
- [従属](#従属)
- [演算](#演算)
  - [関係演算](#関係演算)
  - [集合演算](#集合演算)
- [SQL: Lang Types](#sql-lang-types)
- [SQL: SELECT](#sql-select)
- [DBMS](#dbms)
- [SQL: GRANT](#sql-grant)
- [Mutex for DB](#mutex-for-db)
- [Mutex for DB: Lock](#mutex-for-db-lock)
- [障害回復](#障害回復)
- [DB Performance](#db-performance)
- [Strategy to increase the DB server performance](#strategy-to-increase-the-db-server-performance)
- [Distributed DB: MISC](#distributed-db-misc)
- [分散DBでの表の結合方法](#分散dbでの表の結合方法)
- [Distributed DB: Basics](#distributed-db-basics)
- [Distributed DB: Advantage](#distributed-db-advantage)
- [Distributed DB: Keywords](#distributed-db-keywords)
- [Transaction: ACID](#transaction-acid)
- [Transaction: Isolation Level](#transaction-isolation-level)
- [Transaction: Isolation MISC](#transaction-isolation-misc)
- [RDB](#rdb)
- [DB Partitioning: Overview](#db-partitioning-overview)
- [DB partitioning: Category](#db-partitioning-category)
- [DB partitioning:](#db-partitioning)
- [MySQL](#mysql)
- [Manage Account](#manage-account)
- [Basic Command](#basic-command)
- [Topics on Data Storage](#topics-on-data-storage)
- [Keywords](#keywords)
- [Keywords: advanced](#keywords-advanced)
- [Connection](#connection)
- [Migration](#migration)
- [RESTful API](#restful-api)
- [GraphQL API](#graphql-api)
- [Index](#index)
- [DB Parts](#db-parts)
- [DBs](#dbs)
  - [SQL DBs](#sql-dbs)
  - [No-SQL DBs](#no-sql-dbs)
- [Cloud DB](#cloud-db)
- [ORM/ODM](#ormodm)
  - [抑えるべきっぽい三大 ORM](#抑えるべきっぽい三大-orm)
  - [Node 使いには重要じゃなさそうな ORM](#node-使いには重要じゃなさそうな-orm)
- [Scaling](#scaling)
- [DB Performance](#db-performance-1)


# DB MISC

- KVS: Key Value Store
- memcached
- DWH (Dataware House) vs DB



# 3層スキーマ

- Conceptual Schema
- External Schema
  - User / Application
- Internal Schema
  - Hardware



# DB Model

- Conceptual Model
  - ER diagram
- Logical Model
- Physical Model



# ER Diagram



# DB types

- 階層型
  - one root
- ネットワーク型
- RDB



# 正規形

- 第一正規形
- 第二正規形
- 第三正規形




# 従属

- 関数従属
- 完全関数従属
- 推移関数従属



# 演算

## 関係演算

- 選択
  - 行方向の取り出し
- 射影
  - 列方向の取り出し
- 結合
  - JOIN
- 商

## 集合演算

- 和
  - ２表から単純に全ての行を取り出す
- 差
  - １つの表にあり、もう一方にない行を取り出す
- 積
  - ２表に共通する行のみ取り出す
- 直積
  - ２表から全てを組み合わせる
  - 列は２倍になり、行の数は`m * n`になる
  -


# SQL: Lang Types

- DML: Data Manipulation Language
- DDL: Data Definition Language
  - e.g. CREATE, ALTER, DROP
- DCL: Data Control Language
  - Define DB Authorization



# SQL: SELECT

- WHERE: AND / OR / NOT / AS
- DISTINCT：　重複したものは省く
- ORDER BY: ASC / DESC
- LIKE: 正規表現みたいな
- IN / BETWEEN
- EXISTS
- 集合演算: UNION / EXCEPT / INTERSECT



# DBMS




# SQL: GRANT

- GRANT ALL PRIVILEGES
- GRANT SELECT, UPDATE, INSERT, UPDATE, DELETE
- GRANT SELECT ON products TO PUBLIC
  - 全てのユーザーに対して与える
- REVOKE SELECT ON products FROM user



# Mutex for DB

- Lock
  - 占有ロック
  - 共有ロック
- Timestamp
- 楽観的制御



# Mutex for DB: Lock

- ロックの粒度
- ２相ロック



# 障害回復

- Log (aka Journal)
  - WALでないと駄目
  - Roll forward
  - Roll back
- CHeck point

# DB Performance

- Index
- Hash
- B-tree



# Strategy to increase the DB server performance

- Distribute the DB: Master & Slaves
- Store the DB data in the memory rather than disk
  - With **tmpfs** of the Linux you can use certain memory space as the file system
  - This strategy is available for the slave server, because the data in the memory isn't persistent and can be lost in the server crash
- MySQL Cluster
- DB partitioning



# Distributed DB: MISC

- 2相コミット
- ３相コミット
- セミジョイン



# 分散DBでの表の結合方法

- Nested Loop
- Sort Merge
- Hash Join




# Distributed DB: Basics

- Master Server
  - Mostly single; to populate the master, you need complicated clustering
  - Referred for CUD of CRUD
- Slave Servers
  - Multiple; populating the slaves is easy
  - A slave can has single master only
  - Updates in the master always propagate to servers; this is one-way.
  - Referred for R of CRUD
    - Therefore Master-Slave architecture is powerful when reference is more frequent than updating



# Distributed DB: Advantage

- Higher performance on DB references
- Higher availability
  - When the master DB is down, the slave can be the master instead
- Higher geo-redundancy (地理的冗長性)
  - You can put the master / slaves in the geographically distant places; this increase the tolerance to the disaster
- Easier to get the backup
  - Creating the backup data from the slave won't affect the performance of the master



# Distributed DB: Keywords

- Database Polling (ポーリング)
- Synchrnous Replication / Asynchronous Replication


# Transaction: ACID

- Atomicity
- Consistency
- Isolation
- Durability


# Transaction: Isolation Level

- READ UNCOMMITTED
- READ COMMITTED
- REPEATABLE READ
- SERIALIZABLE


# Transaction: Isolation MISC

- Dirty Read
- Non-repeatable Read
- Phantom


# RDB



# DB Partitioning: Overview

- Dividing a large database with many tables into small databases
- Advantage

- MySQL supports partitioning by default





# DB partitioning: Category

- Vertical Partitioning
- Horizontal Partitioning



# DB partitioning:

-

---

# MySQL



# Manage Account




# Basic Command

```sql
USE dorm_db;
SHOW TABLES;
exit;
```

# Topics on Data Storage

# Keywords

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

# Keywords: advanced

- BaaS: Backend as a Service
- JDBC: Java DB Connectivity

# Connection

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

# Migration

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

# RESTful API

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

# GraphQL API

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

# Index

- カラム単位で作成する
- カラムの内容を検索するため、B-TREE という構造にしてデータ本体とは別に保存
- INSERT / DELETE の際には、Index も更新する
- Primary Key のカラムには、自動的に INDEX が作成される？
- Advantage of Index
  - Fast search
- Disadvantage of Index
  - Additional storage consumption
  - Slow UPDATE / DELETE because Index will be also altered as well as records

# DB Parts

| RDBS     | MongoDB    |
| -------- | ---------- |
| Database | Database   |
| Table    | Collection |
| Record   | Document   |
| Field    | Field      |

# DBs

## SQL DBs

- MySQL
- PostgreSQL
- MariaDB
- MSSQL
- Oracle

## No-SQL DBs

Document Databases: JSON のような形式保存

- MongoDB

Key-value Database
- Redis: in-memory
- memcached: in-memory

Graph Database: Node で保存.SQL ではなく Cypher という言語でクエリする

- Neo4j

Column DB

- Cassandra

Time Series

- InfluxDB
- TimescaleDB



# Cloud DB

- Server-less Service
  - Google Firebase
  - Amazon DynamoDB
  - mLab
    - for MongoDB
  - RethinkDB
- Cloud Storage Service
  - AWS S3
  - Alicloud
- File hosting Service
  - Google Drive
  - Microsoft OneDrive
  - DropBox

# ORM/ODM

- ORM: Object Relation Model
- ODM: Object Data Model

## 抑えるべきっぽい三大 ORM

- TypeORM
  - MYSQL, Postgres, SQLite3, MongoDB, MariaDB, MSSQL, Oracle
- Sequelize
  - MySQL, Postgres, SQLite3, MariaDB, MSSQL
  - Traditional and reliable
  - Not so good at collaboration with TypeScript
  -
- Mongoose
  - MongoDB

## Node 使いには重要じゃなさそうな ORM

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

# Scaling

- Vertical Scaling
- Horizontal Scaling

# DB Performance

- N+1 Problem
- Indexes
-