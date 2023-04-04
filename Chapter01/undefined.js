let a;
console.log(a); // undefined

let obj = { a : 1 };
console.log(obj.a); // 1
console.log(obj.b); // undefined
// console.log(b); // ReferenceError: b is not defined

let func = function() {};
let c = func();
console.log(c); // undefined

let arr1 = [];
arr1.length = 3;
console.log(arr1); // [ <3 empty items> ] (node 실행 결과)

let arr2 = new Array(3);
console.log(arr2); // [ <3 empty items> ] (node 실행 결과)

let arr3 = [undefined, undefined, undefined];
console.log(arr3); // [ undefined, undefined, undefined ]