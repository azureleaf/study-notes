# TypeORM

# ToC

1. [Getting_Started](#Getting_Started)
1. [Entity](#Entity)
1. [Relations](#Relations)
1. [Entity_Manager](#Entity_Manager)
1. [Query_Builder](#Query_Builder)


## Getting_Started
## Connection

- 一言でいうと
    - 
- 


```js
import {createConnection, Connection} from "typeorm";

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
## Entity_Manager
## Query_Builder