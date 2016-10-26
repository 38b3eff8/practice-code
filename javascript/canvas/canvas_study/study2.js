var ctx = document.querySelector('#canvas').getContext('2d');

/*
for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
        ctx.fillStyle = 'rgb(' +
            Math.floor(255 - 42.5 * i) + ', ' +
            Math.floor(255 - 42.5 * j) + ', 0)';
        ctx.fillRect(j * 25, i * 25, 25, 25);
    }
}
*/

/*
for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
        ctx.strokeStyle = 'rgb(0, ' +
            Math.floor(255 - 42.5 * i) + ', ' +
            Math.floor(255 - 42.5 * j) + ')';

        ctx.beginPath();
        ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true);
        ctx.stroke();
    }
}
*/

/*
ctx.fillStyle = '#FD0';
ctx.fillRect(0, 0, 75, 75);

ctx.fillStyle = '#6C0';
ctx.fillRect(75, 0, 75, 75);

ctx.fillStyle = '#09F';
ctx.fillRect(0, 75, 75, 75);

ctx.fillStyle = '#F30';
ctx.fillRect(75, 75, 75, 75);
ctx.fillStyle = '#FFF';

ctx.globalAlpha = 0.2;
for (var i = 0; i < 7; i++) {
    ctx.beginPath();
    ctx.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2, true);
    ctx.fill();
}
*/

/*
ctx.fillStyle = 'rgb(255, 221, 0)';
ctx.fillRect(0, 0, 150, 37.5);
ctx.fillStyle = 'rgb(102, 204, 0)';
ctx.fillRect(0, 37.5, 150, 37.5);
ctx.fillStyle = 'rgb(0, 153, 255)';
ctx.fillRect(0, 75, 150, 37.5);
ctx.fillStyle = 'rgb(255, 51, 0)';
ctx.fillRect(0, 112.5, 150, 37.5);

for (var i = 0; i < 10; i++) {
    ctx.fillStyle = 'rgba(255, 255, 255, ' + (i + 1) / 10 + ')';
    for (var j = 0; j < 4; j++) {
        ctx.fillRect(5 + i * 14, 5 + j * 37.5, 14, 27.5);
    }
}
*/

/*
for (var i = 0; i < 10; i++) {
    ctx.lineWidth = 1 + i;
    ctx.beginPath();
    ctx.moveTo(5 + i * 14, 5);
    ctx.lineTo(5 + i * 14, 140);
    ctx.stroke();
}
*/

/*
var lineCap = ['butt','round','square'];

ctx.strokeStyle = '#09f';
ctx.beginPath();
ctx.moveTo(10, 10);
ctx.lineTo(140, 10);
ctx.moveTo(10, 140);
ctx.lineTo(140, 140);
ctx.stroke();

ctx.strokeStyle = 'black';
for (var i = 0; i < 3; i++) {
    ctx.lineWidth = 15;
    ctx.lineCap = lineCap[i];
    ctx.beginPath();
    ctx.moveTo(25 + i * 50, 10);
    ctx.lineTo(25 + i * 50, 140);
    ctx.stroke();
}
*/

/*
var lineJoin = ['round', 'bevel', 'miter'];
ctx.lineWidth = 10;
for (var i = 0; i < lineJoin.length; i++) {
    ctx.lineJoin = lineJoin[i];
    ctx.beginPath();
    ctx.moveTo(-5, 5 + i * 40);
    ctx.lineTo(35, 45 + i * 40);
    ctx.lineTo(75, 5 + i * 40);
    ctx.lineTo(115, 45 + i * 40);
    ctx.lineTo(155, 5 + i * 40);
    ctx.stroke();
}
*/

/*
var offset = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setLineDash([4, 2]);
    ctx.lineDashOffset = -offset;
    ctx.strokeRect(10, 10, 100, 100);
}

function march() {
    offset++;
    if (offset > 16) {
        offset = 0;
    }
    draw();
    setTimeout(march, 50);
}

march();
*/
