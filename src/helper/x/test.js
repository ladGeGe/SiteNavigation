var a = require('./mrequire');

var c = require('./nrequire');

console.log(a.a);
var tt = new c('ypf');

console.log(tt.sayHello());

console.log(tt.sayGoodBye());

console.log(tt.nihao);
tt.hehe('fei');

console.log(module.exports == exports);
