/** Class representing a position. */
class Position{
    /**
     * Creates a position.
     * @param {number} x - x position
     * @param {number} y - y position
     */
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    //getters
    getX(){ return this.x; };
    getY(){ return this.y; };

    /**
     * Assign new values to the position.
     */
    setX(x){ this.x = x; }
    setY(y){ this.y = y; }

    /**
     * Updates the position according to movement.
     * @param {Movement} movement
     */
    move(movement){
        this.x += movement.getDx();
        this.y += movement.getDy();
    }

    getNextPosition(movement){
      return new Position(this.x + movement.getDx(), this.y += movement.getDy());
    }

}
