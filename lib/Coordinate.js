class CoordinatePoint {
    constructor(x, y, coordinate) {
        Object.assign(this, {
            x,
            y,
            coordinate
        });
        this._ = {
            x: x + coordinate._originX,
            y: y + coordinate._originY
        };
    }
}

class Coordinate {
    constructor(width, height) {
        Object.assign(this, {
            width,
            height
        });
        this._originX = width / 2;
        this._originY = height / 2;
    }

    createPoit(x, y) {
        return new CoordinatePoint(x, y, this);
    }

    createOrigin() {
        return new CoordinatePoint(0, 0, this);
    }
}

module.exports = Coordinate;
