# MySQL

## Misc

- Collation
- Index

## Foreign Key

- Foreign Key の参照先のカラムは、INDEX が作成されていることが必須
- Engine は InnoDB でないと使えない
- Foreign Key の参照先と参照元は、型が一致していることが必要
  - Data 型や長さなどは当然一致
  - 数値のカラムの場合は、unsigned に注意。暗黙で unsigned になっている場合があるので、双方一致するようにする
  - Collation の一致

## Logging in

- sudo mysql -u root -p
  - Login to MySQL from terminal

## MySQL Shell

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

## SQL: misc

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

## SQL: FROM

- `SELECT * from blahtable;`
- ```sql
  SELECT
  user.id as userId,
  user.firstName as userFirstName,
  user.lastName as userLastName
  FROM users user
  WHERE user.id = 1
  ```

## SQL: AS

- `AS` is used to give the alias for convenience:
  - you want to call sth shortly
  - you want to integrate several values together temporarily, etc.
- `SELECT CustomerID AS ID, CustomerName AS Customer FROM Customers;`
- `SELECT CustomerName AS Customer, ContactName AS [Contact Person] FROM Customers;`
  - Here "[]" is used because the column name has white space
- ```sql
  SELECT CustomerName, Address + ', ' + PostalCode + ' ' + City + ', ' + Country AS Address FROM Customers;
  ```
  - I think this example is very practical
- ```sql
  SELECT CustomerName, CONCAT(Address,', ',PostalCode,', ',City,', ',Country) AS Address FROM Customers;
  ```
- ```sql
  SELECT o.OrderID, o.OrderDate, c.CustomerName
  FROM Customers AS c, Orders AS o
  WHERE c.CustomerName="Around the Horn" AND c.CustomerID=o.CustomerID;
  ```
  - Giving the alias for a table

## Constraint

- PRIMARY_KEY
- DEFAULT
- NOT NULL
- UNIQUE
- AUTO_INCREMENT

## Data Types
