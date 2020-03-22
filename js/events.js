document.addEventListener("keydown", event => {
    let eventHandlers = getEventHandlers();
    let handler_pair = eventHandlers[event.keyCode];
    if (handler_pair === undefined) {
        console.log(`Unsupported key ${event.keyCode}`);
    } else {
        let object = handler_pair[1]();
        let handler = handler_pair[0];
        handler.call(object);
    }
});

function getEventHandlers() {
    return {
        [KEYS.UP]: [getCurrentObject().rotate, getCurrentObject],
        [KEYS.DOWN]: [getCurrentObject().moveDown, getCurrentObject],
        [KEYS.LEFT]: [getCurrentObject().moveLeft, getCurrentObject],
        [KEYS.RIGHT]: [getCurrentObject().moveRight, getCurrentObject],
        [KEYS.SPACE]: [tetris.pauseGame, getTetris]
    };
}