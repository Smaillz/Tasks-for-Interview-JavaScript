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
        return res + 123
    })
    .then(res => {
        console.log(res)
    })
    .catch(res => {
        console.log(res)
    });