class Playground {
    constructor(height, width) {
        this.playgroundMap = new Array(height).fill().map(el => (new Array(width).fill()));
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
}


function createPlayground(height=10, width=5){
    return new Playground(height,width);
}
var playground = createPlayground();

