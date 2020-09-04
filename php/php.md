# PHP Syntax MISC

# ToC

- [PHP Syntax MISC](#php-syntax-misc)
- [ToC](#toc)
- [Topics to be checked later](#topics-to-be-checked-later)
- [My impression on PHP](#my-impression-on-php)
- [Running php casually](#running-php-casually)
- [Syntax](#syntax)
  - [`??`: Coalescing Operator](#-coalescing-operator)
  - [Debug](#debug)
  - [Predefined Constants](#predefined-constants)
- [Module](#module)
- [DB](#db)
- [Scopes](#scopes)
  - [Scope Resolution Operator `::`](#scope-resolution-operator-)
  - [`::class` Class Name Resolution](#class-class-name-resolution)
- [Control flow](#control-flow)
  - [loop](#loop)
- [Function](#function)
  - [Typehinting of the args](#typehinting-of-the-args)
- [Class](#class)
  - [MISC](#misc)
  - [Access Modifier](#access-modifier)
  - [Interface vs Abstract Class vs Trait](#interface-vs-abstract-class-vs-trait)
- [`php.ini`](#phpini)
  - [What's php.ini?](#whats-phpini)
  - [Some common options in php.ini](#some-common-options-in-phpini)
  - [Location](#location)

# Topics to be checked later

- `__clone()`
- `__wakeup()`
- `??`
- `<=>`
- Deep-copy array
- Pop / push array & change of the index
- `::`
- `$this` vs `self::`

# My impression on PHP

- Very similar to JS; easy & confusing for me
- Adding `\$` to every variables is annoying (the sign is called "sigil")
- Arrows are confusing for beginners; `->` is for associative array, `=>` is for class member
- PHP is a legacy language;
  - pros: matured library
  - pros: large community; easy to employ the coders, find online supports
  - cons: old-fashioned syntax
  - cons: new learners of PHP aren't so many as popular languages such as JS, Python, C#

# Running php casually

- `php -f hello.php`
  - Run php on terminal
- `php -a`
  - Interactive shell

# Syntax

## `??`: Coalescing Operator

- Shorthand for ternary operation
- Both lines below have the identical meaning:

```php
$foo = $bar ?? 'something';
$foo = isset($bar) ? $bar : 'something';
```

## Debug

```php
var_dump()

var_dump($apple instanceof Fruit); // bool(true)
```

## Predefined Constants

Get info of the running code

- `__DIR__`
- `__FILE__`
- `__FUNCTION__`
- `__CLASS__`
- `__METHOD__`
- `__LINE__`
  - line number
- `__NAMESPACE__`

# Module

- `require`
- `include`
  - Similar to `require`
  - Failure of `require` aborts the whole program, while `include` just warns and proceed
  - Seemingly, `require` is more common
- `require_once`
  - Do nothing if the module is already imported
  - Seemingly close to `#PRAGMA ONCE` or `#ifndef` of Clang

# DB

- Ways to access
  - MySQLi (i means improved)
  - PDO: PHP Data Object
  - RedBeanPHP ORM
  - Doctrine ORM
  - Eloquent ORM
- 

# Scopes

- `use namespace test`
- `John\greet()`
  - specify the greet() method in the John namespace

## Scope Resolution Operator `::`

- Keywords to access scope
  - `parent`
  - `self`
  - `static`

```php
<?php
class Goodbye {
  const LEAVING_MESSAGE = "Thank you for visiting W3Schools.com!";
}

echo Goodbye::LEAVING_MESSAGE;
?>
```

## `::class` Class Name Resolution

- introduced in Php 5.5
- `::` vs `->`
  - `::` is for class definition
  - `->` is for instance

```php
namespace foo {
    class bar {
    }

    echo bar::class; // foo\bar
}
```

# Control flow

## loop

- `foreach($properties as $property)`

# Function

## Typehinting of the args

- You can limit the type of arg (PHP is better than vanilla JS for this)

```php
$userList = ['user1', 'user2'];
function test(array $list)
{
  echo $list;
}

test($userList); // OK
test('hoge');    // Catchable fatal error: Argument 1 passed to test() must be of the type array, string given
```

- Available types
  - Class name / Interface name
  - self
  - array
  - string
  - int / float
  - bool
- Sometimes, implicit type conversion happens:
  - when you pass numerical 1 to the function which arg type is string, it will be automatically converted into string "1"

# Class

## MISC

- `public function __construct()`
- `public function __destruct()`
- `$this`
  - same as JS
- `class Strawberry extends Fruit`
- Overriding methods
  - Just redefine the method with the same name
- `final class Fruit{}`
  - Prohibit inheritance (and overriding too, of course)
- `static` & `const`
  - Can be accessed without instantiation
  - `static` can be added to both methods and properties
  - Use `self::` instead of `$this->`, I guess?
- `$reflector = new ReflectionClass('A');`
  

## Access Modifier

- `public`
- `protected`
  - Can NOT be accessed outside the class
  - Can be accessed in the derived class
- `private`
  - Can NOT be accessed outside the class
  - Can NOT be accessed in the derived class


## Interface vs Abstract Class vs Trait

- Abstract Class
  - Use with `extends`
  - Does NOT define the methods
  - Advantage:
    - Can force the classes to have the methods / properties with the specified names
- Interface
  - Use with `implements`
  - Does NOT define the methods
  - Advantage:
    - Can force the classes to have the methods / properties with the specified names
    - Enable multiple inheritance (which is impossible for native PHP)
  - The idea of "interface" is inspired from Java
  - TypeScript also has the interface
- Trait
  - Use with `use`
  - Unlike abstract class or interface, traitdefines the methods
  - Advantage:
    - Can force the classes to have the specified methods
    - Enable multiple inheritance

# `php.ini`


## What's php.ini?

- This configures PHP
- PHP web server checks this file on server start
- Most lines are commented out with `;` symbol

## Some common options in php.ini

- `safe_mode`
- `register_globals`
- `upload_max_filesize`
- `post_max_size`
- `max_execution_time`

## Location

1. `vim index.php`
2. `<?php phpinfo(); ?>`
3. `php index.php`
4. 結果の中に「Configuration File (php.ini) Path」があり、そこに`php.ini`の場所が書かれている（今回は`/etc/php/7.2/cli/php.ini`）


