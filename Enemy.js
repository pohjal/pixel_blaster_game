export default class Enemy {
  constructor(x, y, color, health, shape, onko = false) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.health = health;
    this.width = 50;
    this.height = 50;
    this.shape = shape;
    this.isShooter = onko;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.health > 1 ? "white" : this.color;

    // Draw based on shape
    switch (this.shape) {
      case "circle":
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        break;
      case "rectangle":
      default:
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        break;
      case "triangle":
        ctx.beginPath();
        ctx.moveTo(this.x, this.y); // Top left
        ctx.lineTo(this.x + this.width / 2, this.y + this.height); // Bottom center
        ctx.lineTo(this.x + this.width, this.y); // Top right
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
    }

    // Draw Text
    ctx.fillStyle = "black";
    ctx.font = "25px Arial";
    // ctx.fillText(
    //   this.health,
    //   this.x + this.width / 3.5,
    //   this.y + this.height / 1.5
    // );
  }

  takeDamage(damage) {
    this.health -= damage;
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
