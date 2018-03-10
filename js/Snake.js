function Snake(board) {
   this.body = [];         // тело змейки, содержит координаты клеток
   this.direction = 'y+';  // направление движения змейки
   this.board = board;     // игровое поле
   this.food_amount = 0;   // количество съеденной еды
}

/**
 * Рендер новой змейки по указанным координатам
 * @param x
 * @param y
 */
Snake.prototype.respawn = function (x, y) {
    this.body.push([x, y]);
    this.body.push([x, y + 1]);
    for (var i = 0; i < this.body.length; i++) {
        $('div[x=' + this.body[i][0] + '][y=' + this.body[i][1] + ']').addClass('snake');
    }
    return this.body;
};

/**
 * Обработка шага змейки
 * Если змейка упирается в стенку, переход на противоположный край поля
 * Если змейка упирается в саму себя или в препятствие, возвращает false
 * Если змейка попадает на еду, к ней добавляется один элемент, возвращает this.food_amount
 * Если змейка попадает на путую клетку, возвращает true
 * @returns {*}
 */
Snake.prototype.move = function () {
    var new_unit;
    var head_x = this.body[0][0];
    var head_y = this.body[0][1];
    var last_elem;

    if (this.direction === 'y+') {
        new_unit = [head_x, head_y - 1];
    } else if (this.direction === 'x+') {
        new_unit = [head_x + 1, head_y];
    } else if (this.direction === 'y-') {
        new_unit = [head_x, head_y + 1];
    } else {
        new_unit = [head_x - 1, head_y];
    }


    var $new_elem = $('div[x=' + new_unit[0] + '][y=' + new_unit[1] + ']');

    if (!$new_elem[0]) {
        new_unit = this.relocate(new_unit);
        $new_elem = $('div[x=' + new_unit[0] + '][y=' + new_unit[1] + ']');
    }

    if (!$new_elem.hasClass('snake') && !$new_elem.hasClass('obstacle')) {
        this.body.unshift(new_unit);
        $('div[x=' + this.body[0][0] + '][y=' + this.body[0][1] + ']').addClass('snake');
        if($new_elem.hasClass('food')) {
            this.food_amount++;
            $new_elem.removeClass('food');
            return this.food_amount;
        } else {
            last_elem = this.body.pop();
            $('div[x=' + last_elem[0] + '][y=' + last_elem[1] + ']').removeClass('snake');
        }
    } else {
        return false;
    }

    return true;
};


/**
 * Переход на противоположный край игрового поля
 * @param new_unit - расчетная новая клетка
 * @returns {*} - возвращает координаты новой клетки на противоположном краю поля
 */
Snake.prototype.relocate = function (new_unit) {
    var relocate_unit;
    switch (this.direction) {
        case 'y+': relocate_unit = [new_unit[0], this.board.size_y - 1];
                   break;
        case 'x+': relocate_unit = [0, new_unit[1]];
                   break;
        case 'y-': relocate_unit = [new_unit[0], 0];
                   break;
        case 'x-': relocate_unit = [this.board.size_x - 1, new_unit[1]];
                   break;
    }
    return relocate_unit;

};

/**
 * Изменение направления движения змейки
 * @param keyCode
 */
Snake.prototype.changeDirection = function (keyCode) {
    switch (keyCode) {
        case 38: if (this.direction !== 'y-') {this.direction = 'y+'}
                 break;
        case 39: if (this.direction !== 'x-') {this.direction = 'x+'}
                 break;
        case 40: if (this.direction !== 'y+') {this.direction = 'y-'}
                 break;
        case 37: if (this.direction !== 'x+') {this.direction = 'x-'}
                 break;
    }
    return this.direction;
};