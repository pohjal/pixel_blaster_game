import Enemy from "./Enemy.js";

const health = 1;
const speed = 1;

// this is the class where the

export default class KolmioEnemy extends Enemy {
  constructor(x, y, color, shape) {
    super(x, y, color, health, shape);
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
}
