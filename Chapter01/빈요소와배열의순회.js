// 주석으로 된 결과는 node로 실행했을 때의 결과물입니다 (환경에 따라서 차이가 날 수 있음)

let arr1 = [undefined, 1];
let arr2 = [];
arr2[1] = 1;

console.log(arr2); // [ <1 empty item>, 1 ]

arr1.forEach((v, i) => { console.log(v, i); }); // undefined 0 / 1 1
arr2.forEach((v, i) => { console.log(v, i); }); // 1 1

console.log(arr1.map((v, i) => v + i)); // [ NaN, 2 ]
console.log(arr2.map((v, i) => v + i)); // [ <1 empty item>, 2 ]

console.log(arr1.filter((v) => !v )) // [ undefined ]
console.log(arr2.filter((v) => !v )) // []

console.log(arr1.reduce((p, c, i) => { return (p + c + i) }, '')); // undefined011
console.log(arr2.reduce((p, c, i) => { return (p + c + i) }, '')); // 11
