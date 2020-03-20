document.addEventListener("keydown", event => {
    let handler_pair = EVENT_HANDLERS[event.keyCode];
    if (handler_pair === undefined) {
        console.log(`Unsupported key ${event.keyCode}`);
    } else {
        let object = handler_pair[1]();
        let handler = handler_pair[0];
        handler.call(object);
    }
});