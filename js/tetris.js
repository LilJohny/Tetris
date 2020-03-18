class Tetris {
    constructor(initial_objects) {
        this.objects = initial_objects;
        this.gameInterval = setInterval(this.gameLoop, 1000);
        this.paused = false;
        renderPlayground(this.objects);
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
            this.gameInterval = setInterval(this.gameLoop, 1000);
            paused = false;
        }
    }

    gameLoop() {
        getCurrentObject().moveDown();
        let ready_map = getPlaygroundReadyMap();
        if (ready_map.some((x) => x)) {
            let row_number = ready_map.indexOf(true);
            console.log(row_number);
            removeRow(row_number);
        }
    }
    update_playground() {
        playground = createPlayground();
        console.log(`objects: ${this.objects}`);
        renderPositions(this.objects);
        renderPlayground(this.objects);
    }
}


var tetris = new Tetris(objects);

const EVENT_HANDLERS = { [KEYS.UP]: getCurrentObject().rotate, [KEYS.DOWN]: getCurrentObject().moveDown, [KEYS.LEFT]: getCurrentObject().moveLeft, [KEYS.RIGHT]: getCurrentObject().moveRight, [KEYS.SPACE]: tetris.pauseGame };


// TODO Random rotation on create
// TODO Line disappearing
// TODO Game over when can`t create figure
// TODO Figure rotation on UP button
// TODO Figures creation
// TODO Score count
// TODO Add more figures