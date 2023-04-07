import { c } from "../../main"

class Wall {
  constructor({x, y, width, height, color}) {
    this.position = {
      x,
      y,
    }
    this.size = {
      width,
      height,
    }
    this.color = color
  }


  draw() {
    c.save();
    c.translate(this.position.x, this.position.y);
    c.fillStyle = this.color;
    c.fillRect(0, 0, this.size.width, this.size.height);
    c.restore();
  }
}
export default Wall;