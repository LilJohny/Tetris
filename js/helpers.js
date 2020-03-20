var getCurrentObject = () => objects.find(object => object.state === STATES.FALLING);
var createPlayground = () => new Array(10).fill().map(el => (new Array(5).fill()));


function can_be_moved_down(coordinates) {
    let same_figure = arguments[2];
    let self_overlapped = false;
    let in_borders = coordinates[0] >= 0;
    let below_cell_empty = false;
    let above_upper_border = coordinates[0] >= BOARD.HEIGHT;
    if (playground[coordinates[0] - 1] === undefined) {
        console.log(`undefined in ${coordinates[0] - 1}`);
    }
    let below_cell_exists = coordinates[0] - 1 >= 0;
    if (in_borders && !above_upper_border && below_cell_exists) {
        below_cell_empty = playground[coordinates[0] - 1][coordinates[1]] === undefined;
    } else if (above_upper_border) {
        below_cell_empty = true;
    }
    if (below_cell_exists) {
        self_overlapped = array_in_array(same_figure, [coordinates[0] - 1, coordinates[1]]);
    }
    return in_borders && (below_cell_empty || self_overlapped);
}
function array_in_array(main, sub) {
    let not_equal = 0;
    for (let i = 0; i < main.length; i++) {
        const element = main[i];
        if (element.length != sub.length) {
            not_equal += 1;
            continue;
        }
        for (let j = 0; j < element.length; j++) {
            const sub_element = element[j];
            if (sub_element != sub[j]) {
                not_equal += 1;
                break;
            }
        }
    }
    return not_equal != main.length;
}
function getPlaygroundReadyMap() {
    let result = [];
    for (let i = 0; i < playground.length; i++) {
        const row = playground[i];
        let fl = true;
        for (let i = 0; i < row.length; i++) {
            const element = row[i];
            if (element === undefined) {
                fl = false;
                break;
            }
        }
        result.push(fl);
    }
    return result;
}