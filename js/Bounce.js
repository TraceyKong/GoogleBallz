/** Class representing the handler of bouncings */
class Bounce{
    /**
     * Creates Bounce.
     * @param {Canvas} canvas 
     * @param {Cells 2D array} cells
     * @param {number} radius 
     */
    constructor(canvas, cells, radius){
        this.canvas = canvas;
        this.cells = cells;
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
     * Handles the bouncings against the cells.
     * @param {Position} position - position of a ball.
     * @param {Movement} movement - movement of the ball.
     */
    bounceCells(position, movement){
        


        //bounce off edges but not corners
        for(var row = 0; row < this.cells.length; row++){
            for(var col = 0; col < this.cells[0].length; col++){
                if(this.cells[row][col].isActive()){
                    if(position.getX() > this.cells[row][col].getLeft() && position.getX() < this.cells[row][col].getRight()){
                        if(position.getY() > this.cells[row][col].getTop() - this.radius && position.getY() < this.cells[row][col].getBottom() + this.radius){
                            movement.reverseY();
                            this.cells[row][col].decreasePower();
                        }
                    }else if(position.getY() > this.cells[row][col].getTop() && position.getY() < this.cells[row][col].getBottom()){
                        if(position.getX() > this.cells[row][col].getLeft() - this.radius && position.getX() < this.cells[row][col].getRight() + this.radius){
                            movement.reverseX();
                            this.cells[row][col].decreasePower();
                        }
                    }
                }
            }
        }
    }

}
