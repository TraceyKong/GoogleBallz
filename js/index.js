let canvas = document.getElementById("gameScreen");

let ctx = canvas.getContext("2d");

const GAME_WIDTH = 500;
const GAME_HEIGHT = 700;

var ball = new Ball(GAME_WIDTH, GAME_HEIGHT);

ball.draw(ctx);

new InputHandler(ball);

let lastTime = 0;

function gameLoop(timestamp){
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ball.update(deltaTime);
    ball.draw(ctx);

    requestAnimationFrame(gameLoop);
}

gameLoop();
