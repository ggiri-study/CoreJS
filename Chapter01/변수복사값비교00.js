// 객체의 프로퍼티 변경

let a = 10;
let b = a;
let obj1 = {
	c: 10,
	d: 'ddd',
};
let obj2 = obj1;

b = 15;
obj2.c = 20;

console.log( a === b ); // false
console.log( obj1 === obj2 ) // true

console.log('a : ', a); // a :  10
console.log('b : ', b); // b :  15
console.log('obj1 : ', obj1); // obj1 :  { c: 20, d: 'ddd' }
console.log('obj2 : ', obj2); // obj2 :  { c: 20, d: 'ddd' }
