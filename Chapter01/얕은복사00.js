// 중첩되지 않은 객체에 대한 얕은 복사

let copyObject = (target) => {
	let result = {};
	for (let prop in target) {
		result[prop] = target[prop];
	}
	return result;
}

let user = {
	name: 'ggiri',
	num: 7,
};
let user2 = copyObject(user);
user2.name = 'onion';

console.log(user.name === user2.name); // false
console.log('user.name : ', user.name); // user.name :  ggiri
console.log('user2.name : ', user2.name); // user2.name : onion
