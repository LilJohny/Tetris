var playground = createPlayground();

var objects = [
    new figureL([[9, 1], [8, 1], [8, 2], [8, 3]], STATES.FALLING),
    new figureL([[2, 0], [1, 0], [0, 0], [0, 1]], STATES.STATIC)
];
var paused = false;
// , {
//     type: 'I',
//     state: STATES.STATIC,
//     position: [[2, 2], [1, 2], [0, 2]]
// }
/// 4,2 -> 4,4
/// 5,2 -> 4,3
/// 5,3 -> 4,2
/// 5,4 -> 5,2