export default class Bullet {
  colors = [
    "red",
    "blue",
    "red",
    "green",
    "yellow",
    "orange",
    "purple",
    "pink",
    "brown",
    "grey",
  ];

  constructor(x, y, velocityX, velocityY, damage) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.damage = damage;
    this.velocityX = velocityX;
    this.velocityY = velocityY;

    this.width = 5;
    this.height = 15;
    this.color = "red";
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  draw(ctx) {
    this.x += this.velocityX;
    this.y += this.velocityY;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  collideWith(sprite) {
    if (
      this.x < sprite.x + sprite.width &&
      this.x + this.width > sprite.x &&
      this.y < sprite.y + sprite.height &&
      this.y + this.height > sprite.y
    ) {
      sprite.takeDamage(this.damage);
      return true;
    }
    return false;
  }
}
