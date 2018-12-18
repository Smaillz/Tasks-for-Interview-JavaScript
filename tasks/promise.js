function sum(a, b) {
    return a + b;
}

Promise.resolve(1)
    .then(res => sum(res, 2))
    .then(res => sum(res, 3))
    .finnaly(res => {
        return res + 123
    })
    .then(res => {
        console.log(res)
    })
    .catch(res => {
        console.log(res)
    });

fetch('https://www.youtube.com')
    .then(res => sum(res, 2))
    .then(res => sum(res, 3))
    .finnaly(res => {
        console.log(res);
        return res + 123;
    })
    .then(res => {
        console.log(res)
    })
    .catch(res => {
        console.log(res)
    });

testProm();

function prom() {
    var a = Promise.resolve({
        a: '123'
    });

    a.then((val) => {
            console.log('Then 1:', val);
            return {
                a: 'then 1'
            };
        })
        .catch(err => {
            console.log('Catch 1:', err);
            return {
                b: 'error 1'
            };
        })

    a.catch(err => {
            console.log('Catch 2:', err);
            return {
                closure: 'error 2'
            };
        })
        .then((val) => {
            console.log('Then 2:', val);
            return {
                d: 'then 2'
            };
        });
}