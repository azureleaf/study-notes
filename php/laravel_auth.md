# Laravel Authentication & Authorization

- Authentication: 認証。本人確認すること
- Authorization: 認可。権限を与えること。Authenticateされたら、だいたい同時にauthorizeもされる（個人ページを見る権限とか）

## Authentication

- `config/auth.php`
    - authentication関係の設定は大体ここ

- Laravel での認証の種類

  - ログイン認証
  - Laravel Passport
  - API 認証

- ログインを要求するページとログイン不要の公開ページをどのようにして一括登録するのか？
  - おそらく middleware group だと思うが
- ログインページをどのようにしてカスタマイズするのか？

- `Auth::routes();`

### Add auth to your project

1. Set DB up by editting .env
    - `MAIL_DRIVER=smtp` パスワード再設定メール
1. `php artisan config:cache`
1. Define migration file for the Users table (created by default)
1. Migrate
1. `php artisan make:auth`
    - web.phpにAuth::routes()が追加される
    - Auth FacadeはIlluminate\Support\Facades\Auth
    - login画面などのblade fileもこれで作成される（たぶん）
1. Add `auth` middleware to the routes you want to auth
    - 例: controllerのコンストラクタにこのように記述すると、そのコントローラを経由する処理は全てログインを要求する `public function __construct(){$this->middleware('auth');}`
    - `auth` MW is defined in `app\Http\Kernel.php`


### Guard

- Web Guard: session による認証
- API Guard: token による認証

## Authorization

### Gate による認可

### Policy による認可

### misc

- "localhost:8000/login"などのルートは web.php ではなく、`Illuminate\Routing\Router.php`にある

### 他の便利機能

`Route::redirect('/here', '/there', 301);`

`Route::view('/welcome', 'welcome', ['name' => 'Taylor']);`