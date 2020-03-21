class Tetris {
    constructor(initial_objects) {
        this.objects = initial_objects;
        this.gameInterval = setInterval(gameLoop, 1000);
        this.paused = false;
        this.score = 0;
        this.static_coords = [];
        this.objects.forEach(object => {
            if (object.state === STATES.STATIC) {
                this.static_coords.push(...object.position);
            }
        });
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
    let ready_map = getPlaygroundReadyMap();
    if (ready_map.some((x) => x)) {
        let row_number = ready_map.indexOf(true);
        let coords_to_remove = [];
        for (let i = 0; i <=BOARD.RIGHT_EDGE;++i){
            coords_to_remove.push([row_number, i]);
        }
        console.log(coords_to_remove.every(arrayInArray));
        if(coords_to_remove.every(arrayInArray)) {
            playground.removeRow(row_number, tetris);
        }
        tetris.score += LINE_PRICE;
        playground.setScore(tetris.score);
    }
}


var tetris = new Tetris(objects);

function getTetris() {
    return tetris;
}
const EVENT_HANDLERS = { [KEYS.UP]: [getCurrentObject().rotate, getCurrentObject], [KEYS.DOWN]: [getCurrentObject().moveDown, getCurrentObject], [KEYS.LEFT]: [getCurrentObject().moveLeft, getCurrentObject], [KEYS.RIGHT]: [getCurrentObject().moveRight, getCurrentObject], [KEYS.SPACE]: [tetris.pauseGame, getTetris] };


// TODO Random rotation on create
// TODO Game over when can`t create figure
// TODO Figure rotation on UP button
// TODO Figures creation
// TODO Refactoring