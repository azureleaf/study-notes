
# Routing

## misc

## Where to define routing:
- routes/web.php
- api.php
- コントローラからルートを定義することもある?


## 基本の Routing

- `Route::get('/user', 'UserController@index');`

Route Parameters

- `Route::get('user/{id}', 'UserController@show');`
- Regular Expression

```php
Route::get('user/{id}/{name}', function ($id, $name) {
    // 処理
})->where(['id' => '[0-9]+', 'name' => '[a-z]+']);
```

Routing に middleware を組み合わせる

- `Route::get('profile', 'UserController@show')->middleware('auth');`: 外部に書く
- `Route::post($uri, $callback);`

Named Route

- 作成：`Route::get('articles', 'ArticlesController@index')->name('articles.index');`
- 利用：`return redirect()->route('articles.index');`
- URL に別名を与える機能
- URL が変更になったときに、それが記述される場所を全て変更するのは面倒
- name route にしておけば、その別名の定義部分を一箇所変更するだけでその別名を使っている箇所に全て反映できる。

## Resource Controller

`php artisan make:controller PhotoController --resource --model=Photo`: CRUD に則ったルーティングが自動で一括生成される

`Route::resource()`

```php
Route::resource('users', 'AdminUserController')
->parameters([
    'users' => 'admin_user'
]);
```

## `route()` and `action()`

- いずれもURLを作成するための関数
- route('sample.index');　　//こちらは、routes/web.phpでnameを指定する必要があります。
- action('SampleController@index');

## Routing MISC

- `php artisan route:list`
  - List all the routing inside the project

