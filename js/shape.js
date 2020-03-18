class Shape {
    constructor(shape_type, coordinates, shape_state) {
        this.type = shape_type;
        this.position = coordinates;
        this.state = shape_state;
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
        if (!movable_down) {
            this.state = STATES.STATIC;
        }
        tetris.update_playground();
        if (moved && !this.position.every(can_be_moved_down)) {
            this.state = STATES.STATIC;
        }
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
        if (falling && movable_right && !tetris.paused) {
            this.position.forEach(position => position[1] += 1);
        }
        tetris.update_playground();
        console.log("moving right");
    }
    moveLeft() {
        let falling = this.state === "falling";
        let movable_left = !this.at_left_edge();
        if (falling && movable_left && !tetris.paused) {
            this.position.forEach(position => position[1] -= 1);
        }
        tetris.update_playground();
        console.log("moving left");
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
