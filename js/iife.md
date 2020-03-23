# Instantly Invoked Function Expression

- いわゆる即時関数
- Often used inside `<script>` tag in the HTML

## Sample

```js
// simple
(function() {
  console.log("hello, world!");
})();

// w/ args
(function(param1, param2) {
  console.log("Sum:", param1 + param2);
})(1, 2);

// w/ return value
var result = (function(param1, param2) {
  return param1 + param2;
})(1, 2);
console.log(result);

// arrow function can be used as well
console.log(
  ((param1, param2) => {
    return param1 + param2;
  })(1, 2)
);
```

## Advantage of IIFE

- **Avoid namespace pollution**
    - You can wrap all the temporary variables inside IIFE
    - Doing this, you can limit the scope of the variable inside the IIFE
- Shorter code, better readability

## Cases you need IIFE

- The functions which need to be called only once should be IIFE:
  - Function for Page Initialization
  - Function to detect environment (development or production, IE or Chrome, etc.)
- Functions with private properties should be IIFE:

```js
var counter = (function () {
        var count = 0; // I want to prevent direct access from outside
        return {
            increment: function () {
                count += 1;
                console.log(count);
            }
        };
    }());

counter.increment(); // 1
counter.increment(); // 2

console.log(counter.count); // undefined
```
