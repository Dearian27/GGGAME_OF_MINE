class Trace {
  constructor({centerX, centerY, radius, colorNumbers}) {
    this.position = {
      centerX:centerX,
      centerY:centerY,
    }
    this.colorNumbers = colorNumbers;
    this.color = "#000000"; 
    this.radius = radius;
    this.opacity = 0.6;
  }

  update(c) {
    this.opacity = (this.opacity * 80 - 1) / 80;  // opacity - 0.1;
    if( (this.opacity * 40 - 1) / 40 > 0.1) {
      this.radius = (this.radius * 40 - 1) / 40; // radius - 0.05;
    }
    this.color = `rgba(${this.colorNumbers[0]},${this.colorNumbers[1]},
      ${this.colorNumbers[2]},${this.opacity})`;
    c.beginPath();
    c.arc(this.position.centerX, this.position.centerY, this.radius, 0, 2 * Math.PI, false);
    c.fillStyle = this.color;
    c.fill();
  }
}
export default Trace;