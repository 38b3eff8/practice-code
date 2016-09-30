function randint(a, b) {
    const num = (Math.random() * (b - a)) + a;
    return parseInt(num, 10);
}

class Bomb {
    /*
     *  type:
     *      -1: bomb
     *      0: none
     *      >0: bomds count
     */
    constructor({
        type = 0,
        display = false,
        mark = false,
    } = {}) {
        this.type = type;
        this.display = display;
        this.mark = mark;
    }
}

class Space {
    constructor({
        row = 10,
        col = 10,
        count = 10,
    } = {}) {
        this.row = row;
        this.col = col;

        if (row * col < count) {
            this.count = row * col;
        } else {
            this.count = count;
        }

        this.place = Array.from({
            length: row,
        }, () => Array.from({
            length: col,
        }, () => new Bomb()));

        this.bombs = [];

        this.status = true;
        this.first = true;

        this.fresh();
    }

    fresh() {
        this.first = true;
        this.status = true;
        for (let i = 0; i < this.row; i += 1) {
            for (let j = 0; j < this.col; j += 1) {
                this.place[i][j].type = 0;
                this.place[i][j].display = false;
                this.place[i][j].mark = false;
            }
        }

        this.bombs = [];
    }

    initPlace(exclude = null) {
        let index = 0;

        while (index < this.count) {
            const x = randint(0, this.col - 1);
            const y = randint(0, this.row - 1);

            if (exclude && exclude[0] === x && exclude[1] === y) {
                continue;
            }

            if (this.place[y][x].type === 0) {
                this.place[y][x].type = -1;
                this.bombs.push([x, y]);
                index += 1;
            }
        }

        this.fillNumber();
    }

    fillNumber() {
        for (const bomb of this.bombs) {
            const xStart = bomb[0] - 1;
            const yStart = bomb[1] - 1;
            for (let x = xStart; x < xStart + 3; x += 1) {
                for (let y = yStart; y < yStart + 3; y += 1) {
                    if (x < 0 || y < 0 || x >= this.col || y >= this.row) {
                        continue;
                    }

                    if (x === bomb[0] && y === bomb[1]) {
                        continue;
                    }

                    if (this.place[y][x].type === -1) {
                        continue;
                    }

                    this.place[y][x].type += 1;
                }
            }
        }
    }

    handleClick(x, y) {
        if (!this.status) {
            return false;
        }

        const bomb = this.place[y][x];
        if (bomb.display || bomb.mark) {
            return true;
        }

        if (bomb.type === -1) {
            bomb.display = true;
            this.status = false;
            return false;
        }

        if (this.first) {
            this.initPlace([x, y]);
            this.first = false;
        }

        this.checkPlace(x, y);
        return true;
    }

    checkPlace(x, y) {
        const bomb = this.place[y][x];
        if (bomb.type === -1) {
            return;
        }

        bomb.display = true;

        if (bomb.type > 0) {
            return;
        }

        const xStart = x - 1;
        const yStart = y - 1;
        for (let xx = xStart; xx < xStart + 3; xx += 1) {
            for (let yy = yStart; yy < yStart + 3; yy += 1) {
                if (xx === x && yy === y) {
                    continue;
                }

                if (xx < 0 || yy < 0 || xx >= this.col || yy >= this.row) {
                    continue;
                }

                const aroundBomb = this.place[yy][xx];
                if (aroundBomb.type === -1 || aroundBomb.display || aroundBomb.mark) {
                    continue;
                }
                this.checkPlace(xx, yy);
            }
        }
    }

    getPlace(x, y) {
        return this.place[y][x];
    }

    mark(x, y, mark) {
        this.place[y][x].mark = mark;

        if (this.bombs.length === 0) {
            return false;
        }

        for (const point of this.bombs) {
            const bomb = this.place[point[1]][point[0]];
            if (!bomb.mark) {
                return false;
            }
        }

        return true;
    }

    print(display = false) {
        if (!this.status) {
            console.log('game over');
            return;
        }

        const numBorder = Array.from({
            length: this.col,
        }, (v, i) => i).join(' ');
        console.log(`    ${numBorder}  `);

        const topBorder = Array.from({
            length: this.col,
        }, () => '─').join(' ');

        console.log(`  ┌ ${topBorder} ┐`);

        for (let index = 0; index < this.place.length; index += 1) {
            const i = this.place[index];
            let str = `${index} | `;
            for (const j of i) {
                if (display) {
                    if (j.type === -1) {
                        str += 'X ';
                    } else if (j.type === 0) {
                        str += '  ';
                    } else {
                        str += `${j.type} `;
                    }
                } else if (j.display) {
                    if (j.type === -1) {
                        str += 'X ';
                    } else if (j.type === 0) {
                        str += '  ';
                    } else {
                        str += `${j.type} `;
                    }
                } else {
                    str += '0 ';
                }
            }

            str += '│';
            console.log(str);
        }
        console.log(`  └ ${topBorder} ┘`);
    }
}
