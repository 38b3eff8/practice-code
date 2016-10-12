const fetch = require('node-fetch');

/*
function* gen(x) {
    try {
        let y = yield x + 2;
        return y;
    } catch (error) {
        console.log(error);
    }
}

let g = gen(1);
console.log(g.next());
// console.log(g.next(2));
g.throw('出错啦！');
*/

function* gen() {
    let url = "https://api.github.com/users/github";
    let result = yield fetch(url);
    console.log(result);
}

let g2 = gen();
let result = g2.next();

result.value.then(function (data) {
    return data.json();
}).then(function (data) {
    g2.next(data);
});