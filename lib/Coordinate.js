class Point {
    constructor(x, y, z, coordinate) {
        Object.assign(this, {
            x,
            y,
            z,
            coordinate
        });
        this.vectorFromOrigin = coordinate.createVector(x, y, z);
    }

    difference(point) {
        return this.coordinate.createVector(this.x - point.x, this.y - point.y, this.z - point.z);
    }

    _projectToXY() {
        return [this.x + this.coordinate.originX, this.coordinate.originY + this.y];
    }
}

class Coordinate {
    constructor(originX, originY, originZ) {
        Object.assign(this, {
            originX,
            originY,
            originZ
        });
        this.basisVectorX = new Vector(1, 0, 0, this);
        this.basisVectorY = new Vector(0, 1, 0, this);
        this.basisVectorZ = new Vector(0, 0, 1, this);
    }

    rotate(angleX = 0, angleY = 0, angleZ = 0) {
        this.rotateAxisX(angleX);
        this.rotateAxisY(angleY);
        this.rotateAxisZ(angleZ);
    }

    rotateAxisX(angle = 0) {
        const m = Math;
        let a = angle;
        let matrix = new Matrix([
            [1, 0, 0, 0],
            [0, m.cos(a), -1 * m.sin(a), 0],
            [0, m.sin(a), m.cos(a), 0],
            [0, 0, 0, 1]
        ]);
        this._rotate(matrix);
    }


    rotateAxisY(angle = 0) {
        const m = Math;
        let a = angle;
        let matrix = new Matrix([
            [m.cos(a), 0, m.sin(a), 0],
            [0, 1, 0, 0],
            [-1 * m.sin(a), 0, m.cos(a), 0],
            [0, 0, 0, 1]
        ]);
        this._rotate(matrix);
    }

    rotateAxisZ(angle = 0) {
        const m = Math;
        let a = angle;
        let matrix = new Matrix([
            [m.cos(a), -1 * m.sin(a), 0, 0],
            [m.sin(a), m.cos(a), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]);
        this._rotate(matrix);
    }

    _rotate(matrix) {
        let bX = this.basisVectorX;
        let [_x1, _y1, _z1] = matrix.productVector([bX.x, bX.y, bX.z, 1]);
        this.basisVectorX = this.createVector(_x1, _y1, _z1);

        let bY = this.basisVectorY;
        let [_x2, _y2, _z2] = matrix.productVector([bY.x, bY.y, bY.z, 1]);
        this.basisVectorY = this.createVector(_x2, _y2, _z2);

        let bZ = this.basisVectorZ;
        let [_x3, _y3, _z3] = matrix.productVector([bZ.x, bZ.y, bZ.z, 1]);
        this.basisVectorZ = this.createVector(_x3, _y3, _z3);
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

    createVector(x, y, z) {
        return new Vector(x, y, z, this);
    }

    createLine(vector, point) {
        return new Line(vector, point, this);
    }

    createWall(vector, point) {
        return new Wall(vector, point, this);
    }

    createVectorPointByPoint(p1, p2) {
        return new Vector(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z, this);
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

class Vector {
    constructor(x, y, z, coordinate) {
        Object.assign(this, {
            x,
            y,
            z,
            coordinate
        });
    }

    innerProduct(vector) {
        return (this.x * vector.x) + (this.y * vector.y) + (this.z * vector.z);
    }

    difference(vector) {
        return this.coordinate.createVector(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }

    multiplication(i) {
        return this.coordinate.createVector(this.x * i, this.y * i, this.z * i);
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

class Matrix {
    constructor(matrix) {
        Object.assign(this, {
            matrix
        });
        let _mat = this.matrix;
    }

    productVector(vector) {
        let mat = this.matrix;
        let newVector = [];
        for (let r in mat) {
            let row = mat[r];
            let v = 0;
            for (let c in row) {
                v += row[c] * vector[c];
            }
            newVector.push(floatFormat(v));
        }
        return newVector;
    }
}


function floatFormat(number) {
    const precise = 10;
    var _pow = Math.pow(10, precise);
    return Math.round(number * _pow) / _pow;
}

module.exports = Coordinate;
