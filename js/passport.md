# Try to use Passport.js

## Overview

- Passport.js adds the user login function to the Express project
- Declare to use passport @app.js (or server.js, index.ts, whatever)
- Declare "Protected Routes" (routes requires authentication) @app.js / routes/index.js


## Reference

https://medium.com/@basics.aki/step-wise-tutorial-for-node-js-authentication-using-passport-js-and-jwt-using-apis-cfbf274ae522

## Files (express-generator default)

```
passportjs/
├── app.js
├── bin
│   └── www
├── package.json
├── package-lock.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│   └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug
```

## Common `express` Syntax

- Create app

```js
var express = require("express");
var app = express();
```

- Set project variables
- Some reserved variables affect the behavior of the project

```js
app.set("Title", "My Site");
app.get("Title"); // "My Site"
```

- Define how to use middleware

```js
// Middleware "usersRouter" will be used for the path '/users'
var usersRouter = require("./routes/users");
app.use(("/users", usersRouter));

// Here the path (1st arg) is omitted, so express.json() middleware will be active for all the paths
var express = require("express");
app.use(express.json());

// Define the middleware (error handling) on the spot
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
```



### `bin/www`

- `npm start` comes here
- Declare middlewares to use

### `app.js`

- Call `router/index.js` router for the root path `/`
- Call `router/users.js` router for the user path `/users`

## `passport.authenticate()`

```js
app.get('/login', function(req, res, next) { // 普通のルーティングの記述
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); } // この時点でエラーが起きていたら、エラー処理のMWに渡す（）
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});

```


- `.authenticate(STRATEGY, OPTIONS, CALLBACK)`
  - Seemingly, OPTIONS or CALLBACK can be omitted





### strategy

- local
- basic
- openid
- provider
  - OAuth Provider
- facebook
- twitter
- google
- digest
- token
- bearer

### options (object literal)

- "Message flashing"
  - The flashing system basically makes it possible to record a message at the end of a request and access it next request and only next request
  - So, flash message will disappear on the later request / page reloading
  - This is usually combined with a layout template that does this
  - Note that browsers and sometimes web servers enforce a limit on cookie sizes
  - This means that flashing messages that are too large for session cookies causes message flashing to fail silently.
  - e.g. "Successfully logged in", "Failed: Invalid Password or/and Username"

```js
{
  session: false
  successRedirect: '/',
  failureRedirect: '/login',

  // Flash
  failureFlash: true,
  failureFlash: 'Invalid username or password.',
  successFlash: 'Welcome!'

  // Scope
  scope: 'email'
  scope: ['email', 'sms']
}
```

### callback

```js
function(err, user, info) {
  // When auth failed
  if (err) { return next(err); }

  // When the authentication is successful, passport will pass the user object to the callback, maybe
  // If the user obj isn't set, ask the user to login
  if (!user) { return res.redirect('/login'); }

  // When the auth is successful
  req.logIn(user, function(err) {
    // "user" is set but error... what?
    if (err) { return next(err); }

    // So, every user has the personal page like:
    // sample.com/users/john
    return res.redirect('/users/' + user.username);
  });
}
```

## Key Expressions

- Configure local strategy
```js
passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

```


```js
passport.serializeUser()
passport.deserializeUser()


done()


```
