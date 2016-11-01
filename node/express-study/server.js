const express = require('express');
var birds = require('./routes/birds');

var app = express();

app.use('/birds', birds);

// app.use(express.static('public'));
app.use('/static', express.static('public'));

app.post('/', function (req, res) {
    res.send('POST request to the homepage');
});

app.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section ...');
    next();
});

app.get('/users/:userId/books/:bookId', function (req, res) {
    req.send(res.params);
});

app.get('/flights/:from-:to', function (res, req) {
    req.send(res.params);
});

app.get('/example/b', function (req, res, next) {
    console.log('the response will be sent by the next function ...');
    next();
}, function (req, res) {
    res.send('Hello from B');
});

var cb0 = function (req, res, next) {
    console.log('CB0');
    next();
}

var cb1 = function (req, res, next) {
    console.log('CB1');
    next();
}

var cb2 = function (req, res) {
    res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);

app.get('/example/d', [cb0, cb1], function (req, res, next) {
    console.log('the response will be sent by the next function ...');
    next();
}, function (req, res) {
    res.send('Hello from D');
});

app.route('/book')
    .get(function (req, res) {

    })
    .post(function (req, res) {

    });

var myLogger = function (req, res, next) {
    console.log('LOGGED');
    next();
}

app.use(myLogger);

app.get('/', function (req, res) {
    res.send('Hello world');
});

app.listen(8080, function () {
    console.log('Server runing at http://localhost:8080');
});
