# Passport.js

## Reference

- http://www.passportjs.org/docs/downloads/html/
- https://medium.com/@basics.aki/step-wise-tutorial-for-node-js-authentication-using-passport-js-and-jwt-using-apis-cfbf274ae522

## ToC

1. [Overview](#overview)
1. [passport.authenticate()](#auth)
1. [Strategy](#strat)
1. [done()](#done)
1. [Serialization & Deserialization](#serial)
1. [Key Expressions](#key)

## Overview <a id="" name=""></a>

- バックエンド側で認証を実証するための機能なので、Express のプロジェクトに追加して使う
- "Protected Routes" (認証を必要とするルート)については、`app.get()`などの引数に`passport.authenticate()`を追加するだけで認証要求ができる
- 非常に多数の認証方式をサポートしていることを売りとしている
  - 一番普通の email + password ログイン
  - OAuth
  - OpenID
  - Social Login
- 認証情報を記憶するため、DB の設定が必要なことが多い

```js
// app.METHOD()の形状
// 第一引数：　ルーティングのパス（いつもどおり）
// 第二引数：　passport.authenticate()
// 第三引数：　認証が成功したときのコールバック
app.post(
  "/login",
  // どのstrategyで行くのかを明示
  // ここで呼ぶstarategyは、別の場所で定義しておくことが必須
  // 認証に失敗すると、res.sendStatus(401)がかかるっぽい？
  passport.authenticate("local"),
  function(req, res) {
    // `req.user` contains the authenticated user　（Passport.jsによってreqに追加される）
    // ログイン成功後にその個人ページにリダイレクト
    res.redirect("/users/" + req.user.username);
  }
);
```

## How to add Passport.js

1. `npm install passport passport-local express-session`
1. Edit `app.js`
   - `require passport`
   - `passport.use()` to define auth strategy
   - `serializaUser()` / `deserializeUser()`
1. Add to routing file
   - `passport.authenticate()` for login page
   - Add `if` statement to each guraded route to check if the user is authed

## `passport.authenticate()` <a id="auth" name="auth"></a>

- `.authenticate(STRATEGY, OPTIONS, CALLBACK)`
- Strategy: 認証方式。パスワードなのか、ソーシャルログインなのか、など
- Options：認証成功時のリダイレクト先とか
- Callback：送信されたデータが正しいのか実際に認証を行う関数
  - このコールバック関数は特に「verify callback」という名前がついている

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
- ...etc.

### options (object literal)

- ログイン関係の各種機能をそれぞれ使うかどうか、あるいはリダイレクト先の設定などを行う
- 普通オブジェクトの形式で指定するが、もっと高度な機能が必要な時には関数で定義する -　その関数の中で`next()`や`res.direct()`する
- "Message flashing"
  - The flashing system basically makes it possible to record a message at the end of a request and access it next request and only next request
  - So, flash message will disappear on the later request / page reloading
  - Note that browsers and sometimes web servers enforce a limit on cookie sizes
  - This means that flashing messages that are too large for session cookies causes message flashing to fail silently.
  - 例："パスワードかユーザ名が不正です", "このメールアドレスは既に使われています"
  - Express で flash message を使うには、オプションで指定するのに加えて`connect-flash` ミドルウェアをインストールする必要あり
- セッションを使うのが基本になる
  - ログインに成功すると、それ以降のユーザーからのアクセスには`req.user`を Express.js のミドルウェアが付加するようになる
  - API サーバーなどは、アクセスがあるたびに認証するものらしい。なので、この場合はセッションは使わない`{session: false}`

```js
{
  session: false, // true by default
  successRedirect: '/',
  failureRedirect: '/login',

  // Message flash
  // booleanを指定するか、もしくは文字列を指定
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

## Strategy <a id="strat" name="strat"></a>

- passport.use の中で定義する

```js
passport.use(
  // ここでstrategyをインスタンス化する
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);
```

- Passport 内部では以下のようにして実装されている

```js
// @param {Object} options
//    - usernameField, passwordFieldという２つのキーが存在することが想定されている
// @param {Function} verify
//    - 上記の例で言えばdoneがverifyに相当する
function Strategy(options, verify) {
  // optionsが完全に省略され、第一引数しかないときは、その引数が関数ということなのでそれをverifyと見なす
  if (typeof options == "function") {
    verify = options;
    options = {};
  }

  // Strategyに渡された引数が一つもない場合には明らかにエラー
  if (!verify) {
    throw new TypeError("LocalStrategy requires a verify callback");
  }

  // optionsに正しくキーが設定されていない場合には、既定値を設定
  // この２つの値はStrategyオブジェクトに記憶されているが、どこで使うのか？
  this._usernameField = options.usernameField || "username";
  this._passwordField = options.passwordField || "password";

  // call関数：この行以降では「passport.Strategy」のオブジェクトの内容を、「this」という名前で呼び出せるようになる
  // thisの指す内容を変更したのと等しい
  passport.Strategy.call(this);
  this.name = "local"; // つまりこれはpassport.Strategy.nameにlocalという文字列を設定したのと同じ
  this._verify = verify;
  this._passReqToCallback = options.passReqToCallback;
  // passportオブジェクトにはStrategyというメンバーがあり、その中にさらにnameや_verifyなどのプロパティが存在するということ
}
```

## `passport-local` dependencies

- This package requires `passport-strategy` package
- `passport-local/lib/index.js` requires `passport-local/lib/strategy.js`
- `passport-local/lib/strategy.js` requires `passport-local/lib/utils.js`

## `passport` dependencies

- This package requires `passport-strategy` package
- `passport/lib/index.js` requires:
  - `passport/lib/authenticator.js` (no dependency)
  - `passport/lib/strategies/session.js` (no dependency)
- `passport/lib/authenticator.js` requires:
  - `passport/lib/sessionmanager.js`
  - `passport/lib/strategies/session.js` (no dependency)
  - `passport/lib/framework/connect.js`
- `passport/lib/framework/connect.js`
  - `passport/lib/middleware/authenticate.js`
  - `passport/lib/middleware/initialize.js` (no dependency)
  - `passport/lib/http/request.js` (no dependency)
- `passport/lib/middleware/authenticate.js` requires:
  - `passport/lib/http/request.js` (no dependency)
  - `passport/lib/errors/authenticationerror.js` (no dependency)
  - `passport/lib/framework/connect.js` (already checked)

## `passport-strategy` dependencies

- `passport-strategy/lib/index.js` requires:
  - `passport-strategy/lib/strategy.js` (no dependency)

## `done()` <a id="done" name="done"></a>

- `done()`は認証した結果を Passport 本体に渡すためのコールバック関数である
  - というか session に保存されるっぽい
- Syntax: `done(error, user, options)`
- `done()`に渡した内容が`serialization()`で処理される

```js
// 認証成功時の処理。userを渡す
return done(null, user);

// 他の箇所でのエラーを渡す
// DBに接続できなかった、などのエラーが想定される
return done(err);

// 認証失敗時の処理
return done(null, false);

// 認証失敗の理由を添えることもできる
// このメッセージは、flash messageなどに使える
return done(null, false, { message: "incorrect password" });
```

## Serialization / Deserialization <a id="serial" name="serial"></a>

- 例えば数字の 10 をバイナリデータに変換すれば 1010 になるのはどこでも同じ
- しかし、それよりも複雑なプログラム上のオブジェクトなどをどうバイナリデータに変換するのかは自明ではない
- プログラミングにおける Serialization とは、オブジェクトなどを自分の決めた手順でバイナリ化すること
- Deserialization はその逆で、バイナリデータを実際に使える形に「解凍」して戻す動作
- Passport における serialize / deserialize の意味は、「user オブジェクト全体から id を取り出す」「id を基に user 全体を検索して復元する」の意味っぽい
- この serializeUser は、`done()`すると呼ばれる?しかし、serializeUser 関数自体の内部でも done が実行されているな...

```js
passport.serializeUser(function(user, done) {
  // 「user全体はいらない。user.idだけをsessionに保存せよ」と指示
  // この結果、req.session.passport.user = { id: "abc" }というように保存される
  done(null, user.id);
});

// deserializaUserの第一引数はserializeUserで指定したkey
// つまりreq.session.passport.userのその先
passport.deserializeUser(function(id, done) {
  // 「user.idという数字データを基に、userオブジェクト全体を取り出せ」という指示
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
```

## Key Expressions <a id="key" name="key"></a>

```js
router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy(); // これはユーザーのブラウザーからクッキーも削除するのか？
  res.redirect("/");
});
```
