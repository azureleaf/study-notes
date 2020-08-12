# Laravel

- [Laravel](#laravel)
  - [Authentication vs Authorization](#authentication-vs-authorization)
  - [My Questions to be solved](#my-questions-to-be-solved)
    - [Auth MISC](#auth-misc)
  - [Files created by artisan `laravel/ui`](#files-created-by-artisan-laravelui)
  - [Terminology](#terminology)
  - [Review: How the session works](#review-how-the-session-works)
    - [Session Terminology](#session-terminology)
    - [How session is passed between the client & the server?](#how-session-is-passed-between-the-client--the-server)
    - [Security of the session](#security-of-the-session)
  - [Authentication Types](#authentication-types)
    - [Laravel Passport](#laravel-passport)
  - [Set up project with auth](#set-up-project-with-auth)
    - [Add auth to your project](#add-auth-to-your-project)
    - [Guard](#guard)
  - [Authorization](#authorization)
    - [Gate による認可](#gate-による認可)
    - [Policy による認可](#policy-による認可)
    - [他の便利機能](#他の便利機能)
  - [Encryption vs Hashing](#encryption-vs-hashing)
  - [Encryption](#encryption)
  - [Hashing](#hashing)

## Authentication vs Authorization

- Authentication（認証） is to indentify who the user is.
- Authorization（認可） is to grant the privilege to the user. In most cases authorization happends just after the authorirzation.

## My Questions to be solved

- ログインを要求するページとログイン不要の公開ページをどのようにして一括登録するのか？
  - おそらく middleware group だと思うが
- ログインページをどのようにしてカスタマイズするのか？

### Auth MISC

- "localhost:8000/login"などのルートは web.php ではなく、`Illuminate\Routing\Router.php`にある
- `@if(Auth::user()->id === $post->user_id)`
  - blade にこう書くと、「今ログインしているユーザの ID と、投稿者の ID が一致している時（つまり本人のとき）」という条件分岐になる
- `Auth::routes();`
  - Written in web.php
  - この記述により、`/login /register /password/reset`などの routing がセット
- `if(Auth::check());`
  - Return true when the user is logged in

## Files created by artisan `laravel/ui`

- `users` table
  - `email` column
  - `password` column
  - `name` column
  - `remember_token` column (nullable): store cookie info
- `password_resets` table
  - `email` column
  - `token` column
- `Controllers/HomeController`
- `Controllers/Auth/` Controllers
- `web.php` with `Auth::routes()`
- `welcome.blade.php` with
- `resource/views/auth` will have multiple Blade files

###

## Terminology

- Guard
  - リクエスト内容に応じて、各ユーザがどのように認証されているべきなのかを決める機能
  - 例として Session Guard がある
- Provider
  - 認証における Provider は、DB などの永続化した保存データから、各ユーザ情報を取り出す手順を決める役割を担当
  - いつも通り Eloquent や Query Builder を使用できる
  - Eloquent を使うのが基本だと思われる
- `App\User`
  - Eloquent Model for authentication
- Authentication Driver
  - Eloquent Authentication Driver (for Eloquent)
  - `database` authentication Driver (for Query Builder)
- Authentication Controller
  - App\Http\Controllers\Auth` namespace
  - 以下の４つのコントローラが既定で用意されている
    - `RegisterController`
    - `LoginController`
    - `ForgotPasswordController`: e-mailing links for resetting password
    - `ResetPasswordController`
  - これらのコントローラは Trait を使って実装されている
  - 多くの場合、この４コントローラは改変する必要はない
- `config/auth.php`
  - authentication 関係の設定は大体ここ
- "Users" table
  - ユーザ登録情報が記憶されるテーブル
  - デフォルトで migration file が定義されている

## Review: How the session works

### Session Terminology

- `Session ID`
  - `Session ID` is shared between the client & the server
  - Client side keeps the session ID as `Cookie`
  - Server side keeps the session ID as `Session`
- Session can be stored as:
  - DB
  - File
  - Server-side cookies
  - Redis
- At the client side, typical session contains:
  - Session ID (decrypted)
  - User ID (NULL when the user isn't logged in)
  - IP Address
  - Last Activity: UNIX timestamp. Updated every time the user accesses
  - Payload (This also looks random string, but this isn't encrypted; this is just base64-encoded)
    - Previous URL: can be used to redirection after login
    - Token
    - Values for the form input
    - Error messages
    - Server-side can add arbitrary key:value pairs
- At the client side, typical cookie contains:
  - name: Laravel Session, value: blahblah (this is the encrypted session ID), expiration: blah
  - name: XSRF-Token, value: blahblah, expiration: blah

```php
/** Useful expressions in Laravel */

session()->all(); // show all the session contents
```

### How session is passed between the client & the server?

1. The client accesses to the webpage which requires session ->
2. <- The server responds with `Set-cookie: PHPSESSID=32geasfal3lf234e2332534; path=/`
3. The client sends request with `Cookie: PHPSESSID=32geasfal3lf234e2332534` ->
4. <- The server updates the "last activity" in the DB, returns HTTP response
5. (repeat)
6. The client removes the cookie:
   - When the cookie expires (Expiration on the client side doesn't update after the first "set cookie")
   - When the browser is closed
   - When the cookie storage is full; older cookie will be removed first

### Security of the session

- Session Hijacking: Peek "set-cookie" message. To prevent this, don't include session ID in the URL.
- Session fixation:

## Authentication Types

- Login Auth
  - ユーザ名＋パスワード
- Laravel Passport
  - OAuth2.0
  - Recommended in the official doc
- API Authentication

### Laravel Passport

以下の認証方式を利用できる

- Authorization Code Grant
- Implicit Grant
- Password Grant
- Client Credential Grant

## Set up project with auth

1. `laravel new myapp` (`laravel new myapp --auth` is better?)
1. `cd myapp`
1. `composer install`
1. `cp .env.sample .env`
   - Edit DB name and password at `.env`
   - `MAIL_DRIVER=smtp` パスワード再設定メール
1. `php artisan key:generate`
1. `composer require laravel/ui`
   - laravel/ui は JS のビルドや CSS のプリプロセッシングなどを扱う
   - このコマンドは、作ったばかりのプロジェクトにのみ使ってよいらしい
1. `php artisan ui vue --auth`
   - This command requires laravel/ui
   - Auth 関係の Scaffolding をやってくれる
   - 認証関係の Routing が自動で記述される
   - `resources/views/layouts`に認証関係の layout view が作成される
   - `resources/views/auth`にユーザ登録やログインの view が作成される
   - 認証関係の view は、Bootstrap CSS を内部で使っている
   - HomeController が生成される
1. `php artisan migrate`
1. `npm install`
1. `npm run dev`

### Add auth to your project

1. `php artisan make:auth`
   - web.php に Auth::routes()が追加される
   - Auth Facade は Illuminate\Support\Facades\Auth
   - login 画面などの blade file もこれで作成される（たぶん）
1. Add `auth` middleware to the routes you want to auth
   - 例: controller のコンストラクタにこのように記述すると、そのコントローラを経由する処理は全てログインを要求する `public function __construct(){$this->middleware('auth');}`
   - `auth` MW is defined in `app\Http\Kernel.php`

### Guard

- Web Guard: session による認証
- API Guard: token による認証

## Authorization

- 認証済みのユーザのそれぞれに対してどのような権限を付加するのかを決定したい
- Gate, Policy のいずれも認可を与える機能
- Policy は「特定のモデルに対するアクションを認可するか」を制御
- Gate は「特定のモデルに関係していないユーザのアクションを認可するか」を制御

### Gate による認可

### Policy による認可

### 他の便利機能

`Route::redirect('/here', '/there', 301);`
`Route::view('/welcome', 'welcome', ['name' => 'Taylor']);`

## Encryption vs Hashing

- Original data can be restored?
  - Encryption is **two-way**; encrypted values can be restored by the key.
  - Hashing is **two-way**; you can't get the original data from a hash.
- How does the result string look like?
  - Encryption always returns the identical string from the same origin with the same key
  - Hashing returns the different values every time even for the same origin
- How long is the result string?
  - Encryption returns the longer string for larger original data
  - Hashing returns the string with the certain length

## Encryption

```php
// Encrypt the single value
$secret = encrypt("admin1234");
$original = decrypt($secret); // admin1234

// Array can be encrypted too
$arr = array("japan" => "tokyo", "china" => "beijing");
$secretArr = encrypt($arr);
$originalArr = decrypt($secretArr)
```

- Laravel uses **OpenSSL** for encryption
- 暗号化方式は AES-256（暗号鍵が 256bit）か AES-128
- MAC(Message Authentication Code)によって改竄されていないことを確認する
- 復号化は`decrypt($encryptedValue)`
- `php artisan key:generate` generates encryption key
- `config/app.php`で key option を設定
- PHP では、default の動作として暗号化の間に serialize を行う
  - オプションで serialize しないこともできる
  - serialize とは、配列やオブジェクトなどを保存に適した形式に変換すること
  - serialize したものを元に戻す動作は unserialize
  - PHP に serialize()という関数がある
  - Laravel では

## Hashing

```php
$hashed = Hash::make("admin123");
Hash::check("admin123", $hashed); // true
Hash::check("hello999", $hashed); // false
```

- In order to store the password to the DB, you need to put **hash of the password** rather than password itself!
- Hashing Libs at Laravel
  - Bcrypt
  - Argon2 Hashing
- Use `Hash` Facade
