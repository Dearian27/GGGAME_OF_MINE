// import missileImg from '/src/assets/missile.png';
import missileImg from '/assets/m2.png';

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
    this.speed = 4;
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
    this.collision = {
      r: (this.size.width + this.size.height) / 4
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
    this.angle = Math.atan2(this.vector.y, this.vector.x);
  }
  
  draw(c, x, y) {
    this.velocity.y = this.amplitude * Math.sin(this.angle + this.phase);
    this.updateTarget(x, y);

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.angleCalibrate(x, y);
    this.position.x += this.speed * Math.cos(this.angle);
    this.position.y += this.speed * Math.sin(this.angle);
    
    c.save();
    c.translate(this.position.x, this.position.y);
    c.rotate(this.angle);
    c.drawImage(this.sprite, -this.size.width/2, -this.size.height/2, this.size.width, this.size.height);
    if(params.showCollision) {
      c.beginPath();
      c.fillStyle = '#FFC0CB99';
      c.arc(0, 0,this.collision.r, 0,  2 * Math.PI)
      c.fill();
    }
    c.restore();
  }

  update() {

  }
}

export default Missile;