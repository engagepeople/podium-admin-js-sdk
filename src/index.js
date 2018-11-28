"use strict";
exports.__esModule = true;
function sayHi() {
    console.log('hi');
}
exports.sayHi = sayHi;
function addNumbers(a, b) {
    return a + b;
}
exports.addNumbers = addNumbers;
//
// export function addValues<T> (a: T, b: T): T {
//     switch (true) {
//         case typeof a === 'boolean':
//         break
//         case typeof a === 'string':
//         case typeof a === 'number':
//             return a + b
//         break;
//         case typeof a === 'object':
//             if (Array.isArray(a)) {
//                 return [...a, ...b]
//             } else {
//                 return {...a, ...b}
//             }
//         break;
//     }
//     return a
// }
