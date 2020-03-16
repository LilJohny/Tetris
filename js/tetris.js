/**
 * Adds object positions to the empty playground array
 */
function renderPositions() {
    objects.forEach(object => {
        object.position.forEach(([rowIndex, cellIndex]) => {
            playground[rowIndex][cellIndex] = TYPE_COLORS[object.type];
        });
    });
}

/**
 * Moves current active object down
 */
function moveDown() {
    let currentObject = getCurrentObject();
    currentObject.position.forEach(position => position[0] -= 1);
    playground = createPlayground();
    renderPositions();
    renderPlayground();
}
/**
 * Moves current active object right
 */
function moveRight() {
    let currentObject = getCurrentObject();
    if (!currentObject.position.some(at_right_edge)) {
        currentObject.position.forEach(position => position[1] += 1);
    }
    playground = createPlayground();
    renderPositions();
    renderPlayground();
    console.log("moving right");
}
/**
 * Moves current active object left
 */
function moveLeft() {
    let currentObject = getCurrentObject();
    if (!currentObject.position.some(at_left_edge)) {
        currentObject.position.forEach(position => position[1] -= 1);
    }
    playground = createPlayground();
    renderPositions();
    renderPlayground();
    console.log("moving left");
}
/**
 * Rotates currently active object
 */
function rotate() {
    console.log("rotating");
}
/**
 * Pauses game
 */
function pauseGame() {
    console.log("PAUSE");
    clearInterval();
}

var gameInterval = setInterval(() => {
    moveDown();
}, 1000);


const EVENT_HANDLERS = { [UP]: rotate, [DOWN]: moveDown, [LEFT]: moveLeft, [RIGHT]: moveRight };

renderPlayground();

// TODO Random rotation on create
// TODO Move left with key
// TODO Move right with key
// TODO Speed up moving down with key
// TODO Line disappearing
// TODO Fixing figures
// TODO Game over when can`t create figure
