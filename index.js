import Player from "./Player.js";
import Enemy from "./Enemy.js";
import BulletController from "./BulletController.js";
import KolmioEnemy from "./KolmioEnemy.js";
import shooterEnemy from "./Shooter.js";

const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");
const speed = 1;

canvas.width = 700;
canvas.height = 600;
const bulletController = new BulletController(canvas);

const player = new Player(
  canvas.width / 2.2,
  canvas.height / 1.3,
  bulletController
);

const enemies = [
  new Enemy(50, 20, "green", 5, "rectangle"),
  new Enemy(150, 20, "red", 5, "rectangle"),
  new Enemy(250, 20, "gold", 2, "triangle"),
  new Enemy(350, 20, "green", 2, "rectangle"),
  new Enemy(450, 20, "gold", 10, "triangle"),
  new Enemy(50, 100, "green", 5, "triangle"),
  new Enemy(150, 100, "red", 5, "circle"),
  new Enemy(250, 100, "gold", 2, "circle"),
  new Enemy(750, 100, "green", 2, "triangle"),
  new Enemy(450, 100, "gold", 20, "circle"),
  new KolmioEnemy(850, 100, "green", 2, "circle"),
  new KolmioEnemy(850, 100, "gold", 20, "circle"),
];

const kolmioEnemies = [
  new KolmioEnemy(200, 100, "green", "triangle"),
  new KolmioEnemy(200, 200, "gold", "circle"),
];

const shooterEnemies = [
  new shooterEnemy(350, 20, "green", 2, "rectangle", canvas, ctx),
  new shooterEnemy(550, 40, "yellow", 2, "rectangle", canvas, ctx),
];

function gameLoop() {
  setCommonStyle();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  bulletController.draw(ctx);
  player.draw(ctx);
  let playerPosition = player.getPosition();

  shooterEnemies.forEach((shooterEnemy) => {
    shooterEnemy.shoot(playerPosition[1], playerPosition[0]);
    shooterEnemy.attack(playerPosition[1], playerPosition[0], 1);
    shooterEnemy.draw(ctx);
    shooterEnemy.gun.draw(ctx);
  });

  shooterEnemies.forEach((shooterEnemy) => {
    if (bulletController.collideWith(shooterEnemy)) {
      if (shooterEnemy.health <= 0) {
        const index = enemies.indexOf(shooterEnemy);
        shooterEnemies.splice(index, 1);
      }
    }
  });

  kolmioEnemies.forEach((kolmioEnemy) => {
    if (kolmioEnemy.collideWith(player)) {
      player.takeDamage(1);
      const index = kolmioEnemies.indexOf(kolmioEnemy);
      kolmioEnemies.splice(index, 1);
    }
  });

  kolmioEnemies.forEach((kolmioEnemy) => {
    if (bulletController.collideWith(kolmioEnemy)) {
      if (kolmioEnemy.health <= 0) {
        const index = enemies.indexOf(kolmioEnemy);
        kolmioEnemies.splice(index, 1);
      }
    } else {
      let playerPosition = player.getPosition();
      kolmioEnemy.attack(playerPosition[1], playerPosition[0], 1);
      kolmioEnemy.draw(ctx);
    }
  });

  enemies.forEach((enemy) => {
    if (bulletController.collideWith(enemy)) {
      if (enemy.health <= 0) {
        const index = enemies.indexOf(enemy);
        enemies.splice(index, 1);
      }
    } else {
      enemy.draw(ctx);
    }
  });
}

function setCommonStyle() {
  ctx.shadowColor = "#d53";
  ctx.shadowBlur = 20;
  ctx.lineJoin = "bevel";
  ctx.lineWidth = 5;
}

setInterval(gameLoop, 1000 / 60);
