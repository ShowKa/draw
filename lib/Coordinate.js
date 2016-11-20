// class
class CoordinatePoint {
    constructor(x, y, originX, originY) {
        Object.assign(this, {
            x,
            y
        });
        this._ = {
            x: x + originX,
            y: y + originY
        };
    }
}

class Coordinate {
    constructor(width, height) {
        Object.assign(this, {
            width,
            height
        });
        const originX = width / 2;
        const originY = height / 2;
        this.origin = new CoordinatePoint(0, 0, originX, originY);
    }

    createPoit(x, y) {
        return new CoordinatePoint(x, y, this.origin._.x, this.origin._.y);
    }
}

module.exports = Coordinate;
