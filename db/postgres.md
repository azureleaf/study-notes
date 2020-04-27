# PostgreSQL


# Commands (from shell)


- `sudo su - postgres`
- `psql -d mydb -U myuser`
- `sudo -U postgres psql` is allegedly better than `sudo su`
- `psql -U default -h postgres`
  - h: Server host
- `psql mydb`
- 

# Commands (inside psql)

- `\q` quit
- `\l` list DB
- `\d my_table`
- `\c my_db` connect
- `\dt` display tables
- `\du` display users

## Config

- Configure `pg_hba.conf`: Host-Based Authentication
- To locate this config file, login to Postgres and `SHOW hba_file;`


# User & Role

Oracle DB & MySQL also has the concept of role

- `CREATE ROLE user01;`
  - No login privilege
- `CREATE ROLE user01 LOGIN` is same as `CREATE USER user01;` 
  - Grant a login privilege to the role on creation
- `ALTER ROLE user01 LOGIN` / `ALTER ROLE user01 NOLOGIN;`
  - Grant / Revoke a login privilege to the role afterwards
- `DROP ROLE user01`

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



# Misc

- Database Cluster
- `initdb`
  - Command to create DB cluster?
  - Executed when you `npm install`


# Process

- `sudo systemctl stop postgresql`
- `sudo systemctl start postgresql`
- `sudo systemctl restart postgresql`
- `systemctl status postgresql-service`

# Auth method

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