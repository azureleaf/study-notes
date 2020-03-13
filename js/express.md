# Express

### ToC

1. [Routing](#Routing)
1. [Middleware](#Middleware)
1. [Template Engine](#Template%20Engine)
1. [Error Handling](#Error%20Handling)
1. [Misc](#Misc)


## Routing

### Very basic

```js
// Create the app
var express = require("express");
var app = express();

// Set project variables
// Some reserved variables affect the behavior of the Express
app.set("Title", "My Site"); // Set user-defined variable
app.get("Title"); // "My Site"
app.set("view engine", "pug"); // Set value of built-in variable

// GET method route
app.get("/", function(req, res) {
  res.send("GET request to the homepage");
});

// POST method route
app.post("/", function(req, res) {
  res.send("POST request to the homepage");
});
```

### Specify the routing path

```js
app.get('/user/', function (req, res, next){...}

// with route parameters
app.get('/users/:userId/books/:bookId',
app.get('/flights/:from-:to', // Hyphen is interepreted literally
app.get('/plantae/:genus.:species', // dot is interpreted literally


// Regex-ish syntax
app.get('/ab?cd', function (req, res) {
app.get('/ab+cd', function (req, res) {
app.get('/ab*cd', function (req, res) {
app.get('/ab(cd)?e', function (req, res) {

// Regex
// Don't use quotation symbols
app.get(/a/, function (req, res) {
app.get(/.*fly$/, function (req, res) {


```

### Modular Routes with `app.route()`

- Advantage: Less redundancy, because you write the path only once

```js
// Modular Routes
// Seemingly, order of chaining doesn't matter
app
  .route("/book")
  .get(function(req, res) {
    res.send("Get a random book");
  })
  .post(function(req, res) {
    res.send("Add a book");
  })
  .put(function(req, res) {
    res.send("Update the book");
  });

// Equivalent to the above (maybe)
app("/book").get(function(req, res) {
  res.send("Get a random book");
});

app("/book").post(function(req, res) {
  res.send("Add a book");
});

app("/book").put(function(req, res) {
  res.send("Update the book");
});
```

- Response Methods

- "octet stream":
  - Is a MIME type
  - Is a binary file
  - Typically, it will be an application or a document that must be opened in an application, such as a spreadsheet or word processor
  - This MIME type is used when the file type is unknown / unimportant

```js
res.send();
res.redirect();
res.end();
res.json();
res.jsonp(); // Send a JSON response with JSONP support.
res.download(); // Prompt a file to be downloaded.
res.render(); //	Render a view template.
res.sendFile(); //Send a file as an octet stream.
res.sendStatus(); // Set the response status code and send its string representation as the response body.

// Sending status has alternative
res.status(500).send({ error: "boo:(" }); // send + sendStatus
```

### Router

- Two `router.get("/")` exists, however it can work differently
- Because app.js defines the path routing(`/` and `/users`) in the upper level
- Advantage: Using multiple routers with `router.get()` can be the better option than `app.get()` when there're large routing groups

```js
// app.js
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
app.use("/", indexRouter);
app.use("/users", usersRouter);
```

```js
// routes/index.js
var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  res.send("Accessed to indexRouter");
});

module.exports = router;
```

```js
// routes/users.js
var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  res.send("Accessed to usersRouter");
});

module.exports = router;
```

## Middleware

- Middlewares have access to:
  - Request Object
  - Response Object
  - next() middleware Function
- Middlwares do:
  - Execute codes
  - Alter Req & Res
  - End the Request-Response Cycle / Call thenext middleware
- Middleware Types
  - App level MW
  - Router level MW
  - Error handling MW
  - Built-in MW
  - Third-party MW
- Response

### Minimum MW

```js
var myLogger = function(req, res, next) {
  console.log("LOGGED");
  next();
};

// app.use() without the path; so this will be executed for all the requests
app.use(myLogger);

app.get("/", function(req, res) {
  res.send("Hello World!"); // "LOGGED" will be shown on the console
});

app.listen(3000);
```

- MW in `app.use()` can be declared on the spot

```js
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
```

### `next()`

```js
next();
next("route");
next(err);
```

### App-level MW

```js
var app = express();

app.use(function(req, res, next) {
  console.log("Time:", Date.now());
  next();
});

// You can define the series of MWs as multiple arguments of the app.use()
app.use(
  "/user/:id",
  function(req, res, next) {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  function(req, res, next) {
    console.log("Request Type:", req.method);
    next();
  }
);

// You can define multiple routes for a single route
// Now there're 2 app.get("/user/:id")
// However, the 2nd app.get() will be never executed
// because the 1st app.get() end the req-res cycle by res.send()
app.get(
  "/user/:id",
  function(req, res, next) {
    console.log("ID:", req.params.id);
    next();
  },
  function(req, res, next) {
    res.send("User Info");
  }
);
app.get("/user/:id", function(req, res, next) {
  res.end(req.params.id);
});

// In the sample above, it seems that there's no use of multiple routes for a route
// The sample below is the practical case
// next('route') is built-in syntax
app.get(
  "/user/:id",
  function(req, res, next) {
    // if the user ID is 0, skip to the next route
    if (req.params.id === "0") next("route");
    // otherwise pass the control to the next middleware function in this stack
    else next();
  },
  function(req, res, next) {
    // send a regular response
    res.send("regular");
  }
);
// This app.get() will be executed only when next('route') above is called
app.get("/user/:id", function(req, res, next) {
  res.send("special");
});
```

### Router-level MW

### Built-in MW

- `express.static()`
  - Serves static files (images, HTML, etc.)
- `express.json()`
  - Parses incoming request which payload is JSON
- `express.urlencoded()`
  - Parses incoming request which payload is URL-encoded (what?)

### Third-party MW

- List of common third-party middlewares
- Some middlewares will be installed automatically by `express-generator`

- `cookie-parser`
- `morgan`
  - Logger for dev
- `http-errors`
- `path`
- `body-parser`
- `debug`
- `passport`
- `cors`
  - Enable CORS

## Template Engines

- You don't have to learn this when you use Vue.js
  - At the frontend, you'll get the data as JSON in most cases
  - Then Vue.js will embed the JSON data to the Vue.js template

## Error handling

## Debugging


## Misc

- Connect
  - Connect is a middleware layer for Node.js
  - Old Express.js depended on Conenct, however after Express 4 it's no longer dependent
