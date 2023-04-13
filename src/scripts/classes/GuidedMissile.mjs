// import missileImg from '/src/assets/missile.png';
import { params, players, smokes } from '../../main';
import Smoke from './Smoke.mjs';
import missileImg from '/assets/missile3.png';
import {c} from '../../main.js';

const sprite = new Image();
sprite.src = missileImg;


class GuidedMissile {
  constructor({x, y, width, height, angle, speed, minSpeed, ownerId}) {
    this.position = {
      x: x,
      y: y,
    }
    this.vector = {
      x: 0,
      y: 0,
    }
    this.type = 'gm';
    this.speed = speed;
    this.startSpeed = speed;
    this.minSpeed = minSpeed;
    this.size = {
      width: width,
      height: height
    }
    this.collision = {
      r: (this.size.width + this.size.height) / 4 - this.size.width / 10
    }
    this.rotationSpeed = 0.02;
    this.angle = angle ? angle : 0;
    this.sprite = sprite;
    this.smoking = {
      currentFrame: 0,
      smoke: 1,
    }
    this.ownerId = ownerId;
    this.target = players.find(player => player.id !== ownerId);
    this.findTarget = false;
    this.frame = 0;
    this.physicsDelay = 3;
    this.ownerPhysics = false;
  }
  updateVector() {
    if(this.target) {
      this.vector.x = (this.target.position.x - this.position.x);
      this.vector.y = (this.target.position.y - this.position.y);
    } else {
      this.vector.y = -this.position.y;
      this.vector.x = -this.position.x;
    }
  }
  angleCalibrate() {    
    if(this.findTarget && this.speed >= (this.minSpeed * 3)) { // wait for calibrate target
      // arccos((A·B) / (||A|| ||B||))
      const targetAngle = Math.atan2(this.vector.y, this.vector.x);
      let angleDiff = targetAngle - this.angle;
      if (angleDiff < -Math.PI) {
        angleDiff += Math.PI * 2;
      } else if (angleDiff > Math.PI) {
        angleDiff -= Math.PI * 2;
      }
      if (angleDiff < 0) {
        this.angle -= this.rotationSpeed;
      } else {
        this.angle += this.rotationSpeed;
      }      
    }
  }
  speedUp() {
    if(!this.findTarget) {
      // slow at start
      this.speed = (this.speed * 20 - 2) / 20;
      if(this.speed <= this.minSpeed) {
        this.findTarget = true;
      }
    }else {
      if( this.speed < 5) {
        this.speed = (this.speed * 20 + 1) / 20;
      }
    }
  }; 

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
  
  draw() {
    this.smoke();
    this.speedUp();
    this.updateVector();
    this.angleCalibrate();
    // console.log(Math.cos(this.angle * 180 / Math.PI), Math.sin(this.angle * 180 / Math.PI))
    this.position.x += this.speed * Math.cos(this.angle);
    this.position.y += this.speed * Math.sin(this.angle);
    
    c.save();
    c.translate(this.position.x, this.position.y);
    c.rotate(this.angle);
    // c.rotate(this.angle *  Math.PI / 180);
    c.drawImage(this.sprite, -this.size.width/2, -this.size.height/2, this.size.width, this.size.height);
    if(params.showCollision) {
      c.beginPath();
      c.fillStyle = '#FFC0CB99';
      c.arc(0, 0,this.collision.r, 0,  2 * Math.PI)
      c.fill();
    }
    c.restore();
    // console.log('angle: ', this.angle);
  }

  update() {

  }
}

export default GuidedMissile;