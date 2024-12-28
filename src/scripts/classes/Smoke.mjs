// import smoke1Img from '/src/assets/smoke1.png';
import smoke1Img from "/assets/smoke1.png";
import smoke2Img from "/assets/smoke2.png";
import smoke3Img from "/assets/smoke3.png";
import { c } from "../../main.js";

const Smoke1 = new Image();
Smoke1.src = smoke1Img;
const Smoke2 = new Image();
Smoke2.src = smoke2Img;
const Smoke3 = new Image();
Smoke3.src = smoke3Img;

const smokesImgs = [Smoke1, Smoke2, Smoke3];

class Smoke {
  constructor({ x, y, size }) {
    this.position = {
      x: x,
      y: y,
    };
    this.angle = Math.floor(Math.random() * 180 - 90);
    this.rotateSpeed = Math.round(Math.random() * 4 - 2);
    this.sprite = smokesImgs[Math.floor(Math.random() * 3)];
    this.size = size;
    // this.startSize = this.size;
    this.maxSize = size * 2.5;
    this.minSize = size / 2.5;
    this.isMaxSizes = false;
    // this.opacity = 0.6;
  }

  update() {
    this.angle += this.rotateSpeed / 100;

    if (this.size >= this.maxSize) this.isMaxSizes = true;
    if (this.size <= this.maxSize && !this.isMaxSizes) {
      this.size = (this.size * 10 + 5) / 10; // size++
    } else if (this.isMaxSizes && this.size >= this.minSize / 10) {
      // this.size = (this.size * 10 - 50) / 10; // size--
      this.size = 0; // size--
    }
    c.save();
    c.translate(this.position.x, this.position.y);
    c.rotate(this.angle);
    // c.filter = "hue-rotate(320deg)";
    c.filter = "hue-rotate(320deg) saturate(1.5)"; // Increase saturation and shift hue towards green
    c.drawImage(
      this.sprite,
      -this.size / 2,
      -this.size / 2,
      this.size,
      this.size
    );
    c.restore();
    // c.beginPath();
    // c.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI, false);
    // c.fillStyle = this.color;
    // c.fill();
  }
}
export default Smoke;
