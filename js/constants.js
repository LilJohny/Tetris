const KEYS = {DOWN: 40, LEFT: 37, RIGHT: 39, SPACE: 32, UP: 38};

const STATES = {FALLING: "falling", STATIC: "static"};

const BOARD = {HEIGHT: 9, RIGHT_EDGE: 4, LEFT_EDGE: 0};

const LINE_PRICE = 100;

const ROTATION_NUMBER = [1, 2, 3, 4];
const OFFSETS = [1, 2];
const MOVE_VECTORS = {
    DOWN: [-1, 0],
    RIGHT: [0, 1],
    LEFT: [0, -1]
};