# Class & Object

## Basics

```js
class Animal {
  constructor(type) {
    this.type = type;
  }
  static isAnimal(obj, type) {
    if (!Animal.prototype.isPrototypeOf(obj)) {
      return false;
    }
    return type ? obj.type === type : true;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super("dog"); // 親要素のコンストラクタ
    this.name = name;
    this.breed = breed;
  }
  bark() {
    console.log("ruff, ruff");
  }
  print() {
    console.log("The dog " + this.name + " is a " + this.breed);
  }
  static isDog(obj) {
    return Animal.isAnimal(obj, "dog"); // このメソッドにはstaticをつけたのでここで使用できる
  }
}

// 実際にオブジェクトをインスタンス化する
var sparkie = new Dog("Sparkie", "Border Collie");

```

## Getter & Setter

- object 内部であっても、getter, setter はコロン(：)を使わずに書く

```js
person = {
  name: "John",
  get greet() {
    return "Hello, I'm " + this.name;
  },
  set greet(newName) {
    this.name = newName;
  }
};

console.log(person.greet); // Hello, I'm John 値が参照されている、つまりgetされているのでgetterが作動
person.greet = "Mike"; // 値が代入されているのでsetterが作動
console.log(person.greet); // Hello, I'm Mike
```
