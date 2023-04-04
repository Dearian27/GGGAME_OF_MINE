import Plane from './scripts/classes/Plane.mjs';
var canvas = document.getElementById('canvas');
canvas.width = 1360;
canvas.height = 680;
const c = canvas.getContext('2d');

export const plane1 = new Plane({x: 650, y: 400, width: 35, height: 50});
console.log(plane1);


const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  plane1.update(c);
  c.fillStyle = 'blue';
  c.fillRect(
  // plane1.position.x + (plane1.size.width / 2) - 10,
  plane1.position.x - 10,
  plane1.position.y - 10,
  // plane1.position.y + (plane1.size.height / 2) - 10,
  20,
  20);
}
animate();

