# What's prototype?

- In the basic JS files, you can't add new property / methods without constructor
- With `prototype` keyword, you can add them

```js
function Person(first, last, age, eyecolor) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eyecolor;
}

// Person.city = "London"; // error, because it's prohibited

Person.prototype.nationality = "English";
Person.prototype.name = function() {
  return this.firstName + " " + this.lastName;
};
```