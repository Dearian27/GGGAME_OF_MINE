import { missiles, params, traces } from "../../main";
import DefaultMissile from "./DefaultMissile.mjs";
import GuidedMissile from "./GuidedMissile.mjs";
import Trace from "./Trace.mjs";

const planeImg = new Image();
planeImg.src =  '/src/assets/plane.png'; 

class Plane {
  constructor({x, y, width, height, angle, keys, id}) {
    this.id = id
    this.position = {
      x: x,
      y: y,
    }
    this.size = {
      width: width,
      height: height
    }
    this.cd = {
      cd: 6,
      currentCd: 0
    }
    this.collision = {
      r: (this.size.width + this.size.height) / 4
    }
    this.speed = 4;
    this.sprite = planeImg;
    this.rotation = {
      angle: angle * Math.PI / 180, // current angle of Obj
      rotationSpeed: 0, // rotation speed 
    }
    this.keys = keys;
  }
  shoot() {
    // console.log("shoot", this.rotation.angle * 180 / Math.PI);
    missiles.push( 
      // new GuidedMissile({
      // x: this.position.x, y: this.position.y, width: 30, height: 15,
      // speed: 4, minSpeed: 1, angle: this.rotation.angle, ownerId: this.id
      // })
      new DefaultMissile({x: this.position.x, y:this.position.y, width: 30, height: 15,
        angle: this.rotation.angle, speed: 3, ownerId: this.id}
      )
    )
  }
  tracing() {
    traces.push(
      new Trace({centerX: this.position.x, centerY: this.position.y,
      colorNumbers: [100, 100, 100], radius: 4})
    );
    if(traces.length >= 80) {
      traces.shift();
    }
  }
  draw(c) {
    c.save();
    c.translate(this.position.x, this.position.y);
    c.rotate(this.rotation.angle);
    // c.fillStyle = 'black';
    c.drawImage(this.sprite, -this.size.width/2, -this.size.height/2, this.size.width, this.size.height);
    if(params.showCollision) {
      c.beginPath();
      c.fillStyle = '#FFC0CB55';
      c.arc(0, 0,this.collision.r, 0,  2 * Math.PI)
      c.fill();
    }
    // c.fillRect(-this.size.width/2, -this.size.height/2, this.size.width, this.size.height);
    c.restore();
  }

  update(c) {
    this.rotation.angle += this.rotation.rotationSpeed / 100; 
    if(this.rotation.angle * 180 / Math.PI > 360) this.rotation.angle -= 2 * Math.PI; // clearing unnecessary content
    if(this.rotation.angle * 180 / Math.PI < -360) this.rotation.angle += 2 * Math.PI; // clearing unnecessary content
    // if(this.rotation.angle < -360) this.rotation.angle += 360; // clearing unnecessary content

    // this.position.x += -this.velocity.y * Math.sin(this.rotation.angle * Math.PI / 360);
    this.position.x += this.speed * Math.cos(this.rotation.angle);
    // this.position.y += this.velocity.y * Math.cos(this.rotation.angle* Math.PI / 360);
    this.position.y += this.speed * Math.sin(this.rotation.angle);
    this.draw(c);
    this.tracing();
  }
}

export default Plane;