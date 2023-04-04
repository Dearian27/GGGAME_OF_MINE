import Plane from './scripts/classes/Plane.mjs';
import Trace from './scripts/classes/Trace.mjs';
var canvas = document.getElementById('canvas');
canvas.width = 1360;
canvas.height = 680;
const c = canvas.getContext('2d');

export const plane1 = new Plane({x: 650, y: 400, width: 45, height: 50});
console.log(plane1);

const traces = [];

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
  
}
animate();

