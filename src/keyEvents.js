import {players} from './main.js'
import {canvas} from './main.js'
import {leftBtn, rightBtn} from './main.js'


const player1 = players.find(player => player.keys === 'WASD')
const player2 = players.find(player => player.keys === 'ARROWS')

window.addEventListener('keydown', (event) => {
  switch(event.code) {
    case "KeyA": {
      player1.rotation.rotationSpeed = -4;
    } break;
    case "KeyD": {
      player1.rotation.rotationSpeed = 4;
    }break;
    case "KeyE": {
      if(player1.cd.currentCd === 0) {
        player1.cd.currentCd = player1.cd.cd;
        player1.shoot();
      }
    }break;
    case "ArrowLeft": {
      player2.rotation.rotationSpeed = -4;
    }break;
    case "ArrowRight": {
      player2.rotation.rotationSpeed = 4;
    }break;
    case "Slash": {
      if(player2.cd.currentCd === 0) {
        player2.cd.currentCd = player1.cd.cd;
        player2.shoot();
      }
    }break;
  }
})

window.addEventListener('keyup', (event) => {
  if(event.code === 'KeyA' && player1.rotation.rotationSpeed < 0) {
    player1.rotation.rotationSpeed = 0;
  } 
  else if(event.code === 'KeyD' && player1.rotation.rotationSpeed > 0) {
    player1.rotation.rotationSpeed = 0;
  }else if(event.code === 'KeyA' && player1.rotation.rotationSpeed < 0) {
    player1.rotation.rotationSpeed = 0;
  } 
  else if(event.code === 'KeyD' && player1.rotation.rotationSpeed > 0) {
    player1.rotation.rotationSpeed = 0;
  }
  else if(event.code === 'ArrowLeft' && player2.rotation.rotationSpeed < 0) {
    player2.rotation.rotationSpeed = 0;
  } 
  else if(event.code === 'ArrowRight' && player2.rotation.rotationSpeed > 0) {
    player2.rotation.rotationSpeed = 0;
  }else if(event.code === 'ArrowLeft' && player2.rotation.rotationSpeed < 0) {
    player2.rotation.rotationSpeed = 0;
  } 
  else if(event.code === 'ArrowRight' && player2.rotation.rotationSpeed > 0) {
    player2.rotation.rotationSpeed = 0;
  }
})


// function getMousePos(canvas, event) {
//   var rect = canvas.getBoundingClientRect();
//   return {
//     x: event.clientX - rect.left,
//     y: event.clientY - rect.top,
//   };
// }
// function isInside(pos, rect) {
//   return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
// }
// canvas.addEventListener('click', function(evt) {
//   var mousePos = getMousePos(canvas, evt);

//   if (isInside(mousePos, leftBtn)) {
//     console.log('inside leftbtn');
//     plane1.rotation.rotationSpeed = -4;
//   }else if(isInside(mousePos, rightBtn)) {
//     plane1.rotation.rotationSpeed = 4;
//   }else {
//     plane1.rotation.rotationSpeed = 0;
//   }
// }, false);


