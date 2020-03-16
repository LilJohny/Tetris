var getCurrentObject = () => objects.find(object => object.state === 'falling');
var createPlayground = () => new Array(10).fill().map(el => (new Array(5).fill()));
var at_left_edge = (coordinates => coordinates[1] === 0);
var at_right_edge = (coordinates => coordinates[1] === 4);
