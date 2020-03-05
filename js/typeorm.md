# TypeORM

# ToC

1. [Getting Started](#Getting%20Started)
1. [Entity](#Entity)
1. [Relations](#Relations)
1. [Entity Manager](#Entity%20Manager)
1. [Query Builder](#Query%20Builder)
1. [Migration](#Migration)
1. [Index](#Index)
1. [Listener & Subscriber](#Listener%20%26%20Subscriber)

## Getting Started

- If you want to install globally:
  - `npm install -g typeorm`
  - `typeorm init --name MyProject --database mysql --express`
- If you don't want to change global env:
  - `npx typeorm init --database mysql --express`
- `npm install`

- Files

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

### package.json will includes:

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

### "@" Decorator for the Entity Column

- `@Column()`
- `@Column("varchar", { length: 200 })`
  - You can write the type of the column as the first arg
- `@Column({ type: "varchar", length: 200 })`
  - You can write the type of the column inside the object as well
- `@Column({ type: "varchar", length: 200, default: "undefined" })`
- `enum`を使って、入る値の種類を制限できる

```js
export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  GHOST = "ghost"
}

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
      type: "enum",
      enum: UserRole,
      default: UserRole.GHOST
  })
  role: UserRole
}
```

- `@PrimaryColumn()`
  - PRIMARY KEY
  - INT とは限らない
- `@PrimaryGeneratedColumn()`
  - INT PRIMARY KEY AUTO_INCREMENT
- `@PrimaryGeneratedColumn("uuid")`
  - INT PRIMARY KEY AUTO_INCREMENT
  - UUID(Universally Unique IDentifier) is unique string ID

## Relations

### Basics

- Relation とは、FOREIGN KEY に相当する関係性
- Relations の定義の仕方だけでなく、Relations がかかったデータをどのように編集・参照するのかも抑えること

### `@OneToOne`

- One-to-One だけだと対等関係っぽいが、便宜上どちらが親側なのかを決める（今回は User が親）
- 紐づく先がどの Entity なのかを指定するのに２箇所必要なのがなんか二度手間っぽい
  - `type => Profile`
  - `profile: Profile`

```ts
@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: string;

  @Column()
  photo: string;
}
```

```ts
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @JoinColumn()をつけることにより外部へのForeign Keyが設定される
  // Profile tableのどのカラムに関連付けるのかは書かれていないが、何も書かないとPRIMARY KEYに紐づくのか？？？
  @OneToOne(type => Profile)
  @JoinColumn()
  profile: Profile; // これだけ見るとprofileという名前のカラムが作られそうだが、実際に自動生成されるのはprofileIdという名前になる
}
```

- 上記の User / Profile にデータを挿入する

```ts
// 子側の表のデータをまず作成する
// 子側の方では、両者の関係を意識せずただ設定する
const profile = new Profile();
profile.gender = "male";
profile.photo = "me.jpg";
await connection.manager.save(profile);

// 親側
const user = new User();
user.name = "Joe Smith";
user.profile = profile; // この行で対応するProfileを代入する
await connection.manager.save(user);
```

### `@OneToMany` と `@ManyToOne`

- `@ManyToMany`と`@OneToOne`の表示は「親側」となる一方の Table にだけつければよかった
- これに対して、`@OneToMany` と `@ManyToOne` は対応関係にある双方の Table につける
- この例における関係性：
  - 同一の User が多数の Photo を所有する
  - ただし一つの Photo が複数の User に紐づくことはない

```js
// Photo Side
@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(
    type => User,
    user => user.photos // ここでuserがカラム名のuserと一致しているのはたぶんたまたま。一致している必要はない？？？
  )
  user: User; // カラム名がusersでないのはこっちがOne側だから
}
```

```js
// User Side
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // 「photo」は「Photo Entityにおけるデータ一つ分」を表す仮の変数でしかないと思われる（名前はなんでもよい）
  //    「user」が実際のPhoto Entityのカラム名
  @OneToMany(
    type => Photo,
    photo => photo.user
  )
  photos: Photo[]; // Manyになる側は配列にする。カラムの命名も複数形にする
}
```

- 以上でつくった User, Photo を編集する方法：

```ts
// 子側その１
const photo1 = new Photo();
photo1.url = "me.jpg";
await connection.manager.save(photo1);

// 子側その２
const photo2 = new Photo();
photo2.url = "me-and-bears.jpg";
await connection.manager.save(photo2);

// 親側
const user = new User();
user.name = "John";
user.photos = [photo1, photo2]; // 子側を配列により一気に代入する
await connection.manager.save(user);
```

- User と Photo のデータを参照する方法： その１

```ts
const userRepository = connection.getRepository(User);
const users = await userRepository.find({ relations: ["photos"] });

const photoRepository = connection.getRepository(Photo);
const photos = await photoRepository.find({ relations: ["user"] });
```

- User と Photo のデータを参照する方法： その２　 Query Builder 利用

```js
const users = await connection
  .getRepository(User)
  .createQueryBuilder("user")
  .leftJoinAndSelect("user.photos", "photo")
  .getMany();

const photos = await connection
  .getRepository(Photo)
  .createQueryBuilder("photo")
  .leftJoinAndSelect("photo.user", "user")
  .getMany();
```

### `@ManyToMany`

- Many to Many の場合両者は対等な気がするが、片方を親と定義する
  - 今回は Question 側が親とする
  - 親側で`@ManyToMany`を定義し、さらに`@JoinTable()`のカラムを指定する
- `@JoinTable`により、両者の PRIMARY KEY だけを集めた Table ができる
  - `@OneToOne`につける`@JoinColumn()`と混同しない
- なお、このテーブルの名前、カラム名は自動で生成されるっぽい
  - ２つのテーブルの名前は親側が`question`、子側が`category`なので、合成したテーブル名は`question_categories_category`で、カラム名は`questionId`と`categoryId`
    |questionId|categoryId|
    |--|--|
    |1|3|
    |1|4|
    |2|3|
    |2|5|
    |2|6|
- この例における関係性：
  - 一つの Question は、複数の Category に該当
  - 一つの Category に、複数の Question がある

```js
// Category Entity:
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
```

```ts
// Question Entity
@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToMany(type => Category)
  @JoinTable()
  categories: Category[];
}
```

```js
//
@ManyToMany(type => Question, question => question.categories)
  questions: Question[];
```

```js
@ManyToMany(type => Category, category => category.questions, {
  cascade: true
})
@JoinTable()
categories: Category[];
```

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

- As the name implies, with Query Builder you can avoid writing tedious SQL query
- Most importantly, you don't have to the query syntax differences for every DB system
- Seemingly, there're multiple equivalent ways to achieve the same goal:

```ts
// Maybe there's a hierarchy of: connection > manager > repository
// It's mysterious that you can omit higher entity (such as connection, manager)

// Using entity manager
// Connection is omitted. Repository is omitted
// because entity name is specified as the first arg of the findOne()
var user = getManager().findOne(User, 1); // "connection" & "repository" omitted
var user = getConnection().manager.findOne(User, 1); // "repository" omitted

// Using repository
var user = getRepository(User).findOne(1); // "connection" & "manager" omitted
var user = getConnection() // "manager" omitted
  .getRepository(User)
  .findOne(1);
var user = getManager()
  .getRepository(User)
  .findOne(1);

// Using query builer
var user = getConnection()
  .createQueryBuilder()
  .select("user")
  .from(User, "user")
  .getOne();
var user = getManager()
  .createQueryBuilder(User, "user")
  .getOne();
var user = getRepository(User)
  .createQueryBuilder("user")
  .getOne();
```

- SELECT equivalent

```ts
// connection + SELECT + WHERE
const user = await getConnection()
  .createQueryBuilder()
  .select("user") // select all the fields of the record with the alias
  .from(User, "user") // giving alias
  .where("user.id = :id", {
    id: 1
  }) // ":id" is a placeholder parameter to prevent SQL injection
  .getOne();

// repository + SELECT + WHERE
const timber = await getRepository(User)
  .createQueryBuilder("user") // giving alias here without .select("user")
  .where("user.id = :id OR user.name = :name", { id: 1, name: "Timber" }) // Use of OR
  .getOne();

// getMany()
const users = await getRepository(User)
  .createQueryBuilder("user")
  .getMany();

// HAVING
createQueryBuilder("user").having("user.name = :name", { name: "Timber" });

// ORDER BY
createQueryBuilder("user").orderBy("user.id");

/*
 * In the most cases, you want the entities as the result of the .get methods
 * However, sometimes you want value / array instead of an object
 */

// getRawOne()
const { sum } = await getRepository(User)
  .createQueryBuilder("user")
  .select("SUM(user.photosCount)", "sum")
  .where("user.id = :id", { id: 1 })
  .getRawOne(); // e.g. 25

// getRawMany()
const photosSums = await getRepository(User)
  .createQueryBuilder("user")
  .select("user.id")
  .addSelect("SUM(user.photosCount)", "sum")
  .where("user.id = :id", { id: 1 })
  .getRawMany(); // e.g. [{ id: 1, sum: 25 }, { id: 2, sum: 13 }, ...]
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

- Using QueryBuilder with Relations

```ts
// entity/Post.ts
@entity()
export class Post{
  ...
  // Post is the "Owning side", so this entity has ManyToMany definition
  @ManyToMany(type => Category)
  @JoinTable()
  categories: Category[];
}

// entity/Category.ts
@entity()
export class Category{
  ...// nothing about relation defined here
}

// controller
await getConnection()
  .createQueryBuilder()
  .relation(Post, "categories") // .relation(Owning-side entity, Owned-side entity)
  .of(post)
  .add(category);
```

## Migration

- Create migration file
- `typeorm migration:create -n SeedCategory`
- Run this command at the project root

## Transaction

## Index

## Listener & Subscriber

```

```
