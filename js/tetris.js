class Tetris {
    constructor(initial_objects = []) {
        this.objects = initial_objects;
        this.paused = true;
        this.score = 0;
        this.playground = new Playground();
        this.playground.render(this.objects);
    }

    createNewTile() {
        let tileType = getRandomValue(figureType);
        let position = initialPositions[tileType];
        let actualPosition = JSON.parse(JSON.stringify(position));
        let tile = new tileType(actualPosition, STATES.FALLING);

        let rotations = getRandomValue(ROTATION_NUMBER);
        for (let i = 0; i < rotations; i++) {
            tile.rotate(false);
        }
        let offset = getRandomValue(this.getAvailableOffsets(tile));
        tile.move([0, offset], true, false);
        if (tile.position.some((coords) => !this.playground.coordEmpty(coords))) {
            this.gameOver();
        }
        this.objects.push(tile);
        this.update_playground();
    }

    getAvailableOffsets(tile) {
        let availableOffsets = [];
        for (let i = 0; i < OFFSETS.length; i++) {
            let offset = OFFSETS[i];
            let moved = [];
            for (let j = 0; j < tile.position.length; j++) {
                let coords = tile.position[j];
                moved.push([coords[0], coords[1] + offset]);
            }
            if (moved.every(this.playground.coordEmpty) && moved.every(this.playground.correct_side_borders)) {
                availableOffsets.push(offset);
            }
        }
        return availableOffsets;
    }

    update_playground() {
        this.playground.clearPlaygroundMap();
        this.playground.render(this.objects);
    }

    startGame() {
        if (this.objects.length === 0) {
            this.createNewTile();
        }
        this.gameInterval = setInterval(gameLoop, 1000);
        this.paused = false;
    }

    /**
     * Pauses game
     */
    pauseGame() {
        if (!this.paused) {
            this.paused = true;
            clearInterval(this.gameInterval);
        } else {
            this.startGame();
        }
    }

    gameOver() {
        this.pauseGame();
        this.playground.gameOver();
    }


}

var tetris = new Tetris();

tetris.startGame();


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
        tetris.playground.moveDownStatic();
    }
}


function getTetris() {
    return tetris;
}

