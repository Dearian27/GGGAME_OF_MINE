import { c, smokes } from "../../main.js";
import Smoke from "./Smoke.mjs";
import missileImg from "/assets/m2.png";

const sprite = new Image();
sprite.src = missileImg;

class SinMissile {
  constructor({
    x,
    y,
    width,
    height,
    angle,
    speed,
    maxSpeed = 10,
    amplitude,
    frequency,
    ownerId,
    isGhost = false,
  }) {
    this.position = {
      x: x,
      y: y,
    };
    this.size = {
      width,
      height,
    };
    this.collision = {
      r: (this.size.width + this.size.height) / 4 - this.size.width / 10,
    };
    this.vector = {
      x: 0,
      y: 0,
    };
    this.speed = speed;
    this.maxSpeed = maxSpeed;
    this.angle = angle || 0;
    this.sprite = sprite;
    this.physicsDelay = 3;
    this.ownerPhysics = false;
    this.smoking = {
      currentFrame: 0,
      smoke: 0,
    };
    this.ownerId = ownerId;

    // Sinusoidal movement properties
    this.amplitude = amplitude || 5; // Amplitude of the sine wave
    this.frequency = frequency || 0.2; // Frequency of the sine wave
    this.time = 10; // Time counter for sine wave

    this.isGhost = isGhost;
  }

  smoke() {
    if (this.smoking.currentFrame >= this.smoking.smoke) {
      this.smoking.currentFrame = 0;
      smokes.push(
        new Smoke({ x: this.position.x, y: this.position.y, size: 15 })
      );
      if (smokes.length >= 40) {
        smokes.shift();
      }
    } else this.smoking.currentFrame++;
  }

  speedUp() {
    if (this.speed < this.maxSpeed) {
      this.speed = (this.speed * 20 + 2) / 20;
    }
  }

  draw() {
    this.smoke();
    this.speedUp();

    // Move the missile forward
    this.position.x += this.speed * Math.cos(this.angle);
    this.position.y += this.speed * Math.sin(this.angle);

    // Add sinusoidal offset
    const offset = this.amplitude * Math.sin(this.time * this.frequency);
    this.position.y += offset * Math.cos(this.angle);
    this.position.x -= offset * Math.sin(this.angle);

    // Update time for the sine wave
    this.time += 1;

    // Draw the missile
    c.save();
    c.translate(this.position.x, this.position.y);
    const tempAngle = this.angle + Math.sin(this.time * this.frequency) / 1.8; // Add some variation to the angle
    c.rotate(tempAngle);
    c.drawImage(
      this.sprite,
      -this.size.width / 2,
      -this.size.height / 2,
      this.size.width,
      this.size.height
    );
    c.restore();
  }

  update() {}
}

export default SinMissile;
