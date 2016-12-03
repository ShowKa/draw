const l = console.log;

// require
const gm = require('gm')
const args = require("argv").run().targets;

// lib
const Coordinate = require("./lib/Coordinate2D");

// const 
const width = 500;
const height = 500;
const pi = Math.PI;

// args
const n = args[0] ? args[0] : 3;
const color = args[1] ? args[1] : "white";

// image
let pic = gm(width, height, color);

// coordinate
let c = new Coordinate(width, height);
let p = c.createPoint(0, 200);

// polygon
for (let i = 1; i <= n; i++) {
    let oldX = p._.x;
    let oldY = p._.y;
    p.rotate(2 * pi / n);
    pic.stroke("red", 1).drawLine(oldX, oldY, p._.x, p._.y);
}

// save
pic.write('picture/polygon.png', function(err) {
    if (err) throw err;
});
