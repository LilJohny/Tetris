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
    let falling = currentObject.state === "falling";
    let movable_down = currentObject.position.every(can_be_moved_down);
    if (falling && movable_down) {
        currentObject.position.forEach(position => position[0] -= 1);
    }
    if (!movable_down) {
        currentObject.state = STATES.STATIC;
    }

    playground = createPlayground();
    renderPositions();
    renderPlayground();
}
/**
 * Moves current active object right
 */
function moveRight() {
    let currentObject = getCurrentObject();
    let falling = currentObject.state === "falling";
    let movable_right = !currentObject.position.some(at_right_edge);
    if (falling && movable_right && !paused) {
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
    let falling = currentObject.state === "falling";
    let movable_left = !currentObject.position.some(at_left_edge);
    if (falling && movable_left && !paused) {
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
    let currentObject = getCurrentObject();
    console.log(currentObject);
    let new_position = [];
    for (let i = 0; i < currentObject.position.length; i++) {
        const element = currentObject.position[i];
        const new_element = [element[1], element[0]];
        new_position.push(new_element);
    }
    currentObject.position = new_position;
    console.log(currentObject);
    playground = createPlayground();
    renderPositions();
    renderPlayground();
    console.log("rotating");
}
/**
 * Pauses game
 */
function pauseGame() {
    if (!paused) {
        paused = true;
        clearInterval(gameInterval);
    } else {
        gameInterval = setInterval(gameLoop, 1000);
        paused = false;
    }
}

var gameInterval = setInterval(gameLoop, 1000);

function gameLoop() {
    moveDown();
    let ready_map = getPlaygroundReadyMap();
    if (ready_map.some()) {
        let row_number = ready_map.indexOf(true);
        
    }
}

function getPlaygroundReadyMap() {
    let result = [];
    for (let i = 0; i < playground.length; i++) {
        const row = playground[i];
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


const EVENT_HANDLERS = { [KEYS.UP]: rotate, [KEYS.DOWN]: moveDown, [KEYS.LEFT]: moveLeft, [KEYS.RIGHT]: moveRight, [KEYS.SPACE]: pauseGame };

renderPlayground();

// TODO Random rotation on create
// TODO Line disappearing
// TODO Game over when can`t create figure
// TODO Figure rotation on UP button
// TODO Figures creation
// TODO Score count
// TODO Add more figures