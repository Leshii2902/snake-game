describe('Проверка класса Game', function () {
    var $cont = $('.conteiner');
    var size_x = 20;
    var size_y = 20;
    var game = new Game(size_x, size_y, $cont);
    it('Проверка свойств', function () {
        expect(game.level).toBe(0);
        expect(game.board).toEqual({});
        expect(game.size_x).toBe(size_x);
        expect(game.size_y).toBe(size_y);
        expect(game.$conteiner).toBe($cont);
        expect(game.snake).toEqual({});
        expect(game.snake_speed).toBe(0);
        expect(game.snake_interval).toBe(0);
        expect(game.food_interval).toBe(0);
        expect(game.food_time).toBe(2000);
        expect(game.obstacle_interval).toBe(0);
        expect(game.obstacle_time).toBe(1000);
        expect(game.status_game).toBe('stop');
    });

    var board = new Board(size_x, size_y, $cont);
    var snake = new Snake(board);

    it('Проверка метода render', function () {
        game.render();
        expect(game.snake_speed).toBe(300);
        expect(Object.keys(game.board).length).toBe(Object.keys(board).length);
        expect(Object.keys(game.snake).length).toBe(Object.keys(snake).length);
    });


    it('Проверка метода pause', function () {
        game.pauseOn();
        expect(game.status_game).toBe('pause');
    });

});