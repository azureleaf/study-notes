# Laravel Authentication & Authorization

## Authentication (認証)

- 認証関係の設定はだいたい`config/auth.php`

- Laravel での認証の種類

  - ログイン認証
  - Laravel Passport
  - API 認証

- ログインを要求するページとログイン不要の公開ページをどのようにして一括登録するのか？
  - おそらく middleware group だと思うが
- ログインページをどのようにしてカスタマイズするのか？

- `Auth::routes();`

### Add auth to your project

1. Define migration file for the Users table (created by default)
1. Migrate
1. `php artisan make:auth`

### Guard

- Web Guard: session による認証
- API Guard: token による認証

## Authorization (認可)

- 認証が本人確認なのに対して、認可は権限の付与っぽい

### Gate による認可

### Policy による認可

### misc

- "localhost:8000/login"などのルートは web.php ではなく、`Illuminate\Routing\Router.php`にある

### 他の便利機能

`Route::redirect('/here', '/there', 301);`

`Route::view('/welcome', 'welcome', ['name' => 'Taylor']);`