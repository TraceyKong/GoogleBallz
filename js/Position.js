class Position{

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    getX(){ return this.x; };
    getY(){ return this.y; };

    setX(x){ this.x = x; }
    setY(y){ this.y = y; }

    move(movement){
        this.x += movement.getDx();
        this.y += movement.getDy();
    }

}
