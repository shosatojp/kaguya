const RandSquare = (function () {
    const RandSquare = function (x, y, title) {
        this.x = x; this.y = y; this.title = title;
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
        const wrap = document.createElement('div');
        wrap.classList.add('square_wrap');
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
        wrap.appendChild(table);
        const e_title = document.createElement('div');
        e_title.textContent = this.title || '';
        e_title.classList.add('square_title');
        wrap.appendChild(e_title);
        return wrap;
    };
    RandSquare.prototype.create_canvas = function (cw = 500, ch = 500, color = '#000') {
        const canvas = document.createElement('canvas');
        canvas.height = ch, canvas.width = cw;
        this.draw_on_canvas(canvas, cw, ch, 0, 0, color);
    };
    RandSquare.prototype.draw_on_canvas = function (canvas, sw = 500, sh = 500, origin_x = 0, origin_y = 0, color = '#000') {
        const title_h = 50;
        const h = sh - (!!this.title * title_h), w = sw;
        const context = canvas.getContext('2d');
        const text_h = h / this.y, text_w = w / this.x;
        context.fillStyle = '#fff';
        context.rect(0, 0, canvas.width, canvas.height);
        context.fill();
        context.font = Math.min(text_h, text_w) * 0.7 + 'px monospace';
        context.fillStyle = color;
        context.textBaseline = 'center';
        context.textAlign = 'center';
        context.rect(origin_x, origin_y, sw, sh);
        context.stroke();
        for (let i = 0; i < this.y; i++) {
            for (let j = 0; j < this.x; j++) {
                context.fillText(this.square[i][j], origin_x + j * text_w + text_w / 2, origin_y + 5 + i * text_h + text_h / 2);
            }
        }
        if (this.title) context.fillText(this.title, origin_x + w / 2, origin_y + sh - title_h / 2);
    };
    RandSquare.create_document = function (randsquares = [], squaresize = 500, col = 3, margin = 10) {
        const canvas = document.createElement('canvas');
        canvas.height = Math.ceil(randsquares.length / col) * squaresize + margin * 2;
        canvas.width = col * squaresize + margin * 2;
        let x = margin, y = margin;
        randsquares.forEach((rs, i) => {
            rs.draw_on_canvas(canvas, squaresize, squaresize, x, y);
            if ((i + 1) % col === 0)
                y += squaresize, x = margin;
            else
                x += squaresize;
        });
        return canvas;
    };
    return RandSquare;
})();