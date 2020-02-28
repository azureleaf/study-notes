# TypeORM

# ToC

1. [Getting Started](#Getting%20Started)
1. [Entity](#Entity)
1. [Relations](#Relations)
1. [Entity Manager](#Entity%20Manager)
1. [Query Builder](#Query%20Builder)

## Getting Started

- If you want to install globally:
  - `npm install -g typeorm`
  - `typeorm init --name MyProject --database mysql --express`
- If you don't want to change global env:
  - `npx typeorm init --database mysql --express`
- `npm install`

```js
.
├── ormconfig.json
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── controller
│   │   └── UserController.ts
│   ├── entity
│   │   └── User.ts
│   ├── index.ts
│   ├── migration
│   └── routes.ts
└── tsconfig.json
```

- Files generated will be as above
- package.json will includes:
  - ts-node
    - 普通 Babel で古い JS に変換するが、TS で型を扱う場合は ts-node が必要
  - @types/node
    - パッケージ名の@は「Scoped Packages」で使われる
    - @に団体名や個人名を付加することで、モジュール名の衝突を防ぐ
  - typescript
  - typeorm
  - reflect-metadata
  - mysql
  - express
  - body-parser
    - Request Body を、JS 内部で使える Object Literal に変更しているんだと思う

## Connection

```js
import { createConnection, Connection } from "typeorm";

const connection = await createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "test",
  password: "test",
  database: "test"
});
```

## Entity

## Relations

- Related to FOREIGN KEY

- One to One
- One to Many
- Many to One
- Many to Many


## Entity Manager

- Entity Manager

  - Has methods for SELECT, INSERT, DELETE, UPDATE, etc.
  - Returns Promise

- Repository
  - Almost same as Entity Manager
  - `myRepository.find({OPTIONS_HERE})`
    - SELECT equivalent
    - options includes equivalents for WHERE, ORDER BY, LIMIT, etc.

## Query Builder

- SELECT equivalent

  ```ts
  const user = await getConnection()
    .createQueryBuilder()
    .select("user")
    .from(User, "user")
    .where("user.id = :id", { id: 1 })
    .getOne();
  ```

- INSERT equivalent

  ```ts
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([
      { firstName: "Timber", lastName: "Saw" },
      { firstName: "Phantom", lastName: "Lancer" }
    ])
    .execute();
  ```

- UPDATE equivalent

  ```ts
  await getConnection()
    .createQueryBuilder()
    .update(User)
    .set({ firstName: "Timber", lastName: "Saw" })
    .where("id = :id", { id: 1 })
    .execute();
  ```

- DELETE equivalent

  ```ts
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(User)
    .where("id = :id", { id: 1 })
    .execute();
  ```

## Migration


## Transaction


## Index

## Listener & Subscriber
