const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");

let x = 100;
let y = 100;
let radius = 25;
let speed = 10;

let downPressed = false;
let upPressed = false;
let leftPressed = false;
let rightPressed = false;

function drawGame() {
  requestAnimationFrame(drawGame);
  clearScreen();
  inputs();
  boyndryCheck();
  drawPlayer();
}
function inputs() {
  if (downPressed) {
    y = y + speed;
  }
  if (upPressed) {
    y = y - speed;
  }
  if (leftPressed) {
    x = x - speed;
  }
  if (rightPressed) {
    x = x + speed;
  }
}

function boyndryCheck() {
  if (y < radius) {
    y = radius;
  }
  if (x < radius) {
    x = radius;
  }

  if (y > canvas.height - radius) {
    y = canvas.height - radius;
  }
  if (x > canvas.width - radius) {
    x = canvas.width - radius;
  }
}
function clearScreen() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function keyDown(event) {
  if (event.keyCode == 40) {
    downPressed = true;
  }
  if (event.keyCode == 39) {
    rightPressed = true;
  }
  if (event.keyCode == 38) {
    upPressed = true;
  }
  if (event.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUp(event) {
  if (event.keyCode == 40) {
    downPressed = false;
  }
  if (event.keyCode == 39) {
    rightPressed = false;
  }
  if (event.keyCode == 38) {
    upPressed = false;
  }
  if (event.keyCode == 37) {
    leftPressed = false;
  }
}
document.body.addEventListener("keyup", keyUp);
document.body.addEventListener("keydown", keyDown);

drawGame();
