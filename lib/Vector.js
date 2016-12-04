class Vector {
    constructor(x, y, z) {
        Object.assign(this, {
            x,
            y,
            z
        });
    }

    innerProduct(vector) {
        return (this.x * vector.x) + (this.y * vector.y) + (this.z * vector.z);
    }

    difference(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }

    multiplication(i) {
        return new Vector(this.x * i, this.y * i, this.z * i);
    }
}

module.exports = Vector;
