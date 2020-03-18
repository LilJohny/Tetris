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
            removeRow(row_number);
        }
    }
    update_playground() {
        playground = createPlayground();
        renderPositions(this.objects);
        renderPlayground(this.objects);
    }
}

function removeRow(rowInd) {
    tetris.objects.forEach(element => {
        element.position = element.position.filter(coords => coords[0] != rowInd);
    });
    console.log("objects: ");
    console.log(tetris.objects);
    console.log(getCurrentObject());
    tetris.update_playground();
    for (let i = 0; i < tetris.objects.length; i++) {
        const element = tetris.objects[i];
        element.position.forEach(coords => coords[0] -= 1);
    }
    tetris.update_playground();
}


var tetris = new Tetris(objects);

const EVENT_HANDLERS = { [KEYS.UP]: getCurrentObject().rotate, [KEYS.DOWN]: getCurrentObject().moveDown, [KEYS.LEFT]: getCurrentObject().moveLeft, [KEYS.RIGHT]: getCurrentObject().moveRight, [KEYS.SPACE]: tetris.pauseGame };


// TODO Random rotation on create
// TODO Game over when can`t create figure
// TODO Figure rotation on UP button
// TODO Figures creation
// TODO Score count
// TODO Add more figures