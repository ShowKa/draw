class Point3D {
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
        return [this.x + this.coordinate.originX, this.coordinate.originY - this.y];
    }
}

class Coordinate3D {
    constructor(originX, originY, originZ) {
        Object.assign(this, {
            originX,
            originY,
            originZ
        });
    }

    createPoint(x, y, z) {
        return new Point3D(x, y, z, this);
    }

    shift(x, y, z) {
        this.originX += x;
        this.originY += y;
        this.originZ += z;
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

module.exports = Coordinate3D;
