/**
 *  Как избавится от переполнения стека при вызове nextListItem, если readHugeList() возвращает большой список каких-то объектов
 */

/**
 * Переполнение стека исключается из-за того, что цикл событий обрабатывает рекурсию, а не стек вызовов.
 * Когда nextListItem выполняется, если item это не null, функция тайм-аута ( nextListItem) помещается в очередь событий, и функция завершается,
 * тем самым освобождая стек вызовов. 
 * Когда очередь событий запускает свое событие тайм-аута, следующее item обрабатывается, и таймер установлен для повторного вызова nextListItem.
 * Соответственно, метод обрабатывается от начала до конца без прямого рекурсивного вызова, поэтому стек вызовов остается четким,
 * независимо от количества итераций.
 * 
 * nextListItem(); заменить на setTimeout( nextListItem, 0);
 */
var list = readHugeList();

function nextListItem () {
    var item = list.pop();

    if (item) nextListItem(); 
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
    }.bind(null, i), 0);
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
    Что выведется в консоль?
 */
/**
    Symbol(qwe) Symbol(qwe)
    true
    true
 */
const s1 = Symbol.for('qwe');
const s2 = Symbol.for('qwe');
console.log(s1,s2); //?
console.log(Symbol.for('qwe') === s1); //?
console.log(s1 === s2) //?

// Что выведет в консоль
// false т.к. при вызове index === 9, решается оборачиванием функции или замена var -> let
console.log(closure()[3]() === 3); //?

function closure() {
    return (function () {
        const arr = [];

        for (var index = 0; index < 10; index++) {
            arr.push(() => index);
        }

        return arr
    })();
}

/**
    Есть вложенность элементов
    body id=one
        div id=two
            p id=three
 */

const body = document.getElementById('one');
const div = document.getElementById('two');
const p = document.getElementById('three');

body.addEventListener('click', (event) => {
    console.log('Click on Body');
});

div.addEventListener('click', (event) => {
    console.log('Click on Div');
});

p.addEventListener('click', (event) => {
    console.log('Click on P, callback 1');
});

p.addEventListener('click', (event) => {
    console.log('Click on P, callback 2');
});

p.addEventListener('click', (event) => {
    console.log('Click on P, callback 3');
});

/**
    Какие есть стадии события
 */

/**
    Можно ли отловить событие клика на Div во время погружения, если да то как это сделать?
    Отв: в addEventListener(eventName, callback, boolean | Object(см документацию)) добавить 3-й параметр
 */

/**
    как сделать так чтобы при клике на Р обработчик клика на нем не сработал
    Отв: надо на div в addEventListener 3-м параметром передать true или объект(сб описание addEventListener) и в нем сделать у event.stopPropagation();
*/

/**
    на Р установленно несколько обработчиков клика, как сделать так чтобы отработал только 1-ый а последующие нет
    Отв: на 1-ом обработчике клика сделать  event.stopImmediatePropagation();
 */