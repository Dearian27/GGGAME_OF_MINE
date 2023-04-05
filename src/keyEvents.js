import {plane1} from './main.js'
import {canvas} from './main.js'
import {leftBtn, rightBtn} from './main.js'

window.addEventListener('keypress', (event) => {
  switch(event.code) {
    case "KeyA": {
      plane1.rotation.rotationSpeed = -4;
    } break;
    case "KeyD": {
      plane1.rotation.rotationSpeed = 4;
    }break;
  }
})

window.addEventListener('keyup', (event) => {
  if(event.code === 'KeyA' && plane1.rotation.rotationSpeed < 0) {
    plane1.rotation.rotationSpeed = 0;
  } 
  else if(event.code === 'KeyD' && plane1.rotation.rotationSpeed > 0) {
    plane1.rotation.rotationSpeed = 0;
  }
})


function getMousePos(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}
function isInside(pos, rect) {
  return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
}

canvas.addEventListener('click', function(evt) {
  var mousePos = getMousePos(canvas, evt);

  if (isInside(mousePos, leftBtn)) {
    console.log('inside leftbtn');
    plane1.rotation.rotationSpeed = -4;
  }else if(isInside(mousePos, rightBtn)) {
    plane1.rotation.rotationSpeed = 4;
  }else {
    plane1.rotation.rotationSpeed = 0;
  }
}, false);


