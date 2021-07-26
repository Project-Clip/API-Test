var test = require('./Video.js');

// var object = test.AngryDoyoon();
// console.log('제목 : ' + object.title);
test.AngryDoyoon(function (response) {
	console.log('결과 : ' + response.snippet.title);
});
// console.log(test());
