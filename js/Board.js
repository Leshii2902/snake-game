function Board(x, y, $conteiner) {
    this.size_x = x;
    this.size_y = y;
    this.$conteiner = $conteiner;
}

/**
 * Рендер игрового поля
 */
Board.prototype.render = function () {
    this.$conteiner.empty();
    var $row;
    for (var i = 0; i < this.size_y; i++) {
        $row = $('<div />', {
            class: 'rows',
            y: i
        });
        for (var j = 0; j < this.size_x; j++) {
            $row.append($('<div />', {
                class: 'cell',
                x: j,
                y: i
            }));
        }
        this.$conteiner.append($row);
    }
};