let canvas = document.getElementById("gameScreen");

let ctx = canvas.getContext("2d");

let resetBtn = document.getElementById("reset");

let angleDisplay = document.getElementById("angle");

const GAME_WIDTH = 500;
const GAME_HEIGHT = 700;

var ball = new Ball(GAME_WIDTH, GAME_HEIGHT);

ball.draw(ctx);

new InputHandler(ball);

resetBtn.onclick = function(){
    ball.reset();
    this.blur();
};

let lastTime = 0;

function gameLoop(){
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ball.update();
    angle.innerHTML = ball.getAngle();
    ball.draw(ctx);

    requestAnimationFrame(gameLoop);
}

gameLoop();
