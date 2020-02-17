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

## SQL DBs

- MySQL
- PostgreSQL

## No-SQL DBs
### Document Databases
- JSONのような形式保存
- MongoDB
### Key-value Database
- Redis: in-memory
- memcached: in-memory
### Graph Database
- Nodeで保存
- Neo4j
### Wide COlumn Stores
- Cassandra

1. ファイル

- Server-less Service
    - Firebase

- Cloud Storage Service
    - AWS S3


- File hosting Service
    - Google Drive
    - Microsoft OneDrive
    - DropBox