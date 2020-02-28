# Hands on TypeScript

## こんな経験ありませんか？

- 関数に投入する変数などを間違えていた（型も不一致）だったが、そのバグを見つけるのに苦労した
- 暗黙に型変換された結果、挙動がおかしくなった

## TS とは

- array とか float とかポインタとかわからない初心者のレベルに合わせて動的な型付け方式を採用した結果、あまりにテキトーな型のあり方に苦しむことになったのが JS
- TS では、変数のデータ型も、オブジェクトの構造も、入力必須な値も、全て定義できる
- 関数間などで型がきちんと合っていることを確認した後で、結局は古い JS に変換されて実行される
- TypeORM
- TS 信者は多い。実際、JS よりは段違いで便利
- TS はマイクロソフトがつくった。ありがとうマイクロソフト。Windows はゴミだけど

## Interface

```ts
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.textContent = greeter(user);
Classes #
```

- 雑学：そもそも interface とは、「関数定義はないが、クラスのメソッドの名前を実装したもの」である
- interface の利点は、「あるクラスが特定の名前のメソッドを持つことを強制することで、メソッドの定義忘れを防げる」点にある。。。と思う
- 実装を定義し忘れると、コンパイル時にエラーで弾かれる
- ただし、新しい Java では interface でメソッド実装やプロパティも含められるっぽい
- `implements` キーワードで適用先のクラスと基準の interface を結びつける
- interface は Java や PHP で使われる

```php
// PHP
interface Animal
{
    // 関数名は定義するが、実装はここでは不可
    public function eat();
    public function sleep();
}

class Human implements Animal
{
    public function eat() { echo "munch munch"; }
    public function sleep() {echo "zzz";}
}
```

## Decorator
