document.addEventListener("keydown", event => {
    let EVENT_HANDLERS = {
        [KEYS.UP]: [getCurrentObject().rotate, getCurrentObject],
        [KEYS.DOWN]: [getCurrentObject().moveDown, getCurrentObject],
        [KEYS.LEFT]: [getCurrentObject().moveLeft, getCurrentObject],
        [KEYS.RIGHT]: [getCurrentObject().moveRight, getCurrentObject],
        [KEYS.SPACE]: [tetris.pauseGame, getTetris]
    };
    let handler_pair = EVENT_HANDLERS[event.keyCode];
    if (handler_pair === undefined) {
        console.log(`Unsupported key ${event.keyCode}`);
    } else {
        let object = handler_pair[1]();
        console.log(`active object ${object.type}`);
        let handler = handler_pair[0];
        handler.call(object);
    }
});