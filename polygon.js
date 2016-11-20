const l = console.log;

// require
const gm = require('gm')
const args = require("argv").run().targets;

// lib
const Coordinate = require("./lib/Coordinate");

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
let p = c.createPoit(0, 200);
let origin = c.createOrigin();

// line
// pic.stroke("red", 3)
// .drawLine(p._.x, p._.y, origin._.x, origin._.y);

// rotate
// p.rotate(2 * pi / 3);
// pic.stroke("green", 3).drawLine(p._.x, p._.y, origin._.x, origin._.y);

// p.rotate(2 * pi / 3);
// pic.stroke("blue", 3).drawLine(p._.x, p._.y, origin._.x, origin._.y);


// polygon
for (let i = 1; i <= n; i++) {
    let old = p;
    p.rotate(2 * pi / n);
    pic.stroke("red", 1).drawLine(origin._.x, origin._.y, p._.x, p._.y);
}

// save
pic.write('picture/polygon.png', function(err) {
    if (err) throw err;
});
