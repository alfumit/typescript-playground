class Department {
    protected _employees: string[] = ["M.Dildon","J.Sorris","T.Shubbard"];
    constructor(private _name: string, private readonly id: number) {
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
    constructor(id: number, public admins: string[]) {
        super("IT", id);
        this.admins = admins;
    }

    addEmployee(name: string) {
        this.admins.push(`Admin ${name}`);
    }
}

class Accounting extends Department {
    constructor(id: number, public reports: string[]) {
        super( "Accounting", id)
    }

    addEmployee(name: string) {
        this._employees.push(`Boring ${name}`);
    }
}

let dept = new Department('RnD', 0);
let it = new ITDepartment(1, ["Longnose","Zitface","Greasyhairs","Greenskins"]);
let acc = new Accounting(1, ["Boredom"]);

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

            let bg = article.style.background;
            if (bg === "red") {
                article.style.background = "blue";
                tHead.innerHTML = "RnD";
                tRow.innerHTML = dept.listEm("_employees");
            } else if(bg == "blue") {
                article.style.background = "yellow";
                tHead.innerHTML = "IT";
                tRow.innerHTML = it.listEm("admins");
            } else {
                article.style.background = "red";
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


