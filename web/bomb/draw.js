class Rect {
    constructor(x, y, width = 20, height = 20, border = 1, color = 'black') {
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;
        this.border = border;

        this.color = color;
    }

    draw(context) {
        context.save();
        context.strokeStyle = this.color;

        context.translate(this.x, this.y);
        
    }
}
