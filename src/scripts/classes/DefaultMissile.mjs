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
    this.size = {
      width: width,
      height: height
    }
    this.angle = 0;
    if(angle) {
      this.angle = angle;
    }
    this.sprite = sprite;    
  }
  
  draw(c) {
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