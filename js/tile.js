class Tile {
    constructor(shape_type, coordinates, shape_state) {
        this.type = shape_type;
        this.position = coordinates;
        this.state = shape_state;
        this.current_rotation = 0;
    }

    canBeMoved(move, border) {
        let on_edge = this.position.some(coords => coords[1] === border);
        if (!on_edge) {
            let border_free = this.position.every(coords => {
                let newLocation = [coords[0] + move[0], coords[1] + move[1]];
                let coord_used = false;
                if (tetris.playground.playgroundMap[newLocation[0]] !== undefined) {
                    coord_used = tetris.playground.playgroundMap[newLocation[0]][newLocation[1]] !== undefined;
                }
                let inThisFigure = arrayInArray(newLocation, this.position);
                return !(coord_used && !inThisFigure);
            });
            return border_free;
        }
        return false;
    }

    rotate(updatePlayground = true) {
        this.rotateTile(this.constructor.transformations(), this.constructor.rotationChangeFunc(), updatePlayground);
    }

    move(move_vector, movable) {
        let falling = this.state === STATES.FALLING;
        if (falling && movable && !tetris.paused) {
            this.position.forEach(position => {
                position[0] += move_vector[0];
                position[1] += move_vector[1];

            });
        }
        tetris.update_playground();
    }

    canBeMovedLeft() {
        return this.canBeMoved([0, -1], BOARD.LEFT_EDGE);
    }

    canBeMovedRight() {
        return this.canBeMoved([0, 1], BOARD.RIGHT_EDGE);
    }

    rotateTile(transformations, rotationChangeFunc, updatePlayground = true) {
        let new_position = [];
        let correct_rotation = true;
        for (let i = 0; i < this.position.length; i++) {
            const element = this.position[i];
            let new_element;
            let transformation = transformations[this.current_rotation][i];
            new_element = transformation(element);
            if (!correct_side_borders(new_element)) {
                correct_rotation = false;
                break;
            }
            new_position.push(new_element);
        }
        this.current_rotation = rotationChangeFunc(this.current_rotation);
        if (correct_rotation) {
            this.position = new_position;
        }
        if (updatePlayground === true) {
            tetris.update_playground();
        }
    }

    setStaticState() {
        this.state = STATES.STATIC;
        tetris.playground.static_coords.push(...this.position);
        tetris.createNewTile();
    }

    moveDown() {
        let falling = this.state === STATES.FALLING;
        let movable_down = this.position.every(can_be_moved_down);
        let moved = falling && movable_down && !tetris.paused;
        this.move([-1, 0], movable_down);
        if (moved && !this.position.every(can_be_moved_down)) {
            this.setStaticState();
        }
    }

    moveRight() {
        let movable_right = this.canBeMovedRight();
        this.move([0, 1], movable_right);
    }

    moveLeft() {
        let movable_left = this.canBeMovedLeft();
        this.move([0, -1], movable_left);
    }
}
