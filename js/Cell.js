class Cell{
    constructor(brick, x, y){
        this.brick = brick;
        this.WIDTH = 44;
        this.HEIGHT = 44;
        this.x = x;
        this.y = y;
        this.position = new Position(x * this.WIDTH, y * this.HEIGHT + 19)
    }
    
    isActive(){ return this.brick.isActive(); }

    draw(){
        if(this.brick) this.brick.draw();
    }

    setBrick(brick){ this.brick = brick; }

}
