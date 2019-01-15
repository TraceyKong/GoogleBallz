/** Class representing a movement. */
class Movement{
    /**
     * Creates a movement.
     * @param {number} angle - angle of the arrow
     * @param {number} distance - the distance of how far the ball should travel
     */
    constructor(angle, distance){
        this.dx = distance * Math.cos(angle * (Math.PI / 180));
        this.dy = distance * Math.sin((angle + 180) * (Math.PI / 180));
    }

    //getters
    getDx(){ return this.dx; }
    getDy(){ return this.dy; }

    /**
     * Tells whether the ball is moving or not
     * @return {boolean} true if it's moving, false otherwise.
     */
    isMoving(){ return this.dx != 0 || this.dy != 0; }

    /**
     * Reverses the x or y movement of the ball.
     */
    reverseX(){ this.dx = -this.dx; }
    reverseY(){ this.dy = -this.dy; }
    
}
