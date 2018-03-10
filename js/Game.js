function Game(x, y, $conteiner) {
    this.level = 0;                 // уровень игры
    this.board = {};                // объект игрового поля
    this.size_x = x;                // размеры игрового поля
    this.size_y = y;
    this.$conteiner = $conteiner;   // html-элемент, содержащий игровое поле
    this.snake = {};                // объект змейки
    this.snake_speed = 0;           // скорость змейки
    this.snake_interval = 0;        // setInterval передвижения змейки
    this.food_interval = 0;         // setInterval появления еды
    this.food_time = 2000;          // время появления еды
    this.obstacle_interval = 0;     // setInterval появления препятствий
    this.obstacle_time = 1000;      // время появления препятствий
    this.status_game = 'stop';      // статус игры
}


/**
 * Рендеринг новой игры.
 * Обнуляет значения очков, уровня игры и скорости змейки.
 * Создает объект игрового поля объект змейки, рендерит поле указанного размера в указанном html-блоке.
 */
Game.prototype.render = function () {
    $('.score').text(0);
    this.level = 1;
    $('.level').text(this.level);
    this.snake_speed = 300;
    this.board = new Board(this.size_x, this.size_y, this.$conteiner);
    this.snake = new Snake(this.board);
    this.board.render();
};

/**
 * Старт игры
 * Статус игры: stop - начинает новую игру
 * Статус игры: game - прерывает текущую игру и начинает новую
 * Статус игры: pause - выключает паузу и продолжает текущую игру
 */
Game.prototype.startGame = function () {
    if (this.status_game === 'stop') {
        this.snake.respawn(Math.floor(this.size_x/2), Math.floor(this.size_y/2));
        this.start();
    } else if (this.status_game === 'game') {
        if (!confirm('Закончить текущую игру и начать новую?')) return;
        this.stop();
        this.snake.respawn(Math.floor(this.size_x/2), Math.floor(this.size_y/2));
        this.start();
    } else if (this.status_game === 'pause') {
        $('.pause_status').css('opacity', 0);
        this.start();
    }
};

/**
 * Начало движения змейки
 */
Game.prototype.start = function () {

    this.status_game = 'game';

    var gamePlay = this.gamePlay.bind(this);
    var createFood = this.createFood.bind(this);
    var createObstacle = this.createObstacle.bind(this);

    this.snake_interval = setInterval(gamePlay, this.snake_speed);
    this.food_interval = setInterval(createFood, this.food_time);
    this.obstacle_interval = setInterval(createObstacle, this.obstacle_time);
};


/**
 * Стоп-игра, вывод набранных очко и достигнутого уровня
 */
Game.prototype.stop = function () {
    this.status_game = 'stop';
    $('.pause_status').css('opacity', 0);
    clearInterval(this.snake_interval);
    clearInterval(this.food_interval);
    clearInterval(this.obstacle_interval);
    alert('Игра окончена! Очки: ' + this.snake.food_amount + '. Уровень: ' + this.level + '.');
    this.render();
};

/**
 * Пауза
 */
Game.prototype.pauseOn = function () {
    this.status_game = 'pause';
    $('.pause_status').css('opacity', 1);
    clearInterval(this.snake_interval);
    clearInterval(this.food_interval);
    clearInterval(this.obstacle_interval);
};

/**
 * Обработка события нажатия кнопки для изменения направления даижения змейки
 * @param keyCode - код нажатой кнопки
 */
Game.prototype.eventKeydown = function (keyCode) {
    this.snake.changeDirection(keyCode);
};


/**
 * Шаг змейки
 * Если змейка упирается в саму себя или препятствие игра прекращается,
 * иначе, если змейка попадает на еду, запускается метод контроля уровня игры
 */
Game.prototype.gamePlay = function () {
    var move = this.snake.move();
    if (!move) {
        this.stop();
    } else if (typeof  move === "number") {
        $('.score').text(this.snake.food_amount);
        this.levelUp();
    }
};

/**
 * Создание еды
 * Единовременно создается только одна еда
 */
Game.prototype.createFood = function () {
    if (!$('.food').length) {
        var food_x = Math.floor(Math.random() * this.size_x);
        var food_y = Math.floor(Math.random() * this.size_y);
        var $elem = $('div[x=' + food_x + '][y=' + food_y + ']');
        if (!$elem.hasClass('snake') && !$elem.hasClass('obstacle')) {
            $elem.addClass('food');
        }
    }
};

/**
 * Создание препятствий
 * Единовременно имеется до трех препятствий,
 * если их уже три, любое случайное из них удаляется,
 * затем в случайном месте создается новое
 */
Game.prototype.createObstacle = function () {
    var $obstacle_elem = $('.obstacle');
    if ($obstacle_elem.length < 3) {
        var obstacle_x = Math.floor(Math.random() * this.size_x);
        var obstacle_y = Math.floor(Math.random() * this.size_y);
        var $elem = $('div[x=' + obstacle_x + '][y=' + obstacle_y + ']');
        if (!$elem.hasClass('snake') && !$elem.hasClass('food')) {
            $elem.addClass('obstacle');
        }
    } else {
        var num = Math.floor(Math.random() * ($obstacle_elem.length));
        $($obstacle_elem[num]).removeClass('obstacle');
    }
};

/**
 * Контроль уровня игры
 * Уровень повышается каждые три съеденные единицы еды
 * С повышением уровня уменьшается время шага змейки на 10 мс
 * Когда время шага достигает минимального положительного, его уменьшение прекращается,
 * также прекращается повышение уровня
 */
Game.prototype.levelUp = function () {
    if (this.snake.food_amount !== 0 && this.snake.food_amount%3 === 0) {
        var new_speed = this.snake_speed - 10;
        if (new_speed > 0) {
            this.snake_speed = new_speed;
            this.level++;
            $('.level').text(this.level);
            clearInterval(this.snake_interval);
            var gamePlay = this.gamePlay.bind(this);
            this.snake_interval = setInterval(gamePlay, this.snake_speed);
        }
    }
};