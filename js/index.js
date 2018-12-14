let canvas = document.getElementById("gameScreen");

let ctx = canvas.getContext("2d");

let resetBtn = document.getElementById("reset");

let angleDisplay = document.getElementById("angle");

const GAME_WIDTH = 500;
const GAME_HEIGHT = 600;

var balls = [];
var inputHandlers = [];

for(var i=0; i<10; i++){
    balls.push(new Ball(GAME_WIDTH, GAME_HEIGHT));
    inputHandlers.push(new BallInputHandler(balls[i], i));
}

var arrow = new Arrow(GAME_WIDTH, GAME_HEIGHT);
var arrowHandler = new ArrowInputHandler(arrow, balls[0]);

function getArrow(){
    arrow = new Arrow(GAME_WIDTH, GAME_HEIGHT);
    arrowHandler = new ArrowInputHandler(arrow, balls[0]);
}

resetBtn.onclick = function(){
    for(var i=0; i<balls.length; i++){
        balls[i] = new Ball(GAME_WIDTH, GAME_HEIGHT);
        inputHandlers[i] = new BallInputHandler(balls[i], i);
    }
    getArrow();
    this.blur();
};

function gameLoop(){
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    arrow.update(balls[0].getX(), balls[0].getY());
    if(!balls[0].isMoving() && !balls[balls.length-1].isMoving()){
        arrow.draw(ctx);
    }else if(balls[balls.length-1].isMoving()){
        getArrow();
    };
    for(var i=0; i<balls.length; i++){
        balls[i].update(arrow.getAngle());
        balls[i].draw(ctx);
    };
    angleDisplay.innerHTML = balls[0].getAngle();

    requestAnimationFrame(gameLoop);
}

gameLoop();
