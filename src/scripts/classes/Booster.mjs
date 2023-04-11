import {c} from '../../main.js';

class Booster {
  constructor({x, y, type}) {
    this.type = type;
    this.position = {
      x,
      y,
    }
    this.size = 15;
  }
  draw() {
    c.save();
    c.translate(this.position.x, this.position.y);
    c.rotate(45 * Math.PI / 180);
    c.fillStyle = 'lightblue';
    c.fillRect(0, 0, this.size, this.size);
    c.restore();
  }
  update() {

  }
}
export default Booster;