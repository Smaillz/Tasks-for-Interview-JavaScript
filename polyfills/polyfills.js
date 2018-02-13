//Написанные методы можно добавить к базовым обектам JS через prototype (Function.prototype.myPolyfill...)

/**
 * polyfill Object.create()
 */
function create(proto) {
    function F() {};
    F.prototype = proto;

    var o = new F()
    F.prototype = null; // Можно не писать, данная строка устраняет утечки памяти.

    return o;
}

/**
 * polyfill Array.reduce()
 * 1 аргумент убирается если определять полифил через prototype, а arr заменить на this
 */
function reduce(arr, callback, initialState) {
    let prevResult = initialState;

    arr.forEach((item, index) => {
        prevResult = callback(prevResult, item, index, this);
    })

    return prevResult;
}

/**
 * polyfill Function.bind()
 */
// in ES5 style
Function.prototype.myBind = function(context) {
    var buff = this;
    var arg1 = [].slice.call(arguments, 1);

    return function () {
        var arg2 = [].slice.call(arguments, 0);

        return buff.apply(context, arg1.concat(arg2));
    }
}

// in ES6 style
Function.prototype.myBind = function(context, ...arg1) {
    var buff = this;

    return function (...arg2) {
        return buff.call(context, ...[...arg1, ...arg2]);
    }
}

function foo (a, b){
    console.log('Sum =', this + a + b);
}

var f = foo.myBind(10,20);

f(30);

/**
 * Array dublicate
 */
Array.prototype.dublicat = function (arr) {
    return this.concat(arr);
}

Array.prototype.dublicat = function (arr) {
    return [...this, ...arr];
}

console.log([1,2,3].dublicat([4,5,6]));
