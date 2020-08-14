# Facade

## What's Facade?

- Facade を使うと、Laravel 内部の機能に簡単にアクセスできる
  - 記述量を減らすことができる
- デザインパターンの一つ
- Laravel といえば Facade というくらい有名
- Facade は本来は「建物の正面」の意味

## Look into `Route::get()`

- You use `Route::get()`. This `Route` is a Facade
- `Route` is the alias for `Illuminate\Support\Facades\Route::class`. This alias is defined in `config/app.php`
- This `Route` class inherits from `Illuminate\Support\Facades\Facade`. However, `get()` isn't defined here;

```php
namespace Illuminate\Support\Facades;

class Route extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'router';
    }
}　　　
```

- This `Facade` class doesn't have `get()` either. `__callStatic()` is the fallback method when the called method (now `get()`) isn't defined.

```php
abstract class Facade{
    // 途中省略
    public static function __callStatic($method, $args)
    {
        $instance = static::getFacadeRoot();

        if (! $instance) {
            throw new RuntimeException('A facade root has not been set.');
        }

        return $instance->$method(...$args);
    }
}
```

- これ以降まだよくわかってない

## User-defined Facade

1. Create Service Provider
1. Create Facade file
1. Add facade to config/app.php
1. Try to run the facade

