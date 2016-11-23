const l = console.log;

// require
const args = require("argv").run().targets;

// lib
const gm = require('./lib/GmExtends');
const Coordinate3D = require("./lib/Coordinate3D");

// const 
const width = 500;
const height = 500;

// args
const color = args[0] ? args[0] : "white";

// image
let pic = new gm(width, height, color);

let c = new Coordinate3D(width / 2, height / 2, 0);
let p1 = c.createPoit(100, 0, 0);
let p2 = c.createPoit(0, 100, 0);
let p3 = c.createPoit(0, 0, 100);
let p4 = c.createPoit(-50, -50, -50);

pic.stroke("red", 1).drawLineMutually(p1, p2, p3, p4);

// save
pic.write('picture/3D.png', function(err) {
    if (err) throw err;
});
