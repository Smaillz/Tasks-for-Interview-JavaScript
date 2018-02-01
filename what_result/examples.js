/**
 * b - глобльная область видимости ~ window.b = 3
 * a - обл видимости функции
 * ход действий window.b = 3 -> var a = b;
 */
(function () {
    var a = b = 3;
})();

console.log("a defined? " + (typeof a !== 'undefined')); // false
console.log("b defined? " + (typeof b !== 'undefined')); // true

/**
 * undefined потому что this === window
 */
var myObject = {
    foo: "bar",
    func: function () {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo); // bar
        console.log("outer func:  self.foo = " + self.foo); // bar
        (function () {
            console.log("inner func:  this.foo = " + this.foo); // undefind
            console.log("inner func:  self.foo = " + self.foo); // bar
        }());
    }
};
myObject.func();

/**
 * Причина этого связана с тем, что точки с запятой являются технически необязательными в JavaScript. 
 * В результате, когда встречается строка, содержащая return оператор, точка с запятой автоматически вставляется сразу после оператора return.
 */
function foo1() {
    return {
        bar: "hello"
    };
}

function foo2() {
    return {
        bar: "hello"
    };
}
console.log(foo1()); // object
console.log(foo2()); // undefined

/**
 * 1 -> 4 -> 3 -> 2
 */
(function () {
    console.log(1);
    setTimeout(function () {
        console.log(2)
    }, 1000);
    setTimeout(function () {
        console.log(3)
    }, 0);
    console.log(4);
})();

/**
 * Вызов метода массива reverse() не только возвращать массив в обратном порядке, он также изменяет порядок самого массива (то есть, в данном случае arr1).
 */
var arr1 = "john".split('');
var arr2 = arr1.reverse();
var arr3 = "jones".split('');
arr2.push(arr3);
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1)); // "array 1: length=5 last=j,o,n,e,s"
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1)); // "array 2: length=5 last=j,o,n,e,s"

/**
 * 
 */
console.log(1 + "2" + "2"); //122
console.log(1 + +"2" + "2"); // 32
console.log(1 + -"1" + "2"); // 02
console.log(+"1" + "1" + "2"); //122
console.log("A" - "B" + "2"); //NaN2
console.log("A" - "B" + 2); // NaN

/**
 * 
 */
console.log(false == '0') // приведется к строке
console.log(false === '0') // строгое сравнение по типу

/**
 * Причина заключается в следующем: при настройке свойства объекта JavaScript неявно устанавливается значение параметра.
 * В этом случае, поскольку b и c оба объекты, они оба будут преобразованы в "[object Object]". 
 */
var a = {},
    b = {
        key: 'b'
    },
    c = {
        key: 'c'
    };

a[b] = 123;
a[c] = 456;

console.log(a[b]); //456

/**
 * 
 */
var hero = {
    _name: 'John Doe',
    getName: function () {
        return this._name;
    }
};

console.log(hero.getName()); // 'John Doe'  

var getName = hero.getName;
console.log(getName()); // undefined

/**
 * фун fn сработает 2 раза и выведет 10 и 2( т.к. arguments[0] = fn, а контекст - объект arguments)
 */
var length = 10;

function fn() {
    console.log(this.length);
}

var obj = {
    length: 5,
    method: function (fn) {
        fn();
        arguments[0]();
    }
};

obj.method(fn, 1); // 10 and 2

/**
 * всплытие переменных x,y вверх
 */
(function () {
    try {
        throw new Error();
    } catch (x) {
        var x = 1,
            y = 2;
        console.log(x); // 1
    }
    console.log(x); // undefined
    console.log(y); // 2
})();

/**
 * hosting
 */
var x = 21;
var girl = function () {
    console.log(x); //undefined
    var x = 20;
};
girl();

/**
 * т.к. a = null обнуляет ссылку a переданную в параметр, а внешняя ссылка на объект остается неизменной
 */
var a = {};

function clear(a) {
    a.b = 10;
    a = null;
}
clear(a);

console.log(a); // {b: 10}

/**
 * hosting  
 */
var a = 1;

function foo() {
    console.log(a);
}


function bar() {
    a = 3;
    var a = 2;

    foo();
}

bar(); // 1

/**
 * TypeError из-за use strict, т.к. переменная b не определена.
 * Если убрать use strict будет undefined
 */
'use strict'
const a = {
  b: 1,
  getB: function() {
    return this.b;
  }
};

console.log(a.getB()); // 1
const b = a.getB
console.log(b()); // TypeError

/**
 * 
 */