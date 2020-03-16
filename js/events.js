document.addEventListener("keydown", event => {
    let handler = EVENT_HANDLERS[event.keyCode];
    if (handler === undefined) {
        console.log("Unsupported key");
    } else {
        handler();
    }
});