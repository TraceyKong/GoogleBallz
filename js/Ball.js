/** Class representing a ball. */
class Ball{
    /**
     * Creates a ball.
     * @param {Canvas} canvas - the canvas.
     */
    constructor(canvas){
        this.RADIUS = 4;
        this.canvas = canvas;
        this.position = canvas.getInitialPosition();
        this.movement = new Movement(90, 0);
    }

    //getters
    getRadius(){ return this.RADIUS; }
    getPosition(){ return this.position; }

    /**
     * Tells whether the ball is moving or not.
     * @return {boolean} true if the ball is moving, false otherwise.
     */
    isMoving(){ return this.movement.isMoving(); }

    /**
     * Draws the ball on the canvas.
     */
    draw(){
        this.canvas.draw().beginPath();
        this.canvas.draw().arc(this.position.getX(), this.position.getY(), this.RADIUS, 0, 2 * Math.PI, false);
        this.canvas.draw().fillStyle = "green";
        this.canvas.draw().fill();
        this.canvas.draw().stroke();
    }

    /**
     * Sets the movement of the ball to the new movement.
     * @param {Movement} movement - the new movement.
     */
    setMovement(movement){ this.movement = movement; }

    /**
     * Moves the ball by updating its position.
     * @param {Bounce} bounce
     */
    move(bounce){
        bounce.bounceWall(this.position, this.movement);
        bounce.bounceBricks(this.position, this.movement);
        this.position.move(this.movement);

        if(this.isMoving() && bounce.bottomTouched(this.position)){
            this.movement = new Movement(90, 0);
            this.position.setY(this.canvas.getInitialPosition().getY());
        }
    }

}
