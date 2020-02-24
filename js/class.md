# Class & Object

## 継承


## Getter & Setter

- object内部であっても、getter, setterはコロン(：)を使わずに書く

```js
person = {
    name: "John",
    get greet(){return "Hello, I'm " + this.name},
    set greet(newName){this.name = newName}
}

console.log(person.greet); // Hello, I'm John 値が参照されている、つまりgetされているのでgetterが作動
person.greet = "Mike"; // 値が代入されているのでsetterが作動
console.log(person.greet); // Hello, I'm Mike

```