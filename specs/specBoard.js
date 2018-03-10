describe('Проверка класса Board', function () {
    var board = new Board(20, 20, $('.conteiner'));
    it('Проверка размера X', function () {
        expect(board.size_x).toBe(20);
    });
    it('Проверка размера Y', function () {
        expect(board.size_y).toBe(20);
    });
});


