$(document).ready(function () {
    var SIZE_X = 20,
        SIZE_Y = 20;

    var game = new Game(SIZE_X, SIZE_Y, $('.board_conteiner'));

    game.render();

    $('.start').on('click', function () {
        game.startGame();
    });
    $('.stop').on('click', function () {
        if (game.status_game !== 'stop' && confirm('Закончить текущую игру?')) {
            game.stop();
        }
    });
    $('.pause').on('click', function () {
        game.pauseOn();
    });


    $(document).on('keydown', function (e) {
        game.eventKeydown(e.keyCode);
    });

    $(document).on('keyup', function (e) {
        if (e.keyCode === 80) {
            game.pauseOn();
        } else if (e.keyCode === 71) {
            game.startGame();
        } else if (e.keyCode === 83) {
            if (game.status_game !== 'stop' && confirm('Закончить текущую игру?')) {
                game.stop();
            }
        }
    });

});