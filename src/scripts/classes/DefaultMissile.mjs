import {c, smokes} from '../../main.js'
import Smoke from './Smoke.mjs';
import missileImg from '/src/assets/m2.png';

const sprite = new Image();
sprite.src = missileImg;


class DefaultMissile {
  constructor({x, y, width, height, angle, speed, ownerId}) {
    this.position = {
      x: x,
      y: y,
    }
    this.size = {
      width,
      height
    }
    this.collision = {
      r: (this.size.width + this.size.height) / 4 - this.size.width / 10
    }
    this.vector = {
      x: 0,
      y: 0,
    }
    this.speed = speed;
    this.angle = 0;
    if(angle) {
      this.angle = angle;
    }
    this.sprite = sprite;
    this.physicsDelay = 3;
    this.ownerPhysics = false;
    this.smoking = {
      currentFrame: 0,
      smoke: 10,
    }
    this.ownerId = ownerId;
  }

  smoke() {
    if(this.smoking.currentFrame >= this.smoking.smoke) {
      this.smoking.currentFrame = 0;
      smokes.push(new Smoke({x: this.position.x, y: this.position.y, size: 15}))
      if(smokes.length >= 40) {
        smokes.shift();
      }
    }
    else this.smoking.currentFrame++;
  }

  speedUp() {
    if( this.speed < 20) {
      this.speed = (this.speed * 20 + 5) / 20;
    }
  }
  
  draw() {
    this.smoke();
    this.speedUp();
    this.position.x += this.speed * Math.cos(this.angle);
    this.position.y += this.speed * Math.sin(this.angle);
    
    c.save();
    c.translate(this.position.x, this.position.y);
    c.rotate(this.angle);
    // c.rotate(this.angle *  Math.PI / 180);
    c.drawImage(this.sprite, -this.size.width/2, -this.size.height/2, this.size.width, this.size.height);
    c.restore();
    // console.log('angle: ', this.angle);
  }

  update() {

  }
}

export default DefaultMissile;