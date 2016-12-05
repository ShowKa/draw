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
let ori_me = me.createOrigin();
let wallPoint = me.createPoint(0, 0, -500);
let normalVector = new Vector(0, 0, -1);
let wall = me.createWall(normalVector, wallPoint);

let p1_me = me._getAnotherCoodinatePoint(p1);
let l1 = me.createLineBetween(p1_me, ori_me);
let cross = me.createCrossPoint(l1, wall);

// save
pic.write('picture/3D.png', function(err) {
    if (err) throw err;
});
