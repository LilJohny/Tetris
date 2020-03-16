// will add object positions to the emply playground array
function renderPositions() {
    objects.forEach(object => {
        object.position.forEach(([rowIndex, cellIndex]) => {
            playground[rowIndex][cellIndex] = TYPE_COLORS[object.type];
        });
    });
}


function moveDown(obj) {
    console.log("moving down");
    let currentObject = getCurrentObject();
    currentObject.position.forEach(position => position[0] -= 1);
    // TODO 1 get current object - done
    playground = createPlayground();
    // TODO 2 redefine objects - done
    //TODO 3 redefine clear playground
    // rerender Positions
    renderPositions();
    //5 rerender Plaground
    renderPlayground();
}

function moveRight(obj) {
    console.log("moving right");
}

function moveLeft(obj) {
    console.log("moving left");
}
function pauseGame() {
    console.log("PAUSE");
    clearInterval();
}

// function createObj() {}

//interval 1 second
var gameInterval = setInterval(() => {
    moveDown();
}, 1000);
//Events
//1. move to bottom
//2. move to right
//3. move to right
//4. move to right
//5. move to right
//6. move to right
renderPlayground();