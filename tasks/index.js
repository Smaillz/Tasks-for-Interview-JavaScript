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

// Написать функцию makeRequests, получающую на вход массив ссылок и число, указывающее максимальное количество одновременных запросов. Условия:
// 1. одновременно должно выполняться не более указанного числа запросов
// 2. должен возвращаться массив результатов в той же последовательности, что и адреса запросов
// 3. нельзя делать повторные запросы на дублирующиеся адреса (при этом результат всё равно должен присутствовать в результирующем массиве)

console.time('do')
makeRequest([
    'url1',
    'url2',
    'url3',
    'url4',
    'url5',
    'url2',
    'url1',
    'url4',
    'url2'
], 3).then(res => {
    console.timeEnd('do');
    console.log(res);
});

//  функция делающая эмуляцию запроса
function request(url) {
    return new Promise(resolve => {
        const timer = Math.floor(Math.random() * 5) * 1000;
        setTimeout(() => {
            resolve({
                url,
                timer,
                payload: Math.floor(Math.random() * 50000)
            });
        }, timer);
    })
}


function makeRequest(urls, fetchCount) {
    const urlMap = {};
    const resArr = new Array(urls.length);
    let nextIndex = 0;
    let requestComp = 0;

    // оборачиваем в промис чтобы вернуть результат асинхронных действий
    return new Promise((resolve, reject) => {
        // запускаем запросы по счетчику
        for (let i = 0; i < fetchCount; i++) {
            stepRequest();
        }

        // функция для управления очередью запросов
        function stepRequest() {
            const currIndex = nextIndex++;
            const currUrl = urls[currIndex];
            const resPromise = urlMap[currUrl];

            function doThen(result) {
                resArr[currIndex] = result;

                if (++requestComp === resArr.length) {
                    resolve(resArr);
                    return;
                }

                stepRequest();
            }

            // если очередь закончилась
            if (currIndex >= urls.length) return;

            // если запрос уже делался на соответствующий урл
            if (resPromise) {
                resPromise.then(doThen);
                return;
            }

            // если запрос не делался на соответствующий урл добавляем его в карту урлов
            urlMap[currUrl] = request(currUrl);
            urlMap[currUrl].then(doThen);
        }
    });
}

/**
 * Написать функцию которая будет проверять правильность закрытия скобок []<>()
 */
const t1 = '(<[]>[(()<>)])<>()[()<>]'; //true
const t2 = '()[]<>'; // true
const t3 = '()[<()<]' // false
const t4 = '([<]>)'; // false

console.log(check(t1));
console.log(check(t2));
console.log(check(t3));
console.log(check(t4));

function check(str) {
    const queue = [];

    function opp(s) {
        switch (s) {
            case '(':
                return ')';
            case '<':
                return '>';
            case '[':
                return ']';
            default:
                return false;
        }
    }
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(' || str[i] === '<' || str[i] === '[') {
            queue.push(str[i]);
            continue;
        } else {
            const last = queue.pop();
            const elem = opp(last);

            if (elem && elem !== str[i]) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Написать функцию repeater которая будет делать запрос и в случае неудачи будет повторяться n раз
 */

repeater('url', 3).then((res) => {
    console.info('info', res);
}, (error) => {
    console.error('error', error);
});

function req() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(1);
        }, 1000);
        return;
    });
}

function repeater(url, n) {
    let count = 0;

    function tryRequest() {
        if (count >= n) {
            return Promise.reject('error');
        }

        count++;
        return req(url).catch(() => {
            return tryRequest();
        });
    }

    return tryRequest();
}

/**
    Дан массив. Получить массив анаграмм в виде 
[
    "вертикаль",
    "кильватер",
    "апельсин",
    "спаниель",
    "австралопитек",
    "ватерполистка",
    "кластер",
    "сталкер",
    "стрелка",
    "корабль"
]
    Получить массив анаграмм в виде (анаграммы - слова состоящие из одинаковых букв)
[
    ["вертикаль", "кильватер"],
    ["апельсин", "спаниель"],
    ["австралопитек", "ватерполистка"],
    ["кластер", "сталкер", "стрелка"],
    ["корабль"]
]
*/

const awe = [
    "вертикаль",
    "кильватер",
    "апельсин",
    "спаниель",
    "австралопитек",
    "ватерполистка",
    "кластер",
    "сталкер",
    "стрелка",
    "корабль"
];

console.log(findAnagrams(awe));

function findAnagrams(arr) {
    const result = [];
    const strMap = {};

    for (let i = 0; i < arr.length; i++) {
        let elem = arr[i];
        // сортируем строку чтобы записать его в карту строк и в дальнейшем сравнивать новые строки
        let sortedStr = Array.prototype.sort.call(Array.from(elem)).join(''); // или elem.split('').sort().join('');
        let objElem = strMap[sortedStr];

        // дописываем слово в имеющийся массив
        if (objElem) {
            objElem.push(elem);
            continue;
        }

        // создаем массив, записываем ссылку на него в результирующий массив и в карту строк
        let link = [elem];
        result.push(link);
        strMap[sortedStr] = result[result.length - 1];
    }

    return result;
}

/**
    Получить массив массивов длин строк по длине
[
    "вертикаль",
    "кильватер",
    "апельсин",
    "спаниель",
    "австралопитек",
    "ватерполистка",
    "кластер",
    "сталкер",
    "стрелка",
    "корабль"
]
    Результат
[
    ["вертикаль", "кильватер"]
    ["апельсин", "спаниель"]
    ["австралопитек", "ватерполистка"]
    ["кластер", "сталкер", "стрелка", "корабль"]
]
*/

console.log(find(awe));

function find(arr) {
    const res = [];
    const obj = {};

    for (let i = 0; i < arr.length; i++) {
        let elem = arr[i];
        let len = elem.length;
        let ind = obj[len];

        if (ind !== undefined) {
            res[ind].push(elem);
            continue;
        }

        // пушим в конец результирующего массива и записываем индекс в карту строк
        // можно запись индекса заменить на запись ссылки(как в примере с анаграммами)
        const newLength = res.push([elem])
        obj[len] = newLength - 1;
    }

    return res;
}

/**
    Даны 2 отсортированных массива
    
    Необходимо добавить из 2-го массива добавить все элементы которых нет в 1-ом массиве и чтобы порядок сортировки сохранился
    (за O(n) - линейное время)

    func([1, 2, 4, 6], [1, 2, 3, 4, 5]) -> [1,2,3,4,5,6]
*/

const a = [1, 2, 4, 6, 7];
const b = [1, 2, 3, 4, 5, 7, 8, 9];

console.log(concatSort(a,b));

function concatSort(a, b) {
    const result = [];
    let prev;
    let i = 0;
    let j = 0;
    
    while (i < a.length || j < b.length) {
        const left = a[i];
        const right = b[j];

        if(left <= right || !right){
            if(prev !== left) {
                result.push(left);
                prev = left;
            }
            i++;
        } else if(left > right || !left) {
            if(prev !== right) {
                result.push(right);
                prev = right;
            }
            j++;
        }
    }

    return result;
}

/**
    Даны 2 массива
    
    Необходимо добавить из 2-го массива добавить все элементы которых нет в 1-ом массиве 
*/
// сложность данного алгоритма O(n^2)

var q = [1, 2, 3, 5, 7, 8, 10];
var w = [1, 1, 1, 1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9];

console.log(concat(q,w));

function concat(arr, arr2) {
    const result = [...arr];

    for (let i = 0; i < arr2.length; i++) {
        let flag = false;

        for (let j = 0; j < arr.length; j++) {
            if (arr2[i] === arr[j]) flag = true;
        }

        if (!flag) result.push(arr2[i]);
    }

    return result;
}

// или
console.log(concat2(q,w));

function concat2(arr, arr2) {
    const result = new Set(arr);

    for (let i = 0; i < arr2.length; i++) {
        result.add(arr2[i]);
    }

    return Array.from(result).sort();
}

/**
    Дано число 123456789, нужно его перевернуть чтобы получилось 987654321
    (без использования: Math, массивов, циклов)
 */
var a = 123456789;

console.log(revert(a));

function revert(num) {
    var str = num + '';
    var res = '';

    function step(ind) {
        res += str[ind];
        if (ind === 0) {
            return +res;
        }

        return step(ind - 1);
    }

    return step(str.length - 1)
};

/**
    Предположим что нам нужно вывести [1,2,3,4,5] с помощью console.log элементы массива через запятую. Мы написали console.log.apply(null, [...])
    и запустили этот код в Нашем браузере, после чего получили ошибку что метода apply нет у функции console.log
    
    Можно ли это исправить и как?

    2 способа
    
    1) Function.prototype.call.apply(console.log, [...]);
    2) украсть метод apply и закинуть в __proto__ функции log а потом удалить(см ниже)
 */
customLog([1,2,3,4,5]);

function customLog(arr) {
    var log = console.log;
    log.__proto__.myApply = Function.prototype.apply;
    log.apply(null, arr);
    delete log.__proto__.myApply
}

/**
    Создать сущность Animal с полями name, age и методом getInfo который выводил бы эти два поля
 */
function Animal(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.getInfo = function () {
    return this.name + ' ' + this.age;
}

/**
    Создать Cat который бы наследовал все поля Animal и добавлял свойство width и метод getInfo который выводил бы эти поля
 */

function Cat(name, age, width) {
    Animal.call(this, name, age);
    this.width = width;
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.getInfo = function () {
    return this.name + ' ' + this.age + ' ' + this.width;
    // or (предпочтителен в том случае если необходимо получить результат getInfo родителя в том формате в котором он + добавить свои поля)
    // return Animal.prototype.getInfo.call(this.) + ' ' + this.width
}

// Реализовать one(multiply(five())) === 5 или five(plus(one())) === 6 

function foo(number) {
    return (method) => {
        if (typeof method === 'function') {
            return method(number);
        }
        return number;
    }
}

function five(method) {
    return foo(5)(method);
}

function one(method) {
    return foo(1)(method);
}

function plus(arg) {
    return val => val + arg;
}

function multiply(arg) {
    return val => val * arg;
}


/**
    Реализовать функцию sum чтобы 
    sum(1)(2)(3)(4)() = 10;
*/ 

function sum(par) {
    var res = par;

    return function foo(arg) {
        if (!arg) return console.log(res);

        res += arg;
        return foo;
    }
}

/**
    Реализовать функцию sum чтобы 
    sum(1)(2)(3)(4) = 10;
*/ 
function sum(par) {
    var res = par;

    function foo2(arg) {
        if (arg === undefined) return console.log(res);

        foo.toString = () => sum;

        res += arg;
        return foo2;
    }
    // нужно переопределить valueOf(предпочтительней тк отвечает за числовое представление объекта)  или toString(отвечает за строковое 
    // представление объекта)
    foo2.valueOf = () => {
        return res;
    };


    return foo2;
}