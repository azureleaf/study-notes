# Laravel Authentication & Authorization
- Authentication 認証
   - 本人確認すること
- Authorization 認可
   - 権限を与えること。Authenticate されたら、だいたい同時に authorize もされる（個人ページを見る権限とか）

### misc
- "localhost:8000/login"などのルートは web.php ではなく、`Illuminate\Routing\Router.php`にある
- `@if(Auth::user()->id === $post->user_id)`
   - bladeにこう書くと、「今ログインしているユーザのIDと、投稿者のIDが一致している時（つまり本人のとき）」という条件分岐になる
- `Auth::routes();`
   - Written in web.php
   - この記述により、`/login /register /password/reset`などのroutingがセット
- `if(Auth::check());`
   - Return true when the user is logged in

## Authentication
- `config/auth.php`
  - authentication 関係の設定は大体ここ
- Laravel での認証の種類
  - ログイン認証: ユーザ名＋パスワード
  - Laravel Passport：　OAuth2.0に沿ったログイン。公式で推奨されている
  - API 認証：
- ログインを要求するページとログイン不要の公開ページをどのようにして一括登録するのか？
  - おそらく middleware group だと思うが
- ログインページをどのようにしてカスタマイズするのか？

### Laravel Passport

- 以下の認証方式を利用できる
   - Authorization Code Grant
   - Implicit Grant
   - Password Grant
   - Client Credential Grant

## Set up project with auth

1. `laravel new myapp`
1. `cd myapp`
1. `composer install`
1. `cp .env.sample .env`
1. Edit DB name and password at `.env`
1. `php artisan key:generate`
1. `composer require laravel/ui`
   - laravel/ui offers commands for JS build & CSS preprocessing
1. `php artisan ui vue --auth`
   - This command requires laravel/ui
   - This generates HomeController
1. `php artisan migrate`
1. `npm install`
1. `npm run dev`

### Add auth to your project
1. Set DB up by editting .env
   - `MAIL_DRIVER=smtp` パスワード再設定メール
1. `php artisan config:cache`
1. Define migration file for the Users table (created by default)
1. Migrate
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
- Gate, Policyのいずれも認可を与える機能
- Policyは「特定のモデルに対するアクションを認可するか」を制御
- Gateは「特定のモデルに関係していないユーザのアクションを認可するか」を制御

### Gate による認可

### Policy による認可


### 他の便利機能

`Route::redirect('/here', '/there', 301);`
`Route::view('/welcome', 'welcome', ['name' => 'Taylor']);`
