var getCurrentObject = () => objects.find(object => object.state === STATES.FALLING);
var createPlayground = () => new Array(10).fill().map(el => (new Array(5).fill()));


function can_be_moved_down(coordinates) {
    same_figure = arguments[2];
    let self_overlapped = array_in_array(same_figure, [coordinates[0] - 1, coordinates[1]]);
    let in_borders = coordinates[0] <= BOARD.HEIGHT && coordinates[0] > BOARD.LEFT_EDGE;
    let down_cell_empty = false;
    if (in_borders) {
        down_cell_empty = playground[coordinates[0] - 1][coordinates[1]] === undefined;
    }
    return in_borders && (down_cell_empty || self_overlapped);
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