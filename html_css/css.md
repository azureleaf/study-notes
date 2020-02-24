### 特定の属性値を持つ要素を特定（値の内容も特定）

```css
a[href="index.html"] {
  color: red;
}
```

```html
<a href="index.html">ここは赤色になる</a>
<a href="faq.html">これは赤色にならない</a>
```

### 特定の属性値を持つ要素を特定（値の内容は問わない）

```css
div[id] {
  color: red;
}
```

```html
<div id="main">赤色になる</div>
<div id="history">赤色になる</div>
<div>ここはID attributeがないのでそのまま</div>
```
