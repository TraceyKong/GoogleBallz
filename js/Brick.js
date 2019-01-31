/** Class representing a brick. */
class Brick{
    /**
     * Creates a brick.
     * @param {Canvas} canvas - the canvas.
     * @param {Positon} position - the position of the brick.
     */
    constructor(canvas, position){
        this.canvas = canvas;
        this.WIDTH = 40;
        this.HEIGHT = 40;
        this.position = position;
        this.power = 12;
    }

    //getters
    getTop(){ return this.position.getY(); }
    getBottom(){ return this.position.getY() + this.HEIGHT; }
    getLeft(){ return this.position.getX(); }
    getRight(){ return this.position.getX() + this.WIDTH; }

    setY(y){ this.position.setY(y); }

    /**
     * Tells whether the brick still has power
     * @return {boolean} true if the brick power is more than 0, false otherwise.
     */
    isActive(){ return this.power != 0; }

    /**
     * Draws the brick on the canvas.
     */
    draw(){
        this.canvas.draw().beginPath();
        this.canvas.draw().rect(this.position.getX(), this.position.getY(), this.WIDTH, this.HEIGHT);
        this.canvas.draw().fillStyle = "red";
        this.canvas.draw().fill();
        this.canvas.draw().fillStyle = "black";
        this.canvas.draw().font = "14px Arial";
        this.canvas.draw().textAlign = "center";
        this.canvas.draw().textBaseline = "middle";
        this.canvas.draw().fillText(this.power, this.position.getX() + this.WIDTH/2, this.position.getY() + this.HEIGHT/2);
        this.canvas.draw().stroke();
    }

    /**
     * Decrements the power of the brick by 1.
     */
    decreasePower(){ this.power--; }
}
