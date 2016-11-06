var Clock = function (width) {
    this.x = width / 2;
    this.y = width / 2;

    this.borderWidth = 5;

    this.radius = width / 2 - this.borderWidth;


}

Clock.prototype.draw = function (context) {
    context.save();
    context.translate(this.x, this.y);

    context.strokeStyle = '#000';
    context.lineWidth = this.borderWidth;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2, false);
    context.closePath();
    context.stroke();



    for (var i = 0; i < 60; i++) {
        var deg = 6 * i - 90;
        var point = polarToRectangle(deg, this.radius - 6 - this.borderWidth);

        if (i % 5 === 0) {
            drawPoint(context, point[0], point[1], 4, '#000', 1);

            var textPoint = polarToRectangle(deg, this.x - this.radius + 55, '20px sans-serif');
            console.log(textPoint);
            drawText(context, textPoint[0], textPoint[1], i / 5 || 12);
        }
        else
            drawPoint(context, point[0], point[1], 2, '#000', 1);
    }



    var now = new Date();
    var secondDeg = now.getSeconds() % 60 * 6 - 90;
    var secondPoint = polarToRectangle(secondDeg, this.radius - 30);
    drawLine(context, 0, 0, secondPoint[0], secondPoint[1], '#F00', 1);

    var minuteDeg = now.getMinutes() % 60 * 6 - 90;
    var minutePoint = polarToRectangle(minuteDeg, this.radius - 40);
    drawLine(context, 0, 0, minutePoint[0], minutePoint[1], '#000', 2);

    var hourDeg = (now.getHours() % 12 + now.getMinutes() / 60) * 30 - 90;
    var hourPoint = polarToRectangle(hourDeg, this.radius - 55);
    drawLine(context, 0, 0, hourPoint[0], hourPoint[1], '#000', 4);

    drawPoint(context, 0, 0, 4, '#FFF', 3);

    context.restore();
}

function drawPoint(context, x, y, radius, fillStyle, lineWidth) {
    context.save();
    context.strokeStyle = '#000';
    if (fillStyle) context.fillStyle = fillStyle;
    if (lineWidth) context.lineWidth = lineWidth;
    context.translate(x, y);
    context.beginPath();
    context.arc(0, 0, radius, 0, Math.PI * 2, false);

    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
}

function drawText(context, x, y, content, font) {
    context.save();
    context.translate(x, y);
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = font;
    context.fillText(content, x, y);
    context.restore();
}

function drawLine(context, x1, y1, x2, y2, strokeStyle, lineWidth) {
    context.save();

    if (strokeStyle) context.strokeStyle = strokeStyle;
    if (lineWidth) context.lineWidth = lineWidth;

    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.closePath();
    context.stroke();
    context.restore();
}

function polarToRectangle(deg, radius) {
    var radian = deg / 180 * Math.PI;
    var x = Math.cos(radian) * radius;
    var y = Math.sin(radian) * radius;

    return [x, y];
}