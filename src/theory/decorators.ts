function Logger(prop: object) {
    return function(constructor: Function) {
        console.log(prop)
        console.log(constructor)
    }
}

function WithTemplate (template: Function, selector: string, content: string) {
    return function<T extends { new(...args: any[]): {name: string, says: string} }>(originalConstructor: T) {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                const el = document.getElementById(selector);
                el!.innerHTML = template(content);
            }
        }
    };
}

const template = (word: string): string => `<h1>Hey there, ${word}</h1>`;
@Logger({yay: "Fun"})
@WithTemplate(template, "elGeek", "sick")
class Geek {
    name = "Geek";
    says = "";

    constructor(phrase: string) {
        this.says = "Geek is " + phrase;
        console.log(this.says);
    }
}

console.log(new Geek("meek"));

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        enumerable: false,
        configurable: true,
        get() {
            return originalMethod.bind(this);

        }
    };
    return adjDescriptor;
}

class Printer {
    public msg = "Hey, I work";

    @AutoBind
    showMsg() {
        console.log(this.msg);
    }
}

const p = new Printer();
const btn = document.querySelector("button")!;
btn.addEventListener("click", p.showMsg);


class Course {
    title: string;
    price: number;

    constructor(title: string, price: number) {
        this.title = title;
        this.price = +price;
    }
}

const form = document.querySelector("form")!;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleEl = document.getElementById("title")! as HTMLInputElement;
    const priceEl = document.getElementById("price")! as HTMLInputElement;
    console.log(titleEl.value, priceEl.value)
});
