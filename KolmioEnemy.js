import Enemy from "./Enemy.js";

const health = 1;
const speed = 1;

export default class KolmioEnemy extends Enemy {
  constructor(x, y, color) {
    super(x, y, color, health);
    this.speed = speed;
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

  collideWith(sprite) {
    if (
      this.x < sprite.x + sprite.width &&
      this.x + this.width > sprite.x &&
      this.y < sprite.y + sprite.height &&
      this.y + this.height > sprite.y
    ) {
      this.takeDamage();
      return true;
    }
    return false;
  }
}
