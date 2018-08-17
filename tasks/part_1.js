/**
 * Функция нахождения полиндрома
 */
function isPalindrome(str) {
    str = str.replace(/\W/g, '').toLowerCase();
    return (str == str.split('').reverse().join(''));
}

/**
 * Напишите метод sum, который будет работать корректно при вызове sum(1,2) = 3 или sum(1)(2)(3)() = 6
 */
function sum(a, b) {
    var result = a;

    if (b !== undefined) {
        return a + b;
    } else {
        return function foo(param) {
            if (param === undefined) {
                return result;
            }
            result += param;
            return foo;
        }
    }
}

/**
 * Переполнение стека исключается из-за того, что цикл событий обрабатывает рекурсию, а не стек вызовов.
 * Когда nextListItem выполняется, если item это не null, функция тайм-аута ( nextListItem) помещается в очередь событий, и функция завершается,
 * тем самым освобождая стек вызовов. 
 * Когда очередь событий запускает свое событие тайм-аута, следующее itemобрабатывается, и таймер установлен для повторного вызова nextListItem.
 * Соответственно, метод обрабатывается от начала до конца без прямого рекурсивного вызова, поэтому стек вызовов остается четким,
 * независимо от количества итераций.
 */
var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        nextListItem(); // эту строку заменить на setTimeout( nextListItem, 0);
    }
};

/**
 * Что выведется в консоль, и как это исправить?
 */
for (var i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, 0);
}
//решение 4-мя способами
//1 через фун bind()
for (var i = 0; i < 5; i++) {
    setTimeout(function (i) {
        console.log(i);
    }.bind(null,i), 0);
}
// 2 ES6 let переменная
for (let i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, 0);
}
// 3 через замыкания
for (var i = 0; i < 5; i++) {
    (function foo(i) {
        setTimeout(function () {
            console.log(i);
        }, 0);
    })(i);
}

// 4 через 3-й параметр который перездается в функцию калбэк
for (var i = 0; i < 5; i++) {
     setTimeout(function (i) {
        console.log(i);
    }, 0, i);
}

/**
 * 
 */