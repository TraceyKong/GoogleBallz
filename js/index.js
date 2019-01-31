$(function(){
    var canvas = new Canvas();

    var balls = [];
    for(var i = 0; i < 10; i++){
        balls.push(new Ball(canvas));
    }

    var arrow = new Arrow(canvas, balls[0].getPosition());

    var bricks = [];
    var cells = [];
    
    for(var row = 0; row < 4; row++){
        cells.push([]);
        for(var col = 0; col < 7; col++){
            var brick = new Brick(canvas, new Position(col * 44 + 4, row * 44 + 19));
            bricks.push(brick);
            cells[row].push(new Cell(brick, row, col))
        }
    }

    for(var row = 0; row < 7; row++){
        cells.push([]);
        for(var col = 4; col < 7; col++){
            cells[row].push(new Cell(null, row, col));
        }
    }

    var bounce = new Bounce(canvas, bricks, balls[0].getRadius());

    var inputHandler = new ArrowInputHandler(arrow, balls[0]);

    var nextMove;

    var startTime;
    var firstBall = undefined;

    $('#startGame').click(function(){
        if(!balls[0].isMoving()){
            for(var i = 0; i < balls.length; i++){
                nextMove = new Movement(arrow.getAngle(), 5);
                balls[i].setMovement(nextMove);
            }
            arrow = new Arrow(canvas, balls[0].getPosition());
            inputHandler = new ArrowInputHandler(arrow, balls[0]);
            startTime = Date.now();
            this.blur();
        }
    });

    function ballsMoving(){
        for(var i = 0; i < balls.length; i++){
            if(balls[i].isMoving()) return true;
        }
        return false;
    }

    function gameLoop(){
        canvas.draw().clearRect(0, 0, canvas.getWidth(), canvas.getHeight());

        if(!ballsMoving()){
            arrow.draw();
        }
        
        for(var i = 0; i< balls.length; i++){
            if(Date.now() - startTime > 200 * i){
                balls[i].move(bounce);
                if(!balls[i].isMoving() && firstBall == undefined) firstBall = i;
            }

            balls[i].draw();
        }

        if(firstBall != -1 && !ballsMoving()){
            var startX = balls[firstBall].getPosition().getX();
            for(var i = 0; i < balls.length; i++){
                if(i != firstBall){
                    balls[i].getPosition().setX(startX);
                }
            }
            firstBall = undefined;
        }

        for(var i = 0; i < bricks.length; i++){
            if(bricks[i].isActive()) bricks[i].draw();
            else{
                var remove = bricks[i];
                bricks[i] = bricks[bricks.length - 1];
                bricks[bricks.length - 1] = remove;
                bricks.splice(bricks.length - 1, 1);
                console.log("brick " + i + "deleted.");
            };
        }
        
        requestAnimationFrame(gameLoop);
    }

    gameLoop();

});
