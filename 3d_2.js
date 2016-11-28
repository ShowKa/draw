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
let p1 = c.createPoint(100, 0, 0);
let p2 = c.createPoint(0, 100, 0);
let p3 = c.createPoint(0, 0, 100);
let p4 = c.createPoint(-50, -50, -50);

let me = c.createPoint(400, 400, 400);
let wallPoint = c.createPoint(200, 200, 200);
let wall = c.createWall(me.vectorFromOrigin, wallPoint);

let line1 = c.createLinePointByPoint(me, p1);
let line2 = c.createLinePointByPoint(me, p2);
let line3 = c.createLinePointByPoint(me, p3);
let line4 = c.createLinePointByPoint(me, p4);

let crossPoint1 = c.createCrossPoint(line1, wall);
let crossPoint2 = c.createCrossPoint(line2, wall);
let crossPoint3 = c.createCrossPoint(line3, wall);
let crossPoint4 = c.createCrossPoint(line4, wall);

pic.stroke("red", 1).drawLineMutually(crossPoint1, crossPoint2, crossPoint3, crossPoint4);

// save
pic.write('picture/3D.png', function(err) {
    if (err) throw err;
});
