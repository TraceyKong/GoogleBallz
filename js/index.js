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
        bricks.push([]);
        for(var col = 0; col < 7; col++){
            var brick = new Brick(canvas, new Position(col * 44 + 2 + col, row * 44 + 19 + row));
            bricks[row].push(brick);
            cells[row].push(new Cell(canvas, brick, col, row));
            console.log("Cell " + row + "," + col + " x position: " + cells[row][col].isActive());
        }
    }

    for(var row = 4; row < 7; row++){
        cells.push([]);
        bricks.push([]);
        for(var col = 0; col < 7; col++){
            bricks[row].push(null);
            cells[row].push(new Cell(canvas, null, col, row));
            console.log("Cell " + row + "," + col + " x position: " + cells[row][col].isActive());
        }
    }

    var bounce = new Bounce(canvas, cells, balls[0].getRadius());

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

    function inCell(ball){
        var cellRow = undefined;
        var cellCol = undefined;
        for(var row = 0; row < cells.length; row++){
            if(ball.getPosition().getY() > cells[row][0].getTop() + 1 &&
                ball.getPosition().getY() < cells[row][0].getBottom() + 1){
                    for(var col = 0; col < cells[row].length; col++){
                        if(ball.getPosition().getX() > cells[row][col].getLeft() + 1 &&
                            ball.getPosition().getX() < cells[row][col].getRight() + 1){
                                cellRow = row;
                                cellCol = col;
                            }
                    }
            }
        }

        if(cellRow && cellCol){
            
        }
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

        if(firstBall != undefined && !ballsMoving()){
            var startX = balls[firstBall].getPosition().getX();
            for(var i = 0; i < balls.length; i++){
                if(i != firstBall){
                    balls[i].getPosition().setX(startX);
                }
            }
            firstBall = undefined;
        }
        for(var row = 0; row < cells.length; row++){
            for(var col = 0; col < cells[0].length; col++){
                cells[row][col].draw();
            }
        }

        for(var row = 0; row < cells.length; row++){
            for(var col = 0; col < cells[0].length; col++){
                if(cells[row][col].isActive()){
                    bricks[row][col].draw();
                }else{
                    bricks[row][col] = null;
                    cells[row][col].setBrick(null);
                }
            }
        }
        
        requestAnimationFrame(gameLoop);
    }

    gameLoop();

});
