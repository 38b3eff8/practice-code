class Rect {
    constructor({
        x = 0,
        y = 0,
        width = 20,
        height = 20,
        border = 1,
        strokeColor = 'black',
        fillColor = 'white',
        lineWidth = 1
    } = {}) {
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.border = border;

        this.strokeColor = strokeColor;
        this.fillColor = fillColor;
        this.lineWidth = lineWidth;
    }

    isContain(x, y) {
        let xx = x - this.border,
            yy = y - this.border;
        if (this.x > xx || this.y > yy || this.x + this.width < xx || this.y + this.height < yy) {
            return false;
        }

        return true;
    }

    draw(context, text = null) {
        context.save();
        context.strokeStyle = this.strokeColor;
        context.fillStyle = this.fillColor;
        context.lineWidth = this.lineWidth;

        let width = this.width - this.border * 2;
        let height = this.height - this.border * 2;

        context.translate(this.x + this.border, this.y + this.border);
        context.beginPath();
        context.rect(0, 0, width, height);

        context.closePath();
        context.stroke();
        context.fill();

        if (text != null) {
            context.save();
            context.fillStyle = "black";
            context.font = Math.floor(width * 0.7) + "px arial";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText(text, width / 2, height / 2);
            context.restore();
        }
        context.restore();
    }
}
