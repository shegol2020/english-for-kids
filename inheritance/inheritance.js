function BaseClass(value) {
    this.value = value;
}

BaseClass.prototype.plus = function (...args) {
    for (const arg of args) {
        this.value += arg;
    }
    return this
};

BaseClass.prototype.get = function () {
    return this.value
};

//Empty method
BaseClass.prototype.minus = function (...n) {
};

//ES6
class IntBuilder extends BaseClass{
    constructor(props) {
        super(props);
    }
    minus(...args) {
        for (const arg of args) {
            this.value-= arg;
        }
        return this
    }
    multiply(n){
        this.value *= n;
        return this
    }
    divide(n){
        this.value = Math.trunc(this.value / n);
        return this
    }
    mod(n){
        this.value %= n;
        return this
    }
    static random(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from)
    }
}

let int1 = new IntBuilder(10);
console.log(`Int1 result: ${int1.plus(2, 3) //15
    .minus(2, 2) //11
    .multiply(2) //22
    .divide(1) //22
    .mod(10) //2
    .get()}`);

console.log(`Random number from 10 to 100: ${IntBuilder.random(10, 100)}`);

//ES5
function StringBuilder(str) {
    BaseClass.call(this, str);
}

StringBuilder.prototype = Object.create(BaseClass.prototype);

StringBuilder.prototype.minus = function (n) {
    this.value = this.value.slice(0, -n);
    return this
};

StringBuilder.prototype.multiply = function (n) {
    this.value = this.value.repeat(n);
    return this
};

StringBuilder.prototype.divide = function (n) {
    this.value = this.value.slice(0, Math.floor(this.value.length / n));
    return this
};

StringBuilder.prototype.remove = function (n) {
    this.value = this.value.split("")
        .filter((item) => item !== n)
        .join("");
    return this
};

StringBuilder.prototype.sub = function (from, n) {
    this.value = this.value.substr(from, n);
    return this
};


let str1 = new StringBuilder("Hello");
console.log(`Str1 result: ${str1
    .plus(' all', '!')                    // 'Hello all!'
    .minus(4)                                  // 'Hello '
    .multiply(3)                               // 'Hello Hello Hello '
    .divide(4)                                 // 'Hell';
    .remove('l')                               // 'He';
    .sub(1,1)                                  // 'e';
    .get()}`                                   // -> 'e';
);



