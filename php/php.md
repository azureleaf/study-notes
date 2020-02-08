# PHP Syntax MISC

## Coalescing Operator `??`

Both lines below have the identical meaning:

```php
$foo = $bar ?? 'something';
$foo = isset($bar) ? $bar : 'something';
```

## Using externals

- `require`
- `require_once`

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