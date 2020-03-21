# Property

## Data Options

- `data` *
    - for Vue instance: obj
    - for Vue component: function which returns obj
- `props` *
- `propsData`
- `computed` *
- `methods` *
- `watch` *

## DOM Options`
- `el`
- `template`
- `render`
- `renderError`

## Lifecycle Hook Options`

- `beforeCreate`
- `created` *
- `beforeMount`
- `mounted` *
- `beforeUpdate`
- `activated`
- `deactivated`
- `beforeDestroy`
- `destroyed` *
- `errorCaptured`

## Other Options

- `directives`
- `filters`
- `components` *
- `parent`
- `mixins` *
- `extends`
- `provide` / `inject`
- `name`
- `delimiters`
- `functional`
- `model`
- `inheritAttrs`
- `comments`

## Confusion

### data: vs props:

### methods: vs computed: vs watched:

- computed:は依存する変数が変更されない限りキャッシュから値を返す
- methods:は常に再計算する
- computed 内部から data:の変数などを書き換えてはいけない！（Unexpected side effect のエラーなどが返る）


### computed:

- getter として働くのが基本だが、自分で定義すれば setter としても働く
  - つまり`a = compVal`のように値を取り出すだけではなく、`compVal = 12`のように値を代入することもできるということ


### watch:

- data:はもともと監視されているので、watch する必要はない（？）


## Abbreviated Notation for Methods

```javascript
hello: function() {console.log("hello");}
hello() {console.log("hello");}
```

## Anti-pattern

- Don't use arrow function as the property
    - Or `this` inside the function won't be recognized correctly

```javascript
// NG
hello: () => {console.log("hello");}

// NG
vm.$watch('a', newValue => this.myMethod())
```
