const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let paddle = {
  x: 10,
  y: 150,
  width: 10,
  height: 80
};

let ball = {
  x: 300,
  y: 200,
  dx: 3,
  dy: 3,
  radius: 8
};

document.addEventListener("mousemove", movePaddle);

function movePaddle(e) {
  paddle.y = e.clientY - paddle.height / 2;
}

function drawPaddle() {
  ctx.fillStyle = "white";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
}

function update() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.y <= 0 || ball.y >= canvas.height) {
    ball.dy *= -1;
  }

  if (
    ball.x <= paddle.x + paddle.width &&
    ball.y >= paddle.y &&
    ball.y <= paddle.y + paddle.height
  ) {
    ball.dx *= -1;
  }

  if (ball.x <= 0) {
    ball.x = 300;
    ball.y = 200;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawBall();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
