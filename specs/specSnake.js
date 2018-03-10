describe('Проверка класса Snake', function () {
    var board = new Board(20, 20, $('.conteiner'));
    var snake = new Snake(board);
    it('Проверка свойств', function () {
        expect(snake.body.length).toBe(0);
        expect(snake.direction).toMatch(/[yx][+-]/);
        expect(snake.board).toBe(board);
        expect(snake.food_amount).toMatch(/\d+/);
    });
    it('Проверка метода respawn', function () {
        expect(snake.respawn(10, 10).length).toBe(2);
    });
    it('Проверка метода move', function () {
        expect(snake.move).toBeTruthy();
    });
    it('Проверка метода relocate', function () {
        expect(snake.relocate([5, 0])).toEqual([5, 19]);
    });
    it('Проверка метода changeDirection', function () {
        expect(snake.changeDirection(37)).toBe('x-');
    })
});