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

## Modify DOM

```js

document.write(Date());
document.getElementById("myImage").src = "landscape.jpg";
document.getElementById("demo").innerHTML = "Hello World!";

var x = document.forms["frm1"];
var text = "";
var i;
for (i = 0; i < x.length; i++) {
  text += x.elements[i].value + "<br>";
}
document.getElementById("demo").innerHTML = text;

document.getElementById("p2").style.color = "blue";



```

### Use "this" to refer to self

```html
<h1 onclick="this.innerHTML = 'Ooops!'">

<h1 onclick="changeText(this)">Click on this text!</h1>
<script>
function changeText(id) {
  id.innerHTML = "Ooops!";
}
</script>
```

## Event

```html
<script>document.getElementById("myBtn").onclick = displayDate;</script>

<input type="text" id="fname" onchange="upperCase()">

<body onload="checkCookies()">


```