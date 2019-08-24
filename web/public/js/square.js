const RandSquare = (function () {
    const RandSquare = function (x, y) {
        this.x = x; this.y = y;
        this.square = this._gen_rand_square(x, y);
    };
    const STRING_SRC = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!"#$%&\'()=-~^|\\[{]}:*@`;+_/?.>,<';
    const STRING_SRC_LEN = STRING_SRC.length;
    RandSquare.prototype._gen_rand_square = function (x, y) {
        const result = [];
        for (let i = 0; i < y; i++) {
            const temp = [];
            for (let j = 0; j < x; j++) {
                temp.push(STRING_SRC[Math.floor(Math.random() * STRING_SRC_LEN)]);
            }
            result.push(temp);
        }
        return result;
    };
    RandSquare.prototype.create_table = function () {
        const table = document.createElement('table');
        table.classList.add('square');
        for (let i = 0; i < this.y; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < this.x; j++) {
                const td = document.createElement('td');
                td.textContent = this.square[i][j];
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        return table;
    };
    RandSquare.prototype.create_canvas = function (cw = 500, ch = 500, title = undefined, color = '#000') {
        const title_h = 50;
        const canvas = document.createElement('canvas');
        canvas.height = ch, canvas.width = cw;
        const h = canvas.height - (!!title * title_h), w = canvas.width;
        const context = canvas.getContext('2d');
        const text_h = h / this.y, text_w = w / this.x;
        context.font = Math.min(text_h, text_w) * 0.7 + 'px monospace';
        context.fillStyle = color;
        context.textBaseline = 'center';
        context.textAlign = 'center';
        for (let i = 0; i < this.y; i++) {
            for (let j = 0; j < this.x; j++) {
                context.fillText(this.square[i][j], j * text_w + text_w / 2, i * text_h + text_h / 2);
            }
        }
        if (title) context.fillText(title, w / 2, canvas.height - title_h / 2);
    };
    return RandSquare;
})();