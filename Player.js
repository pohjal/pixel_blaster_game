export default class Player {
  constructor(x, y, bulletController, ctx) {
    this.x = x;
    this.y = y;
    this.bulletController = bulletController;
    this.width = 50;
    this.height = 50;
    this.speed = 4;
    this.health = 20;
    this.isDamaged = false;
    this.damageTime = 0;

    document.body.addEventListener("keyup", this.keyUp);
    document.body.addEventListener("keydown", this.keyDown);
  }

  draw(ctx) {
    this.move();

    if (this.isDamaged) {
      this.drawDamage(ctx);
      this.damageTime--;
      if (this.damageTime <= 0) {
        this.isDamaged = false;
      }
    } else if (this.health > 0) {
      ctx.strokeStyle = "yellow";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = "black";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.shoot();
  }

  drawDamage(ctx) {
    this.move();

    if (this.health > 0) {
      ctx.strokeStyle = "red";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = "black";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  shoot() {
    if (this.shootPressed) {
      const speed = 5;
      const delay = 7;
      const damage = 1;
      const bulletX = this.x + this.width / 2;
      const bulletY = this.y;
      this.bulletController.shoot(bulletX, bulletY, speed, damage, delay);
    }
  }

  move() {
    if (this.downPressed) {
      this.y = this.y + this.speed;
    }
    if (this.upPressed) {
      this.y = this.y - this.speed;
    }
    if (this.leftPressed) {
      this.x = this.x - this.speed;
    }
    if (this.rightPressed) {
      this.x = this.x + this.speed;
    }
  }

  keyDown = (event) => {
    if (event.keyCode == 40) {
      this.downPressed = true;
    }
    if (event.keyCode == 39) {
      this.rightPressed = true;
    }
    if (event.keyCode == 38) {
      this.upPressed = true;
    }
    if (event.keyCode == 37) {
      this.leftPressed = true;
    }
    if (event.code === "Space") {
      this.shootPressed = true;
    }
  };

  keyUp = (event) => {
    if (event.keyCode == 40) {
      this.downPressed = false;
    }
    if (event.keyCode == 39) {
      this.rightPressed = false;
    }
    if (event.keyCode == 38) {
      this.upPressed = false;
    }
    if (event.keyCode == 37) {
      this.leftPressed = false;
    }
    if (event.code === "Space") {
      this.shootPressed = false;
    }
  };

  getPosition() {
    return [this.y, this.x];
  }

  //   takeDamage(damage) {
  //     this.health -= damage;
  //     this.drawDamage(this.ctx);
  //   }

  takeDamage(damage) {
    this.health -= damage;
    this.isDamaged = true;
    this.damageTime = 15; // Duration for showing damage effect
  }

  //   boundaryCheck(canvas) {
  //     const radius = this.width / 2; // Assuming radius is half of the player's width for boundary calculations

  //     if (this.y < radius) {
  //       this.y = radius;
  //     }
  //     if (this.x < radius) {
  //       this.x = radius;
  //     }

  //     if (this.y > canvas.height - radius) {
  //       this.y = canvas.height - radius;
  //     }
  //     if (this.x > canvas.width - radius) {
  //       this.x = canvas.width - radius;
  //     }
  //   }
}
