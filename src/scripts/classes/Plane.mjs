const planeImg = new Image();
planeImg.src =  '/src/assets/plane.png'; 

class Plane {
  constructor({x, y, width, height}) {
    this.size = {
      width: width,
      height: height
    }
    this.velocity = {
      x: 0,
      y: -4
      // y: 0
    }
    this.sprite = planeImg;
    this.rotation = {
      angle: 0, // current angle of Obj
      rotationSpeed: 0, // rotation speed 
    }
    this.position = {
      x: x,
      y: y,
      anchorX: x + width / 2,
      anchorY: y + height / 2,
    }
  }

  draw(c) {
    c.save();
    c.translate(this.position.x, this.position.y);
    c.rotate(this.rotation.angle * Math.PI / 360);
    // c.fillStyle = 'red';
    // c.fillRect(0, 0, 200, 200);
    c.fillStyle = 'black';
    c.drawImage(this.sprite, -this.size.width/2, -this.size.height/2, this.size.width, this.size.height);
    // c.fillRect(-this.size.width/2, -this.size.height/2, this.size.width, this.size.height);
    c.restore();
  }

  update(c) {
    this.rotation.angle += this.rotation.rotationSpeed; 
    if(this.rotation.angle > 360) this.rotation.angle -= 720; // clearing unnecessary content
    if(this.rotation.angle < -720) this.rotation.angle += 720; // clearing unnecessary content

    this.position.x += -this.velocity.y * Math.sin(this.rotation.angle * Math.PI / 360);
    this.position.y += this.velocity.y * Math.cos(this.rotation.angle* Math.PI / 360);
    this.draw(c);
    // console.log(this.rotation.angle);
  }
}

export default Plane;