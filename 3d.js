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

// points
let c = new Coordinate(0, 0, 0);
let p1 = c.createPoint(250, 0, -250);
let p2 = c.createPoint(-250, 0, -250);
let p3 = c.createPoint(0, -250, 250);
let p4 = c.createPoint(-125, 250, 50);

let me = new Coordinate(0, 0, 1000);
let ori_me = me.createOrigin();
let wallPoint = me.createPoint(0, 0, -500);
let normalVector = new Vector(0, 0, -1);
let wall = me.createWall(normalVector, wallPoint);

let p1_me = me._getAnotherCoodinatePoint(p1);
let l1 = me.createLineBetween(p1_me, ori_me);
let cross1 = me.createCrossPoint(l1, wall);

let p2_me = me._getAnotherCoodinatePoint(p2);
let l2 = me.createLineBetween(p2_me, ori_me);
let cross2 = me.createCrossPoint(l2, wall);

let p3_me = me._getAnotherCoodinatePoint(p3);
let l3 = me.createLineBetween(p3_me, ori_me);
let cross3 = me.createCrossPoint(l3, wall);

let p4_me = me._getAnotherCoodinatePoint(p4);
let l4 = me.createLineBetween(p4_me, ori_me);
let cross4 = me.createCrossPoint(l4, wall);

// draw
pic.setOrigin(width / 2, height / 2);
pic.drawLineMutually(cross1, cross2, cross3, cross4);

// save
pic.write('picture/3D.png', function(err) {
    if (err) throw err;
});
