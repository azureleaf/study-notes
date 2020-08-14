# Session & Cookie <a name="session"></a>

- Cookie Expiration is defined in `config/Session.php`
  - `'lifetime' => env('SESSION_LIFETIME', 120),` So 120 min by default.
- Session is managed by middleware `\Illuminate\Session\Middleware\StartSession::class`

- Laravel を使った app では次のような cookie が設定される
  - XSRF-TOKEN: 値は不規則な文字列
  - laravel_session: ここに書いてあるユーザ ID は暗号化されるので、DB の値とは別物

## Using Session

1. Set up
   - Session Driver: Choose one in ".env"
   - database
   - cookie: サーバー側でも cookie として保存？なんか管理しずらそう
   - file
   - redis
1. `php artisan config:clear` (Reflect the changes in .env)
1. `php artisan make:migration create_session_table`
1. Edit migration file
   - `id`
   - `user_id`: NULL for the user who isn't logged in
   - `ip_address`
   - `user_agent`: OS and Browser versions
   - `payload`: base64-encoded text
   - `last_activity`: Unix Timestamp の整数値
1. `php artisan migrate`
1. Access to session inside app
   - `session()->put('test','セッションにデータ追加');`
