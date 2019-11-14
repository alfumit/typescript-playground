type account = {
    money: number,
    deposit: (value: number) => void
}

type self = {
    name: string,
    bankAccount: account,
    hobbies: string[]
}

let bankAccount: account = {
    money: 2000,
    deposit(value: number): void {
        this.money += value;
    }
};

let myself: self = {
    name: "Max",
    bankAccount: bankAccount,
    hobbies: ["Sports", "Cooking"]
};

myself.bankAccount.deposit(3000);

console.log(myself);