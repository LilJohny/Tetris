var playground = createPlayground();

var objects = [
    new tileI([[9, 1], [9, 2], [9, 3], [9, 4]], STATES.FALLING),
    new tileL([[2, 0], [1, 0], [0, 0], [0, 1]], STATES.STATIC)
];
// , {
//     type: 'I',
//     state: STATES.STATIC,
//     position: [[2, 2], [1, 2], [0, 2]]
// }
/// 4,2 -> 4,4
/// 5,2 -> 4,3
/// 5,3 -> 4,2
/// 5,4 -> 5,2