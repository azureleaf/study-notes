# Laravel Authentication & Authorization

- Authentication（認証）は「本人確認すること」
- Authorization（認可）は「権限を与えること」。Authenticate されたら、だいたい同時に authorize もされる（個人ページを見る権限とか）

### misc

- "localhost:8000/login"などのルートは web.php ではなく、`Illuminate\Routing\Router.php`にある
- `@if(Auth::user()->id === $post->user_id)`
  - blade にこう書くと、「今ログインしているユーザの ID と、投稿者の ID が一致している時（つまり本人のとき）」という条件分岐になる
- `Auth::routes();`
  - Written in web.php
  - この記述により、`/login /register /password/reset`などの routing がセット
- `if(Auth::check());`
  - Return true when the user is logged in

## 抑えるべき用語

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

## 認証の種類

- ログイン認証: ユーザ名＋パスワード
- Laravel Passport：　 OAuth2.0 に沿ったログイン。公式で推奨されている
- API 認証：

- ログインを要求するページとログイン不要の公開ページをどのようにして一括登録するのか？
  - おそらく middleware group だと思うが
- ログインページをどのようにしてカスタマイズするのか？

### Laravel Passport

以下の認証方式を利用できる

- Authorization Code Grant
- Implicit Grant
- Password Grant
- Client Credential Grant

## Set up project with auth

1. `laravel new myapp`
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


## Encryption

- Laravelは暗号通信プロトコルのOpenSSLを使っている
- 暗号化方式はAES-256（暗号鍵が256bit）かAES-128
- MAC(Message Authentication Code)によって改竄されていないことを確認する
- PHPでは、defaultの動作として暗号化の間にserializeを行う
   - オプションでserializeしないこともできる
   - serializeとは、配列やオブジェクトなどを保存に適した形式に変換すること
   - serializeしたものを元に戻す動作はunserialize
   - PHPにserialize()という関数がある
   - Laravelでは
- 復号化は`decrypt($encryptedValue)`

## Hashing

- データベースにユーザログイン情報を格納する時、情報漏洩防止のため、パスワード本体ではなくそのハッシュ値を保存すべきである
- 
- LaravelのHashingの種類
   - Bcrypt
      - Password Hashing Function
   - Argon2 Hashing
- `Hash` Facadeを使う


### Config

- `config/app.php`でkey optionを設定
- `php artisan key:generate`でkeyを生成する
-