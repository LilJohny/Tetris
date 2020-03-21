class Tetris {
    constructor(initial_objects) {
        this.objects = initial_objects;
        this.gameInterval = setInterval(gameLoop, 1000);
        this.paused = false;
        this.score = 0;
        playground.render(this.objects);
    }

    /**
     * Pauses game
     */
    pauseGame() {
        console.log("Pause");
        if (!this.paused) {
            this.paused = true;
            clearInterval(this.gameInterval);
        } else {
            this.gameInterval = setInterval(gameLoop, 1000);
            this.paused = false;
        }
    }

    update_playground() {
        playground = createPlayground();
        playground.render(this.objects);
    }
}

function gameLoop() {
    getCurrentObject().moveDown();
    tetris.objects.forEach(object => {
        if (object.state === STATES.STATIC) {
            playground.static_coords.push(...object.position);
        }
    });
    let ready_map = playground.getPlaygroundReadyMap();
    let row_number;
    if (ready_map.some((x) => x)) {
        row_number = playground.checkRowCompleted(ready_map);
    }
    if (row_number !== undefined) {
        playground.destroyCompletedRow(row_number, tetris);
        console.log(tetris.score);
        tetris.score += LINE_PRICE;
        console.log(tetris.score);
        playground.setScore(tetris.score);
    }
}


var tetris = new Tetris(objects);

function getTetris() {
    return tetris;
}

const EVENT_HANDLERS = {
    [KEYS.UP]: [getCurrentObject().rotate, getCurrentObject],
    [KEYS.DOWN]: [getCurrentObject().moveDown, getCurrentObject],
    [KEYS.LEFT]: [getCurrentObject().moveLeft, getCurrentObject],
    [KEYS.RIGHT]: [getCurrentObject().moveRight, getCurrentObject],
    [KEYS.SPACE]: [tetris.pauseGame, getTetris]
};


// TODO Random rotation on create
// TODO Game over when can`t create figure
// TODO Figure rotation on UP button
// TODO Figures creation
// TODO Refactoring