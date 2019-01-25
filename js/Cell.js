class Cell{
    constructor(brick, x, y){
        this.brick = brick;
        this.x = x;
        this.y = y;
    }
    
    isActive(){ return this.brick.isActive(); }
    isCell(x, y){ return this.x == x && this.y == y; }

    setBrick(brick){ this.brick = brick; }
}
