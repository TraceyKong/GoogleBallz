class Cell{
    constructor(canvas, brick, x, y){
        this.canvas = canvas;
        this.brick = brick;
        this.WIDTH = 44;
        this.HEIGHT = 44;
        this.x = x;
        this.y = y;
        this.position = new Position(y * this.HEIGHT + y, x * this.WIDTH + x + 17)
    }
    
    getTop(){ return this.position.getY(); }
    getBottom(){ return this.position.getY() + this.HEIGHT; }
    getLeft(){ return this.position.getX(); }
    getRight(){ return this.position.getX() + this.WIDTH; }

    isActive(){ 
        if(this.brick) return this.brick.isActive();
        else return false;
    }

    draw(){
        this.canvas.draw().beginPath();
        this.canvas.draw().rect(this.position.getX(), this.position.getY(), this.WIDTH, this.HEIGHT);
        // this.canvas.draw().fillStyle = "black";
        // this.canvas.draw().font = "14px Arial";
        // this.canvas.draw().textAlign = "center";
        // this.canvas.draw().textBaseline = "middle";
        // this.canvas.draw().fillText(this.x + ", " + this.y, this.position.getX() + this.WIDTH/2, this.position.getY() + this.HEIGHT/2);
        this.canvas.draw().stroke();
    }

    glow(){
        this.draw();
        this.canvas.draw().fillStyle = "yellow";
        this.canvas.draw().fill();
        this.canvas.draw().stroke();
    }

    setBrick(brick){ 
        this.brick = brick;
        if(this.brick)  this.brick.setY(this.position.getY());
    }

    decreasePower(){ if(this.brick) this.brick.decreasePower(); }

}
