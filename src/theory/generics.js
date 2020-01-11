"use strict";
function merge(a, b) {
    return Object.assign(a, b);
}
const title = merge({ name: 'Geralt' }, { location: 'Rivia' });
console.log(title);
function countAndDescribe(element) {
    if (!element.length) {
        console.log("Has no value");
    }
    else if (element.length === 1) {
        console.log("Has 1 value");
    }
    else {
        console.log(`Has ${element.length} values`);
    }
}
countAndDescribe(["Nice", "Array has length"]);
function extract(obj, key) {
    return obj[key];
}
extract({ argvaar: "arg and var, from Javascriptian planet" }, "argvaar");
//# sourceMappingURL=generics.js.map