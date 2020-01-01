function merge<T extends object, U extends object>(a: T, b : U) {
    return Object.assign(a, b);
}

const title = merge({name: 'Geralt'}, {location: 'Rivia'});
console.log(title);

interface HasLength {
    length: number
}
function countAndDescribe<T extends HasLength>(element: T) {
    if (!element.length) {console.log("Has no value") }
    else if (element.length  === 1) { console.log("Has 1 value") }
    else { console.log(`Has ${element.length} values`)}
}

countAndDescribe(["Nice", "Array has length"]);

function extract<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key]
}

extract({argvaar: "arg and var, from Javascriptian planet"}, "argvaar")
