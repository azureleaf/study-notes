# MySQL

## Misc

- Collation
- Index


## Foreign Key
- Foreign Key の参照先のカラムは、INDEXが作成されていることが必須
- EngineはInnoDBでないと使えない
- Foreign Keyの参照先と参照元は、型が一致していることが必要
    - Data型や長さなどは当然一致
    - 数値のカラムの場合は、unsignedに注意。暗黙でunsignedになっている場合があるので、双方一致するようにする
    - Collationの一致

## MySQLログイン

- sudo mysql -u root -p
    - Login to MySQL from terminal
- `SHOW databases;`
- `SHOW tables;`
- `USE mydb;`
- `DESC users;`
    - Check the table schema
- `CREATE TABLE users (id INT, name VARCHAR(100))`
- `DROP TABLE users`
- `DROP TABLE IF EXISTS users`
- SHOW ENGINE INNODB STATUS;
    - Show the detailed error message
- SHOW FULL COLUMNS FROM tablename 
    - Show all the hidden properties (such as Collation, Privileges) for each column
- `EXIT`

## SQL
- `SELECT * from blahtable;`
- WHERE
- MAX / min / avg / sum / COUNT
- BETWEEN / NOT BETWEEN
- LIKE / NOT LIKE
- IN / NOT IN
- NULL / NOT NULL
- Index
- `SHOW INDEX FROM users;`
    - List the index for the table
- Foreign Key
- Inner Join
- Left Outer Join
- Right Outer Join
- limit
- offset
- group by
- having
- as


## Constraint

- PRIMARY_KEY
- DEFAULT
- NOT NULL
- UNIQUE
- AUTO_INCREMENT


## Data Types







