class Rect {
    constructor({
        x = 0,
        y = 0,
        width = 20,
        height = 20,
        border = 1,
        strokeColor = 'black',
        fillColor = 'white',
        lineWidth = 1,
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
        const xx = x - this.border;
        const yy = y - this.border;
        if (this.x > xx || this.y > yy || this.x + this.width < xx || this.y + this.height < yy) {
            return false;
        }

        return true;
    }

    draw(ctx, text = null) {
        const context = ctx;
        context.save();
        context.strokeStyle = this.strokeColor;
        context.fillStyle = this.fillColor;
        context.lineWidth = this.lineWidth;

        const width = this.width - (this.border * 2);
        const height = this.height - (this.border * 2);

        context.translate(this.x + this.border, this.y + this.border);
        context.beginPath();
        context.rect(0, 0, width, height);

        context.closePath();
        context.stroke();
        context.fill();

        if (text != null) {
            context.save();
            context.fillStyle = 'black';
            const fontSize = Math.floor(width * 0.7);
            context.font = `${fontSize}px arial`;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(text, width / 2, height / 2);
            context.restore();
        }
        context.restore();
    }
}
