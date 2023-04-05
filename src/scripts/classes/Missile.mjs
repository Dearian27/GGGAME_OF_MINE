// import missileImg from '/src/assets/missile.png';
import missileImg from '/src/assets/m2.png';

const sprite = new Image();
sprite.src = missileImg;


class Missile {
  constructor({x, y, width, height}) {
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
    this.velocity = {
      x: 1,
      y: 0,
    }
    this.size = {
      width: width,
      height: height
    }
    this.sprite = sprite;
    this.angle = -45;
    
    this.amplitude = 1;
    this.frequency = 0.02;
    this.phase = 0;
  }
  updateTarget(x, y) {
    this.vector.x = x - this.position.x;
    this.vector.y = y - this.position.y;
    this.target.x = x + this.vector.x + this.amplitude * Math.sin(2 * Math.PI * this.frequency + this.phase);
    this.target.y = y + this.vector.y + this.amplitude * Math.sin(2 * Math.PI * this.frequency + this.phase);
  }
  angleCalibrate() {
    this.vector = {x: this.velocity.x, y: this.velocity.y};
    // console.log(this.vector)
    this.angle = Math.atan2(this.vector.y, this.vector.x);
  }
  
  draw(c, x, y) {
    // this.velocity.y = this.amplitude * Math.sin(this.frequency * this.position.x + this.phase);
    this.velocity.y = this.amplitude * Math.sin(this.angle + this.phase);
    // this.updateTarget(x, y);

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.angleCalibrate(x, y);
    c.save();
    // c.transform(Math.cos(this.angle), Math.sin(this.angle), -Math.sin(this.angle), Math.cos(this.angle), 0, 0);
    c.translate(this.position.x, this.position.y);
    // c.rotate(this.angle * Math.PI / 360 * 100);
    c.rotate(this.angle * Math.PI / 360);
    // c.rotate(this.angle * Math.PI / 360);
    c.drawImage(this.sprite, -this.size.width/2, -this.size.height/2, this.size.width, this.size.height);
    c.restore();
    console.log('angle: ', this.angle);
    // console.log(this.angle * Math.PI / 360 * 180);
  }

  update() {

  }
}

export default Missile;