# PHP Syntax MISC

## Coalescing Operator `??`

Both lines below have the identical meaning:

```php
$foo = $bar ?? 'something';
$foo = isset($bar) ? $bar : 'something';
```