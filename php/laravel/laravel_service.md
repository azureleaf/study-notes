# Service

## What's service?

- サービスとは、メールの送信、暗号化、ファイル操作、など Laravel における操作の単位
- サービスの実体はクラスのインスタンス

## What's Service Container?

- サービスコンテナは「built-in component やサービスの容れ物」
- サービスコンテナはクラスをインスタンス化する
- サービスコンテナはコンポーネントの binding の入れ物である
- クラスのインスタンスを管理する
- サービスの受け入れや取り出し
- クラスをインスタンス化する
- サービス同士の依存関係の解決
  - たとえば、クラス B を new する際のコンストラクタに、クラス A のインスタンスを渡す必要があるとする
  - つまりクラス A がインスタンス化される前にクラス B がインスタンス化されている必要がある
  - サービスコンテナなしだと...自分でクラス A とクラス B のインスタンス化を順に定義する
  - サービスコンテナありだと...`app()->bind('myclass', \MyNamespace\classB::class);`と書くと、classA のインスタンス化などは自動で行われる。自分で明示的に記述する必要はない

### What's DI (dependency injection) Pattern?

- あるクラスAのType Hintingに別のクラスBを記述することで、クラスAがクラスBに依存することを明示すること
- これにより実際にClass b

  ```php
  Class SomeClass
  {
  public function __construct(FooBar $foobarObject)
  {
      // use $foobarObject object
  }
  }
  ```

    - 例としてテキストエディタのソースプログラム中でスペルチェックの機能を実装することを考える
    - DI を使わないで書くと以下のようになる

    ```js
    public class TextEditor {

    private SpellChecker checker;

    public TextEditor() {
        this.checker = new SpellChecker();
    }
    }
    ```

    - TextEditorの中でSpellCheckerをnewしている、つまりTextEditorはSpellCheckerに「依存している」

    ```js
    public class TextEditor {

    private IocSpellChecker checker;

    public TextEditor(IocSpellChecker checker) {
        this.checker = checker;
    }
    }
    ```



### Implementation

- `app()`
  - サービスコンテナの中身を表示するヘルパ関数
  - bind()の使い方をみると、これ自体がコンテナになっている？
- `app()->bind('myclass', function(){return 'John Doe';});`
  - コンテナに新しいサービスを登録する
  - 第一引数が登録したいクラスもしくは interface の名前
  - 第二引数が「クラスインスタンスを返す Closure」
  - 実行するたびに新しいインスタンスを生成する
  - ここでは、関数がサービスとなっている
- `singleton()`
  - bind()と同じく、コンテナに新しいサービスを登録する
  - bind()と違い、何度実行しても同じインスタンスを使いまわす
- `$name = app()->make('myclass');`
  - コンテナからその名前のサービスを取り出す
  - 以下も同義
    - `$name = app('myName');`
    - `$name = resolve('myName');`
    - `$name = App::make('myName');`

## What's Service Provider?

- サービスプロバイダは、サービスをサービスコンテナにサービスを登録するのがお仕事
- Application Bootstrapping の時に様々なものを登録する：
  - Service Container Binding
  - Event Listeners
  - Middlewares
  - Routes
- プロバイダが持つ 2 つの重要なメソッド
  - `bind()`
  - `register()`

## misc

- IoC: Inversion of Control
  - 「制御の反転」と呼ばれる
  - 伝統的なプログラムの書き方での「呼び出し元」「呼び出し先」の関係が逆転するようなプログラムの流れのこと
  - Dependency Injection は、IoC の一種
  - Service Containe が IoC Container と呼ばれることもある
