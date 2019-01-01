class Canvas{

    constructor(){
        var jQueryCanvas = $('canvas');
        this.canvas = jQueryCanvas[0].getContext('2d');
        this.width = jQueryCanvas.width();
        this.height = jQueryCanvas.height();
    }

    draw(){ return this.canvas; }

    getWidth(){ return this.width; }
    getHeight(){ return this.height; }

    getInitialPosition(){
        return new Position(this.width/2, this.height - 10);
    }

}
