class Cell{
    constructor(canvas, brick, x, y){
        this.canvas = canvas;
        this.brick = brick;
        this.WIDTH = 44;
        this.HEIGHT = 44;
        this.x = x;
        this.y = y;
        this.position = new Position(x * this.WIDTH + x, y * this.HEIGHT + 17)
    }
    
    getX(){ return this.position.getX(); }
    isActive(){ return this.brick.isActive(); }

    draw(){
        this.canvas.draw().beginPath();
        this.canvas.draw().rect(this.position.getX(), this.position.getY(), this.WIDTH, this.HEIGHT);
        this.canvas.draw().fillStyle = "red";
        this.canvas.draw().fill();
        this.canvas.draw().stroke();
    }

    setBrick(brick){ 
        this.brick = brick;
        this.brick.setY(this.position.getY());
    }

}
