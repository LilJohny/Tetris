function get2dArray(height, width) {
    return new Array(height).fill().map(el => (new Array(width).fill()));
}

function getCurrentObject() {
    return tetris.objects.find(object => object.state === STATES.FALLING);
}

function can_be_moved_down(coordinates) {
    let same_figure = arguments[2];
    let self_overlapped = false;
    let in_borders = coordinates[0] >= 0;
    let below_cell_empty = false;
    let above_upper_border = coordinates[0] >= BOARD.HEIGHT;

    let below_cell_exists = coordinates[0] - 1 >= 0;
    if (in_borders && !above_upper_border && below_cell_exists) {
        below_cell_empty = tetris.playground.coordEmpty([coordinates[0] - 1, coordinates[1]]);
    } else if (above_upper_border) {
        below_cell_empty = true;
    }
    if (below_cell_exists) {
        self_overlapped = arrayInArray([coordinates[0] - 1, coordinates[1]], same_figure);
    }
    return in_borders && (below_cell_empty || self_overlapped);
}

function arrayInArray(sub, main = tetris.playground.static_coords) {
    let not_equal = 0;
    for (let i = 0; i < main.length; i++) {
        const element = main[i];
        if (element.length !== sub.length) {
            not_equal += 1;
            continue;
        }
        for (let j = 0; j < element.length; j++) {
            const sub_element = element[j];
            if (sub_element !== sub[j]) {
                not_equal += 1;
                break;
            }
        }
    }
    return not_equal !== main.length;
}
function getRandomValue(array) {
    return array[Math.floor(Math.random() * array.length)];
}