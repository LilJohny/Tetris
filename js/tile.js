class Tile {
    constructor(shape_type, coordinates, shape_state) {
        this.type = shape_type;
        this.position = coordinates;
        this.state = shape_state;
        this.current_rotation = 0;
    }

    moveDown() {
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
            tetris.createNewTile();
        }
    }

    canBeMovedLeft() {
        let on_edge = this.position.some(coords => coords[1] === BOARD.LEFT_EDGE);
        if (!on_edge) {
            let left_free = this.position.every(coords => {
                let newLocation = [coords[0], coords[1] - 1];
                let coord_used = tetris.playground.playgroundMap[newLocation[0]][newLocation[1]] !== undefined;
                let inThisFigure = arrayInArray(newLocation, this.position);
                return !(coord_used && !inThisFigure);
            });
            return left_free;
        }
        return false;
    }

    canBeMovedRight() {
        let on_edge = this.position.some(coords => coords[1] === BOARD.RIGHT_EDGE);
        if (!on_edge) {
            let right_free = this.position.every(coords => {
                let newLocation = [coords[0], coords[1] + 1];
                let coord_used = tetris.playground.playgroundMap[newLocation[0]][newLocation[1]] !== undefined;
                let inThisFigure = arrayInArray(newLocation, this.position);
                return !(coord_used && !inThisFigure);
            });
            return right_free;
        }
        return false;
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
    }
}
