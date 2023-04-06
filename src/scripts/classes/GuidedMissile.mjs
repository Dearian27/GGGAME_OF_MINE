// import missileImg from '/src/assets/missile.png';
import missileImg from '/src/assets/m2.png';

const sprite = new Image();
sprite.src = missileImg;


class GuidedMissile {
  constructor({x, y, width, height, angle, speed}) {
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
    this.speed = speed;
    this.startSpeed = speed;
    this.size = {
      width: width,
      height: height
    }
    this.rotationSpeed = 0.02;
    this.angle = 0;
    if(angle) {
      this.angle = angle;
    }
    this.sprite = sprite;    
  }
  updateVector(x, y) {
    this.vector.x = (x - this.position.x);
    this.vector.y = (y - this.position.y);
    
    
    // if(this.angle > 360) this.angle -= 720; // clearing unnecessary content
    // if(this.angle < -720) this.angle += 720; // clearing unnecessary content
  }
  angleCalibrate() {    
    if(this.speed > this.startSpeed + 1) { // wait for calibrate target
      if( Math.atan2(this.vector.y, this.vector.x) - this.angle > 0) {
        this.angle += this.rotationSpeed;
      } else this.angle -= this.rotationSpeed;
    }
    // this.angle = Math.atan2(this.vector.y, this.vector.x);
  }
  speedUp() {
    if(this.speed < this.startSpeed + 1) {
      this.speed = (this.speed * 40 + 1) / 40;
    }else {
      this.speed = (this.speed * 20 + 1) / 20;
    }
  }; 
  
  draw(c, x, y) {
    this.speedUp();
    this.updateVector(x, y);
    this.angleCalibrate();
    // console.log(Math.cos(this.angle * 180 / Math.PI), Math.sin(this.angle * 180 / Math.PI))
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

export default GuidedMissile;