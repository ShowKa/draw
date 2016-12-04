const l = console.log;

// require
const args = require("argv").run().targets;

// lib
const gm = require('./lib/GmExtends');
const Coordinate = require("./lib/Coordinate");
const Matrix = require("./lib/Matrix");
const Vector = require("./lib/Vector");

// const 
const width = 500;
const height = 500;

// args
const color = args[0] ? args[0] : "white";

// image
let pic = new gm(width, height, color);

let c = new Coordinate(0, 0, 0);
let p1 = c.createPoint(50, 100, 0);

let me = new Coordinate(0, 0, 1000);
let wallPoint = me.createPoint(0, 0, -500);
let normalVector = new Vector(0, 0, -1);
let wall = me.createWall(normalVector, wallPoint);

let v1 = new Vector(1, 2, 3, 4);
let v2 = new Vector(0.1, 0.2, 0.3, 0.4);
l(v1.innerProduct(v2));

// save
pic.write('picture/3D.png', function(err) {
    if (err) throw err;
});
