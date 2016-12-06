const gm_original = require('gm');

class gm extends gm_original {

    setOrigin(x, y) {
        Object.assign(this, {
            x,
            y
        })
    }

    drawLinePtoP(...points) {
        let _this;
        let previousPoint = points.shift();
        for (let point of points) {

            let [x1, y1] = [previousPoint.x, previousPoint.y];
            let [x2, y2] = [point.x, point.y];

            _this = super.drawLine(x1 + this.x, this.y - y1, this.x + x2, this.y - y2);
            previousPoint = point;
        }
        return _this;
    }

    drawLineMutually(...points) {
        let _this;
        while (points.length > 0) {
            let from = points.shift();
            let [x1, y1] = [from.x, from.y];
            for (let to of points) {
                let [x2, y2] = [to.x, to.y];
                _this = super.drawLine(x1 + this.x, this.y - y1, this.x + x2, this.y - y2);
            }
        }
        return _this;
    }
}

module.exports = gm;
