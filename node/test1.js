const fs = require('fs');

var old_name = 'temp.txt';
var new_name = 'temp.js';

fs.rename(old_name, new_name, (err) => {
    if (err)
        throw err;
    fs.stat(new_name, (err, stats) => {
        if (err)
            throw err;
        console.log(`stat: ${JSON.stringify(stats)}`);
    });
});
