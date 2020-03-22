class Tetris {
    constructor(initial_objects) {
        this.objects = initial_objects;
        this.gameInterval = setInterval(gameLoop, 1000);
        this.paused = false;
        this.score = 0;
        this.playground = new Playground();
        if (initial_objects.length === 0) {
            this.createNewTile();
        }
        this.playground.render(this.objects);
    }

    /**
     * Pauses game
     */
    pauseGame() {
        if (!this.paused) {
            this.paused = true;
            clearInterval(this.gameInterval);
        } else {
            this.gameInterval = setInterval(gameLoop, 1000);
            this.paused = false;
        }
    }

    createNewTile() {
        let tileType = getRandomValue(figureType);
        let position = (initialPositions[tileType])[0];
        let actualPosition = JSON.parse(JSON.stringify(position));
        let tile = new tileType(actualPosition, STATES.FALLING);
        if (actualPosition.some((coords) => this.playground.playgroundMap[coords[0]][coords[1]] !== undefined)) {
            this.gameOver();
        }
        let rotations = getRandomValue(ROTATION_NUMBER);
        this.objects.push(tile);
        this.update_playground();
    }

    gameOver() {
        this.pauseGame();
        this.playground.gameOver();
    }

    update_playground() {
        this.playground = new Playground();
        this.playground.render(this.objects);
    }
}

function gameLoop() {
    getCurrentObject().moveDown();
    if (getCurrentObject() === undefined) {
        tetris.createNewTile();
    }

    let ready_map = tetris.playground.getPlaygroundReadyMap();
    let row_number;
    if (ready_map.some((x) => x)) {
        row_number = tetris.playground.checkRowCompleted(ready_map);
    }
    if (row_number !== undefined) {
        tetris.playground.destroyCompletedRow(row_number, tetris);
        tetris.score += LINE_PRICE;
        tetris.playground.setScore(tetris.score);
    }
}

var tetris = new Tetris([]);


function getTetris() {
    return tetris;
}

let EVENT_HANDLERS = {
    [KEYS.UP]: [getCurrentObject().rotate, getCurrentObject],
    [KEYS.DOWN]: [getCurrentObject().moveDown, getCurrentObject],
    [KEYS.LEFT]: [getCurrentObject().moveLeft, getCurrentObject],
    [KEYS.RIGHT]: [getCurrentObject().moveRight, getCurrentObject],
    [KEYS.SPACE]: [tetris.pauseGame, getTetris]
};


// TODO Random rotation on create
// TODO Refactoring