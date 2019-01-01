class Movement{

    constructor(angle, distance){
        this.dx = distance * Math.cos(angle * (Math.PI / 180));
        this.dy = distance * Math.sin((angle + 180) * (Math.PI / 180));
    }

    getDx(){ return this.dx; }
    getDy(){ return this.dy; }

    isMoving(){ return this.dx != 0 || this.dy != 0; }

    reverseX(){ this.dx = -this.dx; }
    reverseY(){ this.dy = -this.dy; }
    
}
