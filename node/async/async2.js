const thunkify = require("thunkify");
const fs = require("fs");
const co = require("co");

const readFile = thunkify(fs.readFile);


function run(fn) {
    let gen = fn();

    function next(err, data) {
        let result = gen.next(data);
        if (result.done) return;
        result.value(next);
    }

    next();
}

let g = function* () {
    let f1 = yield readFile('async1.js');
    console.log(f1);
    let f2 = yield readFile('async2.js');
    console.log(f2);
}

run(g);

co(g).then(function () {
    console.log("Generator 函数执行完成");
});