# PHP Function

## Typehinting of the args

- You can limit the type of arg. So PHP is better than vanilla JS at this point


```php
$userList = ['user1', 'user2'];
function test(array $list) 
{
    echo $list;
}

test($userList); // OK
test('hoge');    // Catchable fatal error: Argument 1 passed to test() must be of the type array, string given
```

- Types you can define:
  - Class name / Interface name
  - self
  - array
  - string
  - int / float
  - bool

- Sometimes, implicit type conversion happens: when you pass integer 1 to the function which arg type is string, it will be automatically converted into string "1"