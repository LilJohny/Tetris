class tileI extends Tile {

    constructor(coordinates, figure_state) {
        super("I", coordinates, figure_state);
        this.spawn_location = [0, BOARD.RIGHT_EDGE / 2];
        this.center = 2;
        this.color = "green";
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
            if (new_element[1] > BOARD.RIGHT_EDGE || new_element[1] < 0) {
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
        this.center = 1;
        this.color = "yellow";
    }

    rotate() {
        console.log("rotating");
        let new_position = [];
        let correct_rotation = true;

        for (let i = 0; i < this.position.length - 1; i++) {
            const element = this.position[i];
            let new_element;
            console.log(`current_rotation ${this.current_rotation}`);
            if (this.current_rotation % 2 === 0) {
                new_element = [element[0] + (this.center - i), element[1] + (this.center - i)];
            } else {
                new_element = [element[0] - (this.center - i), element[1] - (this.center - i)];
            }
            if (!correct_side_borders(new_element)) {
                correct_rotation = false;
                break;
            }
            new_position.push(new_element);
        }
        let transformations = {
            0: (coords) => [coords[0], coords[1] - 2],
            1: (coords) => [coords[0] + 2, coords[1]],
            2: (coords) => [coords[0], coords[1] + 2],
            3: (coords) => [coords[0] - 2, coords[1]]
        };
        let last_transformation = transformations[this.current_rotation];
        let last_coords = last_transformation(this.position[this.position.length - 1]);
        console.log(`last_coords: ${last_coords}`);
        if (!correct_side_borders(last_coords)) {
            correct_rotation = false;
        }
        new_position.push(last_coords);
        this.current_rotation = this.current_rotation === 3 ? 0 : this.current_rotation + 1;
        console.log(new_position);
        if (correct_rotation) {
            this.position = new_position;
        }
        tetris.update_playground();
    }
}

class tileL extends Tile {
    constructor(coordinates, figure_state) {
        super("L", coordinates, figure_state);
        this.center = 1;
        this.color = "red";
    }

    rotate() {
        console.log("rotating");
        let new_position = [];
        let correct_rotation = true;

        for (let i = 0; i < this.position.length - 1; i++) {
            const element = this.position[i];
            let new_element;
            console.log(`current_rotation ${this.current_rotation}`);
            if (this.current_rotation % 2 === 0) {
                new_element = [element[0] + (this.center - i), element[1] + (this.center - i)];
            } else {
                new_element = [element[0] - (this.center - i), element[1] - (this.center - i)];
            }
            if (!correct_side_borders(new_element)) {
                correct_rotation = false;
                break;
            }
            new_position.push(new_element);
        }
        let transformations = {
            0: (coords) => [coords[0] + 2, coords[1]],
            1: (coords) => [coords[0], coords[1] + 2],
            2: (coords) => [coords[0] - 2, coords[1]],
            3: (coords) => [coords[0], coords[1] - 2]
        };
        let last_transformation = transformations[this.current_rotation];
        let last_coords = last_transformation(this.position[this.position.length - 1]);
        console.log(`last_coords: ${last_coords}`);
        if (!correct_side_borders(last_coords)) {
            correct_rotation = false;
        }
        new_position.push(last_coords);
        this.current_rotation = this.current_rotation === 3 ? 0 : this.current_rotation + 1;
        console.log(new_position);
        if (correct_rotation) {
            this.position = new_position;
        }
        tetris.update_playground();
    }
}

class tileO extends Tile {
    constructor(coordinates, figure_state) {
        super("O", coordinates, figure_state);
        this.spawn_location = [0, BOARD.RIGHT_EDGE / 2];
        this.center = this.position[4];
        this.color = "fuchsia";
    }

    rotate() {
        tetris.update_playground();
        console.log("rotating");
    }
}

class tileS extends Tile {
    constructor(coordinates, figure_state) {
        super("S", coordinates, figure_state);
        this.center = 3;
        this.color = "teal";
    }


    rotate() {
        console.log("rotating");
        let new_position = [];
        let correct_rotation = true;
        let transformationZero = {
            0: (coords) => [coords[0], coords[1] + 1],
            1: (coords) => [coords[0] - 1, coords[1]],
            2: (coords) => [coords[0] + 2, coords[1] + 1],
            3: (coords) => [coords[0] + 1, coords[1]]
        };
        let transformationOne = {
            0: (coords) => [coords[0], coords[1] - 1],
            1: (coords) => [coords[0] + 1, coords[1]],
            2: (coords) => [coords[0] - 2, coords[1] - 1],
            3: (coords) => [coords[0] - 1, coords[1]]
        };
        for (let i = 0; i < this.position.length; i++) {
            const element = this.position[i];
            let new_element;
            console.log(`current_rotation ${this.current_rotation}`);
            if (this.current_rotation === 0) {
                let transformation = transformationZero[i];
                new_element = transformation(element);
            } else {
                let transformation = transformationOne[i];
                new_element = transformation(element);
            }
            if (!correct_side_borders(new_element)) {
                correct_rotation = false;
                break;
            }
            new_position.push(new_element);
        }
        this.current_rotation = this.current_rotation === 1 ? 0 : 1;
        console.log(new_position);
        if (correct_rotation) {
            this.position = new_position;
        }
        tetris.update_playground();
    }
}

class tileT extends Tile {
    constructor(coordinates, figure_state) {
        super("T", coordinates, figure_state);
        this.center = 1;
        this.color = "purple";
    }

    rotate() {
        console.log("rotating");
        let new_position = [];
        let correct_rotation = true;

        for (let i = 0; i < this.position.length - 1; i++) {
            const element = this.position[i];
            let new_element;
            console.log(`current_rotation ${this.current_rotation}`);
            if (this.current_rotation % 2 === 0) {
                new_element = [element[0] + (this.center - i), element[1] + (this.center - i)];
            } else {
                new_element = [element[0] - (this.center - i), element[1] - (this.center - i)];
            }
            if (!correct_side_borders(new_element)) {
                correct_rotation = false;
                break;
            }
            new_position.push(new_element);
        }
        let transformations = {
            0: (coords) => [coords[0] + 1, coords[1] - 1],
            1: (coords) => [coords[0] + 1, coords[1] + 1],
            2: (coords) => [coords[0] - 1, coords[1] + 1],
            3: (coords) => [coords[0] - 1, coords[1] - 1]
        };
        let last_transformation = transformations[this.current_rotation];
        let last_coords = last_transformation(this.position[this.position.length - 1]);
        console.log(`last_coords: ${last_coords}`);
        if (!correct_side_borders(last_coords)) {
            correct_rotation = false;
        }
        new_position.push(last_coords);
        this.current_rotation = this.current_rotation === 3 ? 0 : this.current_rotation + 1;
        console.log(new_position);
        if (correct_rotation) {
            this.position = new_position;
        }
        tetris.update_playground();
    }
}

class tileZ extends Tile {
    constructor(coordinates, figure_state) {
        super("Z", coordinates, figure_state);
        this.center = this.position[2];
        this.color = "aqua";
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
        console.log("rotating");
        let new_position = [];
        let correct_rotation = true;

        for (let i = 0; i < this.position.length - 1; i++) {
            const element = this.position[i];
            let new_element;
            console.log(`current_rotation ${this.current_rotation}`);
            if (this.current_rotation % 2 === 0) {
                new_element = [element[0] + (this.center - i), element[1] + (this.center - i)];
            } else {
                new_element = [element[0] - (this.center - i), element[1] - (this.center - i)];
            }
            if (!correct_side_borders(new_element)) {
                correct_rotation = false;
                break;
            }
            new_position.push(new_element);
        }
        let transformations = {
            0: (coords) => [coords[0] + 1, coords[1] - 1],
            1: (coords) => [coords[0] + 1, coords[1] + 1],
            2: (coords) => [coords[0] - 1, coords[1] + 1],
            3: (coords) => [coords[0] - 1, coords[1] - 1]
        };
        let last_transformation = transformations[this.current_rotation];
        let last_coords = last_transformation(this.position[this.position.length - 1]);
        console.log(`last_coords: ${last_coords}`);
        if (!correct_side_borders(last_coords)) {
            correct_rotation = false;
        }
        new_position.push(last_coords);
        this.current_rotation = this.current_rotation === 3 ? 0 : this.current_rotation + 1;
        console.log(new_position);
        if (correct_rotation) {
            this.position = new_position;
        }
        tetris.update_playground();
    }

}

