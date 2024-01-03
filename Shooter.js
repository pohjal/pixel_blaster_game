import Enemy from "./Enemy.js";
import BulletController from "./BulletController.js";

const health = 1;
const speed = 1;

export default class Shooter extends Enemy {
  constructor(x, y, color, shape, canvas, ctx) {
    super(x, y, color, health, shape, true);
    this.speed = speed;
    this.gun = new BulletController(canvas);
    this.ctx = ctx;
    this.shootingDelay = 20; // delay between shots
    this.shootingTimer = this.shootingDelay;
  }

  //   shoot(playerX, playerY) {
  //     if (this.shootingTimer <= 0) {
  //       const bulletX = this.x + this.width / 2;
  //       const bulletY = this.y;
  //       const angle = Math.atan2(playerY - this.y, playerX - this.x);
  //       const speed = 20;
  //       const damage = 1;
  //       this.gun.shoot(bulletX, bulletY, angle, speed, damage);

  //       this.shootingTimer = this.shootingDelay;
  //     } else {
  //       this.shootingTimer--;
  //     }
  //   }

  shoot(playerX, playerY) {
    if (this.shootingTimer <= 0) {
      const directionX = playerX - this.x;
      const directionY = playerY - this.y;
      const magnitude = Math.sqrt(
        directionX * directionX + directionY * directionY
      );

      if (magnitude !== 0) {
        const normalizedDirectionX = directionX / magnitude;
        const normalizedDirectionY = directionY / magnitude;

        const bulletX = this.x + this.width / 2;
        const bulletY = this.y;
        const speed = 5;
        const damage = 1;

        // Assuming the Bullet class takes velocity X and Y as parameters
        this.gun.shoot(
          bulletX,
          bulletY,
          normalizedDirectionX * speed,
          normalizedDirectionY * speed,
          damage
        );
      }

      this.shootingTimer = this.shootingDelay;
    } else {
      this.shootingTimer--;
    }
  }

  attack(playerX, playerY, enemySpeed) {
    let directionX = playerX - this.x;
    let directionY = playerY - this.y;
    let magnitude = Math.sqrt(
      directionX * directionX + directionY * directionY
    );

    // Ensure division by zero doesn't occur
    if (magnitude !== 0) {
      directionX /= magnitude;
      directionY /= magnitude;
      this.x += directionX * enemySpeed;
      this.y += directionY * enemySpeed;
    }
  }
}
