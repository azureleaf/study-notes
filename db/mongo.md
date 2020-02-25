# Mongo と Mongoose の勉強メモ

## 超要約

- aaa

## 全体の流れ

-

## Install MongoDB @ Ubuntu 18.04

1. Import Public Key

- `wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -`

1. Create the List File (/etc/apt/sources.list.d/mongodb-org-4.2.list)

- `echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list`

1. `sudo apt update`
1. `sudo apt-get install -y mongodb-org`

## MongoDB Community Server Files

- `/var/lib/mongodb`: data dir
- `/var/log/mongodb`: log dir
- `/etc/mongod.conf`: config firle

## Mongo-related Terminal Commands

- `mongo`
- `sudo systemctl start mongod`
- `sudo systemctl stop mongod`
- `sudo systemctl restart mongod`
- `sudo systemctl daemon-reload`: for error
- `sudo systemctl status mongod`
  - Check Status

## Manipulate DB

- use mydb
  - Create the db if not exist
- db
  - show current db
- show dbs
- db.dropDatabse()

## Manipulate Collection

- show collections
- db.mycollection.drop()
- db.createCollection("mycol", { capped : true, autoIndexId : true, size : 6142800, max : 10000 } )

## Manipulate Document

- db.membersCollection.insert({name : "John", location: "London"})
  - New collection will be created when the collection doesn't exist
- db.membersCollection.insert({name : "John", location: "London"}, {name: "Mike", locatin: "NY"})
- db.membersCollection.insert({name: "John", groups: ["Soccer", "Tennis"]}
- db.mycol.find()
- db.mycol.find().pretty() 
  - formatted
- 

## Data Types (popular ones only)

- String
- Integer / Double
- Boolean
- Timestamps
- Arrays
- Null

## Connect to mongoDB

```
// Import the mongoose module
var mongoose = require('mongoose');

// Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true });

// Get the default connection
var db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
```

## Define Schema

```
//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
  a_string: String,
  a_date: Date
});
```

## Create Model

```
// Define schema
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
  a_string: String,
  a_date: Date
});

// Compile model from schema
var SomeModel = mongoose.model('SomeModel', SomeModelSchema );
```

## Schema Types

```
var schema = new Schema(
{
  name: String,
  binary: Buffer,
  living: Boolean,
  updated: { type: Date, default: Date.now() },
  age: { type: Number, min: 18, max: 65, required: true },
  mixed: Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  array: [],
  ofString: [String], // You can also have an array of each of the other types too.
  nested: { stuff: { type: String, lowercase: true, trim: true } }
})
```
