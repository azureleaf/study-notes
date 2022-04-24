# PostgreSQL

## ToC

- [PostgreSQL](#postgresql)
  - [ToC](#toc)
  - [Termininology](#termininology)
  - [Commands](#commands)
  - [Config](#config)
  - [User & Role](#user--role)
  - [Privilege (for roles)](#privilege-for-roles)
  - [Privilege (for tables)](#privilege-for-tables)
  - [Misc](#misc)
  - [Process](#process)
  - [Auth method](#auth-method)

## Termininology

- Role
  - A role can be a user
  - A role can be a group
  - A role can be a user & a group
  - Oracle SQL Server & MySQL also have the concept of role.
- Database Cluster


## Commands

```sh
psql -d mydb -U myuser
sudo su - postgres
sudo -U postgres psql # Allegedly better than `sudo su - postgres`. Can't be used when the `hba_file` value is converted from `peer` to `md5`
sudo -i -u postgres # Available even after using md5
psql -U default -h postgres # -h: Server host
psql mydb
\q # quit
\l # list DB
\d my_table
\c my_db # connect
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
CREATE USER david WITH PASSWORD '1234';
CREATE ROLE john WITH CREATEDB LOGIN PASSWORD '1234';
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
