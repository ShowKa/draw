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

    difference(point) {
        return new Vector(this.x - point.x, this.y - point.y, this.z - point.z);
    }

    _toAbsolute() {
        let x = this.coordinate.originX + (this.x * this.coordinate.basisVectorX.x) + (this.y * this.coordinate.basisVectorY.x) +
            (this.z * this.coordinate.basisVectorZ.x);
        let y = this.coordinate.originY + (this.x * this.coordinate.basisVectorX.y) + (this.y * this.coordinate.basisVectorY.y) +
            (this.z * this.coordinate.basisVectorZ.y);
        let z = this.coordinate.originZ + (this.x * this.coordinate.basisVectorX.z) + (this.y * this.coordinate.basisVectorY.z) +
            (this.z * this.coordinate.basisVectorZ.z);
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
        let bX = this.basisVectorX;
        let [_x1, _y1, _z1] = matrix.productVector([bX.x, bX.y, bX.z, 1]);
        this.basisVectorX = new Vector(_x1, _y1, _z1);

        let bY = this.basisVectorY;
        let [_x2, _y2, _z2] = matrix.productVector([bY.x, bY.y, bY.z, 1]);
        this.basisVectorY = new Vector(_x2, _y2, _z2);

        let bZ = this.basisVectorZ;
        let [_x3, _y3, _z3] = matrix.productVector([bZ.x, bZ.y, bZ.z, 1]);
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
        let v = p.multiplication(n.innerProduct(a.difference(q)) / n.innerProduct(p));
        return this.createPoint(a.x - v.x, a.y - v.y, a.z - v.z);
    }

    _getAnotherCoodinatePoint(_p) {
        let [_x, _y, _z] = _p._toAbsolute();
        let mat = new Matrix([
            [this.basisVectorX.x, this.basisVectorY.x, this.basisVectorZ.x, _x - this.originX],
            [this.basisVectorX.y, this.basisVectorY.y, this.basisVectorZ.y, _y - this.originY],
            [this.basisVectorX.z, this.basisVectorY.z, this.basisVectorZ.z, _z - this.originZ]
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
