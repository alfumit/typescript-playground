"use strict";
class Dept {
    static assignId() {
        this._id++;
        return this._id;
    }
}
Dept._id = 0;
class Department extends Dept {
    constructor(_name) {
        super();
        this._name = _name;
        this._employees = ["M.Dillon", "J.Morris", "T.Hubbard"];
        this._id = Dept.assignId();
        this._name = name;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get employees() {
        return this._employees;
    }
    listEm(type) {
        // @ts-ignore
        return this[type].reduce((html, name) => html + `<td>${name}</td>`, "");
    }
    addEmployee(name) {
        this._employees.push(name);
    }
}
class ITDepartment extends Department {
    constructor(admins) {
        super("IT");
        this.admins = admins;
        this.admins = admins;
    }
    addEmployee(name) {
        this.admins.push(`Admin ${name}`);
    }
}
class Accounting extends Department {
    constructor(reports) {
        super("Accounting");
        this.reports = reports;
    }
    static getAccounting(reports) {
        if (Accounting._instance) {
            return this._instance;
        }
        else {
            this._instance = new Accounting(reports);
            return this._instance;
        }
    }
    addEmployee(name) {
        this._employees.push(`Boring ${name}`);
    }
}
let dept = new Department('RnD');
let it = new ITDepartment(["Zu", "Gru", "Gol"]);
let acc = Accounting.getAccounting(["Boredom"]);
dept.name = "Sorry, you were moved";
const article = document.querySelector("article");
const switchButton = document.querySelector("#switch");
const addButton = document.querySelector("#add");
const tHead = document.querySelector("#tabH");
const tRow = document.querySelector("tr");
if (switchButton) {
    switchButton.addEventListener('click', (ev) => {
        if (article instanceof HTMLElement) {
            console.log('IT', it);
            console.log('Dept', dept);
            console.log('Accounting', acc);
            let bg = article.style.background;
            if (bg === "red") {
                article.style.background = "blue";
                article.style.color = "white";
                tHead.innerHTML = "RnD";
                tRow.innerHTML = dept.listEm("_employees");
            }
            else if (bg == "blue") {
                article.style.background = "yellow";
                article.style.color = "black";
                tHead.innerHTML = "IT";
                tRow.innerHTML = it.listEm("admins");
            }
            else {
                article.style.background = "red";
                article.style.color = "black";
                tHead.innerHTML = "Accounting";
                tRow.innerHTML = acc.listEm("employees");
            }
        }
    });
}
if (addButton) {
    addButton.addEventListener('click', () => {
        if (article instanceof HTMLElement) {
            const bg = article.style.background;
            const input = document.querySelector("input");
            if (bg === "red") {
                acc.addEmployee(input.value);
                tRow.innerHTML = acc.listEm("_employees");
            }
            else if (bg == "blue") {
                dept.addEmployee(input.value);
                tRow.innerHTML = dept.listEm("_employees");
            }
            else {
                it.addEmployee(input.value);
                tRow.innerHTML = it.listEm("admins");
            }
        }
    });
}
//# sourceMappingURL=classes.js.map