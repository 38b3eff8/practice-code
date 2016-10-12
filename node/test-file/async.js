const fetch = require('node-fetch');
const fs = require('fs');
const thunkify = require('thunkify');


function* gen1(x) {
    try {
        let y = yield x + 2;
        return y;
    } catch (error) {
        console.log(error);
    }
}

let g1 = gen1(1);
console.log(g1.next());
// console.log(g.next(2));
g1.throw('出错啦！');

//

function* gen2() {
    let url = "https://api.github.com/users/github";
    let result = yield fetch(url);
    // console.log(result);
}

let g2 = gen2();
let result = g2.next();

result.value.then(function (data) {
    return data.json();
}).then(function (data) {
    g2.next(data);
});

// Thunk 函数

let x = 1;
function f1(m) {
    return m * 2;
}

f1(x + 5);

let thunk = function () {
    return x + 5;
}

function f2(thunk) {
    return thunk() * 2;
}

f2(thunk);

//

let Thunk = function (fn) {
    return function (...args) {
        return function (callback) {
            return fn.call(this, ...args, callback);
        }
    }
}

function f3(a, cb) {
    cb(a);
}
const ft = Thunk(f3);
let log = console.log.bind(console);
ft(3)(log);

//

function f4(a, b, callback) {
    let sum = a + b;
    callback(sum);
    callback(sum);
}

const ft2 = thunkify(f4);
let print = console.log.bind(console);
ft2(3, 2)(print);

//
let readFile = thunkify(fs.readFile);
let gen3 = function* () {
    let r1 = yield readFile('/etc/fstab');
    console.log(r1.toString());
    let r2 = yield readFile('/etc/shells');
    console.log(r2.toString());
}

//

function run(fn) {
    let gen = fn();

    function next(err, data) {
        let result = gen.next(data);
        if (result.done) return;
        result.value(next);
    }

    next();
}

run(gen3);