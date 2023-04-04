import {plane1} from './main.js'

window.addEventListener('keypress', (event) => {
  switch(event.code) {
    case "KeyA": {
      plane1.velocity.x = -5;
      plane1.rotation.rotationSpeed = -4;
    } break;
    case "KeyD": {
      plane1.velocity.x = 5;
      plane1.rotation.rotationSpeed = 4;
    }break;
  }
  // console.log(plane1.velocity.x, plane1.rotation.rotationSpeed)
})

window.addEventListener('keyup', (event) => {
  if(event.code === 'KeyA' && plane1.rotation.rotationSpeed < 0) {
    plane1.velocity.x = 0;
    plane1.rotation.rotationSpeed = 0;
  } 
  else if(event.code === 'KeyD' && plane1.rotation.rotationSpeed > 0) {
    plane1.velocity.x = 0;
      plane1.rotation.rotationSpeed = 0;
  }
})