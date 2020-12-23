# jQuery


## Loading

```html
<head>
    <!-- method A: local -->
    <script src="jquery-3.5.1.min.js"></script>

    <!-- method B: CDN -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
```

## Outer

```js
// A: jQuery must be active only after the full document is fully loaded.
$(document).ready(function(){
  // jQuery methods go here...
});

// B: Shorter notation for the method A.
$(function(){
  // jQuery methods go here...
});
```

## Selectors

```js
$(document).ready(function(){
  $("button").click(function(){
    $(this).hide(); // here refers to the button
    $("p").hide();
    $("#test").hide();
    $(".test").hide();
  });
});

```

## Events

```js
// Mouse Events
.click()
.dblclick()
.mouseenter()
.mouseleave()

// Keyboard Events
.keypress()
.keydown()
.keyup()

// Form Events
.submit()
.change()
.focus()
.blur()

// Document/Window Events
.load()
.resize()
.scroll()
.unload()

```

## Effects

```js
// params: speed, callback
$("p").hide();
$("p").hide(1000);
$("p").hide(1000, function(){alert("hello!")});
$("p").show();
$("p").toggle(); // toggle hide & show

// params: speed, callback
$("#div1").fadeIn();
$("#div1").fadeIn("slow"); // speed can be a keyword
$("#div1").fadeIn(3000);
$("#div1").fadeOut();
$("#div1").fadeToggle();
$("#panel").slideUp();
$("#panel").slideDown();
$("#panel").slideToggle();

// params: speed, opacity, callback
$("#div1").fadeTo("slow", 0.15);
$("#div2").fadeTo("slow", 0.4);
$("#div3").fadeTo("slow", 0.7);

```

## HTML

```js
// get
alert("Text: " + $("#test").text());
alert("HTML: " + $("#test").html());
alert("attr: " + $("#w3s").attr("href"));

// set
$("#test1").text("Hello world!");
$("#test2").html("<b>Hello world!</b>");
$("#test3").val("Dolly Duck");
```

## Traversing

```js
```

## Ajax

```js
// 
$("button").click(function(){
  $("#div1").load("demo_test.txt", function(responseTxt, statusTxt, xhr){
    if(statusTxt == "success")
      alert("External content loaded successfully!");
    if(statusTxt == "error")
      alert("Error: " + xhr.status + ": " + xhr.statusText);
  });
});


// GET
$("button").click(function(){
  $.get("demo_test.asp", function(data, status){
    alert("Data: " + data + "\nStatus: " + status);
  });
});

// POST
$("button").click(function(){
  $.post("demo_test_post.asp",
  {
    name: "Donald Duck",
    city: "Duckburg"
  },
  function(data, status){
    alert("Data: " + data + "\nStatus: " + status);
  });
});
```

## MISC

```js
```
