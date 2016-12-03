class CoordinatePoint {
    constructor(x, y, coordinate) {
        Object.assign(this, {
            x,
            y,
            coordinate
        });
        this._ = {
            x: x + coordinate._originX,
            y: coordinate._originY - y
        };
    }

    rotate(rad) {
        let oldX = this.x;
        let oldY = this.y;
        this.x = oldX * Math.cos(rad) - oldY * Math.sin(rad);
        this.y = oldX * Math.sin(rad) + oldY * Math.cos(rad);
        this._.x = this.x + this.coordinate._originX;
        this._.y = this.coordinate._originY - this.y;
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

    createPoint(x, y) {
        return new CoordinatePoint(x, y, this);
    }

    createOrigin() {
        return new CoordinatePoint(0, 0, this);
    }
}

module.exports = Coordinate;
