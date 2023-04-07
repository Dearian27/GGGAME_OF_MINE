// import missileImg from '/src/assets/missile.png';
import { params, smokes } from '../../main';
import Smoke from './Smoke.mjs';
import missileImg from '/src/assets/m2.png';
import {c} from '../../main.js';

const sprite = new Image();
sprite.src = missileImg;


class GuidedMissile {
  constructor({x, y, width, height, angle, speed, minSpeed}) {
    this.position = {
      x: x,
      y: y,
    }
    this.target = {
      x: 0,
      y: 0,
    }
    this.vector = {
      x: 0,
      y: 0,
    }
    this.type = 'gm';
    this.speed = speed;
    this.startSpeed = speed;
    this.minSpeed = minSpeed;
    this.findTarget = false;
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
      smoke: 10,
    }
  }
  updateVector(x, y) {
    this.vector.x = (x - this.position.x);
    this.vector.y = (y - this.position.y);
    
    
    // if(this.angle > 360) this.angle -= 720; // clearing unnecessary content
    // if(this.angle < -720) this.angle += 720; // clearing unnecessary content
  }
  angleCalibrate(x, y, angle) {    
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
      console.log(smokes)
    }
    else this.smoking.currentFrame++;
  }
  
  draw(x, y, angle) {
    this.smoke();
    this.speedUp();
    this.updateVector(x, y);
    this.angleCalibrate(x, y, angle);
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