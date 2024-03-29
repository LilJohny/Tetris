class Playground {
    constructor(height = BOARD.HEIGHT + 1, width = BOARD.RIGHT_EDGE + 1) {
        this.height = height;
        this.width = width;
        this.playgroundMap = get2dArray(this.height, this.width);
        this.static_coords = [];
    }

    clearPlaygroundMap() {
        this.playgroundMap = get2dArray(this.height, this.width);
    }

    /**
     * render DOM nodes according to the playground definition
     */
    render(objects) {
        this.renderPositions(objects);
        let playgroundNode = document.getElementById("playground");
        playgroundNode.innerHTML = '';
        for (let rowIndex = this.playgroundMap.length - 1; rowIndex >= 0; rowIndex--) {
            let rowNode = this.createRow(rowIndex);
            for (let cellIndex = 0; cellIndex < this.playgroundMap[rowIndex].length; cellIndex++) {
                rowNode.appendChild(this.createCell(cellIndex, this.playgroundMap[rowIndex][cellIndex]));
            }
            playgroundNode.appendChild(rowNode);
        }
    }

    coordEmpty(coord) {
        let playground = this;
        if (playground === undefined) {
            playground = tetris.playground;
        }
        if (coord[0] < 0 || coord[0] >= playground.height) {
            return true;
        }
        if (coord[1] < 0 || coord[1] > playground.width) {
            return true;
        }
        return playground.playgroundMap[coord[0]][coord[1]] === undefined;
    }

    renderPositions(objects) {
        objects.forEach(object => {
            object.position.forEach(([rowIndex, cellIndex]) => {
                if (this.playgroundMap[rowIndex] !== undefined) {
                    this.playgroundMap[rowIndex][cellIndex] = object.color;
                }
            });
        });
    }

    /**
     *  Creates <div class="row" id="row-9">
     * @param  {number} rowIndex Index of row to create
     */
    createRow(rowIndex) {
        let rowNode = document.createElement("div");
        rowNode.setAttribute("id", `row-${rowIndex}`);
        rowNode.setAttribute("class", "row");
        return rowNode;
    }

    /**
     *  Creates <div class="cell cell-1">1</div>
     * @param  {number} cellIndex INdex of cell to create
     * @param  {color} color Color of cell to create
     */
    createCell(cellIndex, color) {
        let cellNode = document.createElement("div");
        cellNode.setAttribute("class", `cell cell-${cellIndex} ${color}`);
        return cellNode;
    }

    /**
     * Displays score
     * @param  {number} score Score that will be displayed
     */
    setScore(score) {
        let playgroundNode = document.getElementById("score");
        playgroundNode.innerText = `Your Score: ${score}`;
    }

    destroyCompletedRow(rowInd) {
        tetris.objects.forEach(element => {
            element.position = element.position.filter(coords => coords[0] !== rowInd);
        });
        tetris.update_playground();
        this.moveDownAboveCoords(rowInd);
        tetris.update_playground();
    }

    moveDownAboveCoords(rowInd) {
        for (let i = 0; i < tetris.objects.length; i++) {
            const element = tetris.objects[i];
            for (let i = 0; i < element.position.length; i++) {
                let coords = element.position[i];
                if (coords[0] > rowInd) {
                    coords[0] -= 1;
                }
            }
        }
    }

    moveDownStatic() {
        let staticObjects = tetris.objects.filter(object => object.state === STATES.STATIC);
        staticObjects = staticObjects.filter(object => object.position.every(can_be_moved_down));
        staticObjects.forEach(object => object.move(MOVE_VECTORS.DOWN, true));
        tetris.update_playground();
    }

    getPlaygroundReadyMap() {
        let result = [];
        for (let i = 0; i < this.playgroundMap.length; i++) {
            const row = this.playgroundMap[i];
            let fl = true;
            for (let i = 0; i < row.length; i++) {
                const element = row[i];
                if (element === undefined) {
                    fl = false;
                    break;
                }
            }
            result.push(fl);
        }
        return result;
    }

    gameOver() {
        let gameStateNode = document.getElementById("game_state");
        gameStateNode.innerText = "Game Over";
    }

    checkRowCompleted(ready_map) {
        let row_number = ready_map.indexOf(true);
        let coords_to_remove = [];
        for (let i = 0; i <= BOARD.RIGHT_EDGE; ++i) {
            coords_to_remove.push([row_number, i]);
        }
        let fl = true;
        for (let i = 0; i < coords_to_remove.length; ++i) {
            if (!arrayInArray(coords_to_remove[i])) {
                fl = false;
                break;
            }
        }
        return fl === true ? row_number : undefined;
    }

    correct_side_borders(coords) {
        return (coords[1] <= BOARD.RIGHT_EDGE && coords[1] >= BOARD.LEFT_EDGE);
    }
}
