abstract class Dept {
    private static _id: number = 0;

    static assignId(): number {
        this._id++;
        return this._id;
    }
}

class Department extends Dept {
    private _id: number;
    protected _employees: string[] = ["M.Dillon","J.Morris","T.Hubbard"];
    constructor(private _name: string) {
        super();
        this._id = Dept.assignId();
        this._name = name;
    }

    get name(): string {
        return this._name
    }

    set name(value: string) {
        this._name = value;
    }

    get employees(): string[] {
        return this._employees;
    }

    listEm(type: string) {
        // @ts-ignore
        return this[type].reduce((html, name) => html + `<td>${name}</td>`, "");
    }

    addEmployee(name: string) {
        this._employees.push(name);
    }
}
class ITDepartment extends Department {
    constructor(public admins: string[]) {
        super("IT");
        this.admins = admins;
    }

    addEmployee(name: string) {
        this.admins.push(`Admin ${name}`);
    }
}
class Accounting extends Department {
    private static _instance: Accounting;

    private constructor(public reports: string[]) {
        super( "Accounting")
    }

    static getAccounting(reports: string[]) {
        if(Accounting._instance) {
            return this._instance;
        } else {
            this._instance = new Accounting(reports);
            return this._instance;
        }
    }

    addEmployee(name: string) {
        this._employees.push(`Boring ${name}`);
    }
}

let dept = new Department('RnD');
let it = new ITDepartment(["Zu","Gru","Gol"]);
let acc = Accounting.getAccounting(["Boredom"]);

dept.name = "Sorry, you were moved";

const article = document.querySelector("article");
const switchButton = document.querySelector("#switch");
const addButton = document.querySelector("#add");
const tHead = document.querySelector("#tabH")!;
const tRow = document.querySelector("tr")!;



if(switchButton) {
    switchButton.addEventListener('click', (ev) => {
        if(article instanceof HTMLElement) {
            console.log('IT', it);
            console.log('Dept', dept);
            console.log('Accounting', acc);

            let bg = article.style.background;
            if (bg === "red") {
                article.style.background = "blue";
                article.style.color = "white";
                tHead.innerHTML = "RnD";
                tRow.innerHTML = dept.listEm("_employees");
            } else if(bg == "blue") {
                article.style.background = "yellow";
                article.style.color = "black";
                tHead.innerHTML = "IT";
                tRow.innerHTML = it.listEm("admins");
            } else {
                article.style.background = "red";
                article.style.color = "black";
                tHead.innerHTML = "Accounting";
                tRow.innerHTML = acc.listEm("employees");
            }
        }
    })
}

if(addButton) {
    addButton.addEventListener('click', () => {
        if(article instanceof HTMLElement) {
            const bg = article.style.background;
            const input = document.querySelector("input")!;
            if (bg === "red") {
                acc.addEmployee(input.value);
                tRow.innerHTML = acc.listEm("_employees");
            } else if(bg == "blue") {
                dept.addEmployee(input.value);
                tRow.innerHTML = dept.listEm("_employees");
            } else {
                it.addEmployee(input.value);
                tRow.innerHTML = it.listEm("admins");
            }
        }
    })
}


