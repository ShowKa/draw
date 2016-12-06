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

// pyramid
let c = new Coordinate(0, 0, 0);
let ori = c.createOrigin();
let p1 = c.createPoint(250, 0, -250);
let p2 = c.createPoint(-250, 0, -350);
let p3 = c.createPoint(0, -250, 250);
let p4 = c.createPoint(-125, 250, 170);

let me = new Coordinate(1000, 1000, 1000);
me.rotateAxisX(-1 * Math.PI / 5);
me.rotateAxisY(Math.PI / 4);

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

// axis
let p_on_x_axis = c.createPoint(1000, 0, 0);
let p_on_y_axis = c.createPoint(0, 1000, 0);
let p_on_z_axis = c.createPoint(0, 0, 1000);

let x_a_me = me._getAnotherCoodinatePoint(p_on_x_axis);
let lx = me.createLineBetween(x_a_me, ori_me);
let cross_x = me.createCrossPoint(lx, wall);

let y_a_me = me._getAnotherCoodinatePoint(p_on_y_axis);
let ly = me.createLineBetween(y_a_me, ori_me);
let cross_y = me.createCrossPoint(ly, wall);

let z_a_me = me._getAnotherCoodinatePoint(p_on_z_axis);
let lz = me.createLineBetween(z_a_me, ori_me);
let cross_z = me.createCrossPoint(lz, wall);

// origin
let c_me = me._getAnotherCoodinatePoint(ori);
let lc = me.createLineBetween(c_me, ori_me);
let cross_c = me.createCrossPoint(lc, wall);

// draw
pic.setOrigin(width / 2, height / 2);
pic.drawLineMutually(cross1, cross2, cross3, cross4);
pic.stroke("red", 1).drawLinePtoP(cross_c, cross_x);
pic.stroke("green", 1).drawLinePtoP(cross_c, cross_y);
pic.stroke("blue", 1).drawLinePtoP(cross_c, cross_z);

// save
pic.write('picture/3D.png', function(err) {
    if (err) throw err;
});
