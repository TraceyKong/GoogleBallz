let canvas = document.getElementById("gameScreen");

let ctx = canvas.getContext("2d");

let resetBtn = document.getElementById("reset");

let angleDisplay = document.getElementById("angle");

const GAME_WIDTH = 500;
const GAME_HEIGHT = 600;

var balls;
var inputHandlers;

function getBalls(){
    balls = [];
    inputHandlers = [];
    for(var i=0; i<10; i++){
        balls.push(new Ball(GAME_WIDTH, GAME_HEIGHT));
        inputHandlers.push(new BallInputHandler(balls[i], i));
    }
}

var arrow;
var arrowHandler;

function getArrow(){
    arrow = new Arrow(GAME_WIDTH, GAME_HEIGHT);
    arrowHandler = new ArrowInputHandler(arrow, balls[0]);
}

var bricks;

function getBricks(){
    bricks = [];
    for(var i=0; i<2; i++){
        bricks.push(new Brick(100 * (i+1), 200));
    };
}

getBalls();
getArrow();
getBricks();

resetBtn.onclick = function(){
    getBalls();
    getArrow();
    getBricks();
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

    var startX = balls[0].getX();
    for(var i=0; i<balls.length; i++){
        balls[i].update(arrow.getAngle(), bricks, startX);
        balls[i].draw(ctx);
    };
    angleDisplay.innerHTML = balls[0].getAngle();

    for(var i=0; i<bricks.length; i++){
        if(bricks[i].isActive()){
            bricks[i].draw(ctx);
        }else{
            bricks.splice(i, 1);
        }
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();
