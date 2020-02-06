# Service

## What's service?

- サービスとは、メールの送信、暗号化、ファイル操作、など Laravel における操作の単位
- サービスの実体はクラスのインスタンス。

## What's Service Container?

- 「サービスの容れ物」であり、また「サービスの管理者」でもある
- クラスのインスタンスを管理する。「管理」というのは...
    - サービスの受け入れや取り出し
    - サービス同士の依存関係の解決：　たとえばクラス A がインスタンス化される前にクラス B がインスタンス化されている必要がある場合、その順序を制御する

### Implementation
- `app()`
    - List the services inside the container
    - bind()の使い方をみると、これ自体がコンテナになっている？
- `app()->bind('myName', function(){return 'John Doe';});`
    - `bind()` registers new item to the container
    - 実行するたびに新しいインスタンスを生成する
    - ここでは、関数がサービスとなっている
- `singleton()`
    - コンテナに新しいサービスを登録する。何度実行しても同じインスタンスを使いまわす
- `$name = app()->make('myName');`
    - `make()`はコンテナからサービスを取り出す

## What's Service Provider?

- サービスプロバイダは、サービスをサービスコンテナにサービスを登録するのが仕事。

## What's DI (Dependency Injection)?

