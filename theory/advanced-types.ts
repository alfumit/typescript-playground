interface Employee {
    name: string,
    privileges: string[] | string,
    startDate: Date
}

interface Lady {
    hair: string,
    nails: string[]
    name: string
}

interface Gentleman {
    name: string,
    bellySize: number,
    ladies?: Lady[]
}

interface useless {
    nickname: 'parasite'
    endDate: Date
}

interface useful {
    nickname: 'champion'
    bonus: number
}

const lena: (Employee & Lady) & useful = {
    name: 'Analysis',
    nickname: "champion",
    privileges: ['create-task'],
    startDate: new Date(),
    hair: 'long',
    nails: ['red', 'green', 'blue'],
    bonus: 1
};

const Jan: (Employee | Gentleman) & useful = {
    name: 'PubMaster',
    nickname: "champion",
    privileges: ['pour-content-in'],
    startDate: new Date(),
    bellySize: 3,
    bonus: 1000
};

const woodEater: (Employee | Gentleman) & useless= {
    name: 'donkey',
    nickname: 'parasite',
    privileges: ['blab-around'],
    startDate: new Date(),
    endDate: new Date(),
    bellySize: 10,
    ladies: [lena, lena]
};

type unknownEee = Employee | Lady | Gentleman | useless | useful;

function printEm(emp: unknownEee): void {
    if('nails' in emp) console.log("Nice!");
    if('bellySize' in emp) {
        console.log(`Perform ${emp.bellySize} situps`)
    }
    if('ladies' in emp) {
        console.log(emp.ladies?.length);
        (emp.ladies && emp.ladies.length > 1) ?
            console.log("Everyone's invited")
            : console.log('True love')
    }

    if('nickname' in emp) {
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

interface Rubber {
    [prop: string]: string
}

const galoshi: Rubber = {
    color: 'red',
    weight: 'light',
    season: 'Summertime sadness'
};

type Combinable = string | number;

// function add(a: number, b: number): number
function add(a: Combinable, b: Combinable) {
    if(typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }

    return a + b;
}

const combination  = add('Xtr', 'XX');
