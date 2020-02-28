# Hands on TypeScript

## JSとは

- JSでは型に関係する問題が起こり得る
    - 関数に投入する変数などを間違えていた（型も不一致）だったが、そのバグを見つけるのに苦労した
    - 暗黙に型変換された結果、挙動がおかしくなった

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

// 引数のオブジェクトがどのようなkey名、valueの型を持つのかを強制できる
function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

console.log(greeter( { firstName: "Jane", lastName: "Smith" })); // OK
console.log(greeter( { firstName: "Jane", lastName: 20 })); // NG
console.log(greeter( { firstName: "Jane", lastName: "Smith", age: 20 })); // NG
console.log(greeter( { firstName: "Jane", age: 20 })); // NG
console.log(greeter( { firstName: "Jane"})); // NG
```

- そもそも interface とは、「関数定義はないが、クラスのメソッドの名前を実装したもの」である
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


## Types

```ts

// boolean
let isDone: boolean = false;

// number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// string
// stringとnumberをくっつけるとstring扱いになるのはJSと同じ
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }. I'll be ${ age + 1 } years old next month.`;
let sentence: string = "Hello, my name is " + fullName + ".\n\n" +
    "I'll be " + (age + 1) + " years old next month."

// array
// 配列の型定義は[]を使う書き方と、generic typeを使う書き方がある
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
let list: (number|string)[] = [1, 2, "hello"];
let list: Array<number|string> = [1, 2, "hello"];
let list: [number, number, [number, string]] = [1, 2,[3, "hello"]];

// tuple
// 同じ要素が２回以上入ってはいけないというやつ

```


## Class

## Function

- 基本

```ts
// 関数の返り値の型を書く位置に少し癖がある
function add(x: number, y: number): string {
    return "The answer is " + (x + y);
}
add(1, 2); // 3
add(1, 2, 3); // 引数の数が違うのでエラー

(x: number, y:number ) : string=>{
    return "The answer is " + (x + y);
}
```
- 引数の省略

```ts
// 省略可の引数の型は「？」を付加
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
buildName("John"); // John
buildName("John"); // John


// 省略可の引数にデフォルト値をセットした場合は、もはや型定義は不要
function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}
buildName("John"); // John Smith
buildName("John", "Adams"); // John Adams

// 省略可の引数が最後でない場合
function buildName(firstName = "Will", lastName: string) {
    return firstName + " " + lastName;
}

// 引数を設定しないことをundefinedで知らせる
buildName(undefined, "Adams");     // "Will Adams"
```

## Generics


## Enum

```ts
// 引用符で囲っていない
enum Direction {
    North,
    East,
    South,
    West,
}

function move(distance: number, message: Direction): void {
    console.log("You moved to", Direction, "by", distance, "km");
}

// 直接Northと書くのではなく、object propertyのようにドットでつなげる
move(5, Direction.North);
```

## Type Inference


## TYpe