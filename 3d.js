const l = console.log;

// require
const args = require("argv").run().targets;

// lib
const gm = require('./lib/GmExtends');
const Coordinate = require("./lib/Coordinate");

// const 
const width = 500;
const height = 500;

// args
const color = args[0] ? args[0] : "white";

// image
let pic = new gm(width, height, color);

let c = new Coordinate(0, 0, 0);

let p1 = c.createPoint(100, 150, 200);

c.shift(1, 2, 3);
c.rotate(Math.PI, Math.PI, Math.PI / 2);

l(p1);

// save
pic.write('picture/3D.png', function(err) {
    if (err) throw err;
});
