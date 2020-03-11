# Passport.js

## Overview

- Passport.js adds the user login function to the Express project
- To define "Protected Routes" (routes requires authentication), just add the `passport.authenticate()` method to the routing:

```js
// routing path as the 1st arg
// passport.authenticate() as the 2nd arg
// function after successful login as the 3rd arg
app.post(
  "/login",
  // Choose the strategy to use
  // Strategy must be configured before calling this app.post()
  passport.authenticate("local"),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    // Redirecting after successful auth is very common
    res.redirect("/users/" + req.user.username);
  }
);
```

## Reference

https://medium.com/@basics.aki/step-wise-tutorial-for-node-js-authentication-using-passport-js-and-jwt-using-apis-cfbf274ae522

## Files

- How Express project with Passport.js may look like
- express-generator default

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

## `passport.authenticate()`

- Seemingly there're various positions for `passport.authenticate()`:
  - `app.get("/login", passport.authenticate(), function(){})`
  - `app.get("/login", function(){passport.authenticate()})`

```js
app.get("/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    } 
    // When there's no error but user isn't returned (What situation is this?)
    if (!user) {
      return res.redirect("/login");
    }
    // Is this req.logIn() the built-in passport function?
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/users/" + user.username);
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
passport.use(
  new Strategy(function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password != password) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  })
);
```

```js
passport.serializeUser();
passport.deserializeUser();

done();
```
