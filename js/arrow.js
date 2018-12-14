class Arrow{

    constructor(gameWidth, gameHeight){
        this.length = 100;
        this.start = { x: gameWidth / 2, y: gameHeight - 10 };
        this.end = { x: this.start.x, y: this.start.y - this.length };
        this.angle = 90;
    }

    
    getAngle(){ return this.angle; }

    draw(ctx){
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineWidth = 5;
        ctx.lineTo(this.end.x, this.end.y);
        ctx.stroke();
        ctx.lineWidth = 1;
    }

    rotateRight(){
        if(this.angle > 1){
            this.angle -= 1;
        };
    }

    rotateLeft(){
        if(this.angle < 179){
            this.angle += 1;
        };
    }

    resetAngle(){
        this.angle = 90;
    }

    update(startX, startY){
        this.start.x = startX;
        this.start.y = startY;
        this.end.x = this.start.x + this.length * Math.cos(this.angle * (Math.PI / 180));
        this.end.y = this.start.y + this.length * Math.sin((this.angle + 180) * (Math.PI / 180));
    }
}