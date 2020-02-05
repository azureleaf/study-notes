# Session & Cookie <a name="session"></a>

## そもそもセッションってなんだっけ？

- Session ID はユーザを識別するための番号
- Session ID をブラウザ側で保管する場所が、Cookie
- Session ID をサーバー側で保管する場所が、Session
  - つまり、Session を DB で管理するなら、Session を記憶するためのテーブルをあらかじめ migrate しておく必要があるということ
- HTTP は stateless。しかし実用的なウェブサイトでは、ページ移動しても状態を保持できなきゃお話にならない。だからセッションができた

- Session is managed by middleware `\Illuminate\Session\Middleware\StartSession::class`

## そもそもクッキーってなんだっけ？

- Cookie は key と value のペアからなる
- Cookie has expiration
  - Defined in `config/Session.php`
  - `'lifetime' => env('SESSION_LIFETIME', 120),` So 120 min by default.
  - If expiration isn't set, cookie will be discarded when the browser is closed
- Cookie has data size limit
  - 4096 bytes / domain
  - 50 cookies / domain
- Cookie の値はユーザ側で変えたい放題だと思うけど、それを使って他のユーザだと偽ることもできる？
- Chrome の DevTool > Application Tab で Cookie を確認可能
- Laravelを使ったappでは次のようなcookieが設定される
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
