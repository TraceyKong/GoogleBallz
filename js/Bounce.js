class Bounce{

    constructor(canvas, bricks, radius){
        this.canvas = canvas;
        this.bricks = bricks;
        this.radius = radius;
    }

    bottomTouched(position){ return position.getY() >= this.canvas.getHeight() - this.radius; }

    bounceWall(position, movement){
        if(position.getX() < this.radius || position.getX() > this.canvas.getWidth() - this.radius){
            movement.reverseX();
        }
        if(position.getY() < this.radius) movement.reverseY();
    }

    bounceBricks(position, movement){
        for(var i = 0; i < this.bricks.length; i++){
            if(position.getX() > this.bricks[i].getLeft() && position.getX() < this.bricks[i].getRight()){
                if(position.getY() > this.bricks[i].getTop() - this.radius && position.getY() < this.bricks[i].getBottom() + this.radius){
                    movement.reverseY();
                    this.bricks[i].decreasePower();
                }
            }else if(position.getY() > this.bricks[i].getTop() && position.getY() < this.bricks[i].getBottom()){
                if(position.getX() > this.bricks[i].getLeft() - this.radius && position.getX() < this.bricks[i].getRight() + this.radius){
                    movement.reverseX();
                    this.bricks[i].decreasePower();
                }
            }
        }
    }

}
