import { c, missiles } from "../../main.js";
import SinMissile from "./SinMissile.mjs";
import missileImg from "/assets/m2.png";
import warningImg from "/assets/warning_sign.png"; // Попереджувальний знак

const sprite = new Image();
sprite.src = missileImg;

const warningSprite = new Image();
warningSprite.src = warningImg;
warningSprite.width = 100;
warningSprite.height = 100;

export class Trap {
  constructor({
    startX,
    startY,
    targetX,
    targetY,
    warningDelay = 121,
    missileSpeed = 5,
    warningWidth = 66,
    warningHeight = 58,
    blinkSpeed = 20,
    blinkTime = 20,
  }) {
    this.position = {
      x: startX,
      y: startY,
    };
    this.targetPosition = { x: targetX, y: targetY };
    this.missileSpeed = missileSpeed;
    this.warningShown = false;
    this.missile = null;
    this.time = 0;
    this.warningWidth = warningWidth;
    this.warningHeight = warningHeight;

    this.warningDelay = warningDelay; // Затримка перед запуском ракети
    this.blinkTime = blinkTime; // Лічильник для блимання
    this.blinkSpeed = blinkSpeed;
    this.soundIndex = 0;
  }

  playWarningSound() {
    this.soundPlayed = true;
    const sound = new Audio("/assets/sounds/warning_sound.mp3");
    sound.play();
  }

  draw() {
    // Спочатку показуємо попереджувальний знак
    if (this.time < this.warningDelay && !this.warningShown) {
      this.blinkTime++;
      const showWarning =
        Math.floor(this.blinkTime / this.blinkSpeed) % 2 === 0;

      if (showWarning) {
        if (Math.floor(this.blinkTime / this.blinkSpeed) > this.soundIndex) {
          this.playWarningSound();
          this.soundIndex++;
        }

        c.save();
        c.translate(this.position.x, this.position.y);
        c.drawImage(
          warningSprite,
          -this.warningWidth / 2,
          -this.warningHeight / 2,
          this.warningWidth,
          this.warningHeight
        );
        c.restore();
      }
    }

    // Після затримки запускаємо ракету
    if (this.time >= this.warningDelay && !this.warningShown) {
      this.warningShown = true;
      missiles.push(
        new SinMissile({
          x: this.position.x,
          y: this.position.y,
          width: 30,
          height: 15,
          angle: Math.atan2(
            this.targetPosition.y - this.position.y,
            this.targetPosition.x - this.position.x
          ),
          speed: this.missileSpeed,
          maxSpeed: this.missileSpeed,
          amplitude: 5,
          frequency: 0.1,
          ownerId: null,
          isGhost: true,
        })
      );
      // missiles.push(this.missile);
    }

    this.time++;
  }

  update() {}
}

export default Trap;
