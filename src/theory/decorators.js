"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Logger(prop) {
    return function (constructor) {
        console.log(prop);
        console.log(constructor);
    };
}
function WithTemplate(template, selector, content) {
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(..._) {
                super();
                const el = document.getElementById(selector);
                el.innerHTML = template(content);
            }
        };
    };
}
const template = (word) => `<h1>Hey there, ${word}</h1>`;
let Geek = class Geek {
    constructor(phrase) {
        this.name = "Geek";
        this.says = "";
        this.says = "Geek is " + phrase;
        console.log(this.says);
    }
};
Geek = __decorate([
    Logger({ yay: "Fun" }),
    WithTemplate(template, "elGeek", "sick")
], Geek);
console.log(new Geek("meek"));
function AutoBind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        enumerable: false,
        configurable: true,
        get() {
            return originalMethod.bind(this);
        }
    };
    return adjDescriptor;
}
class Printer {
    constructor() {
        this.msg = "Hey, I work";
    }
    showMsg() {
        console.log(this.msg);
    }
}
__decorate([
    AutoBind
], Printer.prototype, "showMsg", null);
const p = new Printer();
const btn = document.querySelector("button");
btn.addEventListener("click", p.showMsg);
class Course {
    constructor(title, price) {
        this.title = title;
        this.price = +price;
    }
}
const form = document.querySelector("form");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleEl = document.getElementById("title");
    const priceEl = document.getElementById("price");
    console.log(titleEl.value, priceEl.value);
});
//# sourceMappingURL=decorators.js.map