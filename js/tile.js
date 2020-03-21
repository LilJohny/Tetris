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
            tetris.static_coords.push(...this.position);
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

    inCoordinates(coords) {
        let not_equal = 0;
        for (let i = 0; i < this.position.length; i++) {
            const element = this.position[i];
            if (element.length !== coords.length) {
                not_equal += 1;
                continue;
            }
            for (let j = 0; j < element.length; j++) {
                const sub_element = element[j];
                if (sub_element !== coords[j]) {
                    not_equal += 1;
                    break;
                }
            }
        }
        return not_equal !== this.position.length;
    }
}
