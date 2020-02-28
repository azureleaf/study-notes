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
        - 普通Babelで古いJSに変換するが、TSで型を扱う場合はts-nodeが必要
    - @types/node
        - パッケージ名の@は「Scoped Packages」で使われる
        - @に団体名や個人名を付加することで、モジュール名の衝突を防ぐ
    - typescript
    - typeorm
    - reflect-metadata
    - mysql
    - express
    - body-parser
        - Request Bodyを、JS内部で使えるObject Literalに変更しているんだと思う

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

## Entity Manager

## Query Builder
