# PHP class

## Constructor

```php
public function __construct(Slack $slack){
  $this->slack = $slack;
}
```


## Interface vs Abstract Class vs Trait

- Abstract Class
    - "extends"で使う（通常のクラスと同様）
	- extendsしたクラスに、特定の名前のメソッド＋プロパティを持つことを強制させる
    - メソッドの実体そのものはinterface内部には定義しない
- Interface
    - "implements"で使う
	- implementsしたクラスに、特定の名前のメソッドを持つことを強制させる 
    - メソッドの実体そのものはinterface内部には定義しない
	- 多重継承が可能
	- Javaからパクってきた概念らしい
- Trait
    - "use"で使う
	- PHPで自由に複数を継承するための機能
	- abstract classやinterfaceとは異なり、メソッドの中身を定義する
	- 多重継承が可能

