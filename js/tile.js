class Tile {
    constructor(shape_type, coordinates, shape_state) {
        this.type = shape_type;
        this.position = coordinates;
        this.state = shape_state;
        this.current_rotation = 0;
    }

    moveDown() {
        console.log("moving down");
        let falling = this.state === STATES.FALLING;
        let movable_down = this.position.every(can_be_moved_down);
        let moved = false;
        if (falling && movable_down && !tetris.paused) {
            this.position.forEach(position => position[0] -= 1);
            moved = true;
        }
        tetris.update_playground();
        if (moved && !this.position.every(can_be_moved_down)) {
            this.state = STATES.STATIC;
            tetris.playground.static_coords.push(...this.position);
        }

        console.log(tetris.static_coords);
    }

    at_left_edge() {
        return this.position.some(coords => coords[1] === BOARD.LEFT_EDGE);
    }

    at_right_edge() {
        return this.position.some(coords => coords[1] === BOARD.RIGHT_EDGE);
    }

    moveRight() {
        let falling = this.state === "falling";
        let movable_right = !this.at_right_edge();
        let newPosition = [];
        let not_used = true;
        if (falling && movable_right && !tetris.paused) {
            this.position.forEach(position => {
                let newLocation = [position[0], position[1] + 1];
                if (tetris.playground.playgroundMap[newLocation[0]][newLocation[1]] !== undefined && !arrayInArray(newLocation, this.position)) {
                    not_used = false;
                }
                newPosition.push(newLocation);
            });
        }
        console.log(falling);
        console.log(movable_right);
        console.log(not_used);
        if (falling && movable_right && not_used) {
            this.position = newPosition;
        }
        tetris.update_playground();
        console.log("moving right");
    }

    moveLeft() {
        let falling = this.state === "falling";
        let movable_left = !this.at_left_edge();
        let newPosition = [];
        let not_used = true;
        if (falling && movable_left && !tetris.paused) {
            this.position.forEach(position => {
                let newLocation = [position[0], position[1] - 1];
                if (tetris.playground.playgroundMap[newLocation[0]][newLocation[1]] !== undefined && !arrayInArray(newLocation, this.position)) {
                    not_used = false;
                    console.log(tetris.playground.playgroundMap[newLocation[0]][newLocation[1]]);
                }
                newPosition.push(newLocation);
            });
        }
        console.log(falling);
        console.log(movable_left);
        console.log(not_used);
        if (falling && movable_left && not_used) {
            this.position = newPosition;
        }
        tetris.update_playground();
        console.log("moving left");
    }
}
