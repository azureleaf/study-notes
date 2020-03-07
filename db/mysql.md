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

- Index
- `SHOW INDEX FROM users;`
  - List the index for the table
- Foreign Key
- Inner Join
- Left Outer Join
- Right Outer Join

## SQL: SELECT, FROM, AS, UNION

- `AS` is used to give the alias for convenience:
  - you want to call sth shortly
  - you want to integrate several values together temporarily, etc.

```sql
/* Very basic*/
SELECT * from Users;

SELECT CustomerID AS ID, CustomerName AS Customer FROM Customers;

/* Here [] is used because the column name includes white space */
SELECT CustomerName AS Customer, ContactName AS [Contact Person] FROM Customers;

/* alias for tables*/
SELECT
user.id as userId,
user.firstName as userFirstName,
user.lastName as userLastName
FROM users user
WHERE user.id = 1

/* query above is same with this*/
/* for this sample, you can't find any benefit of using alias, tho */
SELECT
  id,
  firstName,
  lastName 
  FROM users
  WHERE id = 1

/* select from multiple table with alias??? */
SELECT
  customer.id,
  worker.firstName,
  worker.lastName 
  FROM Customers customer, Workers worker /* Does this work? */
  WHERE customer.id = 1

/* select from multiple tables */
SELECT Orders.OrderID, Orders.OrderDate, Customers.CustomerName
FROM Customers, Orders
WHERE Customers.CustomerName="Around the Horn" AND Customers.CustomerID=Orders.CustomerID;


```

- I think this is very practical use of AS

  ```sql
  SELECT CustomerName, Address + ', ' + PostalCode + ' ' + City + ', ' + Country AS Address FROM Customers;

  /* You can use `CONCAT` keyword too */
  SELECT CustomerName, CONCAT(Address,', ',PostalCode,', ',City,', ',Country) AS Address FROM Customers;
  ```

- You can use alias for table name as well
  ```sql
  SELECT o.OrderID, o.OrderDate, c.CustomerName
  FROM Customers AS c, Orders AS o
  WHERE c.CustomerName="Around the Horn" AND c.CustomerID=o.CustomerID;
  ```

## Constraint on the column

- PRIMARY_KEY
- DEFAULT
- NOT NULL
- UNIQUE
- AUTO_INCREMENT

## Keywords appear with WHERE

- `HAVING`
- `LIMIT`
- `ORDER BY`
- `OFFSET`
- MAX / min / avg / sum / COUNT
- BETWEEN / NOT BETWEEN
- NULL / NOT NULL
- EXISTS
- AND, OR, NOT

```sql

/* IN */
SELECT * FROM Customers
WHERE Country IN ('Germany', 'France', 'UK');

/* LIKE */
/* Upper case & lower case won't be distinguished */
SELECT * FROM Customers
WHERE CustomerName LIKE 'a%'; /* almond, Ant, aspect */

SELECT * FROM Customers
WHERE CustomerName LIKE '%or%'; /* world, Nordic, coordinate */

/* Use underscore "_" to specify the number of characters */
/* has "r" as the 3rd character */
SELECT * FROM Customers
WHERE CustomerName LIKE '__r%'; /* nerd, harden */

/* starts with "a", and has at least 3 characters */
SELECT * FROM Customers
WHERE CustomerName LIKE 'a__%' /* and, almond */

/**/
/**/
/**/

```

## `JOIN` & `ON`

```sql
/* JOIN */
/* INNER JOIN */
/* LEFT JOIN */
/* RIGHT JOIN */
/* FULL OUTER JOIN*/

/* self join */
```

## Data Types
