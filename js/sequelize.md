# Sequelize

## Overview

- Supports many DBs but MongoDB
    - Postgres
    - MySQL
    - SQLite
    - MSSQL
- TS isn't well supported

### Keywords:

- Model
  - Model can be inherited
  - Model Querying:
  - Model Synchronization
  - Model instances
- Migration
- Eager Loading
- Associations (equivalent to TypeORM Relations)
- Migration
- VIRTUAL
  - Define temporary virtual values
  - e.g. create "fullName" virtual field from the column "firstName" & "lastName"
  - Virtual fields can be accessed in the same way as normal fields
- `get()` & `set()`
  - Can manipulate the output of the access to the models
- Dialect

### SQL-related methods:

```js
`sequelize.define()`; // CREATE TABLE

await User.drop(); // DROP TABLE
```

## Installation

1. `npm init`
1. `npm install sequelize`
1. Install either of these:
   - `npm install sqlite3`
   - `npm install mysql2`
   - `npm install pg pg-hstore`

## Associations

- Association types:
  - One-To-One
  - One-To-Many
  - Many-To-Many
- To describe the associations above, Sequelize has methods to associates:
  - `HasOne`
  - `BelongsTo`
  - `HasMany`
  - `BelongsToMany`

```js
// Just declare the model normally. You don't have to declare associations here
const A = sequelize.define('A', /* ... */);
const B = sequelize.define('B', /* ... */);

// Associate models to each other
A.hasOne(B); // A HasOne B
A.belongsTo(B); // A BelongsTo B
A.hasMany(B); // A HasMany B
A.belongsToMany(B, { through: 'C' }); // A BelongsToMany B through the junction table C



```



## Sample files in a project

- Create `/models/index.js`

```js
const Sequelize = require("sequelize");
// Constructor get options: DB URI, password, user name, query dialect, port number, etc.
const db = new Sequelize("postgres://localhost:5432/your-db", {
  logging: false // console.log() debug infos
});



// Define models
const Campus = db.define("campuses", {
  name: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  }
});
```

- DB connection

```js
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

```

- Create `seed.js`

```js
const { db, Campus } = require("./models");

const seed = async () => {
  // "force: true" means "DROP TABLE IF EXISTS"
  // Therefore this must be "false" for production
  await db.sync({
    force: true
  });

  // ".create()" is INSERT
  const harvard = await Campus.create({
    name: "Harvard",
    address: "PO Box 382609. Cambridge, MA 02238-2609.",
    description: "World famous Ivy League university"
  });
  const stonybrook = await Campus.create({
    name: "Stony Brook University",
    address: "100 Nicolls Rd, Stony Brook, NY 11794",
    description:
      "It is one of four university centers of the State University of New York system."
  });
  db.close(); //close your db connection else the connection stays alive else your process hangs.
  console.log("Seed Successful!"); //Have a prompt to let you know everything is working correctly!
};

seed(); //initialize the sync!
```

## Model

```js


```


## Query

```js

// raw
sequelize.query("SELECT * FROM myTable").then(myTableRows => {
  console.log(myTableRows)
})

User.findAll().then(users => {
  console.log(users)
})
```