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
  graphic: 'high', // low/high
}

export const traces = [];
export const missiles = [];
export const smokes = [];
export const bursts = [];
export const players = [
  new Plane({x: 1200, y: 500, width: 50, height: 45, angle: -90, keys: "WASD", id: 1}),
  new Plane({x: 250, y: 200, width: 50, height: 45, angle: 90, keys: "ARROWS", id: 2})
];


export const walls = [
  new Wall({x: 0, y: 0, width: canvas.width, height: 10, color: 'grey'}),
  new Wall({x: 0, y: canvas.height-10, width: canvas.width, height: 10, color: 'grey'}),
]
// const m1 = new Missile({x: 400, y: 400, width: 45, height:50});
// missiles.push(
//   new GuidedMissile({x: 400, y: 400, width: 30, height: 15, speed: 5, minSpeed: 1, angle: plane1.angle})
// )
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
    if(missile.type === 'gm' && missile?.findTarget || missile.type !== 'gm') {
      players.forEach((player) => {
        if (circleIntersect(player.position.x, player.position.y, player.collision.r, missile.position.x, missile.position.y, missile.collision.r)){
          missiles.splice(index, 1);
          let burst = [];
          let particleCount = params.graphic === "high" ? 500 : params.graphic === "low" && 200;
          for(let i = 0; i < particleCount; i++) {
            burst.push(new BurstParticle({centerX: missile.position.x + missile.size.width/2, 
            centerY: missile.position.y + missile.size.height/2, radius: 4}));
          }
          bursts.push(burst);
        }
      })
    }
  })

  walls.forEach((wall, indexW) => {
    missiles.forEach((missile, indexM) => {
      if(missile.type === 'gm') {
        if (missile.findTarget && circleRectIntersect(missile.position.x, missile.position.y, missile.collision.r, wall.position.x, wall.position.y, wall.size.width, wall.size.height)){
          missiles.splice(indexM, 1);
          let burst = [];
          let particleCount = params.graphic === "high" ? 500 : params.graphic === "low" && 200;
          for(let i = 0; i < particleCount; i++) {
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
  players.forEach((player) => {
    if(player.cd.currentCd > 0) {
      player.cd.currentCd-=6;
    }
  })
}, 1000);

const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = '#4D4D4D';
  c.fillRect(0, 0, canvas.width, canvas.height);
  checkCollision();

  traces.forEach(trace => 
    trace.update(c)
  )
  bursts.forEach((burst, index1) => {
    if(bursts.length === 0) bursts.splice(index1, 1);
    burst.forEach((particle, index2) => {
      if(particle.speed <= 0.2) burst.splice(index2, 1);
      else particle.update();
    })
  });
 
  smokes.forEach((smoke, index) => { 
    if(smoke.minSize >= smoke.size) {
      smokes.splice(index, 1);
    }
    smoke.update()
  })
  
  players.forEach(player =>
    player.update(c)
  )
  // c.fillStyle = 'blue';
  // c.fillRect(plane1.position.x - 10, plane1.position.y - 10, 20, 20);
  
  missiles.forEach((missile, index) => {
    missile.draw();  
  })
  // missile1.draw(c, plane1.position.x, plane1.position.y);  

  walls.forEach(wall => 
    wall.draw()
  )
  btn(rightBtn, ">");
  btn(leftBtn, "<");
}
animate()


