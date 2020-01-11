"use strict";
var envi;
(function (envi) {
    envi[envi["sky"] = 0] = "sky";
    envi[envi["earth"] = 1] = "earth";
    envi[envi["water"] = 2] = "water";
})(envi || (envi = {}));
class Animal {
    constructor(type, env) {
        this.type = type;
        this.env = env;
        this.type = type;
        this.env = env;
    }
    makeSoud() {
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
const hawk = new Animal("bird", envi.sky);
const woodchuck = new Animal("rodent", envi.earth);
console.log(salmon.makeSoud(), hawk.makeSoud(), woodchuck.makeSoud());
//# sourceMappingURL=interfaces.js.map