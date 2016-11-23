class Point {
    constructor(x, y, z, coordinate) {
        Object.assign(this, {
            x,
            y,
            z,
            coordinate
        });
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

    createPoit(x, y, z) {
        return new Point(x, y, z, this);
    }

    shift(x, y) {
        this.originX += x;
        this.originY -= y;
    }
}

module.exports = Coordinate3D;
