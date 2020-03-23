class tileI extends Tile {

    constructor(coordinates, figure_state) {
        super("I", coordinates, figure_state);
        this.color = "green";
    }

    static transformations() {
        return {
            [0]: {
                0: (coords) => [coords[0] + 2, coords[1] + 2],
                1: (coords) => [coords[0] + 1, coords[1] + 1],
                2: (coords) => coords,
                3: (coords) => [coords[0] - 1, coords[1] - 1]
            },
            [1]: {
                0: (coords) => [coords[0] - 2, coords[1] - 2],
                1: (coords) => [coords[0] - 1, coords[1] - 1],
                2: (coords) => coords,
                3: (coords) => [coords[0] + 1, coords[1] + 1]
            }
        };
    }

    static rotationChangeFunc() {
        return (rotation) => rotation === 0 ? 1 : 0;
    }
}

class tileJ extends Tile {
    constructor(coordinates, figure_state) {
        super("J", coordinates, figure_state);
        this.color = "yellow";
    }


    static transformations() {
        return {
            [0]: {
                0: (coords) => [coords[0] + 1, coords[1] + 1],
                1: (coords) => coords,
                2: (coords) => [coords[0] - 1, coords[1] - 1],
                3: (coords) => [coords[0], coords[1] - 2]
            },
            [1]: {
                0: (coords) => [coords[0] - 1, coords[1] - 1],
                1: (coords) => coords,
                2: (coords) => [coords[0] + 1, coords[1] + 1],
                3: (coords) => [coords[0] + 2, coords[1]]
            },
            [2]: {
                0: (coords) => [coords[0] + 1, coords[1] + 1],
                1: (coords) => coords,
                2: (coords) => [coords[0] - 1, coords[1] - 1],
                3: (coords) => [coords[0], coords[1] + 2]
            },
            [3]: {
                0: (coords) => [coords[0] - 1, coords[1] - 1],
                1: (coords) => coords,
                2: (coords) => [coords[0] + 1, coords[1] + 1],
                3: (coords) => [coords[0] - 2, coords[1]]
            },
        };
    }

    static rotationChangeFunc() {
        return (rotation) => rotation === 3 ? 0 : rotation + 1;
    }

}

class tileL extends Tile {
    constructor(coordinates, figure_state) {
        super("L", coordinates, figure_state);
        this.color = "red";
    }

    static transformations() {
        return {
            [0]: {
                0: (coords) => [coords[0] + 1, coords[1] + 1],
                1: (coords) => coords,
                2: (coords) => [coords[0] - 1, coords[1] - 1],
                3: (coords) => [coords[0] + 2, coords[1]]
            },
            [1]: {
                0: (coords) => [coords[0] - 1, coords[1] - 1],
                1: (coords) => coords,
                2: (coords) => [coords[0] + 1, coords[1] + 1],
                3: (coords) => [coords[0], coords[1] + 2]
            },
            [2]: {
                0: (coords) => [coords[0] + 1, coords[1] + 1],
                1: (coords) => coords,
                2: (coords) => [coords[0] - 1, coords[1] - 1],
                3: (coords) => [coords[0] - 2, coords[1]]
            },
            [3]: {
                0: (coords) => [coords[0] - 1, coords[1] - 1],
                1: (coords) => coords,
                2: (coords) => [coords[0] + 1, coords[1] + 1],
                3: (coords) => [coords[0], coords[1] - 2]
            }
        };
    }

    static rotationChangeFunc() {
        return (rotation) => rotation === 3 ? 0 : rotation + 1;
    }


}

class tileO extends Tile {
    constructor(coordinates, figure_state) {
        super("O", coordinates, figure_state);
        this.color = "fuchsia";
    }

    rotate(updatePlayground = true) {
        if (updatePlayground === true) {
            tetris.update_playground();
        }
    }
}

class tileS extends Tile {
    constructor(coordinates, figure_state) {
        super("S", coordinates, figure_state);
        this.color = "teal";
    }

    static transformations() {
        return {
            [0]: {
                0: (coords) => [coords[0], coords[1] + 1],
                1: (coords) => [coords[0] - 1, coords[1]],
                2: (coords) => [coords[0] + 2, coords[1] + 1],
                3: (coords) => [coords[0] + 1, coords[1]]
            },
            [1]: {
                0: (coords) => [coords[0], coords[1] - 1],
                1: (coords) => [coords[0] + 1, coords[1]],
                2: (coords) => [coords[0] - 2, coords[1] - 1],
                3: (coords) => [coords[0] - 1, coords[1]]
            }
        };
    }

    static rotationChangeFunc() {
        return (rotation) => rotation === 1 ? 0 : 1;
    }
}

class tileT extends Tile {
    constructor(coordinates, figure_state) {
        super("T", coordinates, figure_state);
        this.color = "purple";
    }

    static transformations() {
        return {
            [0]: {
                0: (coords) => [coords[0] + 1, coords[1] + 1],
                1: (coords) => coords,
                2: (coords) => [coords[0] - 1, coords[1] - 1],
                3: (coords) => [coords[0] + 1, coords[1] - 1]
            },
            [1]: {
                0: (coords) => [coords[0] - 1, coords[1] - 1],
                1: (coords) => coords,
                2: (coords) => [coords[0] + 1, coords[1] + 1],
                3: (coords) => [coords[0] + 1, coords[1] + 1]
            },
            [2]: {
                0: (coords) => [coords[0] + 1, coords[1] + 1],
                1: (coords) => coords,
                2: (coords) => [coords[0] - 1, coords[1] - 1],
                3: (coords) => [coords[0] - 1, coords[1] + 1]
            },
            [3]: {
                0: (coords) => [coords[0] - 1, coords[1] - 1],
                1: (coords) => coords,
                2: (coords) => [coords[0] + 1, coords[1] + 1],
                3: (coords) => [coords[0] - 1, coords[1] - 1]
            }
        };
    }

    static rotationChangeFunc() {
        return (rotation) => rotation === 3 ? 0 : rotation + 1;
    }
}

class tileZ extends Tile {
    constructor(coordinates, figure_state) {
        super("Z", coordinates, figure_state);
        this.color = "aqua";
    }

    static transformations() {
        return {
            [0]: {
                0: (coords) => [coords[0] + 1, coords[1] + 2],
                1: (coords) => [coords[0], coords[1] + 1],
                2: (coords) => [coords[0] + 1, coords[1]],
                3: (coords) => [coords[0], coords[1] - 1]
            },
            [1]: {
                0: (coords) => [coords[0] - 1, coords[1] - 2],
                1: (coords) => [coords[0], coords[1] - 1],
                2: (coords) => [coords[0] - 1, coords[1]],
                3: (coords) => [coords[0], coords[1] + 1]
            }
        };
    }

    static rotationChangeFunc() {
        return (rotation) => rotation === 1 ? 0 : 1;
    }
}

const figureType = [tileL, tileZ, tileI, tileJ, tileO, tileS, tileT];
const initialPositions = {
    [tileL]: [[9, 0], [9, 1], [9, 2], [8, 0]],
    [tileZ]: [[9, 0], [9, 1], [8, 1], [8, 2]],
    [tileI]: [[9, 0], [9, 1], [9, 2], [9, 3]],
    [tileJ]: [[9, 0], [9, 1], [9, 2], [8, 2]],
    [tileO]: [[9, 0], [9, 1], [8, 0], [8, 1]],
    [tileS]: [[9, 2], [9, 3], [8, 1], [8, 2]],
    [tileT]: [[9, 0], [9, 1], [9, 2], [8, 1]]
};