# Directives

## ToC

1. [List](#list)
1. [Clarification](#clear)
1. [Event](#event)
1. [](#)

## List <a name="list" id=""></a>

- `v-bind` \*
- `v-cloak`
- `v-for` \*
  - `v-bind:key` required
- `v-html`
- `v-if` / `v-else` / `v-else-if` \*
- `v-model` \*
- `v-on` \*
  - @click, @submit, @keyup
- `v-once`
- `v-pre`
- `v-show` \*
- `v-slot`
- `v-text`

## Clarification <a name="clear" id="clear"></a>

### v-bind VS v-model

- v-bind は一方向、v-model は双方向
  - This is why v-model often appears inside `<input>`
- `v-model` = `v-on` + `v-bind`

```html
<input v-model="searchText" />
<input :value="searchText" @change="searchText = $event.target.value" />
```

- v-bind で model から view へのデータの流れを定義
- v-on で、view 側で値が変更された時に model 側の値も書き換えるようイベントを結合

### v-if VS v-show

## Event <a name="event" id="event"></a>

### Event List

- `click`
- ``
- ``
- ``
- ``

### Event Modifier

```html
<!-- Modifier can be chained -->
<button @click.stop.prevent="doThis"></button>
```

- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`
- `.passive`
- `.{keyCode | keyAlias}`
- `.native`

### Key Modifier

- `.enter`
- `.tab`
- `.delete (captures both “Delete” and “Backspace” keys)`
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`
- `.ctrl`
- `.alt`
- `.shift`
- `.meta`
- `.exact`
- `.left`
- `.right`
- `.middle`
- ~~Key Codes~~ (deprecated)
