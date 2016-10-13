const fs = require('fs');
const co = require('co');

let readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function (error, data) {
            if (error) return reject(error);
            resolve(data);
        });
    });
}

let gen = function* () {
    var f1 = yield readFile('async1.js');
    console.log(f1.toString());
    var f2 = yield readFile('async2.js');
    console.log(f2.toString());
}

/*
let g = gen();
g.next().value.then(function (data) {
    g.next(data).value.then(function (data) {
        g.next(data);
    });
});
*/

function run(fn) {
    let gen = fn();

    function next(data) {
        let result = gen.next(data);
        console.log(result);
        if (result.done) return;
        result.value.then(next);
    }

    next();
}

// run(gen);

// co(gen);

co(function* () {
    let res = yield [
        Promise.resolve(1),
        Promise.resolve(2)
    ];

    console.log(res);
});

let asyncReadFile = async function () {
    let f1 = await readFile('async1.js');
    console.log(f1.toString());
    let f2 = await readFile('async2.js');
    console.log(f2.toString());
}

let result = asyncReadFile();