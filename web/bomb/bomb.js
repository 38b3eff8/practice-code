function randint(a, b) {
    let num = Math.random() * (b - a) + a;
    return parseInt(num);
};

class Bomb {
    /*
     *  type:
     *      -3: don't clear
     *      -2: flag
     *      -1: bomb
     *      0: none
     *      >0: bomds count
     */
    constructor(type = 0, display = false) {
        this.type = type;
        this.display = display;
    }
}

class Space {
    constructor(row = 10, col = 10, count = 10) {
        this.row = row;
        this.col = col;

        if (row * col < count) {
            this.count = row * col;
        } else {
            this.count = count;
        }

        this.place = Array.from({
            length: row
        }, () => Array.from({
            length: col
        }, () => new Bomb()));

        this.bombs = [];

        this.status = true;
        this.first = true;
    }

    fresh() {
        this.first = true;
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                this.place[i][j].type = 0;
                this.place[i][j].display = false;
            }
        }

        this.bombs = [];
    }

    initPlace(exclude = null) {
        let index = 0;

        this.fresh();

        while (index < this.count) {
            let x = randint(0, this.col - 1);
            let y = randint(0, this.row - 1);

            if (exclude && exclude[0] == x && exclude[1] == y) {
                continue;
            }

            if (this.place[y][x].type == 0) {
                this.place[y][x].type = -1;
                this.bombs.push([x, y]);
                index += 1;
            }
        }

        this.fillNumber();
    }

    fillNumber() {
        for (let bomb of this.bombs) {
            let xStart = bomb[0] - 1;
            let yStart = bomb[1] - 1;
            for (let x = xStart; x < xStart + 3; x++) {
                for (let y = yStart; y < yStart + 3; y++) {
                    if (x < 0 || y < 0 || x >= this.col || y >= this.row)
                        continue;

                    if (x == bomb[0] && y == bomb[1])
                        continue

                    if (this.place[y][x].type == -1)
                        continue;

                    this.place[y][x].type++;
                }
            }
        }
    }

    handleClick(x, y) {
        if (!this.status) {
            let result = confirm("被炸死了，是否重新开始？");
            if (result) {
                this.first = true;
                this.fresh();
            }
            return;
        }

        let bomb = this.place[y][x];
        if (bomb.display) {
            return;
        }

        if (bomb.type == -1) {
            bomb.display = true;
            this.status = false;

            let result = confirm("被炸死了，是否重新开始？");
            if (result) {
                this.first = true;
                this.fresh();
            }
            return;
        }

        if (this.first) {
            this.initPlace([x, y]);
            this.first = false;
        }

        this.checkPlace(x, y);
    }

    checkPlace(x, y) {
        let bomb = this.place[y][x];
        if (bomb.type == -1) {
            return;
        }

        bomb.display = true;

        if (bomb.type > 0) {
            return;
        }

        let xStart = x - 1;
        let yStart = y - 1;
        for (let xx = xStart; xx < xStart + 3; xx++) {
            for (let yy = yStart; yy < yStart + 3; yy++) {
                if (xx == x && yy == y)
                    continue

                if (xx < 0 || yy < 0 || xx >= this.col || yy >= this.row)
                    continue;

                let aroundBomb = this.place[yy][xx];
                if (aroundBomb.type == -1 || aroundBomb.display)
                    continue;
                this.checkPlace(xx, yy);
            }
        }
    }

    getPlace(x, y) {
        return this.place[y][x];
    }

    print(display = false) {
        if (!this.status) {
            console.log("game over");
            return;
        }

        let numBorder = Array.from({
            length: this.col
        }, (v, i) => i).join(' ');
        console.log('    ' + numBorder + '  ');

        let topBorder = Array.from({
            length: this.col
        }, (v, i) => '─').join(' ');

        console.log('  ┌ ' + topBorder + ' ┐');

        for (let index = 0; index < this.place.length; index++) {
            let i = this.place[index];
            let str = index + ' | ';
            for (let j of i) {
                if (display) {
                    if (j.type == -1) {
                        str += 'X ';
                    } else if (j.type == 0) {
                        str += '  ';
                    } else {
                        str += j.type + ' ';
                    }
                } else {
                    if (j.display) {
                        if (j.type == -1) {
                            str += 'X ';
                        } else if (j.type == 0) {
                            str += '  ';
                        } else {
                            str += j.type + ' ';
                        }
                    } else {
                        str += '0 ';
                    }
                }
            }

            str += '│';
            console.log(str);
        }
        console.log('  └ ' + topBorder + ' ┘');
    }
}
