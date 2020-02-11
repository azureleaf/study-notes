# Property

## Major Properties

### data:

    - 基本的な変数はここに書く
    - Vue インスタンスの場合は、変数を直接オブジェクトリテラルで書く
    - Vue Component の場合は、「オブジェクトリテラルを return する関数」

### computed:

- getter として働くのが基本だが、自分で定義すれば setter としても働く
  - つまり`a = compVal`のように値を取り出すだけではなく、`compVal = 12`のように値を代入することもできるということ

### methods:

### props:

### watch:

- data:はもともと監視されているので、watch する必要はない（？）

### components:

- 別の場所で定義されたコンポーネントを利用するときに記述する

## Method Notation

- Normal
    ```javascript
    hello: function() {console.log("hello");}```
    ```

- Abbreviated: 初見は混乱する
    ```javascript
    hello() {console.log("hello");}```
    ```

- **ダメなやり方**: アロー関数だと関数定義内部に書いたthisが正しく認識されなくなるらしい
    ```javascript
    hello: () => {console.log("hello");}```
    ```

    - こういうのもダメらしい
        ```javascript
        vm.$watch('a', newValue => this.myMethod())
        ```

## Major Lifecycle Hooks

### created
### mounted
### updated
### destroyed
### beforecreated
### beforemounted
### beforeupdated
### beforedestroyed