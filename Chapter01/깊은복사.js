let copyObjectDeep = (target) => {
	let result = {};
	if (typeof target === 'object' && target !== null) {
		for (let prop in target) {
			result[prop] = copyObjectDeep(target[prop]);
		}
	} else {
		result = target;
	}
	return result;
}


let user = {
	name: 'ggiri',
	urls: {
		portfolio: 'http://github.com/ggiri',
		blog: ['http://blog.com', 'http://tistory.com'],
	},
};
let user2 = copyObjectDeep(user);
user2.name = 'onion';
user2.urls.blog[1] = 'http://velog.io';

console.log(user.name === user2.name); // false
console.log('user.name : ', user.name); // user.name : ggiri
console.log('user2.name : ', user2.name); // user2.name : onion
console.log(user.urls.blog === user2.urls.blog); // false
console.log('user.urls.blog[1] : ', user.urls.blog[1]); // user.urls.blog[1] :  http://tistory.com
console.log('user2.urls.blog[1] : ', user2.urls.blog[1]); // user2.urls.blog[1] :  http://velog.io
