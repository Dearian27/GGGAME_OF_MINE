export class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  subtract(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  multiply(scalar) {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  divide(scalar) {
    if (scalar !== 0) {
      return new Vector(this.x / scalar, this.y / scalar);
    } else {
      throw new Error("Division by zero");
    }
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    const mag = this.magnitude();
    if (mag !== 0) {
      return this.divide(mag);
    } else {
      return new Vector(0, 0);
    }
  }

  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  toString() {
    return `Vector(${this.x}, ${this.y})`;
  }
}
