import {players} from './main.js'
import {canvas} from './main.js'
import {leftBtn, rightBtn} from './main.js'


const player1 = players.find(player => player.keys === 'WASD')
const player2 = players.find(player => player.keys === 'ARROWS')

window.addEventListener('keydown', (event) => {
  switch(event.code) {
    case "KeyA": {
      if(player1.defaultSpeed > player1.speed) {
        player1.rotation.rotationSpeed = -5.5;
      } else {
        player1.rotation.rotationSpeed = -4;
      }
    } break;
    case "KeyD": {
      if(player1.defaultSpeed > player1.speed) {
        player1.rotation.rotationSpeed = 5.5;
      } else {
        player1.rotation.rotationSpeed = 4;
      }
    }break;
    case "KeyS": {
      player1.speed = player1.defaultSpeed / 1.5;
    }break;
    case "KeyE": {
      if(player1.cd.currentCd === 0) {
        player1.cd.currentCd = player1.cd.cd;
        if(players.find(player => player.keys === 'WASD'))
          player1.shoot();
      }
    }break;
    case "ArrowLeft": {
      if(player2.defaultSpeed > player2.speed) {
        player2.rotation.rotationSpeed = -5.5;
      } else {
        player2.rotation.rotationSpeed = -4;
      }
    }break;
    case "ArrowRight": {
      if(player2.defaultSpeed > player2.speed) {
        player2.rotation.rotationSpeed = 5.5;
      } else {
        player2.rotation.rotationSpeed = 4;
      }
    }break;
    case "ArrowDown": {
      player2.speed = player2.defaultSpeed / 1.5;
    }break;
    case "Slash": {
      if(player2.cd.currentCd === 0) {
        player2.cd.currentCd = player1.cd.cd;
        if(players.find(player => player.keys === 'ARROWS'))
          player2.shoot();
      }
    }break;
  }
})

window.addEventListener('keyup', (event) => {
  if(event.code === 'KeyS') {
    player1.speed = player1.defaultSpeed;
  }
  else if(event.code === 'ArrowDown') {
    player2.speed = player2.defaultSpeed;
  }
  else if(event.code === 'KeyA' && player1.rotation.rotationSpeed < 0) {
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


