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
            cells[row].push(new Cell(canvas, brick, row, col));
        }
    }

    for(var row = 4; row < 8; row++){
        cells.push([]);
        bricks.push([]);
        for(var col = 0; col < 7; col++){
            bricks[row].push(null);
            cells[row].push(new Cell(canvas, null, row, col));
        }
    }

    var bounce = new Bounce(canvas, cells, balls[0].getRadius());

    var inputHandler = new ArrowInputHandler(arrow, balls[0]);

    var nextMove;

    var startTime;
    var firstBall = undefined;

    var inGame = false;

    $('#startGame').click(function(){
        if(!gameLost() && !inGame){
            for(var i = 0; i < balls.length; i++){
                nextMove = new Movement(arrow.getAngle(), 5);
                balls[i].setMovement(nextMove);
            }
            arrow = new Arrow(canvas, balls[0].getPosition());
            inputHandler = new ArrowInputHandler(arrow, balls[0]);
            startTime = Date.now();
            this.blur();
            inGame = true;
        }
    });

    function gameLost(){
      for(var col = 0; col < cells[cells.length-1].length; col ++){
          if(cells[cells.length-1][col].isActive()) return true;
      }
      return false;
    }

    function ballsMoving(){
        for(var i = 0; i < balls.length; i++){
            if(balls[i].isMoving()) return true;
        }
        return false;
    }

    function gameLoop(){
        canvas.draw().clearRect(0, 0, canvas.getWidth(), canvas.getHeight());

        if(gameLost()){
          canvas.draw().fillText("You Lost!", canvas.getWidth()/2, canvas.getHeight()/2);
        }else{
          if(!inGame){
            arrow.draw();
          }

          for(var i = 0; i< balls.length; i++){
              if(Date.now() - startTime > 200 * i){
                  balls[i].move(bounce);
                  if(inGame && !balls[i].isMoving() && firstBall == undefined){
                    firstBall = i;
                  }
              }

              balls[i].draw();
          }

          if(firstBall != undefined && inGame && !ballsMoving()){
              var startX = balls[firstBall].getPosition().getX();
              for(var i = 0; i < balls.length; i++){
                  if(i != firstBall){
                      balls[i].getPosition().setX(startX);
                  }
              }
              inGame = false;
              firstBall = undefined;

              for(var row = bricks.length - 1; row > 0; row--){
                  bricks[row] = bricks[row-1];
                  for(var col = 0; col < cells[0].length; col++){
                      cells[row][col].setBrick(bricks[row][col]);
                  }
              }
              bricks[0] = [null,null,null,null,null,null,null];
              for(var col = 0; col < cells[0].length; col++){
                  cells[0][col].setBrick(bricks[0][col]);
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
        }

        requestAnimationFrame(gameLoop);
    }

    gameLoop();

});
