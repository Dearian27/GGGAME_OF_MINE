import { c } from "../../main";

class PlanePart {
  constructor({ x, y, width, height, img, time }) {
    this.position = {
      x,
      y,
    };
    this.size = {
      width,
      height,
      defaultHeight: height,
    };
    this.img = img;

    this.speed = Math.floor(Math.random() * 20) / 10;
    this.staticAngle = Math.round(Math.random() * 360);
    this.angle = this.staticAngle;
    this.rotateSpeed = Math.round(Math.random() * 4 - 2);
    this.time = time;
  }

  update() {
    this.angle += this.rotateSpeed / 100;
    if (this.speed > 0.2) {
      this.speed = (this.speed * 80 - 1) / 80;
    }
    if (this.size.height > this.size.defaultHeight / 2) {
      this.size.height = (this.size.height * 280) / 281;
      this.size.width = (this.size.width * 280) / 281;
    }
    this.position.x += this.speed * Math.cos(this.staticAngle);
    this.position.y += this.speed * Math.sin(this.staticAngle); // if((this.opacity * 40 - 1) / 40 > 0.1) { this.radius = (this.radius * 40 - 1) / 40; // radius - 0.05;}
    c.save();
    c.translate(this.position.x, this.position.y);
    c.rotate(this.angle);
    c.drawImage(
      this.img,
      -this.size.width / 2,
      -this.size.height / 2,
      this.size.width,
      this.size.height
    );
    c.restore();
  }
}

export default PlanePart;
