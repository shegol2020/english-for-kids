function BaseClass(value) {
    this.value = value;
}

BaseClass.prototype.plus = function (...args) {
    for (const arg of args) {
        this.value += arg;
    }
    return this.value
};


class IntBuilder extends BaseClass{
    constructor(props) {
        super(props);
    }
}

let int1 = new IntBuilder(10);
console.log(int1.plus(2, 3));


//

function StringBuilder(str) {
    BaseClass.call(this, str);
}

StringBuilder.prototype = Object.create(BaseClass.prototype);

let str1 = new StringBuilder("hi");
console.log(str1.plus(" ", "hello"));