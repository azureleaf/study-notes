# PHP Syntax MISC

## Coalescing Operator `??`

Both lines below have the identical meaning:

```php
$foo = $bar ?? 'something';
$foo = isset($bar) ? $bar : 'something';
```

## Read external files

- `require`
- `include`
  - requireとほぼ同じだが、requireがインポート失敗時にプログラム全体を中止するのに対して、includeの場合は失敗時にも警告を出すだけで継続する。基本的には、requireを使えばいい気がする（ていうかincludeってあんまみない）
- `require_once`
  - そのファイルが既に読み込まれている場合には何もしない。Cの#PRAGMA ONCEとか#ifndefみたいなもんと同じ発想か

## Scopes

- `use namespace test`
- `John\greet()`
  - specify the greet() method in the John namespace

### Scope Resolution Operator (::)

```php
<?php
class Goodbye {
  const LEAVING_MESSAGE = "Thank you for visiting W3Schools.com!";
}

echo Goodbye::LEAVING_MESSAGE;
?>
```

`::class`は特殊（php5.5以降のわりと新しいsyntax）

```php
namespace foo {
    class bar {
    }

    echo bar::class; // foo\bar
}
```

- `::` vs `->`
  - ::はクラスに使う
  - ->はインスタンスに使う


## Debug系

- var_dump()


## Predefined Constants

- `__DIR__`
  - Directory of the file
- `__FILE__`
  - Full path
- `__FUNCTION__`
  - Function name
- `__CLASS__`
- `__METHOD__`
  - Class method name
- `__LINE__`
  - Current line number
- `__NAMESPACE__`