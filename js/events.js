document.addEventListener("keydown", event => {
    let handler = EVENT_HANDLERS[event.keyCode];
    if (handler === undefined) {
        console.log(`Unsupported key ${event.keyCode}`);
        console.log(Object.entries(EVENT_HANDLERS));
    } else {
        handler();
    }
});