class Tetris {
    constructor(initial_objects = []) {
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

    createNewTile() {
        let tileType = getRandomValue(figureType);
        let position = (initialPositions[tileType])[0];
        let actualPosition = JSON.parse(JSON.stringify(position));
        let tile = new tileType(actualPosition, STATES.FALLING);
        if (actualPosition.some((coords) => !this.playground.coordEmpty(coords))) {
            this.gameOver();
        }
        let rotations = getRandomValue(ROTATION_NUMBER);
        this.objects.push(tile);
        this.update_playground();
    }

    update_playground() {
        this.playground.clearPlaygroundMap();
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

    gameOver() {
        this.pauseGame();
        this.playground.gameOver();
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


var tetris = new Tetris();


function getTetris() {
    return tetris;
}


// TODO Random rotation on create
// TODO Refactoring