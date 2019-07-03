var test = function (name) {

    this.name = name;

    this.sayHello = () => {
        return 'hello' + this.name;
    }

    this.sayGoodBye = () => {
        return 'goodbye' + this.name;
    }
}
test.prototype.nihao = '123456';
test.prototype.hehe = (name) => {
    console.log('hehe' + name);
}

module.exports = test;

console.log(module.exports);

console.log(exports);
