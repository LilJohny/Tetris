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

    canBeMovedLeft() {
        let on_edge = this.position.some(coords => coords[1] === BOARD.LEFT_EDGE);
        let left_free = this.position.some(coords => {
            let newLocation = [coords[0], coords[1] - 1];
            let coord_used = tetris.playground.playgroundMap[newLocation[0]][newLocation[1]] !== undefined;
            let inThisFigure = arrayInArray(newLocation, this.position);
            return !(coord_used && inThisFigure);
        });
        return !on_edge && left_free;
    }

    canBeMovedRight() {
        let on_edge = this.position.some(coords => coords[1] === BOARD.RIGHT_EDGE);
        let right_free = this.position.some(coords => {
            let newLocation = [coords[0], coords[1] + 1];
            let coord_used = tetris.playground.playgroundMap[newLocation[0]][newLocation[1]] !== undefined;
            let inThisFigure = arrayInArray(newLocation, this.position);
            return !(coord_used && inThisFigure);
        });
        return !on_edge && right_free;
    }

    moveRight() {
        let falling = this.state === "falling";
        let movable_right = this.canBeMovedRight();
        if (falling && movable_right && !tetris.paused) {
            this.position.forEach(position => {
                position[1] += 1;
            });
        }

        tetris.update_playground();
        console.log("moving right");
    }

    moveLeft() {
        let falling = this.state === "falling";
        let movable_left = this.canBeMovedLeft();
        if (falling && movable_left && !tetris.paused) {
            this.position.forEach(position => {
                position[1] -= 1;
            });
        }

        tetris.update_playground();
        console.log("moving left");
    }
}
