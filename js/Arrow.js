/** Class representing an arrow. */
class Arrow{
    /**
     * Creates an arrow.
     * @param {Canvas} canvas - The canvas.
     * @param {Position} ballPosition - The ball's position.
     */
    constructor(canvas, ballPosition){
        this.canvas = canvas;
        this.LENGTH = 300;
        this.start = ballPosition;
        this.end = canvas.getInitialPosition();
        this.end.setY(this.end.getY() - this.LENGTH);
        this.angle = 90;
    }

    //getters
    getAngle(){ return this.angle; }

    /**
     * Draws the arrow on the canvas.
     */
    draw(){
        this._update();
        this.canvas.draw().beginPath();
        this.canvas.draw().moveTo(this.start.getX(), this.start.getY());
        this.canvas.draw().lineWidth = 3
        this.canvas.draw().lineTo(this.end.getX(), this.end.getY());
        this.canvas.draw().stroke();
        this.canvas.draw().lineWidth = 1;
    }

    /**
     * Rotates the arrow to the left, which increments the angle by 1.
     */
    rotateLeft(){
        if(this.angle < 180) this.angle += 1;
    }

    /**
     * Rotates the arrow to the right, which decrements the angle by 1.
     */
    rotateRight(){
        if(this.angle > 0) this.angle -= 1;
    }

    /**
     * Updates the arrow's end's position.
     */
    _update(){
        this.end.setX(this.start.getX() + this.LENGTH * Math.cos(this.angle * (Math.PI / 180)));
        this.end.setY(this.start.getY() + this.LENGTH * Math.sin((this.angle + 180) * (Math.PI / 180)));
    }

}
