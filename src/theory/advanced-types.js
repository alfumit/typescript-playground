"use strict";
const lena = {
    name: 'Analysis',
    nickname: "champion",
    privileges: ['create-task'],
    startDate: new Date(),
    hair: 'long',
    nails: ['red', 'green', 'blue'],
    bonus: 1
};
const Jan = {
    name: 'PubMaster',
    nickname: "champion",
    privileges: ['pour-content-in'],
    startDate: new Date(),
    bellySize: 3,
    bonus: 1000
};
const woodEater = {
    name: 'donkey',
    nickname: 'parasite',
    privileges: ['blab-around'],
    startDate: new Date(),
    endDate: new Date(),
    bellySize: 10,
    ladies: [lena, lena]
};
function printEm(emp) {
    var _a;
    if ('nails' in emp)
        console.log("Nice!");
    if ('bellySize' in emp) {
        console.log(`Perform ${emp.bellySize} situps`);
    }
    if ('ladies' in emp) {
        console.log((_a = emp.ladies) === null || _a === void 0 ? void 0 : _a.length);
        (emp.ladies && emp.ladies.length > 1) ?
            console.log("Everyone's invited")
            : console.log('True love');
    }
    if ('nickname' in emp) {
        switch (emp.nickname) {
            case "parasite":
                console.log("Fire!");
                break;
            case "champion":
                console.log("Give bonus!");
                break;
        }
    }
}
printEm(lena);
printEm(Jan);
printEm(woodEater);
const galoshi = {
    color: 'red',
    weight: 'light',
    season: 'Summertime sadness'
};
// function add(a: number, b: number): number
function add(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
const combination = add('Xtr', 'XX');
//# sourceMappingURL=advanced-types.js.map