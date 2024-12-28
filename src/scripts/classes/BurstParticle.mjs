import { c } from "../../main.js";

class BurstParticle {
  constructor({ centerX, centerY, type, time, r, color }) {
    this.position = {
      centerX: centerX,
      centerY: centerY,
    };
    this.type = type;
    if (type === "default") {
      this.speed = Math.floor(Math.random() * 20) / 10;
      this.angle = Math.round(Math.random() * 360);
      this.color = color ? color : Math.round(Math.random() * 20 + 30);
      this.radius = r
        ? Math.round(Math.random() * 10 * r) / 10
        : Math.round(Math.random() * 40) / 10;
    } else if (type === "plane") {
      this.speed = Math.floor(Math.random() * 2) / 10 + 0.1;
      this.angle = Math.round(Math.random() * 360);
      this.color = Math.round(Math.random() * 20 + 30);
      this.radius = Math.round(Math.random() * 20) / 10;
      this.time = time;
    }
    // this.color = 220;
    this.currentColor = "#ffffff00";
    this.opacity = 1;
  }

  update() {
    if (this.type === "plane" && this.opacity > 0.01) {
      this.color += 0.5;
      this.opacity = (this.opacity * 40 - 1) / 40; // opacity - 0.1;
      if (this.speed > 0) {
        this.speed = (this.speed * 500 - 1) / 500;
      }
    }
    if (this.type === "default" && this.speed > 0.2) {
      this.speed = (this.speed * 40 - 1) / 40;
      // this.color++;
    }
    this.position.centerX += this.speed * Math.cos(this.angle);
    this.position.centerY += this.speed * Math.sin(this.angle); // if((this.opacity * 40 - 1) / 40 > 0.1) { this.radius = (this.radius * 40 - 1) / 40; // radius - 0.05;}
    this.currentColor = `rgba(${this.color},${this.color},
      ${this.color},${this.opacity})`;

    c.beginPath();
    c.arc(
      this.position.centerX,
      this.position.centerY,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    c.fillStyle = this.currentColor;
    c.fill();
  }
}
export default BurstParticle;
