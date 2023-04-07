import BurstParticle from './scripts/classes/BurstParticle.mjs';
import GuidedMissile from './scripts/classes/GuidedMissile.mjs';
import Missile from './scripts/classes/Missile.mjs';
import Plane from './scripts/classes/Plane.mjs';
import Trace from './scripts/classes/Trace.mjs';
import Wall from './scripts/classes/Wall.mjs';
export const canvas = document.getElementById('canvas');
canvas.width = 1603; // 1336 * 1.2
canvas.height = 750; // 625 * 1.2
export const c = canvas.getContext('2d');


export const params = {
  showCollision: true,
  deltaTime: 1,
  time: 0,
}
export const plane1 = new Plane({x: 650, y: 400, width: 50, height: 45});
console.log(plane1);

export const traces = [];
export const missiles = [];
export const smokes = [];
export const bursts = [];

export const walls = [
  new Wall({x: 0, y: 0, width: canvas.width, height: 10, color: 'grey'}),
  new Wall({x: 0, y: canvas.height-10, width: canvas.width, height: 10, color: 'grey'}),
]
const m1 = new Missile({x: 400, y: 400, width: 45, height:50});
missiles.push(
  new GuidedMissile({x: 400, y: 400, width: 30, height: 15, speed: 5, minSpeed: 1, angle: plane1.angle})
)
// const missile1 = new Missile({x: 400, y: 400, width: 30, height: 15});

export const rightBtn = {
  x: 240,
  y: 500,
  width: 100,
  height: 100,
};

export const leftBtn = {
  x: 100,
  y: 500,
  width: 100,
  height: 100,
};

function btn(rect, text) {
  c.beginPath();
  c.rect(rect.x, rect.y, rect.width, rect.height);
  c.fillStyle = 'rgba(225,225,225,0.5)';
  c.fill();
  c.lineWidth = 2;
  c.strokeStyle = '#000000';
  c.stroke();
  c.closePath();
  c.font = '40pt Kremlin Pro Web';
  c.fillStyle = '#000000';
  c.fillText(text, rect.x + rect.width / 4, rect.y + 64);
}

const circleIntersect = (x1, y1, r1, x2, y2, r2) => {
  // Calculate the distance between the two circles
  let squareDistance = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);

  // When the distance is smaller or equal to the sum
  // of the two radius, the circles touch or overlap
  return squareDistance <= ((r1 + r2) * (r1 + r2))
}

function circleRectIntersect(cx, cy, cr, rx, ry, rw, rh) {
  // Визначаємо AABB прямокутника, який охоплює коло
  const circleDistanceX = Math.abs(cx - rx - rw / 2);
  const circleDistanceY = Math.abs(cy - ry - rh / 2);
  const halfRectWidth = rw / 2;
  const halfRectHeight = rh / 2;

  // Перевіряємо, чи можливий перетин за допомогою AABB
  if (circleDistanceX > halfRectWidth + cr) {
    return false;
  }
  if (circleDistanceY > halfRectHeight + cr) {
    return false;
  }

  // Якщо AABB перетинається з колом, перевіряємо перетин
  if (circleDistanceX <= halfRectWidth || circleDistanceY <= halfRectHeight) {
    return true;
  }

  const cornerDistanceSq =
    Math.pow(circleDistanceX - halfRectWidth, 2) +
    Math.pow(circleDistanceY - halfRectHeight, 2);

  // Перевіряємо, чи перетинається коло і прямокутник
  return cornerDistanceSq <= Math.pow(cr, 2);
}

const checkCollision = () => {
  missiles.forEach((missile, index) => {
    if(missile.type === 'gm') {
      if (missile.findTarget && circleIntersect(plane1.position.x, plane1.position.y, plane1.collision.r, missile.position.x, missile.position.y, missile.collision.r)){
        missiles.splice(index, 1);
        let burst = [];
        for(let i = 0; i < 200; i++) {
          burst.push(new BurstParticle({centerX: missile.position.x + missile.size.width/2, 
          centerY: missile.position.y + missile.size.height/2, radius: 4}));
        }
        bursts.push(burst);
      }
    }
    else if(circleIntersect(plane1.position.x, plane1.position.y, plane1.collision.r, missile.position.x, missile.position.y, missile.collision.r)){
      missiles.splice(index, 1);
    }
  })

  walls.forEach((wall, indexW) => {
    missiles.forEach((missile, indexM) => {
      if(missile.type === 'gm') {
        if (missile.findTarget && circleRectIntersect(missile.position.x, missile.position.y, missile.collision.r, wall.position.x, wall.position.y, wall.size.width, wall.size.height)){
          missiles.splice(indexM, 1);
          let burst = [];
          for(let i = 0; i < 200; i++) {
            burst.push(new BurstParticle({centerX: missile.position.x + missile.size.width/2, 
            centerY: missile.position.y + missile.size.height/2, radius: 4}));
          }
          bursts.push(burst);
        }
      }
      else if(circleIntersect(wall.position.x, wall.position.y, missile.position.x, missile.position.y)) {
        missiles.splice(indexM, 1);
      }
    })
  })
}

const Timer = setInterval(() => {
  params.time++;
  if(plane1.cd.currentCd > 0) {
    plane1.cd.currentCd-=6;
  }
}, 1000);



// const b1 = new BurstParticle({centerX: 300, centerY: 300, radius: 4});
// const b2 = new BurstParticle({centerX: 300, centerY: 300, radius: 4});
// const b2 = new BurstParticle({x: 300, y: 300, radius: 4});

const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = '#4D4D4D';
  c.fillRect(0, 0, canvas.width, canvas.height);
  checkCollision();
  
  // b1.update();
  // b2.update();

  const trace = new Trace({centerX: plane1.position.x, centerY: plane1.position.y,
    colorNumbers: [100, 100, 100], radius: 4})
    traces.push(trace);
  if(traces.length >= 40) {
    traces.shift();
  }
  traces.forEach(trace => 
    trace.update(c)
  )
  bursts.forEach(burst => {
    burst.forEach((particle, index2) => {
      if(particle.speed <= 0.2) burst.splice(index2, 1);
      else particle.update();
    })
  });
 
  smokes.forEach((smoke, index) => { 
    if(smoke.minSize >= smoke.size) {
      smokes.splice(index, 1);
      console.log(smokes)
    }
    smoke.update()
  })
  
  m1.update(c, plane1.position.x, plane1.position.y);
  plane1.update(c);
  // c.fillStyle = 'blue';
  // c.fillRect(plane1.position.x - 10, plane1.position.y - 10, 20, 20);
  
  missiles.forEach((missile, index) => {
    missile.draw(plane1.position.x, plane1.position.y, plane1.rotation.angle);  
  })
  // missile1.draw(c, plane1.position.x, plane1.position.y);  

  walls.forEach(wall => 
    wall.draw()
  )
  btn(rightBtn, ">");
  btn(leftBtn, "<");
}
animate()


