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