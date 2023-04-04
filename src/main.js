import Plane from './scripts/classes/Plane.mjs';
import Trace from './scripts/classes/Trace.mjs';
export const canvas = document.getElementById('canvas');
canvas.width = 1360;
canvas.height = 680;
const c = canvas.getContext('2d');

export const plane1 = new Plane({x: 650, y: 400, width: 45, height: 50});
console.log(plane1);

const traces = [];



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



const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  const trace = new Trace({centerX: plane1.position.x, centerY: plane1.position.y,
    colorNumbers: [100, 100, 100], radius: 5})
    traces.push(trace);
  if(traces.length >= 40) {
    traces.shift();
  }
  traces.forEach(trace => 
    trace.update(c)
  )
  
  plane1.update(c, traces);
  // c.fillStyle = 'blue';
  // c.fillRect(plane1.position.x - 10, plane1.position.y - 10, 20, 20);
  
  btn(rightBtn, ">");
  btn(leftBtn, "<");
}
animate();

