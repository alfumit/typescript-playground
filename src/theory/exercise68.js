"use strict";
// Exercise 1
class Car {
    constructor(name) {
        this.name = "Unknown";
        this.acceleration = 0;
        this.name = name;
    }
    honk() {
        console.log("Toooooooooot!");
    }
    ;
    accelerate(speed) {
        this.acceleration = this.acceleration + speed;
    }
}
const car = new Car("BMW");
car.honk();
console.log(car.acceleration);
car.accelerate(10);
console.log(car.acceleration);
console.log('=============s========');
// Exercise 2
class BaseObject {
    constructor(width, length) {
        this.width = 0;
        this.length = 0;
        this.width = width;
        this.length = length;
    }
}
class Rectangle extends BaseObject {
    constructor() {
        super(5, 2);
    }
    calcSize() {
        return this.width * this.length;
    }
    ;
}
const rect = new Rectangle();
console.log(rect.calcSize());
// Exercise 3
class Person {
    constructor() {
        this._firstName = "";
    }
    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        if (value.length > 3) {
            this._firstName = value;
        }
        else {
            this._firstName = "";
        }
    }
}
const person = new Person();
console.log(person.firstName);
person.firstName = "Ma";
console.log(person.firstName);
person.firstName = "Maximilian";
console.log(person.firstName);
//# sourceMappingURL=exercise68.js.map