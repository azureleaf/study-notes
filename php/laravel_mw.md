# Middleware

## MW を使ってどんな機能をつける？

- Redirect
  -「このサイトはメンテナンス中です」
  - ログインしてないユーザは、ログインページに飛ばす
  - HTTP で接続してきたユーザを強制的に HTTPS に切り替える
  - スマホからのアクセスなら、モバイルサイトにリダイレクト
  - 特定の時間帯だけ表示ページを切り替える
- ユーザの認証と許可されたルートの管理
- リクエストの validation
- 特定の IP からの接続のみ許可する
- 全てのレスポンスに対して付加する内容を自動で付加する
  - 同じ処理を全ての Action に書いていくのは非効率で面倒くさいのを防げる
  - レスポンスヘッダの付加
  - 全てのページで必要な情報の付加
- レスポンスを minify する
  - 表示を高速化するために、HTML、CSS、JS などを最小化すること
- API Key を確認し、接続を許可する Laravel で API server を構築する場合の話
- リクエストの sanitization validation みたいなもの リクエストに XSS などの悪意あるコードやパラメータが入っている場合それを取り除くことっぽい
- リクエストをログとして記録しておく 接続元の IP を記録するなど
- リクエストの書式変換 改行コードの置換など
- リクエストによって、表示する言語や地域ロケールを切り替える
- リクエストの回数を制限する
- ユーザを特定し、追跡する
- bot traffic の監視

## MISC

- Closure Class 無名クラスを呼び出すためのクラス

## ミドルウェアの２つの動作タイミング

- A. Controller の action の前に動作する MW

  - \$request に名前とメールアドレスのデータを追加する MW の例

  ```php
  public function handle($request, Closure $next){
    //MWの処理内容
    return $next($request); //$next()で次のMWに渡す
  }
  ```

- B. controller の action の後に動作する
  \$response に入っている特定のタグを、正規表現を使って力技で`<a>`タグに置き換える MW の例
  ```php
  public function handle($request, Closure $next){
    // MWの処理内容
    return $response; }
  ```

Route::get('hello", "HelloController@index") ->middleware(HelloMiddleware::class); このように、Route::get メソッドに対してメソッドチェーンを形成することで MW をプロセスに組み込む

## Internal Data flow of Middlewares

1. User sends GET/POST request from the browser
2. web.php catches request based on the URL
   - 記述された middleware chain に従って handle が呼び出される
   - method chain で次の MW が指定されている場合：次の MW の handle（）に request を渡す
   - method chain で次の MW が指定されていない場合：controller の action が呼び出される
3. BlahMiddeware.php alter \$request
   Middleware chain が終わるまでこれを継続
4. BlahblahController.php が View を呼ぶ
5. Blah.blade.php が描写

## MW Development Procedures

1. php make:middleware HelloMiddleware
1. Edit HelloMiddleware.php
1. Register MWs @Kernel.php
   ```php
    protected $routeMiddleware = [
    ...
    'hellomw' => \Illuminate\Auth\Middleware\HelloMiddleware::class, このように、routeMiddleware の配列に追加する middleware の path と、そのエイリアスを設定しているっぽい
    ]
    ```
1. Call MW from Web.php
1. Edit view files
1. Edit Controllers

## MW が走る対象を決める

- A. Method Chain
- B. Define \$middlewareGroup @Kernel.php (optional)
    - 利点： MW が大量にあるときに、いちいち全て書かなくても一括でまとめて命名できるので楽
- C. Define MW as Global MW @Kernel.php (optional)
    - 利点：常に適用される MW などを、web.php に全て middleware chain で書くのは面倒。 Global MW として登録すると、勝手に常に適用されるようになる
    - 一部の Routing について Global MW を適用したくないとき、一時的に特定の Global MW を回避することは可能か？？？

## Where to run MW

- A. `web.php`
  - MW を個別に設定する時はここに書く
- B. `app/http/kernel.php`
  - Global MW などはここに書く

```php
class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     * These middleware are run during every request to your application.
     */
    protected $middleware = [
        \App\Http\Middleware\TrustProxies::class,
    ];

    /**
     * The application's route middleware groups.
     */
    protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\EncryptCookies::class,
        ],
        'api' => [
            'throttle:60,1',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
    ];

    /**
     * The application's route middleware.
     * These middleware may be assigned to groups or used individually.
     */
    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class,
    ];

    /**
     * The priority-sorted list of middleware.
     * This forces non-global middleware to always be in the given order.
     */
    protected $middlewarePriority = [
        \Illuminate\Session\Middleware\StartSession::class,
    ];
}
```
