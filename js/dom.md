# Manipulate DOM with JavaScript

## ToC

## DOM Tree

1. Document
1. Root Element
1. Elements (Elements are nested)
1. Attributes
1. Text

## Get from DOM

```js
var myElement = document.getElementById("intro");

var x = document.getElementById("main");
var y = x.getElementsByTagName("p");

var x = document.getElementsByClassName("intro");

var x = document.querySelectorAll("p.intro");
```

## Get from DOM:

- `importNode()`
- `cloneNode()`


```

## Modify DOM

```js
document.write(Date());
document.getElementById("myImage").src = "landscape.jpg";
document.getElementById("demo").innerHTML = "Hello World!";
```

```js
var x = document.forms["frm1"];
var text = "";
var i;
for (i = 0; i < x.length; i++) {
  text += x.elements[i].value + "<br>";
}
document.getElementById("demo").innerHTML = text;
document.getElementById("p2").style.color = "blue";
```

## Modify DOM: using `<template>`

```html
<template>
  <div class="myClass">I like:</div>
</template>

<script>
  var myArr = ["Audi", "BMW", "Ford"];

  function showContent() {
    var temp, item, a, i;
    temp = document.getElementsByTagName("template")[0];
    item = temp.content.querySelector("div");
    for (i = 0; i < myArr.length; i++) {
      // Create a new node, based on the template:
      a = document.importNode(item, true);
      // Add data from the array:
      a.textContent += myArr[i];
      // Append the new node wherever you like:
      document.body.appendChild(a);
    }
  }
</script>
```

- 上記により以下がレンダリングされる

```html
<div class="myClass">I like: Audi</div>
<div class="myClass">I like: BMW</div>
<div class="myClass">I like: Ford</div>
```

### Use "this" to refer to self

```html
<h1 onclick="this.innerHTML = 'Ooops!'"></h1>
```

```html
<h2 onclick="changeText(this)">Click on this text!</h2>
<script>
  function changeText(id) {
    id.innerHTML = "Ooops!";
  }
</script>
```

## Event

### Events by browser

- `ended`
  - When the audio or video are stopped
- `error`
- `DOMContentLoaded`
  - When the page loading is completed

### Listen to the event by writing to HTML tag directly

```html
<script>
  document.getElementById("myBtn").onclick = displayDate;
</script>

<input type="text" id="fname" onchange="upperCase()" />

<body onload="checkCookies()"></body>

<h1 onmouseover="style.color='red'" onmouseout="style.color='black'">
  Mouse over this text
</h1>
<div onmouseover="mOver(this)" onmouseout="mOut(this)">Mouse Over Me</div>

<div onmousedown="mDown(this)" onmouseup="mUp(this)">Click Me</div>

<input type="text" onfocus="myFunction(this)" />
```

### Listen to the event with event listener

- Note that some keywords are changed: use `click` instead of `onclick` here

```js
document.getElementById("myBtn").addEventListener("click", displayDate);
```

### `preventDefault()`

- What are the important default behaviors?
  - When you click on the checkbox
    - Value inverted and "checked" symbol will appear
  - `touchmove` event
    - Scroll
  - Click on `<a>` event
    - redirect to new page
  - Click on `<input type="submite">` button
    -
