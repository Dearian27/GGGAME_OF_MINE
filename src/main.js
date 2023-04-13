import Booster from './scripts/classes/Booster.mjs';
import BurstParticle from './scripts/classes/BurstParticle.mjs';
import GuidedMissile from './scripts/classes/GuidedMissile.mjs';
import Missile from './scripts/classes/Missile.mjs';
import Plane from './scripts/classes/Plane.mjs';
import Trace from './scripts/classes/Trace.mjs';
import Wall from './scripts/classes/Wall.mjs';
export const canvas = document.getElementById('canvas');
canvas.width = 1603; // 1336 * 1.2
canvas.height = 733; // 612 * 1.2
export const c = canvas.getContext('2d');


export const params = {
  showCollision: false,
  deltaTime: 1,
  time: 0,
  graphic: 'high', // low/high
}

export const maps = [
  [
    new Wall({x: canvas.width/2 - 190, y: 10, width: 400, height: 20, color: 'white'}),
    new Wall({x: canvas.width/2 - 190, y: canvas.height - 30, width: 400, height: 20, color: 'white'}),
    new Wall({x: canvas.width/2 - 120, y: 30, width: 30, height: 200, color: 'white'}),
    new Wall({x: canvas.width/2 + 120, y: canvas.height - 230, width: 30, height: 200, color: 'white'}),
  ]
]
export const currentMap = maps[0]
export const traces = [];
export const missiles = [];
export const smokes = [];
export const bursts = [];
export const players = [
  new Plane({x: 1200, y: 500, width: 35, height: 35, angle: -90, keys: "WASD", id: 1, tColor: [121,159,203]}),
  new Plane({x: 250, y: 200, width: 35, height: 35, angle: 90, keys: "ARROWS", id: 2, tColor: [249,102,94]})
];
export const walls = [
  ...currentMap,
  new Wall({x: 0, y: 0, width: canvas.width, height: 10, color: 'grey'}),
  new Wall({x: 0, y: canvas.height-10, width: canvas.width, height: 10, color: 'grey'}),
  new Wall({x: 0, y: 10, width: 10, height: canvas.height - 20, color: 'grey'}),
  new Wall({x: canvas.width-10, y: 10, width: 10, height: canvas.height-20, color: 'grey'}),
]
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
  missiles.forEach((missile, index1) => { //! missile with Player
    players.forEach((player, index2) => {
        if(missile.ownerPhysics || (!missile.ownerPhysics && missile.ownerId !== player.id) ) {
          if (circleIntersect(player.position.x, player.position.y, player.collision.r, missile.position.x, missile.position.y, missile.collision.r)){
            //plane burst
            players.splice(index2, 1);
            //missile burst
            missiles.splice(index1, 1);
            let burst = [];
            let particleCount = params.graphic === "high" ? 450 : params.graphic === "low" && 200;
            for(let i = 0; i < particleCount; i++) {
              burst.push(new BurstParticle({centerX: missile.position.x + missile.size.width/2, 
              centerY: missile.position.y + missile.size.height/2, radius: 4}));
            }
            bursts.push(burst);
          }
        }
      })
  })

  walls.forEach((wall, indexW) => { //! wall with Player
    players.forEach((player, index2) => {
      if (circleRectIntersect(player.position.x, player.position.y, player.collision.r, wall.position.x, wall.position.y, wall.size.width, wall.size.height)){
      //plane burst
      players.splice(index2, 1);
      }
    })
    missiles.forEach((missile, indexM) => {
        if (circleRectIntersect(missile.position.x, missile.position.y, missile.collision.r, wall.position.x, wall.position.y, wall.size.width, wall.size.height)){
          missiles.splice(indexM, 1);
          let burst = [];
          let particleCount = params.graphic === "high" ? 450 : params.graphic === "low" && 200;
          for(let i = 0; i < particleCount; i++) {
            burst.push(new BurstParticle({centerX: missile.position.x + missile.size.width/2, 
            centerY: missile.position.y + missile.size.height/2, radius: 4}));
          }
          bursts.push(burst);
          console.log("burst");
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
  missiles.forEach(missile => {
    if(missile.physicsDelay) {
      if(missile.type === "gm") {
        missile.frame++;
      }
      missile.physicsDelay--;
      if(missile.physicsDelay <= 0) {
        missile.ownerPhysics = true;
      }
    }
  })
}, 1000);

const b = new Booster({x: 800, y: 400, type: 'gm'});

const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = '#4D4D4D';
  c.fillRect(0, 0, canvas.width, canvas.height);
  checkCollision();

  b.draw();
  
  // currentMap.forEach((map) => {
  //   map.draw();
  // })
  traces.forEach(collection => 
    collection.forEach(trace => {
      trace.update(c)
    })
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
  
  players.forEach(player => {
    player.update(c)
  })
  // c.fillStyle = 'blue';
  // c.fillRect(plane1.position.x - 10, plane1.position.y - 10, 20, 20);
  
  missiles.forEach((missile, index) => {
    missile.draw();  
  })
  walls.forEach(wall => 
    wall.draw()
  )
}
animate()


