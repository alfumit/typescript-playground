enum envi {
    sky,
    earth,
    water
}

interface MakesSound {
    readonly type: string,
    env: envi,
    makeSoud(): string,
}

class Animal implements MakesSound {

    constructor(public type: string, public env: envi) {
        this.type = type;
        this.env = env;
    }

    makeSoud(): string {
        switch (this.env) {
            case envi.sky:
                return "Screech";
            case envi.earth:
                return "Cry";
            case envi.water:
                return "Blop-blop-blop";
        }
        return "";
    }
}

const salmon = new Animal("fish", envi.water);
const hawk = new Animal("bird",envi.sky);
const woodchuck = new Animal("rodent",envi.earth);

console.log(salmon.makeSoud(), hawk.makeSoud(), woodchuck.makeSoud())
