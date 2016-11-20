const l = console.log;

// require
const gm = require('gm')
const argv = require("argv");

// lib
const Coordinate = require("./lib/Coordinate");

// const 
const width = 500;
const height = 500;

// args
const n = argv.run().targets[0];

// image
const pic = gm(width, height, "white");

// coordinate
const c = new Coordinate(width, height);
const p1 = c.createPoit(100, 0);
const p2 = c.createPoit(-100, 0);

// line
pic.stroke("red", 3)
    .drawLine(p1._.x, p1._.y, p2._.x, p2._.y);

// save
pic.write('picture/polygon.png', function(err) {
    if (err) throw err;
});
