// 중첩된 객체에 대한 얕은 복사

let copyObject = (target) => {
	let result = {};
	for (let prop in target) {
		result[prop] = target[prop];
	}
	return result;
}

let user = {
	name: 'ggiri',
	urls: {
		portfolio: 'http://github.com/ggiri',
		blog: 'http://blog.com',
	},
};

let user2 = copyObject(user);
user2.urls.blog = 'http://blog.com/onion';
console.log(user.urls.blog === user2.urls.blog); // true
console.log('user.urls.blog : ', user.urls.blog); // user.urls.blog :  http://blog.com/onion
console.log('user2.urls.blog : ', user2.urls.blog); // user2.urls.blog :  http://blog.com/onion
