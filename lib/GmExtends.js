const gm_original = require('gm');

class gm extends gm_original {
    drawLinePtoP(...points) {
        let _this;
        let previousPoint = points.shift();
        for (let point of points) {
            let [x1, y1] = previousPoint._projectToXY();
            let [x2, y2] = point._projectToXY();
            _this = super.drawLine(x1, y1, x2, y2);
            previousPoint = point;
        }
        return _this;
    }

    drawLineMutually(...points) {
        let _this;
        while (points.length > 0) {
            let from = points.shift();
            let [x1, y1] = from._projectToXY();
            for (let to of points) {
                let [x2, y2] = to._projectToXY();
                _this = super.drawLine(x1, y1, x2, y2);
            }
        }
        return _this;
    }
}

module.exports = gm;
