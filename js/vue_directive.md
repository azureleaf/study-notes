# 重要な Directive（重要度順）

1. v-bind
1. v-on
1. v-for
   - `v-bind:key`が必須！
1. v-model
1. v-if
1. v-show
1. v-html:

## 紛らわしい directive の比較

### v-bind VS v-model

- v-bind は一方向、v-model は双方向
- したがって、v-modelは`<input>`の属性などとしてよく出現する

- v-model は、v-on + v-bind を一気に書いたものである
  - 以下の２つは同義
  ```html
  <input v-model="searchText" />
  <input :value="searchText" @change="searchText = $event.target.value" />
  ```
  - v-bind で model から view へのデータの流れを定義
  - v-on で、view 側で値が変更された時に model 側の値も書き換えるようイベントを結合

### v-if VS v-show


### data: vs props:


### methods: vs computed: