class Playground {
    constructor(height = 10, width = 5) {
        this.playgroundMap = new Array(height).fill().map(el => (new Array(width).fill()));
        this.static_coords = [];
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

    renderPositions(objects) {
        objects.forEach(object => {
            object.position.forEach(([rowIndex, cellIndex]) => {
                if (this.playgroundMap[rowIndex] === undefined) {
                    console.log(`undefined row ${rowIndex}`);
                    console.log(object);
                }
                if (rowIndex <= BOARD.HEIGHT) {
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

    destroyCompletedRow(rowInd, tetrisObj) {
        tetrisObj.objects.forEach(element => {
            element.position = element.position.filter(coords => coords[0] !== rowInd);
        });
        console.log(` row destroyed ${rowInd}`);
        tetrisObj.update_playground();
        for (let i = 0; i < tetrisObj.objects.length; i++) {
            const element = tetrisObj.objects[i];
            for (let i = 0; i < element.position.length; i++) {
                let coords = element.position[i];
                if (coords[0] > rowInd) {
                    coords[0] -= 1;
                }
            }
        }
        tetrisObj.update_playground();
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

    checkRowCompleted(ready_map) {
        let row_number = ready_map.indexOf(true);
        let coords_to_remove = [];
        for (let i = 0; i <= BOARD.RIGHT_EDGE; ++i) {
            coords_to_remove.push([row_number, i]);
        }
        let fl = true;
        console.log("static");
        console.log(tetris.playground.static_coords);
        for (let i = 0; i < coords_to_remove.length; ++i) {
            if (!arrayInArray(coords_to_remove[i])) {
                fl = false;
                break;
            }
        }
        return fl === true ? row_number : undefined;
    }
}
