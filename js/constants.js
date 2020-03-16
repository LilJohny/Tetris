const TYPE_COLORS = {
    "L": 'red',
    "T": 'purple',
    "I": 'green'
};
const DOWN = 40;
const LEFT = 37;
const RIGHT = 39;
const PAUSE = 32;
const UP = 38;
const EVENT_HANDLERS = { UP: rotate, DOWN: moveDown, LEFT: moveLeft, RIGHT: moveRight };