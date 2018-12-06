let canvas = document.getElementById("gameScreen");

let ctx = canvas.getContext("2d");

let resetBtn = document.getElementById("reset");

let angleDisplay = document.getElementById("angle");

const GAME_WIDTH = 500;
const GAME_HEIGHT = 700;

var balls = [];

for(var i=0; i<5; i++){
    balls.push(new Ball(GAME_WIDTH, GAME_HEIGHT, i));
    balls[i].draw(ctx);
    new InputHandler(balls[i]);
}

resetBtn.onclick = function(){
    for(var i=0; i<5; i++){
        balls[i].reset();
    }
    this.blur();
};

function gameLoop(){
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    for(var i=0; i<5; i++){
        balls[i].update();
        balls[i].draw(ctx);
    }
    angle.innerHTML = balls[0].getAngle();

    requestAnimationFrame(gameLoop);
}

gameLoop();
