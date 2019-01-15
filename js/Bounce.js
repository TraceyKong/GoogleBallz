/** Class representing the handler of bouncings */
class Bounce{
    /**
     * Creates Bounce.
     * @param {Canvas} canvas 
     * @param {Bricks array} bricks 
     * @param {number} radius 
     */
    constructor(canvas, bricks, radius){
        this.canvas = canvas;
        this.bricks = bricks;
        this.radius = radius;
    }

    /**
     * Tells whether the ball is touching the bottom of the canvas.
     * @param {Position} position - position of a ball.
     * @return {boolean} true if the ball is touching the bottom of the canvas, false otherwise.
     */
    bottomTouched(position){ return position.getY() >= this.canvas.getHeight() - this.radius; }

    /**
     * Handles the bouncings against the walls.
     * @param {Position} position - position of a ball.
     * @param {Movement} movement - movement of the ball.
     */
    bounceWall(position, movement){
        if(position.getX() < this.radius || position.getX() > this.canvas.getWidth() - this.radius){
            movement.reverseX();
        }
        if(position.getY() < this.radius) movement.reverseY();
    }

    /**
     * Handles the bouncings against the bricks.
     * @param {Position} position - position of a ball.
     * @param {Movement} movement - movement of the ball.
     */
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
