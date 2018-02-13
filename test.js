Array.prototype.dublicat = function (arr) {
    return this.concat(arr);
}

Array.prototype.dublicat = function (arr) {
    return [...this, ...arr];
}

console.log([1,2,3].dublicat([4,5,6]));

