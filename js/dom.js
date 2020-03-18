/**
 * render DOM nodes according to the playground definition
 */
function renderPlayground(objects) {
    renderPositions(objects);
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
function renderPositions(objects) {
    objects.forEach(object => {
        object.position.forEach(([rowIndex, cellIndex]) => {
            playground[rowIndex][cellIndex] = TYPE_COLORS[object.type];
        });
    });
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
/**
 * Function removes row from playground
 * @param  {number} rowInd - index of row to remove
 */
function removeRow(rowInd) {
    let playgroundNode = document.getElementById("playground");
    let childNodes = playgroundNode.childNodes;
    let row = childNodes[childNodes.length - rowInd - 1];
    console.log(row);
    playgroundNode.removeChild(row);
    
    //playgroundNode.removeChild(child);
}