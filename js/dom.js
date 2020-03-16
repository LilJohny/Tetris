/**
 * render DOM nodes according to the playground definition
 */
function renderPlayground() {
    renderPositions();
    let playgroundNode = document.getElementById("playground");
    playgroundNode.innerHTML = '';
    for (let rowIndex = playground.length - 1; rowIndex >= 0; rowIndex--) {
        let rowNode = createRow(rowIndex);
        for (let cellIndex = 0; cellIndex < playground[rowIndex].length; cellIndex++) {
            rowNode.appendChild(createCell(cellIndex, playground[rowIndex][cellIndex]));
        }
        playgroundNode.appendChild(rowNode);
    }
}
/**
 *  Creates <div class="row" id="row-9">
 * @param  {number} rowIndex Index of row to create
 */
function createRow(rowIndex) {
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
function createCell(cellIndex, color) {
    let cellNode = document.createElement("div");
    cellNode.setAttribute("class", `cell cell-${cellIndex} ${color}`);
    return cellNode;
}