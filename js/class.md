# Class & Object

## Basics

```js
class Person {
  constructor(name, height, weight) {
    this.name = name;
    this.height = height;
    this.weight = weight;
  }

  getBMI() {
    return this.weight / (this.height * this.height);
  }

  greet() {
    console.log("私は" + this.name + "です。BMIは" + this.getBMI() + "です");
  }
}

var suzuki = new Person("suzuki", 0.172, 65);
suzuki.greet();

var yoshida = new Person("yoshida", 0.18, 60);
yoshida.greet();
```

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

## Class vs Object vs Function

- まあ結局全てオブジェクトだが
- 他のプログラミング言語と比較すると、関数や object literal までクラスのように振る舞うのは違和感しかない

```js
function Person(name, country) {
  this.name = name;
  this.country = country;
  this.greet = function() {
    return "I'm " + this.name + ", I'm from " + this.country + "!";
  };
}

person1 = new Person("John", "USA");
person1.greet(); // "I'm John, I'm from USA!"
```

### Object Constructor with `function`

```js
function Person(name, country) {
  this.name = name;
  this.country = country;
  this.greet = function() {
    return "I'm " + this.name + ", I'm from " + this.country + "!";
  };
}

// "new" to "function" looks really weird
person1 = new Person("John", "USA");
person1.greet(); // "I'm John, I'm from USA!"
```

## Class

- すんなり理解できる構文

```js

class Person {
  constructor(name, country){
  this.name = name;
  this.country = country;
  }
  
  // thisはつけない
  greet() {
    return "I'm " + this.name + ", I'm from " + this.country + "!";
  };
}

person2 = new Person("John", "USA");
person2.greet(); // "I'm John, I'm from USA!"
```
