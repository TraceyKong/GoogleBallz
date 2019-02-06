/** Class representing a canvas */
class Canvas{
    /**
     * Creates a canvas
     */
    constructor(){
        var jQueryCanvas = $('canvas');
        this.canvas = jQueryCanvas[0].getContext('2d');
        this.width = jQueryCanvas.width();
        this.height = jQueryCanvas.height();
    }

    //getters
    draw(){ return this.canvas; }

    getWidth(){ return this.width; }
    getHeight(){ return this.height; }

    //Gets the position of where the balls should start from in a new game.
    getInitialPosition(){
        return new Position(this.width/2, this.height - 6);
    }

}
