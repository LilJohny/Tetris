class tileI extends Tile {

    constructor(coordinates, figure_state) {
        super("I", coordinates, figure_state);
        this.spawn_location = [0, BOARD.RIGHT_EDGE / 2];
        this.center = 2;
        this.color = "green";
    }

    static rotations() {
        return [
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0]
            ]
        ];
    }

    rotate() {
        console.log("rotating");
        let new_position = [];
        let correct_rotation = true;
        for (let i = 0; i < this.position.length; i++) {
            const element = this.position[i];
            let new_element;
            console.log(`current_rotation ${this.current_rotation}`);
            if (this.current_rotation === 0) {
                new_element = [element[0] + (this.center - i), element[1] + (this.center - i)];
            } else {
                new_element = [element[0] - (this.center - i), element[1] - (this.center - i)];
            }
            if (new_element[1] >= BOARD.RIGHT_EDGE || new_element[1] < 0) {
                correct_rotation = false;
                break;
            }
            new_position.push(new_element);
        }
        this.current_rotation = this.current_rotation === 0 ? 1 : 0;
        console.log(new_position);
        if (correct_rotation) {
            this.position = new_position;
        }
        tetris.update_playground();
    }
}

class tileJ extends Tile {
    constructor(coordinates, figure_state) {
        super("J", coordinates, figure_state);
        this.center = this.position[2];
    }

    static rotations() {
        return [
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 1]
            ],
            [
                [0, 1, 0],
                [0, 1, 0],
                [1, 1, 0]
            ],
            [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0]
            ],
            [
                [0, 1, 1],
                [0, 1, 0],
                [0, 1, 0]
            ]
        ];
    }

    rotate() {
        let new_position = [];
        for (let i = 0; i < this.position.length; i++) {
            const element = this.position[i];
            const new_element = [element[1], element[0]];
            new_position.push(new_element);
        }
        this.position = new_position;
        tetris.update_playground();
        console.log("rotating");
    }
}

class tileL extends Tile {
    constructor(coordinates, figure_state) {
        super("L", coordinates, figure_state);
        this.center = this.position[1];
        this.color = "red";
    }

    static rotations() {
        return [
            [
                [0, 0, 0],
                [1, 1, 1],
                [1, 0, 0]
            ],
            [
                [1, 1, 0],
                [0, 1, 0],
                [0, 1, 0]
            ],
            [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0]
            ],
            [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 1]
            ]
        ];
    }

    rotate() {
        let new_position = [];
        for (let i = 0; i < this.position.length; i++) {
            const element = this.position[i];
            const new_element = [element[1], element[0]];
            new_position.push(new_element);
        }
        this.position = new_position;
        tetris.update_playground();
        console.log("rotating");
    }
}

class tileO extends Tile {
    constructor(coordinates, figure_state) {
        super("O", coordinates, figure_state);
        this.spawn_location = [0, BOARD.RIGHT_EDGE / 2];
        this.center = this.position[4];
    }

    static rotations() {
        return [
            [
                [1, 1],
                [1, 1]
            ]
        ];
    }

    rotate() {
        let new_position = [];
        for (let i = 0; i < this.position.length; i++) {
            const element = this.position[i];
            const new_element = [element[1], element[0]];
            new_position.push(new_element);
        }
        this.position = new_position;
        tetris.update_playground();
        console.log("rotating");
    }
}

class tileS extends Tile {
    constructor(coordinates, figure_state) {
        super("S", coordinates, figure_state);
        this.center = this.position[3];
    }

    static rotations() {
        return [
            [
                [0, 0, 0],
                [0, 1, 1],
                [1, 1, 0]
            ],
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 0, 1]
            ]
        ];
    }

    rotate() {
        let new_position = [];
        for (let i = 0; i < this.position.length; i++) {
            const element = this.position[i];
            const new_element = [element[1], element[0]];
            new_position.push(new_element);
        }
        this.position = new_position;
        tetris.update_playground();
        console.log("rotating");
    }
}

class tileT extends Tile {
    constructor(coordinates, figure_state) {
        super("T", coordinates, figure_state);
        this.center = this.position[2];
        this.color = "purple";
    }

    static rotations() {
        return [
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0]
            ],
            [
                [0, 1, 0],
                [1, 1, 0],
                [0, 1, 0]
            ],
            [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0]
            ],
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0]
            ]
        ];
    }

    rotate() {
        let new_position = [];
        for (let i = 0; i < this.position.length; i++) {
            const element = this.position[i];
            const new_element = [element[1], element[0]];
            new_position.push(new_element);
        }
        this.position = new_position;
        tetris.update_playground();
        console.log("rotating");
    }
}

class tileZ extends Tile {
    constructor(coordinates, figure_state) {
        super("Z", coordinates, figure_state);
        this.center = this.position[2];
    }

    static rotations() {
        return [
            [
                [0, 0, 0],
                [1, 1, 0],
                [0, 1, 1]
            ],
            [
                [0, 0, 1],
                [0, 1, 1],
                [0, 1, 0]
            ]
        ];
    }

    rotate() {
        let new_position = [];
        for (let i = 0; i < this.position.length; i++) {
            const element = this.position[i];
            const new_element = [element[1], element[0]];
            new_position.push(new_element);
        }
        this.position = new_position;
        tetris.update_playground();
        console.log("rotating");
    }

}

