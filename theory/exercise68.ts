// Exercise 1
class Car {
    name: string = "Unknown";
    acceleration: number = 0;

    constructor(name: string) {
        this.name = name;
    }

    honk(): void {
        console.log("Toooooooooot!");
    };

    accelerate(speed: number): void {
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
abstract class BaseObject {
    width: number = 0;
    length: number = 0;

    protected constructor (width: number, length: number) {
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
    };
}
const rect = new Rectangle();
console.log(rect.calcSize());

// Exercise 3

class Person {
    private _firstName: string = "";

    get firstName() {
        return this._firstName;
    }

    set firstName(value: string) {
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
