import {c} from '../../main.js';

class BurstParticle {
  constructor({centerX, centerY}) {
    this.position = {
      centerX: centerX,
      centerY: centerY,
    }
    this.speed = Math.floor(Math.random() * 20)/10;
    this.angle = Math.round(Math.random() * 360);
    this.color = Math.round(Math.random() * 20 + 30);
    // this.color = 220;
    this.currentColor = "#ffffff00";
    this.radius =  Math.round(Math.random() * 50)/10;
    this.opacity = 1;
  }

  update() {
    // this.opacity = (this.opacity * 80 - 1) / 80;  // opacity - 0.1;
    if(this.speed > 0.2) {
      this.speed = (this.speed * 40 - 1) / 40; 
      // this.color++;
    }
    this.position.centerX += this.speed * Math.cos(this.angle);
    this.position.centerY += this.speed * Math.sin(this.angle);// if((this.opacity * 40 - 1) / 40 > 0.1) { this.radius = (this.radius * 40 - 1) / 40; // radius - 0.05;}
    // this.currentColor = `rgba(${this.color},${this.color},
    //   ${this.color},${this.opacity})`;
    this.currentColor = `rgba(${this.color},${this.color},
      ${this.color},${1})`;

    c.beginPath();
    c.arc(this.position.centerX, this.position.centerY, this.radius, 0, 2 * Math.PI, false);
    c.fillStyle = this.currentColor;
    c.fill();
  }
}
export default BurstParticle;