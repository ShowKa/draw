const Vector = require("./Vector");
const Matrix = require("./Matrix");

class Point {
    constructor(x, y, z, coordinate) {
        Object.assign(this, {
            x,
            y,
            z,
            coordinate
        });
    }

    differ(point) {
        return new Vector(this.x - point.x, this.y - point.y, this.z - point.z);
    }

    _absolute() {

        let bVX = this.coordinate.basisVectorX.elements;
        let bVY = this.coordinate.basisVectorY.elements;
        let bVZ = this.coordinate.basisVectorZ.elements;

        let x = this.coordinate.originX + (this.x * bVX[0]) + (this.y * bVY[0]) + (this.z * bVZ[0]);
        let y = this.coordinate.originY + (this.x * bVX[1]) + (this.y * bVY[1]) + (this.z * bVZ[1]);
        let z = this.coordinate.originZ + (this.x * bVX[2]) + (this.y * bVY[2]) + (this.z * bVZ[2]);
        return [x, y, z];
    }
}

class Coordinate {
    constructor(originX, originY, originZ) {
        Object.assign(this, {
            originX,
            originY,
            originZ
        });
        this.basisVectorX = new Vector(1, 0, 0);
        this.basisVectorY = new Vector(0, 1, 0);
        this.basisVectorZ = new Vector(0, 0, 1);
    }

    rotate(angleX = 0, angleY = 0, angleZ = 0) {
        this.rotateAxisX(angleX);
        this.rotateAxisY(angleY);
        this.rotateAxisZ(angleZ);
    }

    rotateAxisX(angle = 0) {
        let cos = floatFormat(Math.cos(angle));
        let sin = floatFormat(Math.sin(angle));
        let matrix = new Matrix([
            [1, 0, 0, 0],
            [0, cos, -1 * sin, 0],
            [0, sin, cos, 0],
            [0, 0, 0, 1]
        ]);
        this._rotate(matrix);
    }

    rotateAxisY(angle = 0) {
        let cos = floatFormat(Math.cos(angle));
        let sin = floatFormat(Math.sin(angle));
        let matrix = new Matrix([
            [cos, 0, sin, 0],
            [0, 1, 0, 0],
            [-1 * sin, 0, cos, 0],
            [0, 0, 0, 1]
        ]);
        this._rotate(matrix);
    }

    rotateAxisZ(angle = 0) {
        let cos = floatFormat(Math.cos(angle));
        let sin = floatFormat(Math.sin(angle));
        let matrix = new Matrix([
            [cos, -1 * sin, 0, 0],
            [sin, cos, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]);
        this._rotate(matrix);
    }

    _rotate(matrix) {
        let bX = this.basisVectorX.elements;
        let [_x1, _y1, _z1] = matrix.productVector([bX[0], bX[1], bX[2], 1]);
        this.basisVectorX = new Vector(_x1, _y1, _z1);

        let bY = this.basisVectorY.elements;
        let [_x2, _y2, _z2] = matrix.productVector([bY[0], bY[1], bY[2], 1]);
        this.basisVectorY = new Vector(_x2, _y2, _z2);

        let bZ = this.basisVectorZ.elements;
        let [_x3, _y3, _z3] = matrix.productVector([bZ[0], bZ[1], bZ[2], 1]);
        this.basisVectorZ = new Vector(_x3, _y3, _z3);
    }

    shift(x, y, z) {
        let matrix = new Matrix([
            [1, 0, 0, x],
            [0, 1, 0, y],
            [0, 0, 1, z],
            [0, 0, 0, 1]
        ]);
        let [_x, _y, _z] = matrix.productVector([this.originX, this.originY, this.originZ, 1]);
        this.originX = _x;
        this.originY = _y;
        this.originZ = _z;
    }

    createPoint(x, y, z) {
        return new Point(x, y, z, this);
    }

    createLine(vector, point) {
        return new Line(vector, point, this);
    }

    createWall(vector, point) {
        return new Wall(vector, point, this);
    }

    createVectorPointByPoint(p1, p2) {
        return new Vector(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z);
    }

    createLinePointByPoint(p1, p2) {
        let v = this.createVectorPointByPoint(p1, p2);
        return new Line(v, p1, this);
    }

    createCrossPoint(line, wall) {
        // 交点xを求める。

        // 平面（n = 法線の方向ベクトル、q = 平面上の任意の点） 
        // -> n * (x - q) = 0;
        let n = wall.normalVector;
        let q = wall.point;

        // 直線(a = 直線上の点、p = 方向ベクトル、t= 任意の値) 
        // -> x = a + tp
        let a = line.point;
        let p = line.vector;

        // 計算
        // n * ( a + tp - q ) = 0
        // t = - n * ( a - q ) / n * p 
        // x = a - { n * ( a - q ) / n * p } * p
        let v = p.multiplication(n.innerProduct(a.differ(q)) / n.innerProduct(p));
        return this.createPoint(a.x - v.x, a.y - v.y, a.z - v.z);
    }

    _getAnotherCoodinatePoint(_p) {
        let [_x, _y, _z] = _p._absolute();

        let bVX = this.basisVectorX.elements;
        let bVY = this.basisVectorY.elements;
        let bVZ = this.basisVectorZ.elements;

        let mat = new Matrix([
            [bVX[0], bVY[0], bVZ[0], _x - this.originX],
            [bVX[1], bVY[1], bVZ[1], _y - this.originY],
            [bVX[2], bVY[2], bVZ[2], _z - this.originZ]
        ]);
        mat.sweepOut();
        return this.createPoint(mat.matrix[0][3], mat.matrix[1][3], mat.matrix[2][3]);
    }

}

class Line {
    constructor(vector, point, coordinate) {
        Object.assign(this, {
            vector,
            point,
            coordinate
        })
    }
}

class Wall {
    constructor(normalVector, point, coordinate) {
        Object.assign(this, {
            normalVector,
            point,
            coordinate
        });
    }
}

function floatFormat(number) {
    const precise = 10;
    let _pow = Math.pow(10, precise);
    return Math.round(number * _pow) / _pow;
}

module.exports = Coordinate;
